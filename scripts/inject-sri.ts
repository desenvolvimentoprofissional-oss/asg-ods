import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

function calculateFileSha384(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha384').update(fileBuffer).digest('base64');
  return `sha384-${hash}`;
}

function updateTagWithSri(tag: string, sri: string): string {
  if (tag.includes('integrity=')) {
    return tag.replace(/integrity=["'][^"']*["']/, `integrity="${sri}"`);
  }
  return tag.replace(/>$/, ` integrity="${sri}">`);
}

function processAssetMatch(match: string, assetPath: string, distDir: string): string {
  const relPath = assetPath.replace(/^\//, '');
  const fullPath = path.join(distDir, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`[SRI] Asset referenciado não encontrado em dist: ${relPath}`);
  }
  const sri = calculateFileSha384(fullPath);
  return updateTagWithSri(match, sri);
}

function processAssetTags(html: string, distDir: string): string {
  const scriptRegex = /<script[^>]*?src=["'](\/assets\/[^"']+)["'][^>]*><\/script>/gi;
  let updated = html.replace(scriptRegex, (match, src) => {
    const openingTag = match.replace(/<\/script>$/, '');
    const processed = processAssetMatch(openingTag, src, distDir);
    return `${processed}</script>`;
  });

  const linkRegex = /<link[^>]*?href=["'](\/assets\/[^"']+)["'][^>]*>/gi;
  updated = updated.replace(linkRegex, (match, href) => {
    return processAssetMatch(match, href, distDir);
  });

  return updated;
}

export function injectSriIntoHtml(distDir = path.join(process.cwd(), 'dist')): boolean {
  const htmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.warn('[SRI] dist/index.html não encontrado.');
    return false;
  }

  const rawHtml = fs.readFileSync(htmlPath, 'utf8');
  const enrichedHtml = processAssetTags(rawHtml, distDir);
  fs.writeFileSync(htmlPath, enrichedHtml, 'utf8');
  console.log('[SRI] Subresource Integrity (SHA-384) injetado com sucesso em dist/index.html.');
  return true;
}

if (process.env.NODE_ENV !== 'test') {
  try {
    const ok = injectSriIntoHtml();
    if (!ok) process.exit(1);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
}
