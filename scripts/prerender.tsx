import { readFile, writeFile, mkdir } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import { loadEnv } from "vite";
import { App } from "../src/App";

const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const rawOrigin = env.SITE_URL;
let origin: string | undefined;
if (rawOrigin) {
  const url = new URL(rawOrigin);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.pathname !== "/" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error(
      "SITE_URL must be a bare http(s) origin, e.g. https://your-domain.in",
    );
  origin = url.origin;
}
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
const template = await readFile("dist/index.html", "utf8");
const pages = [
  {
    path: "/",
    file: "index.html",
    title: "DiwaliBoost | Festive sale pages for small businesses",
    description:
      "Beautiful Diwali sale pages for sweet shops and local businesses. Mobile-friendly designs, WhatsApp enquiries and one-time packages from ₹499. Based in Jaipur.",
    index: true,
  },
  {
    path: "/demo/sweet-shop/",
    file: "demo/sweet-shop/index.html",
    title: "Gulab & Co. | Sweet-shop demo by DiwaliBoost",
    description:
      "Explore a fictional Diwali sweet-shop landing page with sample mithai, gift boxes and WhatsApp enquiries. Demo content only; no food orders.",
    index: false,
  },
  {
    path: "/404/",
    file: "404.html",
    title: "Page not found | DiwaliBoost",
    description:
      "This page could not be found. Explore DiwaliBoost festive sale pages.",
    index: false,
  },
];
function getSchemas(
  pagePath: string,
  pageDescription: string,
  url?: string,
  origin?: string,
) {
  if (pagePath === "/") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "DiwaliBoost",
        url: url || "https://diwaliboost.in/",
        description: pageDescription,
      },
      {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        name: "DiwaliBoost",
        url: url || "https://diwaliboost.in/",
        logo: url ? `${origin}/favicon.svg` : "/favicon.svg",
        description:
          "Productised web design service for Indian small businesses, sweet shops, and bakeries promoting festive Diwali offers via WhatsApp.",
        telephone: "+91-7062182162",
        priceRange: "₹499 - ₹1999",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Jaipur" },
          { "@type": "State", name: "Rajasthan" },
          { "@type": "Country", name: "India" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-7062182162",
          contactType: "sales",
          availableLanguage: ["en", "hi"],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Diwali Sale Page Web Design",
        serviceType: "Festive Web Design",
        provider: {
          "@type": "ProfessionalService",
          name: "DiwaliBoost",
        },
        areaServed: "India",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Festive Packages",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Starter Package",
              price: "499",
              priceCurrency: "INR",
              description:
                "Up to 6 products with WhatsApp enquiries, mobile-friendly design, 1 revision round, 2 working days.",
              ...(url ? { url: `${url}#pricing` } : {}),
            },
            {
              "@type": "Offer",
              name: "Business Package",
              price: "999",
              priceCurrency: "INR",
              description:
                "Up to 12 products, offers section, hours, address & pickup details, dedicated gift section, 2 revision rounds, 3 working days.",
              ...(url ? { url: `${url}#pricing` } : {}),
            },
            {
              "@type": "Offer",
              name: "Premium Package",
              price: "1999",
              priceCurrency: "INR",
              description:
                "Up to 20 products, Hindi & English content placement, custom domain connection, 2 revision rounds, 4 working days.",
              ...(url ? { url: `${url}#pricing` } : {}),
            },
          ],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is this an online store?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It’s a product showcase and enquiry page. Customers browse your offers, then contact you on WhatsApp. You confirm availability, delivery and payment directly. There’s no cart or online checkout.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use Hindi and English?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We can place your supplied content in either language. The Premium package includes both Hindi and English content placement. Translation is quoted separately.",
            },
          },
          {
            "@type": "Question",
            name: "What do I need to send?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Your business name, logo (if you have one), product photos you have permission to use, product names and prices, offers, WhatsApp number, and any hours or pickup/delivery details.",
            },
          },
          {
            "@type": "Question",
            name: "What happens after Diwali?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Your package includes 90 days of hosting after launch. You can request a quote for a new campaign or continued hosting, or ask for the static site files. We’ll agree any ongoing costs first.",
            },
          },
          {
            "@type": "Question",
            name: "Do you guarantee enquiries or sales?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. We provide a polished page that you can share with customers. Results depend on your products, offers and promotion; no sales or search-ranking guarantees are included.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Get Your Diwali Sale Page",
        description:
          "Three simple steps to take your shop online for Diwali celebrations.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Tell us what’s festive",
            text: "Send your logo, product photos, prices and offers on WhatsApp. We’ll confirm your package, scope and timeline.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Make it feel like you",
            text: "Pay a 50% advance and we’ll create your page. Review a private preview and send your included revisions together.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Share the celebration",
            text: "Approve the page, pay the balance, and get your live link. Share it in your WhatsApp status, Instagram bio or customer messages.",
          },
        ],
      },
    ];
  }
  if (pagePath === "/demo/sweet-shop/") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Bakery",
        name: "Gulab & Co.",
        alternateName: "गुलाब मिठाई",
        description:
          "Fictional sweet-shop concept by DiwaliBoost showcasing sample mithai, gift boxes and WhatsApp enquiries. Sample demo only.",
        telephone: "+91-7062182162",
        openingHours: "Mo-Su 09:00-21:00",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
        },
      },
    ];
  }
  return [];
}

for (const page of pages) {
  const url = origin ? `${origin}${page.path}` : undefined;
  const schemas = getSchemas(page.path, page.description, url, origin);
  const metadata = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<meta name="robots" content="${page.index && origin ? "index,follow" : "noindex,follow"}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="en_IN" />',
    '<meta property="og:site_name" content="DiwaliBoost" />',
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escape(page.title)}" />`,
    `<meta name="twitter:description" content="${escape(page.description)}" />`,
    '<meta property="og:image:alt" content="DiwaliBoost festive sale pages for small businesses" />',
    ...(url
      ? [
          `<link rel="canonical" href="${escape(url)}" />`,
          `<meta property="og:url" content="${escape(url)}" />`,
          `<meta property="og:image" content="${escape(origin! + "/images/social-preview.jpg")}" />`,
          '<meta property="og:image:width" content="1200" />',
          '<meta property="og:image:height" content="630" />',
          `<meta name="twitter:image" content="${escape(origin! + "/images/social-preview.jpg")}" />`,
        ]
      : []),
    ...schemas.map(
      (schema) =>
        `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`,
    ),
  ].join("\n    ");
  const html = template
    .replace("<!--page-meta-->", metadata)
    .replace("<!--app-html-->", renderToString(<App path={page.path} />));
  const directory = page.file.slice(0, page.file.lastIndexOf("/"));
  if (directory) await mkdir(`dist/${directory}`, { recursive: true });
  await writeFile(`dist/${page.file}`, html);
}
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`,
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? `<url><loc>${escape(origin)}/</loc></url>` : ""}</urlset>`,
);
console.log(
  `Prerendered ${pages.length} pages. ${origin ? `Canonical origin: ${origin}` : "Preview mode: noindex. Set SITE_URL before public deployment."}`,
);
