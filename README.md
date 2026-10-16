# DiwaliBoost

A small, static productised web design service for Indian shops. No backend, customer accounts, checkout, database or automated payment handling.

## Run

Node 22.12+ and npm are required. `npm ci`, then `npm run dev`.

- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm test` — phone validation and enquiry message tests
- `npm run build` — production bundle and static prerendering
- `npm run test:build` — validate prerendered HTML, canonical URLs and indexing rules
- `npm run preview` — inspect the production build
- `npm run test:browser` — browser acceptance tests, using installed Microsoft Edge

## Structure

- `src/pages/Portfolio.tsx`: sales portfolio, packages, FAQ and manual enquiry flow.
- `src/pages/SweetShop.tsx`: reusable business landing page.
- `src/data/business.ts`: typed business data, products, branding and package definitions.
- `src/lib/whatsapp.ts`: validated Indian mobile numbers and encoded messages.
- `src/components/EnquiryForm.tsx`: browser-local form, explicit preview and WhatsApp handoff.
- `scripts/prerender.tsx`: renders `/`, `/demo/sweet-shop/` and `404.html` as HTML with metadata.
- `public/images`: original AI-generated demo imagery, optimised WebP and social preview.

Native links provide routing between the two pages. React hydrates prerendered HTML for filters and form interactivity. There is no routing dependency or runtime server.

## Business configuration

The owner-provided enquiry number is +91 6376566753. `service.phone` supplies the portfolio and fictional demo recipient. Every demo product message explicitly says it is not a food order.

To create a real customer page, copy the `Business` config, supply customer-approved text, products, photos and phone number, set `demo: false`, and register its route in `src/App.tsx` and `scripts/prerender.tsx`. Brand colour and background are configurable; logo and address are optional. Check contrast after changing colours. Replace the sample Hindi content as appropriate. The current template supports English and Hindi text, not automatic translation.

## Manual delivery

1. Confirm package, content, scope, revision limits and delivery date on WhatsApp.
2. Record agreed scope and payment manually. Collect 50% advance using your own agreed method.
3. Collect authorised logo/photos, products, prices and business details.
4. Configure the page and share a private preview.
5. Collect a consolidated revision list (Starter: one round; Business/Premium: two).
6. Collect balance after approval, publish, and send the final link.
7. Quote updates separately; get approval before doing paid extra work.

Introductory packages: ₹499 / 6 products / 2 working days; ₹999 / 12 products / 3 working days; ₹1,999 / 20 products / 4 working days. Delivery starts after complete content and advance. The published offer includes 90 days of static hosting on a provider subdomain; agree any continuation fees in advance. Domain registration, photography and translation are extra. No sales or SEO promises.

## Deployment and SEO

Build command: `npm run build`. Publish directory: `dist`. Use Vercel or Cloudflare Pages; `vercel.json` and `public/_headers` supply framework configuration, clean URLs and basic security headers. No catch-all SPA rewrite is needed: both routes have their own HTML and unknown paths should use `404.html`.

### Vercel Deployment (Git Integration)

1. **Push your code to GitHub**:
   Ensure all changes are pushed to your remote repository:
   ```bash
   git push origin main
   ```
2. **Import Project into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Authorize GitHub and select the `DiwaliBoost` repository.
   - **Framework Preset**: Vite (detected automatically).
   - **Root Directory**: `./`.
   - **Build Command**: `npm run build` (detected from `vercel.json`).
   - **Output Directory**: `dist` (detected from `vercel.json`).
3. **Configure Environment Variables**:
   Under **Environment Variables**, add:
   - **Name**: `SITE_URL`
   - **Value**: `https://your-domain.vercel.app` (or your custom production domain, e.g. `https://diwaliboost.in`).
   > **Note**: Without `SITE_URL`, the build deliberately sets `noindex` and omits canonical/social URLs. Adding `SITE_URL` enables canonical URLs, indexable robot directives, Open Graph cards, and `sitemap.xml`.
4. **Deploy**:
   - Click **Deploy**.
   - Subsequent pushes to `main` will automatically build and deploy new production releases, while pull requests receive preview deployments.

### Vercel CLI Deployment (Alternative)

If deploying directly from the terminal:
- Preview deployment: `npm run deploy`
- Production deployment: `npm run deploy:prod`

To test metadata with a temporary origin locally in PowerShell:
```powershell
$env:SITE_URL='https://example.com'; npm run build; Remove-Item Env:SITE_URL
```
Do not publish that example origin; build again with the real origin.

No hosting account or domain has been configured by default. Deployment requires an authenticated host and the final origin. Verify each real customer's content, phone number, prices, page metadata and photo rights before launch. See `VERIFICATION.md` for checks and measured results.

## Theme and visual customisation

Both page headers have light, dark and system controls. `next-themes` stores the choice under `diwaliboost-theme` and shares it across routes and tabs. `public/theme-init.js` sets the initial theme before the page content paints; it is external so the production CSP can keep `script-src 'self'`. Keep its storage key aligned with `ThemeProvider` in `src/App.tsx`.

Theme tokens live in `src/styles.css`. The shop's configured accent and background apply in light mode; dark mode uses contrasting storefront tokens. The original generated photos are reused. Outfit and DM Serif Display are bundled locally through Fontsource (OFL licences in their packages); the site makes no external font requests. Product enquiries and manual payment/delivery workflows are unchanged.

## Image provenance

Demo images were generated with the built-in image-generation tool, not taken from a real shop. The visible demo labels them as AI imagery. No customer photographs, testimonials or performance claims are used.

Hero prompt: “Premium Indian mithai still life for a fictional Jaipur sweet shop: open burgundy gift box of silver-leaf kaju katli, orange motichoor ladoo and pista barfi on cream stone, marigolds and brass diya, warm editorial light, no text or logos.”

Product prompt: “Six equal photographic tiles in a 3-by-2 contact sheet: kaju katli, motichoor ladoo, pista barfi, gulab jamun, kesar peda and a mixed mithai gift box. Cream plates and backgrounds, consistent daylight, no text or branding.”

The source images are in `assets/source/`. `node scripts/prepare-images.mjs` reproduces cropped/optimised assets without an image API request. Original images are not published in `dist`.
