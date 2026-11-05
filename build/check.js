#!/usr/bin/env node
/*
 * 内容自检脚本
 *
 * 用法：node build/check.js   （或 npm run check）
 *
 * 它会检查最容易被改坏的地方：
 *   - 中文、英文、印尼文是不是都填了
 *   - 产品编号有没有重复、分类写错
 *   - 图片路径对应的文件在不在
 *   - 三种语言的界面文字结构是否一致
 *   - 热门搜索指向的产品是否存在
 * 检查不通过时不会改动任何文件，修正 content.js 后重新运行即可。
 */
const fs = require('fs');
const path = require('path');
const { loadContent } = require('./build.js');

const ROOT = path.resolve(__dirname, '..');
const LANGS = ['zh', 'en', 'id'];
const errors = [];
const warnings = [];
const notes = [];

let d;
try {
  d = loadContent();
} catch (error) {
  console.error(`❌ content.js 读取失败：${error.message}`);
  process.exit(1);
}

function needText(value, where) {
  if (typeof value !== 'string' || !value.trim()) errors.push(`${where} 不能为空`);
}

function needLangText(value, where) {
  if (!value || typeof value !== 'object') {
    errors.push(`${where} 不存在（需要 zh / en / id 三份）`);
    return;
  }
  for (const lang of LANGS) needText(value[lang], `${where}.${lang}`);
}

function assetExists(url) {
  if (!url) return true;
  const clean = String(url).replace(/^\/+/, '').split(/[?#]/)[0];
  if (/^https?:/i.test(url)) return true;
  return fs.existsSync(path.join(ROOT, clean));
}

function optimizedUrl(url) {
  if (!url || /^https?:/i.test(url) || /\/optimized\//.test(url) || /\.webp$/i.test(url)) return '';
  return url.replace(/^\/?assets\//, '/assets/optimized/').replace(/\.(png|jpe?g)$/i, '.webp');
}

function checkImage(url, where) {
  if (!url) return;
  if (!assetExists(url)) {
    errors.push(`${where} 图片不存在：${url}`);
    return;
  }
  const optimized = optimizedUrl(url);
  if (optimized && !assetExists(optimized)) {
    warnings.push(`${where} 没有 WebP 小图（${optimized}），页面会回退到原图，加载会慢一点`);
  }
}

/* ---------------- 基本设置 ---------------- */
if (!d.site || !/^https?:\/\//.test(d.site.url || '')) {
  errors.push('site.url 必须是完整网址，例如 https://yimiaohuanyu.com');
}
for (const lang of LANGS) {
  const meta = d.siteMeta?.[lang];
  if (!meta) {
    errors.push(`siteMeta.${lang} 不存在`);
    continue;
  }
  needText(meta.title, `siteMeta.${lang}.title`);
  needText(meta.description, `siteMeta.${lang}.description`);
  needText(meta.keywords, `siteMeta.${lang}.keywords`);
  if (meta.title && meta.title.length > 80) {
    warnings.push(`siteMeta.${lang}.title 有 ${meta.title.length} 个字符，搜索结果里可能被截断（建议 60 以内）`);
  }
  if (meta.description && meta.description.length > 220) {
    warnings.push(`siteMeta.${lang}.description 有 ${meta.description.length} 个字符，建议 160 以内`);
  }
}

/* ---------------- 语言切换菜单 ---------------- */
if (!d.languageMenu || !Array.isArray(d.languageMenu.options) || d.languageMenu.options.length === 0) {
  errors.push('languageMenu 不存在，或 options 为空');
} else {
  needText(d.languageMenu.label, 'languageMenu.label');
  d.languageMenu.options.forEach((item, index) => {
    needText(item.code, `languageMenu.options[${index}].code`);
    needText(item.label, `languageMenu.options[${index}].label`);
  });
}

/* ---------------- 页面大图与配色 ---------------- */
const visualKeys = ['home', 'about', 'vision', 'products', 'solutions', 'support', 'gallery', 'faq', 'contact'];
for (const key of visualKeys) {
  const visual = d.pageVisuals?.[key];
  if (!visual) {
    errors.push(`pageVisuals.${key} 不存在`);
    continue;
  }
  checkImage(visual.image, `pageVisuals.${key}.image`);
  for (const colorKey of ['bg', 'text', 'accent', 'soft', 'muted']) {
    if (visual[colorKey] && !/^#[0-9a-f]{3,8}$/i.test(visual[colorKey])) {
      warnings.push(`pageVisuals.${key}.${colorKey} = "${visual[colorKey]}"，建议用 # 开头的颜色值`);
    }
  }
}

/* ---------------- 产品 ---------------- */
const productNos = new Set();
d.products.forEach((product, index) => {
  const where = `products[${index}]（${product.name?.zh || '未命名'}）`;
  needText(product.no, `${where}.no`);
  if (product.no && productNos.has(product.no)) errors.push(`${where}.no 和前面的产品重复：${product.no}`);
  if (product.no) productNos.add(product.no);
  if (!d.productCategories.includes(product.category)) {
    errors.push(`${where}.category = "${product.category}"，只能是 ${d.productCategories.join(' / ')}`);
  }
  needLangText(product.name, `${where}.name`);
  needLangText(product.text, `${where}.text`);
  checkImage(product.image, `${where}.image`);
});
notes.push(`产品 ${d.products.length} 个`);

/* ---------------- 方案 / 服务 / 画廊 ---------------- */
d.solutions.forEach((item, index) => {
  needLangText(item.title, `solutions[${index}].title`);
  checkImage(item.image, `solutions[${index}].image`);
});
d.support.forEach((item, index) => {
  needLangText(item.title, `support[${index}].title`);
  needLangText(item.text, `support[${index}].text`);
  if (item.label) needLangText(item.label, `support[${index}].label`);
  checkImage(item.image, `support[${index}].image`);
});
d.gallery.forEach((item, index) => {
  needLangText(item.title, `gallery[${index}].title`);
  checkImage(item.image, `gallery[${index}].image`);
});
notes.push(`方案 ${d.solutions.length} 条 · 服务 ${d.support.length} 条 · 画廊 ${d.gallery.length} 张`);

/* ---------------- FAQ ---------------- */
if (!d.faq) {
  errors.push('faq（常见问题）不存在');
} else {
  ['eyebrow', 'title', 'text'].forEach((key) => needLangText(d.faq[key], `faq.${key}`));
  if (!Array.isArray(d.faq.items) || d.faq.items.length === 0) {
    errors.push('faq.items 至少要有一条问答');
  } else {
    d.faq.items.forEach((item, index) => {
      needLangText(item.q, `faq.items[${index}].q`);
      needLangText(item.a, `faq.items[${index}].a`);
    });
    notes.push(`FAQ ${d.faq.items.length} 条`);
  }
}

/* ---------------- 热门搜索 ---------------- */
d.hotSearches.forEach((item, index) => {
  needLangText(item.label, `hotSearches[${index}].label`);
  const match = /^#product-(.+)$/.exec(item.href || '');
  if (match && !productNos.has(match[1])) {
    errors.push(`hotSearches[${index}] 指向的产品编号不存在：${item.href}`);
  } else if (!match && !['#products', '#contact'].includes(item.href)) {
    warnings.push(`hotSearches[${index}].href = "${item.href}"，不是 #product-XX / #products / #contact`);
  }
});

/* ---------------- 联系方式 ---------------- */
if (!/^(mailto:|https?:)/.test(d.contactMainLink || '')) {
  errors.push('contactMainLink 必须是 mailto: 或 https:// 开头的链接');
}
d.contactLinks.forEach((item, index) => {
  needLangText(item.label, `contactLinks[${index}].label`);
  needLangText(item.note, `contactLinks[${index}].note`);
  if (item.type === 'qr') checkImage(item.image, `contactLinks[${index}].image`);
  if (item.type === 'link' && !/^https?:\/\//.test(item.url || '')) {
    errors.push(`contactLinks[${index}].url 必须是完整网址`);
  }
});

/* ---------------- 三语结构一致性 ---------------- */
function flatten(value, prefix = '', out = []) {
  if (Array.isArray(value)) {
    if (!value.length) out.push(`${prefix}·空数组`);
    value.forEach((child, index) => flatten(child, `${prefix}[${index}]`, out));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) flatten(child, prefix ? `${prefix}.${key}` : key, out);
    return out;
  }
  out.push(prefix);
  return out;
}

const zhKeys = new Set(flatten(d.locales.zh, 'locales.zh'));
for (const lang of ['en', 'id']) {
  const keys = new Set(flatten(d.locales[lang], `locales.${lang}`));
  for (const key of zhKeys) {
    if (!keys.has(key.replace('locales.zh', `locales.${lang}`))) {
      errors.push(`缺少界面文字：${key.replace('locales.zh', `locales.${lang}`)}`);
    }
  }
  for (const key of keys) {
    if (!zhKeys.has(key.replace(`locales.${lang}`, 'locales.zh'))) {
      warnings.push(`多出来的界面文字（中文里没有）：${key}`);
    }
  }
}

/* ---------------- 输出 ---------------- */
console.log('YIMIAO HUANYU 内容检查（1.1.3）');
console.log(`  ${notes.join(' · ')}`);
console.log('');

if (warnings.length) {
  console.log(`⚠️  ${warnings.length} 个提醒（不影响生成）：`);
  warnings.forEach((item) => console.log(`   - ${item}`));
  console.log('');
}

if (errors.length) {
  console.log(`❌ 发现 ${errors.length} 个问题，请先修正 content.js：`);
  errors.forEach((item) => console.log(`   - ${item}`));
  console.log('');
  process.exitCode = 1;
} else {
  console.log('✅ 全部通过：三语内容、图片路径、产品编号都没有问题。');
}
