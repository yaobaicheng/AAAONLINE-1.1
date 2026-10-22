# YIMIAO HUANYU 官网｜1.1 版说明

这个版本重点解决一件事：**让 ChatGPT、豆包、Perplexity 等 AI 搜索能直接读到网站内容**。

原来的页面是“空 HTML + `content.js` 填内容”，人用浏览器能看到，但很多 AI 爬虫不执行 JavaScript，抓到的就是空页面。1.1 已经把中文、英文、印尼语三套内容**预渲染成真正的静态 HTML**，AI 不执行 JS 也能读到标题、产品、服务和联系方式。

## 一、目录结构

```text
AAAONLINE-1.1-deepseek/
├── index.html          # 中文首页（自动生成，不要直接改）
├── en/index.html       # 英文首页（自动生成）
├── id/index.html       # 印尼语首页（自动生成）
├── content.js          # 所有文字、产品、联系方式（平时改这里）
├── build/
│   ├── template.html   # 页面结构、大图、颜色（改这里）
│   └── build.js        # 预渲染脚本
├── styles.css          # 样式
├── main.js             # 弹窗、筛选、语言跳转
├── assets/             # 原图
├── assets/optimized/   # 卡片用 WebP 小图
├── robots.txt          # 允许 AI/搜索引擎抓取
├── sitemap.xml         # 三套语言页面
├── llms.txt            # 给 AI 的网站摘要
├── CNAME               # GitHub Pages 域名
├── _headers            # Cloudflare Pages 响应头
└── package.json        # npm run build
```

## 二、改完内容后怎么重新生成

文字和产品都在 `content.js`。改完后，在网站根目录运行：

```powershell
node build/build.js
```

或者：

```powershell
npm run build
```

不需要安装任何依赖。脚本会重新生成：

- `index.html`
- `en/index.html`
- `id/index.html`
- `sitemap.xml`
- `llms.txt`
- `robots.txt`

SEO 标题、描述和关键词在 `content.js` 开头的 `siteMeta` 里，分别对应 `zh`、`en`、`id`。

**不要直接改 `index.html` / `en/index.html` / `id/index.html`**，下次运行 build 会被覆盖。

### 改大图、颜色、页面结构

打开 `build/template.html`，按“第1页”到“第8页”的注释改：

- `data-page-image="/assets/图片名.jpg"`：本页大图
- `--page-bg`：背景色，也是大图遮罩颜色
- `--page-text`：文字色
- `--page-accent`：主色
- `--page-soft`：浅色
- `--page-photo`：大图透明度，`0` 只看背景色，`1` 是原图；文字压在图上建议 `0.4～0.6`

改完同样运行 `node build/build.js`。

### 改小图片

在 `content.js` 里改 `image`，路径统一用 `/assets/...` 开头：

- 产品：`"products": [`
- 方案：`"solutions": [`
- 服务：`"support": [`
- 画廊：`"gallery": [`
- 二维码：`"contactLinks": [`

卡片会优先使用 `assets/optimized/` 里的同名 `.webp` 小图；没有小图会自动用原图。

新增产品图后，如果想更快，可以再用图片工具导出一张 WebP 放进 `assets/optimized/`，文件名和原图一致。

## 三、部署

### GitHub Pages

1. 把整个文件夹的内容上传到仓库根目录（不是只上传 `index.html`）。
2. 仓库 Settings → Pages → Source 选 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。
3. `CNAME` 文件里已经写好 `yimiaohuanyu.com`；在 Pages 里绑定自定义域名，并在 DNS 里按 GitHub 提示配置。
4. 开启 HTTPS。
5. 确认 `https://yimiaohuanyu.com/robots.txt` 和 `/sitemap.xml` 能打开。

### Cloudflare Pages

1. 连接同一个仓库。
2. Framework preset 选 `None`。
3. Build command 留空。
4. Build output directory 填 `/`。
5. 绑定 `yimiaohuanyu.com`。
6. **重要：不要开启会挡 AI 的功能**：
   - Block AI bots / AI Crawl Control：关闭
   - Bot Fight Mode：关闭，或给 AI 爬虫加白名单
   - Under Attack Mode：不要开
   - WAF 里如果封了 `GPTBot`、`OAI-SearchBot`、`Bytespider`、`Bingbot`，要删掉

GitHub Pages 和 Cloudflare Pages 二选一即可；同时连同一个域名时，以实际解析到的一方为准。

## 四、让 AI 搜索找到你

代码层面已经准备好：

- **预渲染 HTML**：AI 不执行 JS 也能读到完整内容
- **`robots.txt`**：允许 GPTBot、OAI-SearchBot、ChatGPT-User、ClaudeBot、PerplexityBot、Bytespider、Baiduspider、Googlebot、Bingbot
- **`sitemap.xml`**：中文、英文、印尼语三个地址
- **`llms.txt`**：给 AI 的网站摘要和产品列表
- **`hreflang`**：告诉搜索引擎三种语言的关系
- **JSON-LD**：Organization、WebSite、WebPage、Product、Service
- **meta**：title、description、canonical、Open Graph、Twitter Card
- **`_headers`**：Cloudflare Pages 下返回 `index, follow`

### 还需要你手动提交

1. **Google Search Console**  
   添加 `yimiaohuanyu.com`，提交 `https://yimiaohuanyu.com/sitemap.xml`。

2. **Bing Webmaster Tools**  
   添加站点，提交 sitemap。ChatGPT 搜索很大程度依赖 Bing 索引，这一步很重要。

3. **字节/头条搜索站长平台**  
   提交 sitemap，让豆包/字节搜索更容易发现。`Bytespider` 已经在 `robots.txt` 里允许。

4. **百度搜索资源平台**（如果要做中文市场）  
   提交 sitemap，允许 `Baiduspider`。

5. **ChatGPT 没有“提交收录”入口**  
   它主要靠 `OAI-SearchBot` 抓取 + Bing 索引。Bing 收录后，ChatGPT 搜索才更容易找到。

6. **等待**  
   提交后通常几天到几周才会陆续出现；不是提交完立刻就有。

## 五、上线后怎么验证

不要只看浏览器，要看原始 HTML：

```powershell
curl.exe -sL https://yimiaohuanyu.com/ | Select-String "海亮铜盘管"
curl.exe -sL https://yimiaohuanyu.com/en/ | Select-String "Hailiang"
curl.exe -sL https://yimiaohuanyu.com/id/ | Select-String "Hailiang"
curl.exe -sL https://yimiaohuanyu.com/robots.txt
curl.exe -sL -A "GPTBot" -o NUL -w "%{http_code}" https://yimiaohuanyu.com/
curl.exe -sL -A "Bytespider" -o NUL -w "%{http_code}" https://yimiaohuanyu.com/
```

如果 `curl` 能看到产品文字，说明 AI 爬虫也能读到；如果只看到 `<div id="productsGrid"></div>`，说明预渲染没有生效。

也可以用浏览器打开：

```text
view-source:https://yimiaohuanyu.com/
```

看源代码，而不是 F12 里渲染后的 DOM。

## 六、本地预览

因为页面用了 `/assets/...` 这种根路径，不能直接双击 `index.html`，要在网站根目录起一个本地服务器：

```powershell
python -m http.server 8000
```

然后打开：

```text
http://localhost:8000/
http://localhost:8000/en/
http://localhost:8000/id/
```

## 七、0.8 版本已经修好的问题

- 企业画廊可点击放大；缺失图片显示“＋”占位
- 产品卡使用 WebP 小图，加载更快
- 外文长文显示省略号，点击卡片看完整内容
- 服务支持页英文/印尼语徽标不再显示中文
- 大图恢复半透明 + 背景遮罩，可用 `--page-photo` 调整

## 八、注意

- 网站是公开静态站，前端代码和文案访客都能看到；不要放敏感信息。
- AI 搜索收录不保证 100% 出现，取决于抓取、索引和各家产品策略。
- 如果以后换域名，要同时改：
  - `build/build.js` 里的 `SITE_URL`
  - `CNAME`
  - 重新运行 `node build/build.js`
