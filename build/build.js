/*
 * 1.1.3 预渲染脚本
 *
 * 作用：把 content.js 里的内容直接写进 HTML，生成中文首页、/en/、/id/ 三套静态页面。
 * 这样即使 AI 爬虫不执行 JavaScript，也能读到完整标题、产品、FAQ 和联系方式。
 *
 * 用法（在网站根目录）：
 *   node build/build.js           一次性生成
 *   node build/build.js --watch   修改 content.js 后自动重新生成
 *   npm run build                 等同于第一条
 *
 * 这个文件是“程序”，一般不需要改。要改文字请打开 content.js。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_FILE = path.join(ROOT, 'content.js');
const TEMPLATE_FILE = path.join(__dirname, 'template.html');
const DEFAULT_SITE_URL = 'https://yimiaohuanyu.com';

/* 每次 build 都会重新读取 content.js，方便 --watch 连续生成。 */
let D = null;
let SITE_URL = DEFAULT_SITE_URL;
let TODAY = '';

function loadContent() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(CONTENT_FILE, 'utf8'), sandbox, { filename: 'content.js' });
  if (!sandbox.window.siteContent) {
    throw new Error('content.js 里没有找到 window.siteContent，请检查文件开头和结尾的括号。');
  }
  return sandbox.window.siteContent;
}

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[ch]));

const readPath = (object, key) => key.split('.').reduce((value, part) => value?.[part], object);

/* t：界面文字（简体/英文/印尼文三份）；找不到时退回中文。 */
const t = (lang, key) => readPath(D.locales[lang], key) ?? readPath(D.locales.zh, key) ?? '';

/* l：带 zh/en/id 的对象（如 name、title、text）。 */
const l = (lang, localized) => localized?.[lang] ?? localized?.zh ?? '';

const stripHtml = (value) => String(value ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();

const optimized = (url) => {
  if (!url) return '';
  if (/\/optimized\//.test(url) || /\.webp$/i.test(url)) return url;
  return url.replace(/^\/?assets\//, '/assets/optimized/').replace(/\.(png|jpe?g)$/i, '.webp');
};

const visual = (key) => D.pageVisuals?.[key] || {};
const pageImage = (key) => visual(key).image || '';

function pageStyle(key) {
  const item = visual(key);
  const pairs = [
    ['--page-bg', item.bg],
    ['--page-text', item.text],
    ['--page-accent', item.accent],
    ['--page-soft', item.soft],
    ['--page-muted', item.muted],
    ['--page-photo', item.photo]
  ];
  return pairs
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([name, value]) => `${name}:${value}`)
    .join(';');
}

function backgroundStyle(key) {
  const image = pageImage(key);
  return image ? `background-image:url('${esc(image)}')` : '';
}

function imageClass(key) {
  return pageImage(key) ? ' has-image' : '';
}

const pages = [
  { lang: 'zh', htmlLang: 'zh-CN', dir: '', url: '/', ogLocale: 'zh_CN' },
  { lang: 'en', htmlLang: 'en', dir: 'en', url: '/en/', ogLocale: 'en_US' },
  { lang: 'id', htmlLang: 'id', dir: 'id', url: '/id/', ogLocale: 'id_ID' }
].map((page) => ({ ...page, url: `${SITE_URL}${page.url}` }));

/* --------------------------------------------------------------------
   1. 页面 <head>：hreflang、Open Graph、Twitter Card
   -------------------------------------------------------------------- */
function headMeta(page) {
  const meta = D.siteMeta[page.lang];
  const alternates = [
    `<link rel="alternate" hreflang="zh-CN" href="${SITE_URL}/">`,
    `<link rel="alternate" hreflang="en" href="${SITE_URL}/en/">`,
    `<link rel="alternate" hreflang="id" href="${SITE_URL}/id/">`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">`
  ].join('\n  ');
  const localeAlternates = pages
    .filter((item) => item.lang !== page.lang)
    .map((item) => `<meta property="og:locale:alternate" content="${item.ogLocale}">`)
    .join('\n  ');
  return `${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(D.company.name)}">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.description)}">
  <meta property="og:url" content="${page.url}">
  <meta property="og:locale" content="${page.ogLocale}">
  ${localeAlternates}
  <meta property="og:image" content="${SITE_URL}/assets/hvac-materials-hero.jpg">
  <meta property="og:image:width" content="1686">
  <meta property="og:image:height" content="933">
  <meta property="og:image:alt" content="${esc(stripHtml(t(page.lang, 'hero.title')))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(meta.title)}">
  <meta name="twitter:description" content="${esc(meta.description)}">
  <meta name="twitter:image" content="${SITE_URL}/assets/hvac-materials-hero.jpg">`;
}

/* --------------------------------------------------------------------
   2. 结构化数据（JSON-LD）
   Organization / WebSite / WebPage / 产品列表 / 服务 / FAQ
   这些内容不显示在页面上，但搜索引擎和 AI 会读，是“正文外”的主要 SEO 材料。
   -------------------------------------------------------------------- */
function jsonLd(page) {
  const meta = D.siteMeta[page.lang];
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webPageId = `${page.url}#webpage`;
  const faqId = `${page.url}#faq`;
  const heroImage = `${SITE_URL}/assets/optimized/hvac-materials-hero.webp`;
  const faqTitle = stripHtml(l(page.lang, D.faq.title));
  const keywords = (meta.keywords || '').split(',').map((item) => item.trim()).filter(Boolean);
  const postalAddress = { '@type': 'PostalAddress', addressCountry: D.company.country || 'ID' };
  for (const key of ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode']) {
    if (D.company.address?.[key]) postalAddress[key] = D.company.address[key];
  }

  const organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: D.company.name,
    url: `${SITE_URL}/`,
    description: meta.description,
    email: 'yimiaohuanyu@gmail.com',
    telephone: D.company.contact[0],
    logo: `${SITE_URL}/favicon.svg`,
    address: postalAddress,
    areaServed: { '@type': 'Country', name: D.company.serviceArea || 'Indonesia' },
    knowsLanguage: D.company.languages || ['zh-CN', 'en', 'id'],
    knowsAbout: keywords,
    brand: (D.company.brands || []).map((name) => ({ '@type': 'Brand', name })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: D.company.contact[0],
        email: D.company.contact[2],
        contactType: 'sales',
        areaServed: 'ID',
        availableLanguage: D.company.languages || ['zh-CN', 'en', 'id']
      }
    ]
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${SITE_URL}/`,
    name: D.company.name,
    description: meta.description,
    publisher: { '@id': orgId },
    inLanguage: ['zh-CN', 'en', 'id']
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': webPageId,
    url: page.url,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    inLanguage: page.htmlLang,
    dateModified: TODAY,
    primaryImageOfPage: { '@type': 'ImageObject', url: heroImage }
  };

  const products = {
    '@type': 'ItemList',
    '@id': `${page.url}#products`,
    name: stripHtml(t(page.lang, 'products.title')),
    numberOfItems: D.products.length,
    itemListElement: D.products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: l(page.lang, product.name),
        description: l(page.lang, product.text),
        image: `${SITE_URL}${optimized(product.image)}`,
        category: t(page.lang, `products.categories.${product.category}`),
        brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
        url: `${page.url}#product-${product.no}`
      }
    }))
  };

  const services = {
    '@type': 'ItemList',
    '@id': `${page.url}#services`,
    name: stripHtml(t(page.lang, 'support.title')),
    itemListElement: D.support.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: l(page.lang, item.title),
        description: l(page.lang, item.text),
        provider: { '@id': orgId },
        areaServed: { '@type': 'Country', name: D.company.serviceArea || 'Indonesia' }
      }
    }))
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': faqId,
    url: `${page.url}#faq`,
    name: faqTitle,
    inLanguage: page.htmlLang,
    isPartOf: { '@id': webPageId },
    mainEntity: D.faq.items.map((item) => ({
      '@type': 'Question',
      name: l(page.lang, item.q),
      acceptedAnswer: { '@type': 'Answer', text: l(page.lang, item.a) }
    }))
  };

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [organization, website, webPage, products, services, faqPage]
  }, null, 2).replace(/</g, '\\u003c');
}

/* --------------------------------------------------------------------
   3. 页面各区块的 HTML
   -------------------------------------------------------------------- */
function languageOptions() {
  const menu = D.languageMenu || {
    label: 'Language',
    options: [
      { code: 'zh', label: '中文' },
      { code: 'en', label: 'English' },
      { code: 'id', label: 'Bahasa Indonesia' }
    ]
  };
  return [
    `<option value="" selected disabled>${esc(menu.label)}</option>`,
    ...menu.options.map((item) => `<option value="${esc(item.code)}">${esc(item.label)}</option>`)
  ].join('\n        ');
}

function renderProductFilter(lang) {
  return D.productCategories.map((key) => `
        <button data-category="${esc(key)}" class="${key === 'all' ? 'active' : ''}">${esc(t(lang, `products.categories.${key}`))}</button>`).join('');
}

function renderProducts(lang) {
  return D.products.map((product) => {
    const name = l(lang, product.name);
    const text = l(lang, product.text);
    const category = t(lang, `products.categories.${product.category}`);
    const image = product.image
      ? `<img class="product-image optional-image image-loaded" src="${esc(optimized(product.image))}" alt="${esc(name)}" loading="lazy" decoding="async">`
      : '';
    return `
        <article class="product-card ${esc(product.tone || 'dark')}" id="product-${esc(product.no)}"
          data-detail-title="${esc(name)}" data-detail-body="${esc(text)}" data-detail-image="${esc(product.image)}">
          ${image}
          <div class="product-art"><i></i><i></i></div>
          <div class="product-info"><small>${esc(product.no)} · ${esc(category)}</small>
            <h3>${esc(name)}</h3><p>${esc(text)}</p>
            <button class="product-detail-trigger" type="button" aria-label="${esc(t(lang, 'labels.moreAbout') + ' ' + name)}">↗</button>
          </div>
        </article>`;
  }).join('');
}

function renderSolutions(lang) {
  return D.solutions.map((solution, index) => {
    const title = l(lang, solution.title);
    const style = solution.image ? ` style="--solution:url('${esc(solution.image)}')"` : '';
    const image = solution.image
      ? `<img class="solution-thumb optional-image image-loaded" src="${esc(optimized(solution.image))}" alt="${esc(title)}" loading="lazy" decoding="async">`
      : '';
    return `
        <button type="button" class="solution-item"${style}
          data-detail-title="${esc(title)}" data-detail-image="${esc(solution.image)}">
          ${image}
          <span>0${index + 1}</span><strong>${esc(title)}</strong><b>↗</b>
        </button>`;
  }).join('');
}

function renderSupport(lang) {
  return D.support.map((item) => {
    const title = l(lang, item.title);
    const text = l(lang, item.text);
    const badge = item.label ? l(lang, item.label) : item.icon;
    const image = item.image
      ? `<img class="support-thumb optional-image image-loaded" src="${esc(optimized(item.image))}" alt="${esc(title)}" loading="lazy" decoding="async">`
      : '';
    return `
        <button type="button" class="support-card" data-detail-title="${esc(title)}" data-detail-body="${esc(text)}" data-detail-image="${esc(item.image || '')}">
          ${image}
          <b>${esc(badge)}</b><h3>${esc(title)}</h3><p>${esc(text)}</p><i>↗</i>
        </button>`;
  }).join('');
}

function renderGallery(lang) {
  return D.gallery.map((item) => {
    const title = l(lang, item.title);
    const image = item.image
      ? `<img class="gallery-image optional-image image-loaded" src="${esc(optimized(item.image))}" alt="${esc(title)}" loading="lazy" decoding="async">`
      : '';
    const open = image
      ? ` data-gallery-image="${esc(item.image)}" data-gallery-title="${esc(title)}" tabindex="0" role="button" aria-label="${esc(title)}"`
      : '';
    return `<figure class="${esc(item.size)}${image ? ' has-gallery-image' : ' is-empty'}"${open}>${image}<figcaption>${esc(title)}</figcaption></figure>`;
  }).join('\n        ');
}

function renderFaqList(lang) {
  return D.faq.items.map((item, index) => `
          <details class="faq-item"${index === 0 ? ' open' : ''}>
            <summary>${esc(l(lang, item.q))}</summary>
            <p>${esc(l(lang, item.a))}</p>
          </details>`).join('');
}

function renderHotSearches(lang) {
  return D.hotSearches.map((item) => `<a href="${esc(item.href)}">${esc(l(lang, item.label))}</a>`).join('\n        ');
}

function renderContactLinks(lang) {
  return D.contactLinks.map((item) => item.type === 'qr' ? `
        <div class="contact-link qr"><button class="qr-zoom" type="button" aria-label="${esc(l(lang, item.label))} - ${esc(t(lang, 'labels.enlargeQr'))}"><img src="${esc(item.image)}" alt="${esc(l(lang, item.label))}"></button><div><strong>${esc(l(lang, item.label))}</strong><small>${esc(l(lang, item.note))}</small></div></div>` : `
        <a class="contact-link" href="${esc(item.url)}" target="_blank" rel="noopener"><div><strong>${esc(l(lang, item.label))}</strong><small>${esc(l(lang, item.note))}</small></div><b>${esc(item.icon || '↗')}</b></a>`).join('');
}

function renderFooterContact() {
  return D.company.contact.map((contact) => `<span>${esc(contact)}</span>`).join('');
}

/* --------------------------------------------------------------------
   4. 把内容套进 build/template.html
   -------------------------------------------------------------------- */
const PLACEHOLDER_PATTERNS = [
  [/\{\{t:([^}]+)\}\}/g, (lang, key) => esc(t(lang, key))],
  [/\{\{h:([^}]+)\}\}/g, (lang, key) => t(lang, key)],
  [/\{\{gh:([^}]+)\}\}/g, (lang, key) => l(lang, readPath(D, key))],
  [/\{\{g:([^}]+)\}\}/g, (lang, key) => esc(l(lang, readPath(D, key)))],
  [/\{\{style:([^}]+)\}\}/g, (lang, key) => pageStyle(key)],
  [/\{\{img:([^}]+)\}\}/g, (lang, key) => esc(pageImage(key))],
  [/\{\{bg:([^}]+)\}\}/g, (lang, key) => backgroundStyle(key)],
  [/\{\{hasImage:([^}]+)\}\}/g, (lang, key) => imageClass(key)]
];

function renderPage(page) {
  const meta = D.siteMeta[page.lang];
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  const replacements = {
    htmlLang: page.htmlLang,
    metaTitle: esc(meta.title),
    metaDescription: esc(meta.description),
    metaKeywords: esc(meta.keywords),
    canonical: page.url,
    headMeta: headMeta(page),
    jsonLd: jsonLd(page),
    languageOptions: languageOptions(),
    productFilter: renderProductFilter(page.lang),
    productsGrid: renderProducts(page.lang),
    solutionsList: renderSolutions(page.lang),
    supportGrid: renderSupport(page.lang),
    galleryGrid: renderGallery(page.lang),
    faqList: renderFaqList(page.lang),
    hotSearches: renderHotSearches(page.lang),
    contactLinks: renderContactLinks(page.lang),
    footerContact: renderFooterContact(),
    'company.name': esc(D.company.name),
    'company.shortName': esc(D.company.shortName || D.company.name),
    copyright: esc(D.company.copyright),
    contactMainLink: esc(D.contactMainLink)
  };

  let html = template;
  for (const [pattern, replacer] of PLACEHOLDER_PATTERNS) {
    html = html.replace(pattern, (_, key) => replacer(page.lang, key));
  }

  for (const [key, value] of Object.entries(replacements)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }

  const leftover = html.match(/\{\{[^}]+\}\}/);
  if (leftover) {
    throw new Error(`template.html 里有未替换的占位符：${leftover[0]}`);
  }
  return html;
}

/* --------------------------------------------------------------------
   5. robots.txt / sitemap.xml / llms.txt / 部署小文件
   -------------------------------------------------------------------- */
function writeRobots() {
  const aiBots = [
    'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
    'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
    'PerplexityBot', 'Perplexity-User',
    'Bytespider', 'Baiduspider',
    'Googlebot', 'Google-Extended',
    'Bingbot',
    'Applebot', 'Applebot-Extended',
    'CCBot'
  ];
  const body = aiBots.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n');
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /build/\n\n# AI 搜索与助手：允许抓取\n${body}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf8');
}

function writeSitemap() {
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    { loc: `${SITE_URL}/en/`, priority: '0.9' },
    { loc: `${SITE_URL}/id/`, priority: '0.9' }
  ];
  const alternates = `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${SITE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/"/>
    <xhtml:link rel="alternate" hreflang="id" href="${SITE_URL}/id/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>`;
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${item.priority}</priority>
${alternates}
  </url>`).join('\n')}
</urlset>
`, 'utf8');
}

function writeLlms() {
  const zh = D.locales.zh;
  const en = D.locales.en;
  const id = D.locales.id;
  const groups = D.productCategories.filter((key) => key !== 'all');

  const productLines = groups.map((group) => {
    const items = D.products.filter((product) => product.category === group);
    return `### ${zh.products.categories[group]} / ${en.products.categories[group]} / ${id.products.categories[group]}
${items.map((product) => `- ${l('zh', product.name)} | ${l('en', product.name)} | ${l('id', product.name)}\n  ${l('zh', product.text)}`).join('\n')}`;
  }).join('\n\n');

  const faqLines = ['zh', 'en', 'id'].map((lang) => {
    const title = lang === 'zh' ? '中文' : lang === 'en' ? 'English' : 'Bahasa Indonesia';
    const items = D.faq.items.map((item, index) => `Q${index + 1}: ${l(lang, item.q)}\nA${index + 1}: ${l(lang, item.a)}`).join('\n\n');
    return `### ${title}\n\n${items}`;
  }).join('\n\n');

  const serviceLines = ['zh', 'en', 'id'].map((lang) => `### ${lang === 'zh' ? '中文' : lang === 'en' ? 'English' : 'Bahasa Indonesia'}
${D.support.map((item) => `- ${l(lang, item.title)}: ${l(lang, item.text)}`).join('\n')}`).join('\n\n');

  fs.writeFileSync(path.join(ROOT, 'llms.txt'), `# ${D.company.name}

> 印尼冷暖辅材供应商：海亮铜管、铜盘管、分支管、铜配件、保温材料、PU 风板与制冷剂。
>
> HVAC materials supplier in Indonesia: Hailiang copper tubes, branch pipes, copper fittings, insulation, PU duct panels and refrigerants.

- Website: ${SITE_URL}/
- Canonical: ${SITE_URL}/
- Languages: 中文 ${SITE_URL}/ · English ${SITE_URL}/en/ · Bahasa Indonesia ${SITE_URL}/id/
- Service area: Indonesia
- Brands: ${(D.company.brands || []).join(', ')}
- Contact: ${D.company.contact.join(' · ')}
- Last updated: ${TODAY}

## 中文简介
${zh.about.text}

## English summary
${en.about.text}

## Ringkasan Bahasa Indonesia
${id.about.text}

## 主营产品 / Products
${productLines}

## 服务 / Services
${serviceLines}

## 常见问题 / FAQ
${faqLines}

## 页面 / Pages
- [中文首页](${SITE_URL}/): 印尼铜管、海亮铜管、分支管、保温材料、PU 风板、制冷剂。
- [English home](${SITE_URL}/en/): Copper tubes, Hailiang copper tube, branch pipes, insulation and refrigerants in Indonesia.
- [Indonesian home](${SITE_URL}/id/): Pipa tembaga Hailiang, pipa cabang, insulasi, panel PU, dan refrigeran di Indonesia.

## 引用说明 / Citation
- 引用公司或产品时请使用上面的 canonical 地址。
- 产品规格、库存和交期以联系销售确认的结果为准。
- When citing, use the canonical URLs above. Sizes, stock and lead time are confirmed by our sales team.
`, 'utf8');
}

function writeDeploymentFiles() {
  let host = 'yimiaohuanyu.com';
  try { host = new URL(SITE_URL).hostname; } catch (error) { /* 保留默认域名 */ }

  fs.writeFileSync(path.join(ROOT, 'CNAME'), `${host}\n`, 'utf8');
  fs.writeFileSync(path.join(ROOT, '.nojekyll'), '', 'utf8');
  fs.writeFileSync(path.join(ROOT, '_headers'), `/*
  X-Robots-Tag: index, follow, max-image-preview:large, max-snippet:-1
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/llms.txt
  Content-Type: text/plain; charset=utf-8

/assets/*
  Cache-Control: public, max-age=86400
`, 'utf8');

  fs.writeFileSync(path.join(ROOT, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#EAF5FF"/>
  <path d="M18 16h9l5 12 5-12h9L34 38v10h-4V38L18 16z" fill="#17466E"/>
</svg>
`, 'utf8');

  fs.writeFileSync(path.join(ROOT, 'package.json'), JSON.stringify({
    name: 'yimiaohuanyu-site',
    private: true,
    version: D.version || '1.1.3',
    scripts: {
      build: 'node build/build.js',
      watch: 'node build/build.js --watch',
      dev: 'node serve.js',
      check: 'node build/check.js'
    }
  }, null, 2) + '\n', 'utf8');
}

/* --------------------------------------------------------------------
   6. 主流程
   -------------------------------------------------------------------- */
function build() {
  D = loadContent();
  SITE_URL = String(D.site?.url || DEFAULT_SITE_URL).replace(/\/+$/, '');
  const now = new Date();
  TODAY = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  // pages 依赖 SITE_URL，重新生成一次。
  pages.length = 0;
  pages.push(
    { lang: 'zh', htmlLang: 'zh-CN', dir: '', url: `${SITE_URL}/`, ogLocale: 'zh_CN' },
    { lang: 'en', htmlLang: 'en', dir: 'en', url: `${SITE_URL}/en/`, ogLocale: 'en_US' },
    { lang: 'id', htmlLang: 'id', dir: 'id', url: `${SITE_URL}/id/`, ogLocale: 'id_ID' }
  );

  for (const page of pages) {
    const dir = page.dir ? path.join(ROOT, page.dir) : ROOT;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderPage(page), 'utf8');
    console.log(`  ✓ ${path.relative(ROOT, path.join(dir, 'index.html'))}`);
  }

  writeRobots();
  writeSitemap();
  writeLlms();
  writeDeploymentFiles();
  console.log(`  ✓ robots.txt / sitemap.xml / llms.txt / CNAME / _headers / package.json`);
  console.log(`✅ 生成完成：3 个语言页面，${D.products.length} 个产品，${D.faq.items.length} 条 FAQ（${TODAY}）`);
  return { pages: pages.length, products: D.products.length, faq: D.faq.items.length };
}

function watch() {
  console.log('👀 监听 content.js 和 build/template.html，保存后自动重新生成…');
  let timer = null;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (error) {
        console.error(`❌ 生成失败：${error.message}`);
        console.error('   改坏的地方不会影响已经生成的页面；修正后保存即可重新生成。');
      }
    }, 200);
  };
  fs.watchFile(CONTENT_FILE, { interval: 400 }, rebuild);
  fs.watchFile(TEMPLATE_FILE, { interval: 400 }, rebuild);
}

if (require.main === module) {
  try {
    build();
    if (process.argv.includes('--watch')) watch();
  } catch (error) {
    console.error(`❌ 生成失败：${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { build, watch, loadContent };
