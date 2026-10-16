import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadEnv } from 'vite';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const origin = env.SITE_URL ? new URL(env.SITE_URL).origin : undefined;
const portfolio = await readFile('dist/index.html', 'utf8');
const demo = await readFile('dist/demo/sweet-shop/index.html', 'utf8');
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.match(portfolio, /Your Diwali offers/);
assert.match(demo, /Kaju Katli/);
assert.match(demo, /name="robots" content="noindex,follow"/);
assert.ok(!sitemap.includes('/demo/'));
assert.ok(!portfolio.includes('<!--app-html-->'));
assert.ok(!demo.includes('<!--page-meta-->'));
assert.ok(portfolio.includes('application/ld+json'));
assert.ok(portfolio.includes('FAQPage'));
assert.ok(portfolio.includes('ProfessionalService'));
assert.ok(portfolio.includes('name="twitter:title"'));
assert.ok(demo.includes('application/ld+json'));
assert.ok(demo.includes('Bakery'));
const llmsTxt = await readFile('dist/llms.txt', 'utf8');
assert.ok(llmsTxt.includes('DiwaliBoost'));
const llmsFullTxt = await readFile('dist/llms-full.txt', 'utf8');
assert.ok(llmsFullTxt.includes('DiwaliBoost'));
assert.ok(portfolio.includes('https://www.googletagmanager.com/gtag/js?id=G-Z3SD9K9BH1'));
assert.ok(portfolio.includes("gtag('config', 'G-Z3SD9K9BH1');"));
assert.ok(demo.includes('https://www.googletagmanager.com/gtag/js?id=G-Z3SD9K9BH1'));
assert.ok(demo.includes("gtag('config', 'G-Z3SD9K9BH1');"));
if (origin) {
  assert.ok(portfolio.includes(`rel="canonical" href="${origin}/"`));
  assert.ok(demo.includes(`rel="canonical" href="${origin}/demo/sweet-shop/"`));
  assert.ok(portfolio.includes(`property="og:image" content="${origin}/images/social-preview.jpg"`));
  assert.match(portfolio, /name="robots" content="index,follow"/);
  assert.ok(sitemap.includes(`<loc>${origin}/</loc>`));
} else {
  assert.match(portfolio, /name="robots" content="noindex,follow"/);
  assert.ok(!portfolio.includes('rel="canonical"'));
  assert.ok(!sitemap.includes('<loc>'));
}
console.log(`Build HTML and metadata verified (${origin ?? 'local preview'}).`);
