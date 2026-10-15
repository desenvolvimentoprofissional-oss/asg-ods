import type { Request, Response, NextFunction } from 'express';

const VLIBRAS_CDN = 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@v7.12.2/';

export const CSP_HEADER = [
  "default-src 'none'",
  "script-src 'self' 'sha256-odqQAl+mDRYx0EimQD22jCjCTSuQWWuxw9SYzRQEmtE=' " +
    `https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "style-src 'self' " +
    "'sha256-eUb4QNOqGDF5+49sdjTMcZSJwJagVldqY68xFObUKcE=' " +
    "'sha256-h04C0gpDimXiWBLWwlLGzczqL/xm8ZfwdFYFhfwwy8c=' " +
    "'sha256-6yGv3aB3hfTEfPXLLsjWJS7qLg4GUsRrepEaeQbZIY0=' " +
    "'sha256-awytb91xnVLWJuWz5AwdV5dAJPERvSsx0KrWWhJuNnM=' " +
    "'sha256-K1YGCJ9Cg1Y7R6JLOf8v8m/fYMKl7z8n4H6C96EuRE4=' " +
    "'sha256-aONVQQvH1cFuvg38jkGtM/thDaulvTnuyax++NvB8kA=' " +
    "'sha256-8GWAUrRyaI3gREajBb5ihH3tKcnImvvB7k9KB2GodIg=' " +
    `https://fonts.googleapis.com https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "style-src-attr 'unsafe-inline'",
  "font-src 'self' https://fonts.gstatic.com https://vlibras.gov.br " +
    `https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "img-src 'self' blob: data: https://vlibras.gov.br https://*.vlibras.gov.br " +
    `${VLIBRAS_CDN} https://images.unsplash.com ` +
    'https://firebasestorage.googleapis.com https://crasp-frontend.vercel.app ' +
    'https://hackathonenangrad.espm.edu.br https://www.ethos.org.br https://ju.se',
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://vlibras.gov.br " +
    `https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  `frame-src 'self' https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  `worker-src 'self' blob: https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
  "frame-ancestors 'self' https://aistudio.google.com https://*.google.com https://*.run.app https://ai.studio",
].join('; ');

export const DEV_CSP_HEADER = [
  "default-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vlibras.gov.br " +
    `https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vlibras.gov.br " +
    `https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "style-src-attr 'unsafe-inline'",
  "font-src 'self' https://fonts.gstatic.com https://vlibras.gov.br " +
    `https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "img-src 'self' blob: data: https://vlibras.gov.br https://*.vlibras.gov.br " +
    `${VLIBRAS_CDN} https://images.unsplash.com ` +
    'https://firebasestorage.googleapis.com https://crasp-frontend.vercel.app ' +
    'https://hackathonenangrad.espm.edu.br https://www.ethos.org.br https://ju.se',
  "connect-src 'self' ws: wss: http: https: https://*.googleapis.com https://*.firebaseio.com " +
    `https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  `frame-src 'self' https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  `worker-src 'self' blob: https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
  "frame-ancestors 'self' https://aistudio.google.com https://*.google.com https://*.run.app https://ai.studio",
].join('; ');

export function getActiveCsp(): string {
  return process.env.NODE_ENV === 'production' ? CSP_HEADER : DEV_CSP_HEADER;
}

export function formatSecureCookie(c: unknown): string {
  let str = String(c);
  if (!/;\s*Secure/i.test(str)) str += '; Secure';
  if (!/;\s*SameSite/i.test(str)) str += '; SameSite=Lax';
  if (!/;\s*HttpOnly/i.test(str)) str += '; HttpOnly';
  return str;
}

export function applySecurityHeaders(_req: Request, res: Response, next: NextFunction): void {
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');

  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()'
  );

  res.setHeader('Content-Security-Policy', getActiveCsp());

  const origSet = res.setHeader.bind(res);
  res.setHeader = (name: string, value: number | string | readonly string[]) => {
    if (typeof name === 'string' && name.toLowerCase() === 'set-cookie') {
      const list = Array.isArray(value) ? value : [value];
      const secured = list.map(formatSecureCookie);
      return origSet(name, Array.isArray(value) ? secured : secured[0]);
    }
    return origSet(name, value);
  };

  next();
}

export const VLIBRAS_UNITY_CSP = [
  `default-src 'self' blob: data: https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://vlibras.gov.br " +
    `https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: https://vlibras.gov.br https://*.vlibras.gov.br ${VLIBRAS_CDN}`,
  "connect-src 'self' blob: data: https://vlibras.gov.br https://*.vlibras.gov.br " +
    VLIBRAS_CDN,
  "worker-src 'self' blob:",
  "frame-ancestors 'self' https://aistudio.google.com https://*.google.com https://*.run.app https://ai.studio",
].join('; ');

export const VLIBRAS_UNITY_HTML = [
  '<!doctype html><html lang="pt-br"><head><meta charset="utf-8"/>',
  '<base href="https://vlibras.gov.br/app/unity/"/>',
  '<title>Unity WebGL Player | Vlibras</title>',
  '<style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden}',
  '#gameContainer{width:100vw;height:100vh;background-color:transparent!important}',
  'canvas{width:100%!important;height:100%!important}</style></head><body>',
  '<div id="gameContainer"></div>',
  '<script src="https://vlibras.gov.br/app/unity/unity-loader.js" crossorigin="anonymous"></script>',
  '<script>',
  '(function(){if(!window.UnityLoader)return;var o=window.UnityLoader.instantiate;',
  'window.UnityLoader.instantiate=function(c,u,p){',
  'var full=String(u).indexOf("http")===0?u:"https://vlibras.gov.br/app/unity/"+String(u);',
  'return o.call(this,c,full,p);};})();',
  '</script>',
  '<script src="https://vlibras.gov.br/app/unity/index.js" crossorigin="anonymous"></script>',
  '</body></html>',
].join('');

export function serveVlibrasUnityBridge(_req: Request, res: Response): void {
  res.setHeader('Content-Security-Policy', VLIBRAS_UNITY_CSP);
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.type('html').status(200).send(VLIBRAS_UNITY_HTML);
}
