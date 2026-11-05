# YIMIAO HUANYU 官网｜1.1.3 版说明

这一版在 1.1.2 的基础上，按你的反馈改了三处：**“关于我们”英文/印尼语带上“要做/想做”的意思、语言切换默认显示 Language、印尼语服务卡片不再歪**。

---

## 〇、1.1.3 这次改了什么

### 1. “关于我们”三语都保留“要做 / 想做”的意思

```text
中文：要做印尼最全面的 / 冷暖辅材供应商
英文：Aiming to Be Indonesia's Most Comprehensive HVAC Materials Supplier
印尼语：Berupaya Menjadi Supplier Material HVAC Paling Lengkap di Indonesia
```

- 英文用 `Aiming to Be`，不是直接说“就是最全面”；
- 印尼语用 `Berupaya Menjadi`（努力成为），也不是直接说“已经是最全面”；
- 中文原文没有改。

### 2. 语言切换默认显示 “Language”

以前中文页右上角显示“中文”，不懂中文的人找不到切换入口。现在：

- 右上角固定显示 **Language**；
- 打开后是各语言自己的名字：**中文 / English / Bahasa Indonesia**；
- 选择后跳到对应语言页面，新页面仍然显示 Language；
- 配置在 `content.js` → `languageMenu`，以后加语言只改这里。

### 3. 印尼语“咨询 / 售后 / 产品”三卡片不再歪

原因是 `<button>` 默认会把内容垂直居中：印尼语第二条 `Layanan Purnajual` 的说明在 1024px 会变成 3 行，整块内容被往上顶，标题和正文就跟另外两张错开了。

现在把服务卡片强制改成：

```css
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
```

三张卡片的标签、标题、正文都从卡片顶部同一位置开始；即使某一张正文多一行，也不会再把整块内容顶上去。

---

## 一、这次修了什么

### 1. 修好了会导致整站生成失败的错误

`content.js` 里 FAQ 第二条中文用了英文双引号 `1/4"`，把 JavaScript 字符串提前截断，运行 `node build/build.js` 会报：

```text
Invalid or unexpected token
```

现在改成中文写法：`1/4 英寸、3/8 英寸……`，代码可以正常生成。

### 2. “关于我们”三语重新对齐

中文（你修改后的版本）：

```text
要做印尼最全面的 / 冷暖辅材供应商
億淼寰宇是印尼的冷暖辅材供应商之一，以庞大的库存储备和专业的服务为基础。……
```

英文：

```text
Aiming to Be Indonesia's Most Comprehensive HVAC Materials Supplier
YIMIAO HUANYU is one of Indonesia's HVAC materials suppliers, backed by large warehouse stock and professional service.……
```

印尼语：

```text
Berupaya Menjadi Supplier Material HVAC Paling Lengkap di Indonesia
YIMIAO HUANYU adalah salah satu supplier material HVAC di Indonesia, dengan dukungan stok gudang yang besar dan layanan profesional.……
```

> 中文原句“以庞大的库存储备和专业的服务。”少了一个谓语，这一版补了“**为基础**”。如果不想保留，把这三个字删掉，再同步改英文/印尼语即可。

### 3. 删掉了没用的内容

| 删掉的东西 | 说明 |
| --- | --- |
| 关于我们的 4 个数字 | HTML、`stats` 文案、`main.js` 渲染全部移除；`styles.css` 里旧的 `.stats` 样式已不再被引用 |
| 海亮大厦图片 | 图片文件已被你删除；这一版也清掉了 `pageVisuals.about.image` 和图片占位 |
| 采购指南整段 | 页面、`guide` 文案、生成脚本、`llms.txt`、CSS 全部移除 |
| 新闻 | 页面本来就没有新闻板块，`news` 数据和导航文字一起移除 |
| “全球布局 / 可持续发展”文案 | 页面没有这两个板块，翻译文案一并删除 |
| “加载更多产品” | 32 个产品本来就会全部显示，按钮和 JS 一起移除 |
| 空图片占位 | 产品、方案、服务、画廊、联系页本来就没有大图，空 `<div>` 已删除 |

### 4. 英文/印尼语排版对齐

“咨询 / 售后 / 产品”三张卡片之前英文版不齐，印尼语版在 1024px 也不齐。原因是：

- `After-Sales` 在窄一点的桌面宽度会换行；
- 印尼语 `Layanan Purnajual` 的说明在 1024px 会变成 3 行；
- `<button>` 默认把内容垂直居中，哪张卡片的文字多一行，整块内容就会被往上顶。

现在：

- 服务卡片改成 `flex`，内容强制从卡片顶部开始；
- 桌面三列时，三张卡片的标签、标题、正文从同一高度开始；
- 901～1100px 之间把英文/印尼文标题缩小到 20px，保证 `After-Sales Service` / `Layanan Purnajual` 只占一行；
- 900px 以下改成单列，卡片上下排列，不再有左右对齐问题；
- 手机端 320px 也不横向溢出；320px 时标题缩到 20px，三张卡片内容顶部仍然一致。

### 5. 联系方式标题换行

中文“让我们开启对话”之前会断成“让我们开启对 / 话”，现在固定两行：“让我们 / 开启对话”。

### 6. 顺手做的语言本地化

- 关于我们英文标题用 `Aiming to Be`，印尼语用 `Berupaya Menjadi`，保留“要做 / 想做”的意思；
- 语言切换默认显示 `Language`，选项用语言自己的名字：中文 / English / Bahasa Indonesia；
- 铜直管英文从 `Straight Connector` 改为行业更常用的 `Coupling`；
- 蚊香盘管印尼语从 `Koil Tembaga Pancake` 改为 `Koil Tembaga Gulung`；
- 冷库材料印尼语从 `Cold Storage` 改为 `Gudang Pendingin`；
- 制冷剂类英文统一为 `Efficient cooling, energy saving, stable performance and reliable purity.`

---

## 二、3 分钟上手（VS Code）

### 第 1 步：打开文件夹

用 VS Code 打开整个 `AAAONLINE-1.1.3-deepseek` 文件夹。

### 第 2 步：启动预览

菜单 **终端 → 运行任务**，选：

```text
① 预览网站（自动重建）
```

终端出现：

```text
🌐 http://localhost:5173/
```

按住 **Ctrl** 点击网址，就会在 VS Code 内置浏览器打开。

### 第 3 步：改内容

打开 `content.js`，改完 `Ctrl+S` 保存。服务器会自动重新生成，点内置浏览器标题栏的刷新按钮即可。

### 第 4 步：发布前检查

```powershell
node build/check.js
```

显示“全部通过”后再上传。

> 不要直接双击 `index.html`。网站使用 `/assets/...` 根路径，双击会没有样式和图片。

---

## 三、文件结构

```text
AAAONLINE-1.1.3-deepseek/
├── index.html           # 中文首页（自动生成，不要直接改）
├── en/index.html        # 英文首页（自动生成）
├── id/index.html        # 印尼语首页（自动生成）
│
├── content.js           # ★ 所有文字、产品、FAQ、图片、颜色、联系方式
├── build/
│   ├── template.html    # 页面结构（一般不用改）
│   ├── build.js         # 生成脚本（一般不用改）
│   └── check.js         # 三语内容检查
├── serve.js             # 本地预览服务器
├── styles.css           # 样式
├── main.js              # 筛选、弹窗、语言跳转、热门搜索定位
│
├── assets/              # 原图
├── assets/optimized/    # 卡片 WebP 小图
│
├── robots.txt           # 允许搜索引擎 / AI 抓取（自动生成）
├── sitemap.xml          # 三语页面地图（自动生成）
├── llms.txt             # 给 AI 的网站摘要（自动生成）
├── CNAME                # GitHub Pages 域名（自动生成）
├── _headers             # Cloudflare Pages 响应头（自动生成）
├── package.json         # npm 脚本（自动生成）
├── .vscode/tasks.json   # VS Code 一键任务
└── README.md            # 这份说明
```

**只改 `content.js`、`styles.css`、`main.js`、`build/template.html`、`assets/`。** 三套 `index.html` 和 SEO 文件都是自动生成的。

---

## 四、想改什么 → 改哪里

| 我想改…… | 打开 | 搜索 |
| --- | --- | --- |
| 公司名、电话、邮箱、版权 | `content.js` | `company` |
| 手机顶栏短公司名 | `content.js` | `company.shortName` |
| 公司地址（可留空） | `content.js` | `company.address` |
| 网站标题 / 描述 / 关键词 | `content.js` | `siteMeta` |
| 关于我们的标题和正文 | `content.js` | `locales` → `about` |
| 产品名称、文字、图片、分类 | `content.js` | `products` |
| 解决方案 | `content.js` | `solutions` |
| 服务支持 | `content.js` | `support` |
| 企业画廊 | `content.js` | `gallery` |
| 常见问题 | `content.js` | `faq` |
| 页脚热门搜索 | `content.js` | `hotSearches` |
| WhatsApp / 微信二维码 | `content.js` | `contactLinks` |
| 每页配色 | `content.js` | `pageVisuals` |
| 导航、按钮、标签文字 | `content.js` | `locales` |
| 语言切换菜单 | `content.js` | `languageMenu` |
| 字号、间距、卡片样式 | `styles.css` | 文件末尾“1.1.3”一段 |
| 网站域名 | `content.js` | `site.url` |

---

## 五、三语规则（重要）

`content.js` 里 `locales` 是三份独立文字：

```js
"locales": {
  "zh": { "about": { "title": "要做印尼最全面的<br>冷暖辅材供应商", "text": "……" } },
  "en": { "about": { "title": "Aiming to Be Indonesia's Most Comprehensive HVAC Materials Supplier", "text": "……" } },
  "id": { "about": { "title": "Berupaya Menjadi Supplier Material HVAC Paling Lengkap di Indonesia", "text": "……" } }
}
```

规则：

- **中文是基准**，英文/印尼语按中文意思写，不能自己加中文没有的承诺。
- `<br>` 是换行。中文标题里的 `<br>` 是给排版用的；英文/印尼文太长时让它自动换行即可。
- 三份语言的段落数量、项目数量要一致，否则页面长短会差很多。
- 标点按各自语言习惯：中文全角，英文/印尼文半角。
- 不要写“唯一代理 / 全球第一 / 最低价”这类绝对化用语，除非有文件能证明。

改完运行：

```powershell
node build/check.js
```

它会告诉你哪一句的哪种语言是空的。

### 语言切换菜单

`content.js` → `languageMenu`：

```js
"languageMenu": {
  "label": "Language",
  "options": [
    { "code": "zh", "label": "中文" },
    { "code": "en", "label": "English" },
    { "code": "id", "label": "Bahasa Indonesia" }
  ]
}
```

- `label` 是下拉框默认显示的文字，现在是 `Language`；
- `options` 是打开后看到的语言名称，用各语言自己的写法，非中文用户也能认出来；
- 增加语言时，除了这里加一项，还要有对应的语言目录（例如 `/en/`、`/id/`）和 `siteMeta`，一般不建议小白自己加。

---

## 六、改“关于我们”

`content.js` → `locales.zh / en / id` → `about`：

```js
"about": {
  "title": "要做印尼最全面的<br>冷暖辅材供应商",
  "text": "億淼寰宇是印尼的冷暖辅材供应商之一……"
}
```

- 目前关于我们**没有大图、没有四个数字**，只有标题、正文和一个“探索我们的故事”链接。
- 想换标题，直接改 `title`，`<br>` 控制换行。
- 想换正文，直接改 `text`，不要手动换行。
- 如果以后想加回“数字”或大图，需要同时改页面结构（`build/template.html`），建议让懂代码的人加。

---

## 七、改产品

`content.js` → `products`。一个产品的写法：

```js
{
  "no": "33",
  "category": "tube",
  "image": "/assets/新图片.png",
  "tone": "copper",
  "brand": "Hailiang",
  "name": {
    "zh": "新产品中文名",
    "en": "New Product Name",
    "id": "Nama Produk Baru"
  },
  "text": {
    "zh": "一句中文卖点",
    "en": "One sentence in English.",
    "id": "Satu kalimat dalam Bahasa Indonesia."
  }
}
```

- `no` 不能重复，热门搜索和锚点会用到。
- `category` 只能是：`tube`、`rod`、`foil`、`aluminum`、`custom`。
- `image` 以 `/assets/` 开头；同名 `.webp` 放 `assets/optimized/` 会更快。
- `tone` 可选 `copper`、`silver`、`blue`、`dark`。
- `brand` 可以不写；写了会进结构化数据。
- 所有产品默认全部显示，不需要“加载更多”。

---

## 八、改常见问题 FAQ

`content.js` → `faq` → `items`：

```js
{
  "q": { "zh": "问题？", "en": "Question?", "id": "Pertanyaan?" },
  "a": { "zh": "回答。", "en": "Answer.", "id": "Jawaban." }
}
```

建议：

- 问题写客户真实会搜的话，例如“印尼铜管常用规格有哪些”“分支管怎么选”。
- 回答 2～4 句，先给结论，再补充条件。
- 不要写无法兑现的承诺。
- FAQ 会自动出现在页面、`FAQPage` 结构化数据和 `llms.txt`。
- 第一条默认展开，其余收起。

> 注意：中文里如果要写 `1/4"` 这种带引号的尺寸，请写成 `1/4 英寸`，否则会再次把 JavaScript 字符串截断。

---

## 九、解决方案、服务支持、企业画廊

### 解决方案

`content.js` → `solutions`，只有三语 `title`，点击弹出详情。

### 服务支持

`content.js` → `support`，每项有 `label`（小标签）、`title`、`text`。

排版规则：

- 桌面（>1100px）：三列，字号 27/25px；
- 中等桌面（901～1100px）：三列，标签 24px、标题 20px，保证英文标题不换行；
- 平板/窄窗口（≤900px）：一列；
- 手机（≤620px）：一列。

改文字时尽量让三张卡片的标题长度接近，视觉上更整齐。

### 企业画廊

`content.js` → `gallery`，`size` 可选 `wide`、`tall`、`normal`。点击有图的卡片可放大。

---

## 十、改每页配色

`content.js` → `pageVisuals`：

```js
"about": {
  "bg": "#FFFFFF",
  "text": "#174A75",
  "accent": "#117ED8",
  "soft": "#E8F5FF",
  "muted": "#537391"
}
```

| 字段 | 作用 |
| --- | --- |
| `bg` | 背景色 |
| `text` | 标题和正文颜色 |
| `accent` | 小标题、按钮、链接主色 |
| `soft` | 浅色块、卡片渐变 |
| `muted` | 次要文字颜色 |
| `image` | 只有 `home` 和 `vision` 有大图 |
| `photo` | 大图透明度，0～1 |

可用的页：`home`、`about`、`vision`、`products`、`solutions`、`support`、`gallery`、`faq`、`contact`。

---

## 十一、改联系方式

`content.js`：

- `company.contact`：页脚和结构化数据里的电话/邮箱，最常用的放第一位。
- `contactMainLink`：联系页大圆按钮，现在是 `mailto:`。
- `contactLinks`：WhatsApp 和微信二维码。
- `company.shortName`：手机顶栏显示，默认 `YIMIAO HUANYU`。
- `company.address`：有公开地址再填，没有留空。

WhatsApp 链接格式：`https://wa.me/62xxxxxxxxxx`（不要 `+` 和空格）。

---

## 十二、生成、预览、检查

### 生成

```powershell
node build/build.js
```

或：

```powershell
npm run build
```

### 自动生成 + 预览

```powershell
node serve.js
```

保存 `content.js` / `build/template.html` 后自动重建。

### VS Code 任务

| 任务 | 用途 |
| --- | --- |
| ① 预览网站（自动重建） | 日常改内容 |
| ② 重新生成网页 | 只生成（`Ctrl+Shift+B` 默认任务） |
| ③ 检查三语内容 | 检查空翻译、图片、产品编号 |

### 检查

```powershell
node build/check.js
```

检查：三语是否填全、产品编号是否重复、分类是否正确、图片是否存在、热门搜索目标是否存在、三语结构是否一致。

> 修改 `build/build.js` 或 `serve.js` 后要重启预览；改 `main.js`、`styles.css` 刷新即可。

---

## 十三、部署

### GitHub Pages

1. 整个文件夹上传到仓库根目录。
2. Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`，目录 `/ (root)`。
3. `CNAME` 已写好 `yimiaohuanyu.com`，按提示配置 DNS。
4. 开启 HTTPS。

### Cloudflare Pages

1. 连接仓库。
2. Framework preset 选 `None`。
3. Build command 留空。
4. Build output directory 填 `/`。
5. 绑定域名。
6. **不要挡 AI**：关闭 Block AI bots、Bot Fight Mode、Under Attack Mode；WAF 里不要封 `GPTBot`、`OAI-SearchBot`、`Bytespider`、`Bingbot`。

### 换域名

只改 `content.js` 的 `site.url`，再运行 `node build/build.js`。

---

## 十四、SEO 现在保留了什么

- 三语 `title` / `description` / `keywords`
- `hreflang` 和 canonical
- JSON-LD：`Organization`、`WebSite`、`WebPage`、`Product`、`Service`、`FAQPage`
- `llms.txt`：三语简介、32 个产品、服务、7 条 FAQ、页面地址、引用说明
- `robots.txt`：允许 GPTBot、OAI-SearchBot、ClaudeBot、PerplexityBot、Bytespider、Baiduspider、Googlebot、Bingbot、Applebot、CCBot
- `sitemap.xml`：三个语言页面
- 页脚热门搜索：内部链接到具体产品
- FAQ：最容易被 AI 直接引用的内容

采购指南已按你的要求删除；现在 FAQ 是主要的 SEO 长文内容。如果以后想补回来，可以再加 FAQ 条目或在关于我们里补充一段介绍。

### 还需要手动做

1. Google Search Console：提交 `https://yimiaohuanyu.com/sitemap.xml`
2. Bing Webmaster Tools：提交 sitemap（ChatGPT 搜索依赖 Bing 索引）
3. 字节/头条搜索站长平台：提交 sitemap
4. 百度搜索资源平台（做中文市场的话）
5. 等待几天到几周，并积累外部链接

**没有任何代码能保证排第一**，能控制的是内容、结构、抓取和收录。

---

## 十五、上线后验证

```powershell
curl.exe -sL https://yimiaohuanyu.com/ | Select-String "要做印尼最全面的"
curl.exe -sL https://yimiaohuanyu.com/ | Select-String "常见问题"
curl.exe -sL https://yimiaohuanyu.com/en/ | Select-String "Aiming to Be"
curl.exe -sL https://yimiaohuanyu.com/id/ | Select-String "Berupaya Menjadi"
curl.exe -sL https://yimiaohuanyu.com/llms.txt | Select-String "FAQ"
curl.exe -sL https://yimiaohuanyu.com/robots.txt
```

也可以打开 `view-source:https://yimiaohuanyu.com/`，搜索“常见问题”，看源代码里有没有。

- 结构化数据检查：<https://search.google.com/test/rich-results>
- Schema 检查：<https://validator.schema.org/>

---

## 十六、常见问题

### build 报 “Invalid or unexpected token”

多半是 `content.js` 里的引号、逗号、括号写坏了。常见情况：中文句子里直接写了英文双引号 `"`。改成中文引号或“英寸”。

### 页面没有样式 / 图片裂开

不要双击 `index.html`，用 `node serve.js`，访问 `http://localhost:5173/`。

### 改了没变化

1. 保存了吗？
2. 运行 `node build/build.js` 了吗？
3. 刷新页面（`Ctrl+F5` 或内置浏览器刷新按钮）。
4. 已部署的话等 CDN 缓存。

### 图片不显示

- 路径以 `/assets/` 开头；
- 文件名和扩展名区分大小写；
- 建议同时放一张同名 `.webp` 到 `assets/optimized/`。

### 语言切换 404

本地必须用 `serve.js` 预览，直接双击 HTML 不行。

### 手机端挤

1.1.3 已处理 320px、390px、620px、768px、900px、1024px、1440px 的布局；如果还有问题，改 `styles.css` 末尾的媒体查询。

---

## 十七、发布前建议确认

1. **“要做最全面 / Aiming to Be the Most Comprehensive / Berupaya Menjadi Paling Lengkap”** 是目标表述，确认公司愿意这样对外说。
2. **FAQ 里的现货、交期、质量文件、配送范围**，确认都能兑现；不能兑现的改成“请联系销售确认”。
3. **联系方式和二维码**确认没有过期。
4. **未使用的图片**（例如 `扩口铜直管.png`、`球头减震器.png`）可以留在 `assets/`，不会影响页面；想清理可以手动删。

---

## 十八、版本

- **1.1.3**（2026-11-05）：关于我们英文改为 `Aiming to Be`、印尼语改为 `Berupaya Menjadi`；语言切换默认显示 `Language`，选项用 中文 / English / Bahasa Indonesia；修复印尼语服务卡片在 1024px 等处因内容垂直居中而错位的问题；320px 下内容顶部仍然对齐。
- **1.1.2**（2026-11-05）：修复 FAQ 引号导致的生成失败；关于我们三语重写；删除四个数字、海亮大厦图、采购指南、新闻、全球/可持续文案、加载更多和空图片位；服务卡片英文/印尼文对齐；联系标题换行；部分产品/方案名称本地化。
- 1.1.1：关于我们三语同步；新增采购指南、FAQ、热门搜索；大图/配色移入 `content.js`。
- 1.1：三语预渲染、`llms.txt`、`robots.txt`、`sitemap.xml`、结构化数据。
