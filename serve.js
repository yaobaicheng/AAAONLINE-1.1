#!/usr/bin/env node
/*
 * 本地预览服务器（不需要安装任何依赖）
 *
 * 用法：在网站根目录运行
 *   node serve.js
 * 然后在 VS Code 终端里按住 Ctrl 点击 http://localhost:5173/
 *
 * 它会做三件事：
 *   1. 先生成一次网站；
 *   2. 启动本地服务器；
 *   3. 监听 content.js / build/template.html，保存后自动重新生成。
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { build, watch } = require('./build/build.js');

const ROOT = __dirname;
const HOST = '127.0.0.1';
const START_PORT = Number(process.env.PORT) || 5173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
}

function resolveTarget(pathname) {
  let target = path.resolve(ROOT, `.${pathname}`);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return { forbidden: true };

  if (pathname.endsWith('/')) target = path.join(target, 'index.html');

  if (fs.existsSync(target)) {
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      const index = path.join(target, 'index.html');
      if (fs.existsSync(index)) {
        return { file: index, redirect: pathname.endsWith('/') ? null : `${pathname}/` };
      }
      return { notFound: true };
    }
    return { file: target };
  }

  if (!path.extname(target)) {
    const index = path.join(target, 'index.html');
    if (fs.existsSync(index)) return { file: index, redirect: `${pathname}/` };
    const html = `${target}.html`;
    if (fs.existsSync(html)) return { file: html };
  }

  return { notFound: true };
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, '只支持 GET 请求');
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch (error) {
    return send(res, 400, '地址格式不正确');
  }
  if (pathname.includes('\0')) return send(res, 400, '地址格式不正确');

  const result = resolveTarget(pathname);
  if (result.forbidden) return send(res, 403, '禁止访问该路径');
  if (result.redirect) {
    res.writeHead(301, { Location: result.redirect });
    return res.end();
  }
  if (!result.file) return notFound(res, pathname);

  fs.readFile(result.file, (error, data) => {
    if (error) return notFound(res, pathname);
    const type = MIME[path.extname(result.file).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    if (req.method === 'HEAD') return res.end();
    res.end(data);
  });
});

function notFound(res, pathname) {
  send(res, 404, `<!doctype html><meta charset="utf-8">
<title>404 · 页面不存在</title>
<body style="font-family:system-ui,'Microsoft YaHei',sans-serif;padding:48px;color:#17466e;background:#f5faff">
<h1>404</h1>
<p>没有找到 <code>${pathname.replace(/[<>&]/g, '')}</code></p>
<p><a href="/">返回中文首页</a> · <a href="/en/">English</a> · <a href="/id/">Bahasa Indonesia</a></p>
</body>`, 'text/html; charset=utf-8');
}

function listen(port) {
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && port < START_PORT + 20) {
      console.log(`端口 ${port} 被占用，换 ${port + 1} 再试…`);
      setTimeout(() => listen(port + 1), 80);
      return;
    }
    console.error(`❌ 本地服务器启动失败：${error.message}`);
    process.exit(1);
  });

  server.listen(port, HOST, () => {
    const url = `http://localhost:${port}/`;
    console.log('');
    console.log('  ✅ 本地预览已启动');
    console.log(`  🌐 ${url}`);
    console.log(`     中文 ${url}   English ${url}en/   Indonesia ${url}id/`);
    console.log('');
    console.log('  在 VS Code 终端里按住 Ctrl 点击上面的网址，会在编辑器内置浏览器打开。');
    console.log('  改 content.js 保存后会自动重新生成，点内置浏览器的刷新按钮即可。');
    console.log('  按 Ctrl+C 停止。');
    console.log('');
  });
}

process.on('SIGINT', () => {
  console.log('\n已停止本地预览。');
  process.exit(0);
});

try {
  build();
  watch();
  listen(START_PORT);
} catch (error) {
  console.error(`❌ 启动失败：${error.message}`);
  process.exit(1);
}
