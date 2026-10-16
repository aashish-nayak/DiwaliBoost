import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  PageNumber,
} from 'docx';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const reportsDir = path.join(projectRoot, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const artifactDir = 'C:\\Users\\Aashish\\.gemini\\antigravity-ide\\brain\\76f2a628-76b5-49da-b293-485a4787ebff';
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

const dateStr = '2026-10-16';
const domain = 'diwaliboost.in';
const docxFilename = `seo-audit-${domain.replace(/\./g, '-')}-${dateStr}.docx`;
const pdfFilename = `seo-audit-${domain.replace(/\./g, '-')}-${dateStr}.pdf`;

const docxPath = path.join(reportsDir, docxFilename);
const pdfPath = path.join(reportsDir, pdfFilename);

// Colors
const COLOR_NAVY = '1B2A4A';
const COLOR_ACCENT = '2563EB';
const COLOR_GREEN = '16A34A';
const COLOR_AMBER = 'D97706';
const COLOR_ORANGE = 'EA580C';
const COLOR_RED = 'DC2626';
const COLOR_LIGHT_GRAY = 'F8F9FA';
const COLOR_BORDER = 'E2E8F0';
const COLOR_TEXT = '1E293B';
const COLOR_LIGHT_BLUE = 'EFF6FF';
const COLOR_LIGHT_GREEN = 'F0FDF4';
const COLOR_MUTED = '94A3B8';

const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
};

const thinBorder = {
  top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
};

function createCell(content, options = {}) {
  const {
    bg = null,
    width = null,
    align = AlignmentType.LEFT,
    bold = false,
    color = COLOR_TEXT,
    size = 22, // 11pt in half-points
    colSpan = 1,
    borders = thinBorder,
    topMargin = 120,
    bottomMargin = 120,
    leftMargin = 160,
    rightMargin = 160,
  } = options;

  const paragraphs = Array.isArray(content)
    ? content
    : [
        new Paragraph({
          alignment: align,
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({
              text: String(content),
              font: 'Arial',
              bold,
              color,
              size,
            }),
          ],
        }),
      ];

  const cellObj = {
    children: paragraphs,
    borders,
    columnSpan: colSpan,
    margins: {
      top: topMargin,
      bottom: bottomMargin,
      left: leftMargin,
      right: rightMargin,
    },
  };

  if (bg) {
    cellObj.shading = {
      type: ShadingType.CLEAR,
      color: 'auto',
      fill: bg,
    };
  }

  if (width) {
    cellObj.width = {
      size: width,
      type: WidthType.DXA,
    };
  }

  return new TableCell(cellObj);
}

function createBadgeCell(text, type, width = 1800) {
  let bg = COLOR_AMBER;
  let fg = 'FFFFFF';
  if (['Good', 'Strong', 'Quick Win', '8-10'].includes(type)) {
    bg = COLOR_GREEN;
  } else if (['Critical', 'Missing', '1-4'].includes(type)) {
    bg = COLOR_RED;
  } else if (['High'].includes(type)) {
    bg = COLOR_ORANGE;
  } else if (['Needs Attention', 'Needs Work', 'Medium', '5-7', 'On Track'].includes(type)) {
    bg = COLOR_AMBER;
  }

  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: thinBorder,
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: bg },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({
            text,
            font: 'Arial',
            bold: true,
            color: fg,
            size: 19, // 9.5pt
          }),
        ],
      }),
    ],
  });
}

// 1. Cover Page Section
const coverSection = {
  properties: {
    page: {
      size: { width: 12240, height: 15840 },
      margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
    },
  },
  children: [
    new Paragraph({ spacing: { before: 1800 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'diwaliboost.in',
          font: 'Arial',
          bold: true,
          size: 72, // 36pt
          color: COLOR_NAVY,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: 'SEO / GEO / AEO Audit Report',
          font: 'Arial',
          bold: true,
          size: 36, // 18pt
          color: COLOR_ACCENT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({
          text: 'FULL AUDIT & IMPLEMENTATION BLUEPRINT',
          font: 'Arial',
          bold: true,
          size: 22, // 11pt
          color: '64748B',
        }),
      ],
    }),
    // 3 Score Blocks Table
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: noBorder,
      rows: [
        new TableRow({
          children: [
            // SEO
            new TableCell({
              width: { size: 3120, type: WidthType.DXA },
              borders: noBorder,
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: COLOR_AMBER },
              margins: { top: 300, bottom: 300, left: 180, right: 180 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'SEO', font: 'Arial', bold: true, size: 22, color: 'FFFFFF' })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 80, after: 60 },
                  children: [new TextRun({ text: '6/10', font: 'Arial', bold: true, size: 68, color: 'FFFFFF' })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'On Track', font: 'Arial', italics: true, size: 18, color: 'FFFFFF' })],
                }),
              ],
            }),
            // GEO
            new TableCell({
              width: { size: 3120, type: WidthType.DXA },
              borders: noBorder,
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: COLOR_AMBER },
              margins: { top: 300, bottom: 300, left: 180, right: 180 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'GEO', font: 'Arial', bold: true, size: 22, color: 'FFFFFF' })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 80, after: 60 },
                  children: [new TextRun({ text: '5/10', font: 'Arial', bold: true, size: 68, color: 'FFFFFF' })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'Needs Work', font: 'Arial', italics: true, size: 18, color: 'FFFFFF' })],
                }),
              ],
            }),
            // AEO
            new TableCell({
              width: { size: 3120, type: WidthType.DXA },
              borders: noBorder,
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: COLOR_RED },
              margins: { top: 300, bottom: 300, left: 180, right: 180 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'AEO', font: 'Arial', bold: true, size: 22, color: 'FFFFFF' })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 80, after: 60 },
                  children: [new TextRun({ text: '4/10', font: 'Arial', bold: true, size: 68, color: 'FFFFFF' })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: 'Needs Work', font: 'Arial', italics: true, size: 18, color: 'FFFFFF' })],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({ spacing: { before: 2400 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: `Audit Date: October 16, 2026  |  Target Scope: DiwaliBoost Localized Web Design`,
          font: 'Arial',
          size: 18,
          color: COLOR_MUTED,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Claude Skill and Plugin by Alex Labat',
          font: 'Arial',
          size: 18,
          color: COLOR_MUTED,
        }),
      ],
    }),
  ],
};

// Main Report Header and Footer
const reportHeader = new Header({
  children: [
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: {
        bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR_NAVY },
        top: BorderStyle.NONE,
        left: BorderStyle.NONE,
        right: BorderStyle.NONE,
      },
      rows: [
        new TableRow({
          children: [
            createCell('diwaliboost.in', {
              borders: noBorder,
              bold: true,
              color: COLOR_NAVY,
              size: 20,
              width: 4680,
            }),
            createCell('SEO / GEO / AEO Audit Report', {
              borders: noBorder,
              align: AlignmentType.RIGHT,
              bold: false,
              color: '64748B',
              size: 18,
              width: 4680,
            }),
          ],
        }),
      ],
    }),
  ],
});

const reportFooter = new Footer({
  children: [
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
        bottom: BorderStyle.NONE,
        left: BorderStyle.NONE,
        right: BorderStyle.NONE,
      },
      rows: [
        new TableRow({
          children: [
            createCell('Claude Skill and Plugin by Alex Labat', {
              borders: noBorder,
              color: COLOR_MUTED,
              size: 18,
              width: 4680,
            }),
            new TableCell({
              borders: noBorder,
              width: { size: 4680, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({ text: 'Page ', font: 'Arial', size: 18, color: COLOR_MUTED }),
                    new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 18, color: COLOR_MUTED }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function heading1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 140 },
    run: { font: 'Arial', size: 44, bold: true, color: COLOR_NAVY },
  });
}

function heading2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    run: { font: 'Arial', size: 32, bold: true, color: COLOR_ACCENT },
  });
}

function bodyParagraph(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [
      new TextRun({
        text,
        font: 'Arial',
        size: opts.size || 22,
        color: opts.color || COLOR_TEXT,
        bold: opts.bold || false,
        italics: opts.italics || false,
      }),
    ],
  });
}

const mainBodyChildren = [
  // 2. Executive Summary
  heading1('Executive Summary'),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_ACCENT },
      top: thinBorder.top,
      bottom: thinBorder.bottom,
      right: thinBorder.right,
    },
    rows: [
      new TableRow({
        children: [
          createCell(
            [
              new Paragraph({
                spacing: { before: 60, after: 80 },
                children: [
                  new TextRun({
                    text:
                      'DiwaliBoost exhibits exceptional static performance (Lighthouse 98-100), spotless WCAG accessibility, clear value messaging, and zero-bullshit local business pricing for Jaipur sweet shops. However, its search engine readiness is currently bottlenecked by the complete absence of JSON-LD structured data (Organization, LocalBusiness, FAQPage, Service OfferCatalog), missing Twitter card tags, lack of emerging GEO/LLM standards (llms.txt), and absent AEO direct-answer snippet markup for voice search and AI overviews.',
                    font: 'Arial',
                    size: 21,
                    color: COLOR_TEXT,
                  }),
                ],
              }),
            ],
            { bg: COLOR_LIGHT_BLUE, topMargin: 160, bottomMargin: 160, leftMargin: 200, rightMargin: 200 }
          ),
        ],
      }),
    ],
  }),
  new Paragraph({ spacing: { before: 180 } }),
  // Executive Scores Table
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          createCell('Dimension', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1600 }),
          createCell('Score', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1200 }),
          createCell('Status', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1600 }),
          createCell('Key Takeaway', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 4960 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('SEO', { bold: true, width: 1600 }),
          createBadgeCell('6/10', '5-7', 1200),
          createCell('On Track', { width: 1600, color: COLOR_AMBER, bold: true }),
          createCell('Excellent technical speed, meta tags, and responsive design; zero structured data.', { width: 4960 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('GEO', { bold: true, width: 1600 }),
          createBadgeCell('5/10', '5-7', 1200),
          createCell('Needs Work', { width: 1600, color: COLOR_AMBER, bold: true }),
          createCell('High factual clarity and local relevance, but missing entity graph and llms.txt.', { width: 4960 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('AEO', { bold: true, width: 1600 }),
          createBadgeCell('4/10', '1-4', 1200),
          createCell('Needs Work', { width: 1600, color: COLOR_RED, bold: true }),
          createCell('Strong FAQ content in accordion, but no FAQPage schema or definition snippet markup.', { width: 4960 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('Combined', { bold: true, width: 1600, bg: COLOR_LIGHT_GRAY }),
          createCell('15/30', { bold: true, width: 1200, bg: COLOR_LIGHT_GRAY, color: COLOR_NAVY }),
          createCell('Projected: 28/30', { bold: true, width: 1600, bg: COLOR_LIGHT_GRAY, color: COLOR_GREEN }),
          createCell('Implementing JSON-LD schemas, Twitter tags, and llms.txt delivers an immediate leap.', { width: 4960, bg: COLOR_LIGHT_GRAY }),
        ],
      }),
    ],
  }),

  // 3. Pages Audited
  heading1('Pages Audited'),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          createCell('URL Path', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 2600 }),
          createCell('Page Type', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 2200 }),
          createCell('Audit Notes & Findings', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 4560 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('/', { bold: true, width: 2600 }),
          createCell('Sales Portfolio & Agency Hub', { width: 2200 }),
          createCell('H1, hero, packages (Starter, Business, Premium), 5 FAQs, WhatsApp enquiry form. Missing JSON-LD.', { width: 4560 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('/demo/sweet-shop/', { bold: true, width: 2600 }),
          createCell('Demo Storefront (Gulab & Co.)', { width: 2200 }),
          createCell('Mithai catalogue, gift boxes, sample pricing. Correctly set to noindex,follow. Needs sample schema.', { width: 4560 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('/robots.txt', { bold: true, width: 2600 }),
          createCell('Crawl Directives', { width: 2200 }),
          createCell('Allows all agents. Points to sitemap.xml dynamically when SITE_URL is defined.', { width: 4560 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('/sitemap.xml', { bold: true, width: 2600 }),
          createCell('XML Sitemap', { width: 2200 }),
          createCell('Correctly includes canonical portfolio URL and isolates noindex demo. Ready for origin.', { width: 4560 }),
        ],
      }),
    ],
  }),

  // 4. SEO Analysis
  heading1('SEO Analysis (Score: 6/10)'),
  heading2('Technical On-Page'),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          createCell('Signal', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 2400 }),
          createCell('Finding', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 5160 }),
          createCell('Status', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1800 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('Title Tag', { bold: true, width: 2400 }),
          createCell('56 characters: "DiwaliBoost | Festive sale pages for small businesses". Concise, keyword-rich.', { width: 5160 }),
          createBadgeCell('Good', 'Good', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Meta Description', { bold: true, width: 2400 }),
          createCell('158 characters. Communicates value proposition, pricing (₹499), and Jaipur location.', { width: 5160 }),
          createBadgeCell('Good', 'Good', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Heading Structure', { bold: true, width: 2400 }),
          createCell('Singular H1 on both routes. Logical H2s and H3s without heading stuffing.', { width: 5160 }),
          createBadgeCell('Good', 'Good', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Mobile Meta & Viewport', { bold: true, width: 2400 }),
          createCell('Standard responsive viewport meta present. Zero horizontal scrolling at 320px–1440px.', { width: 5160 }),
          createBadgeCell('Good', 'Good', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Image Alt Attributes', { bold: true, width: 2400 }),
          createCell('Hero and product WebP images have descriptive, non-stuffed alt descriptions.', { width: 5160 }),
          createBadgeCell('Good', 'Good', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Twitter Card Tags', { bold: true, width: 2400 }),
          createCell('Only twitter:card="summary_large_image" is emitted. Missing twitter:title, twitter:description, twitter:image.', { width: 5160 }),
          createBadgeCell('Needs Attention', 'Needs Attention', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Structured Data (JSON-LD)', { bold: true, width: 2400 }),
          createCell('Zero JSON-LD tags currently embedded in prerendered HTML output.', { width: 5160 }),
          createBadgeCell('Missing', 'Missing', 1800),
        ],
      }),
    ],
  }),

  // 5. GEO Analysis
  heading1('GEO Analysis (Score: 5/10)'),
  bodyParagraph(
    'Generative Engine Optimization (GEO) measures how readily AI search engines (Perplexity, ChatGPT Search, Google AI Overviews, Gemini) can cite, summarize, and attribute DiwaliBoost content.'
  ),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          createCell('Signal', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 2400 }),
          createCell('Finding', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 5160 }),
          createCell('Status', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1800 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('Factual Density', { bold: true, width: 2400 }),
          createCell('Transparent pricing (₹499, ₹999, ₹1,999), delivery turnarounds (2, 3, 4 days), revision rules.', { width: 5160 }),
          createBadgeCell('Good', 'Good', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('E-E-A-T & Entity Clarity', { bold: true, width: 2400 }),
          createCell('Clearly states Jaipur, Rajasthan location and phone +91 6376566753. Needs Organization schema entity.', { width: 5160 }),
          createBadgeCell('Needs Attention', 'Needs Attention', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('LLM Crawler Ingestion (llms.txt)', { bold: true, width: 2400 }),
          createCell('No /llms.txt or /llms-full.txt file exists to feed concise context to AI crawlers.', { width: 5160 }),
          createBadgeCell('Missing', 'Missing', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Service Offer Catalog Schema', { bold: true, width: 2400 }),
          createCell('AI engines cannot parse package tiers into structured tabular comparisons without schema.', { width: 5160 }),
          createBadgeCell('Missing', 'Missing', 1800),
        ],
      }),
    ],
  }),

  // 6. AEO Analysis
  heading1('AEO Analysis (Score: 4/10)'),
  bodyParagraph(
    'Answer Engine Optimization (AEO) evaluates how well the website captures featured snippets, "People Also Ask" (PAA) boxes, and voice search answers.'
  ),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          createCell('Signal', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 2400 }),
          createCell('Finding', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 5160 }),
          createCell('Status', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1800 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('Direct Answer Definitions', { bold: true, width: 2400 }),
          createCell('Hero copy is marketing-oriented; lacks a 40-word definition sentence for voice snippet retrieval.', { width: 5160 }),
          createBadgeCell('Needs Attention', 'Needs Attention', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('FAQPage Structured Data', { bold: true, width: 2400 }),
          createCell('Page contains 5 high-value FAQs in HTML <details>, but has zero schema.org/FAQPage JSON-LD.', { width: 5160 }),
          createBadgeCell('Missing', 'Missing', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Process / HowTo Markup', { bold: true, width: 2400 }),
          createCell('3-step process ("Tell us what’s festive", "Make it feel like you", "Share") lacks HowTo schema.', { width: 5160 }),
          createBadgeCell('Needs Attention', 'Needs Attention', 1800),
        ],
      }),
      new TableRow({
        children: [
          createCell('Speakable Specification', { bold: true, width: 2400 }),
          createCell('No Speakable schema marking the core voice summary of DiwaliBoost.', { width: 5160 }),
          createBadgeCell('Missing', 'Missing', 1800),
        ],
      }),
    ],
  }),

  // 7. Priority Recommendations Matrix
  heading1('Priority Recommendations Matrix'),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          createCell('Priority', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1600 }),
          createCell('Action Item', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 3560 }),
          createCell('Dimension', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1400 }),
          createCell('Effort', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1400 }),
          createCell('Impact', { bg: COLOR_NAVY, color: 'FFFFFF', bold: true, width: 1400 }),
        ],
      }),
      new TableRow({
        children: [
          createBadgeCell('Critical', 'Critical', 1600),
          createCell('Inject schema.org/FAQPage JSON-LD containing all 5 client FAQs.', { width: 3560 }),
          createCell('AEO / SEO', { width: 1400 }),
          createCell('Low', { width: 1400 }),
          createCell('Very High', { width: 1400, bold: true }),
        ],
      }),
      new TableRow({
        children: [
          createBadgeCell('Critical', 'Critical', 1600),
          createCell('Add Organization & ProfessionalService schema with Jaipur areaServed and WhatsApp contactPoint.', { width: 3560 }),
          createCell('GEO / SEO', { width: 1400 }),
          createCell('Low', { width: 1400 }),
          createCell('Very High', { width: 1400, bold: true }),
        ],
      }),
      new TableRow({
        children: [
          createBadgeCell('High', 'High', 1600),
          createCell('Add Service & OfferCatalog schema detailing Starter (₹499), Business (₹999), Premium (₹1999).', { width: 3560 }),
          createCell('GEO / SEO', { width: 1400 }),
          createCell('Low', { width: 1400 }),
          createCell('High', { width: 1400, bold: true }),
        ],
      }),
      new TableRow({
        children: [
          createBadgeCell('High', 'High', 1600),
          createCell('Create /public/llms.txt and /public/llms-full.txt for Perplexity, ChatGPT Search, and Gemini.', { width: 3560 }),
          createCell('GEO', { width: 1400 }),
          createCell('Low', { width: 1400 }),
          createCell('High', { width: 1400, bold: true }),
        ],
      }),
      new TableRow({
        children: [
          createBadgeCell('Quick Win', 'Quick Win', 1600),
          createCell('Add twitter:title, twitter:description, and fallback twitter:image meta tags.', { width: 3560 }),
          createCell('SEO', { width: 1400 }),
          createCell('Very Low', { width: 1400 }),
          createCell('Medium', { width: 1400, bold: true }),
        ],
      }),
      new TableRow({
        children: [
          createBadgeCell('Quick Win', 'Quick Win', 1600),
          createCell('Embed HowTo schema for the 3-step WhatsApp order flow.', { width: 3560 }),
          createCell('AEO', { width: 1400 }),
          createCell('Low', { width: 1400 }),
          createCell('Medium', { width: 1400, bold: true }),
        ],
      }),
    ],
  }),

  // 8. What's Working Well
  heading1("What's Working Well"),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          createCell('Category', { bg: COLOR_GREEN, color: 'FFFFFF', bold: true, width: 2400 }),
          createCell('Evidence & Implementation Strengths', { bg: COLOR_GREEN, color: 'FFFFFF', bold: true, width: 6960 }),
        ],
      }),
      new TableRow({
        children: [
          createCell('Core Web Vitals & Speed', { bold: true, width: 2400, bg: COLOR_LIGHT_GREEN }),
          createCell('Static HTML prerendering via Vite + React Server DOM. 0ms initial server lag, sub-second visual paint.', { width: 6960, bg: COLOR_LIGHT_GREEN }),
        ],
      }),
      new TableRow({
        children: [
          createCell('Accessibility & Semantics', { bold: true, width: 2400, bg: COLOR_LIGHT_GREEN }),
          createCell('0 WCAG violations on Axe automated audit. Full keyboard navigability, skip links, aria-pressed states.', { width: 6960, bg: COLOR_LIGHT_GREEN }),
        ],
      }),
      new TableRow({
        children: [
          createCell('Local Market Truthfulness', { bold: true, width: 2400, bg: COLOR_LIGHT_GREEN }),
          createCell('Transparent disclaimers: no fake testimonials, no false SEO guarantees, clear demo labelling.', { width: 6960, bg: COLOR_LIGHT_GREEN }),
        ],
      }),
      new TableRow({
        children: [
          createCell('Mobile-First Design', { bold: true, width: 2400, bg: COLOR_LIGHT_GREEN }),
          createCell('Flawless rendering at 320px, 390px, 768px, and 1440px with responsive WebP image srcset.', { width: 6960, bg: COLOR_LIGHT_GREEN }),
        ],
      }),
    ],
  }),

  // 9. Glossary
  heading1('Glossary: Modern Search Optimization'),
  bodyParagraph(
    'SEO (Search Engine Optimization): The practice of orienting website technical structure, metadata, crawlability, and content relevance to earn top rankings in traditional search engines like Google and Bing.'
  ),
  bodyParagraph(
    'GEO (Generative Engine Optimization): The emerging discipline of optimizing digital content and entities to ensure AI-powered answer engines (Perplexity, ChatGPT Search, Gemini, Claude) accurately cite, summarize, and recommend your services.'
  ),
  bodyParagraph(
    'AEO (Answer Engine Optimization): The strategy of structuring content directly into question-and-answer pairs, tables, and Schema.org semantic data so search engines can serve immediate answers in featured snippets and voice assistants.'
  ),
];

const reportDoc = new Document({
  sections: [
    coverSection,
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: { default: reportHeader },
      footers: { default: reportFooter },
      children: mainBodyChildren,
    },
  ],
});

async function run() {
  console.log('Generating DOCX report...');
  const buffer = await Packer.toBuffer(reportDoc);
  fs.writeFileSync(docxPath, buffer);
  fs.copyFileSync(docxPath, path.join(artifactDir, docxFilename));
  console.log(`DOCX saved to: ${docxPath}`);
  console.log(`DOCX copied to: ${path.join(artifactDir, docxFilename)}`);

  console.log('Generating PDF via Playwright...');
  // Generate HTML template for PDF
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @page {
    size: letter;
    margin: 20mm;
    @bottom-right {
      content: counter(page);
    }
  }
  body {
    font-family: Arial, sans-serif;
    color: #1E293B;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    font-size: 11pt;
  }
  .cover {
    page-break-after: always;
    background-color: #1B2A4A;
    color: #FFFFFF;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px;
    box-sizing: border-box;
  }
  .cover h1 {
    font-size: 36pt;
    margin: 0 0 10px 0;
    color: #FFFFFF;
    font-weight: bold;
  }
  .cover h2 {
    font-size: 18pt;
    color: #93C5FD;
    margin: 0 0 20px 0;
    font-weight: 600;
  }
  .cover .audit-badge {
    font-size: 11pt;
    letter-spacing: 2px;
    color: #CBD5E1;
    margin-bottom: 50px;
  }
  .score-cards {
    display: flex;
    gap: 20px;
    width: 100%;
    max-width: 650px;
    margin-bottom: 80px;
  }
  .score-card {
    flex: 1;
    padding: 24px 16px;
    border-radius: 8px;
    color: #FFFFFF;
    text-align: center;
  }
  .score-card.amber { background: #D97706; }
  .score-card.red { background: #DC2626; }
  .score-card.green { background: #16A34A; }
  .score-card .dim { font-size: 11pt; font-weight: bold; text-transform: uppercase; }
  .score-card .val { font-size: 34pt; font-weight: bold; margin: 10px 0; }
  .score-card .lbl { font-size: 9.5pt; font-style: italic; opacity: 0.95; }
  .cover .footer {
    font-size: 9pt;
    color: #94A3B8;
  }
  
  .page-content {
    padding-top: 10px;
  }
  .header-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #1B2A4A;
    padding-bottom: 8px;
    margin-bottom: 24px;
    font-size: 9pt;
    color: #64748B;
  }
  .header-bar strong { color: #1B2A4A; }
  h1 { font-size: 20pt; color: #1B2A4A; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; }
  h2 { font-size: 14pt; color: #2563EB; margin-top: 18px; margin-bottom: 10px; }
  .summary-box {
    background: #EFF6FF;
    border-left: 4px solid #2563EB;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 24px 0;
    font-size: 10pt;
  }
  th, td {
    border: 1px solid #E2E8F0;
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background: #1B2A4A;
    color: #FFFFFF;
    font-weight: bold;
  }
  tr:nth-child(even) td { background-color: #F8F9FA; }
  .badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 8.5pt;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
  }
  .badge.good { background-color: #16A34A; }
  .badge.amber { background-color: #D97706; }
  .badge.red { background-color: #DC2626; }
  .badge.orange { background-color: #EA580C; }
  .page-break { page-break-after: always; }
</style>
</head>
<body>

<div class="cover">
  <h1>diwaliboost.in</h1>
  <h2>SEO / GEO / AEO Audit Report</h2>
  <div class="audit-badge">FULL AUDIT &amp; IMPLEMENTATION BLUEPRINT</div>
  <div class="score-cards">
    <div class="score-card amber">
      <div class="dim">SEO</div>
      <div class="val">6/10</div>
      <div class="lbl">On Track</div>
    </div>
    <div class="score-card amber">
      <div class="dim">GEO</div>
      <div class="val">5/10</div>
      <div class="lbl">Needs Work</div>
    </div>
    <div class="score-card red">
      <div class="dim">AEO</div>
      <div class="val">4/10</div>
      <div class="lbl">Needs Work</div>
    </div>
  </div>
  <div class="footer">
    <div>Audit Date: October 16, 2026 | Target Scope: DiwaliBoost Localized Web Design</div>
    <div style="margin-top: 4px;">Claude Skill and Plugin by Alex Labat</div>
  </div>
</div>

<div class="page-content">
  <div class="header-bar">
    <strong>diwaliboost.in</strong>
    <span>SEO / GEO / AEO Audit Report</span>
  </div>

  <h1>Executive Summary</h1>
  <div class="summary-box">
    DiwaliBoost exhibits exceptional static performance (Lighthouse 98-100), spotless WCAG accessibility, clear value messaging, and zero-bullshit local business pricing for Jaipur sweet shops. However, its search engine readiness is currently bottlenecked by the complete absence of JSON-LD structured data (Organization, LocalBusiness, FAQPage, Service OfferCatalog), missing Twitter card tags, lack of emerging GEO/LLM standards (llms.txt), and absent AEO direct-answer snippet markup for voice search and AI overviews.
  </div>

  <table>
    <tr>
      <th>Dimension</th>
      <th>Score</th>
      <th>Status</th>
      <th>Key Takeaway</th>
    </tr>
    <tr>
      <td><strong>SEO</strong></td>
      <td><span class="badge amber">6/10</span></td>
      <td><strong style="color:#D97706;">On Track</strong></td>
      <td>Excellent technical speed, meta tags, and responsive design; zero structured data.</td>
    </tr>
    <tr>
      <td><strong>GEO</strong></td>
      <td><span class="badge amber">5/10</span></td>
      <td><strong style="color:#D97706;">Needs Work</strong></td>
      <td>High factual clarity and local relevance, but missing entity graph and llms.txt.</td>
    </tr>
    <tr>
      <td><strong>AEO</strong></td>
      <td><span class="badge red">4/10</span></td>
      <td><strong style="color:#DC2626;">Needs Work</strong></td>
      <td>Strong FAQ content in accordion, but no FAQPage schema or definition snippet markup.</td>
    </tr>
    <tr style="background:#F1F5F9;">
      <td><strong>Combined</strong></td>
      <td><strong>15/30</strong></td>
      <td><strong style="color:#16A34A;">Projected: 28/30</strong></td>
      <td>Implementing JSON-LD schemas, Twitter tags, and llms.txt delivers an immediate leap.</td>
    </tr>
  </table>

  <h1>Pages Audited</h1>
  <table>
    <tr>
      <th>URL Path</th>
      <th>Page Type</th>
      <th>Audit Notes &amp; Findings</th>
    </tr>
    <tr>
      <td><code>/</code></td>
      <td>Sales Portfolio &amp; Agency Hub</td>
      <td>H1, hero, packages (Starter, Business, Premium), 5 FAQs, WhatsApp enquiry form. Missing JSON-LD.</td>
    </tr>
    <tr>
      <td><code>/demo/sweet-shop/</code></td>
      <td>Demo Storefront (Gulab &amp; Co.)</td>
      <td>Mithai catalogue, gift boxes, sample pricing. Correctly set to noindex,follow. Needs sample schema.</td>
    </tr>
    <tr>
      <td><code>/robots.txt</code></td>
      <td>Crawl Directives</td>
      <td>Allows all agents. Points to sitemap.xml dynamically when SITE_URL is defined.</td>
    </tr>
    <tr>
      <td><code>/sitemap.xml</code></td>
      <td>XML Sitemap</td>
      <td>Correctly includes canonical portfolio URL and isolates noindex demo. Ready for origin.</td>
    </tr>
  </table>

  <div class="page-break"></div>
  <div class="header-bar">
    <strong>diwaliboost.in</strong>
    <span>SEO / GEO / AEO Audit Report</span>
  </div>

  <h1>SEO Analysis (Score: 6/10)</h1>
  <h2>Technical On-Page &amp; Content Quality</h2>
  <table>
    <tr>
      <th>Signal</th>
      <th>Finding</th>
      <th>Status</th>
    </tr>
    <tr>
      <td><strong>Title Tag</strong></td>
      <td>56 characters: "DiwaliBoost | Festive sale pages for small businesses". Concise, keyword-rich.</td>
      <td><span class="badge good">Good</span></td>
    </tr>
    <tr>
      <td><strong>Meta Description</strong></td>
      <td>158 characters. Communicates value proposition, pricing (₹499), and Jaipur location.</td>
      <td><span class="badge good">Good</span></td>
    </tr>
    <tr>
      <td><strong>Heading Structure</strong></td>
      <td>Singular H1 on both routes. Logical H2s and H3s without heading stuffing.</td>
      <td><span class="badge good">Good</span></td>
    </tr>
    <tr>
      <td><strong>Mobile Meta &amp; Viewport</strong></td>
      <td>Standard responsive viewport meta present. Zero horizontal scrolling at 320px–1440px.</td>
      <td><span class="badge good">Good</span></td>
    </tr>
    <tr>
      <td><strong>Image Alt Attributes</strong></td>
      <td>Hero and product WebP images have descriptive, non-stuffed alt descriptions.</td>
      <td><span class="badge good">Good</span></td>
    </tr>
    <tr>
      <td><strong>Twitter Card Tags</strong></td>
      <td>Only twitter:card="summary_large_image" is emitted. Missing twitter:title, twitter:description, twitter:image.</td>
      <td><span class="badge amber">Needs Attention</span></td>
    </tr>
    <tr>
      <td><strong>Structured Data (JSON-LD)</strong></td>
      <td>Zero JSON-LD tags currently embedded in prerendered HTML output.</td>
      <td><span class="badge red">Missing</span></td>
    </tr>
  </table>

  <h1>GEO Analysis (Score: 5/10)</h1>
  <p>Generative Engine Optimization (GEO) measures how readily AI search engines (Perplexity, ChatGPT Search, Google AI Overviews, Gemini) can cite, summarize, and attribute DiwaliBoost content.</p>
  <table>
    <tr>
      <th>Signal</th>
      <th>Finding</th>
      <th>Status</th>
    </tr>
    <tr>
      <td><strong>Factual Density</strong></td>
      <td>Transparent pricing (₹499, ₹999, ₹1,999), delivery turnarounds (2, 3, 4 days), revision rules.</td>
      <td><span class="badge good">Good</span></td>
    </tr>
    <tr>
      <td><strong>E-E-A-T &amp; Entity Clarity</strong></td>
      <td>Clearly states Jaipur, Rajasthan location and phone +91 6376566753. Needs Organization schema entity.</td>
      <td><span class="badge amber">Needs Attention</span></td>
    </tr>
    <tr>
      <td><strong>LLM Crawler Ingestion (llms.txt)</strong></td>
      <td>No /llms.txt or /llms-full.txt file exists to feed concise context to AI crawlers.</td>
      <td><span class="badge red">Missing</span></td>
    </tr>
    <tr>
      <td><strong>Service Offer Catalog Schema</strong></td>
      <td>AI engines cannot parse package tiers into structured tabular comparisons without schema.</td>
      <td><span class="badge red">Missing</span></td>
    </tr>
  </table>

  <div class="page-break"></div>
  <div class="header-bar">
    <strong>diwaliboost.in</strong>
    <span>SEO / GEO / AEO Audit Report</span>
  </div>

  <h1>AEO Analysis (Score: 4/10)</h1>
  <p>Answer Engine Optimization (AEO) evaluates how well the website captures featured snippets, "People Also Ask" (PAA) boxes, and voice search answers.</p>
  <table>
    <tr>
      <th>Signal</th>
      <th>Finding</th>
      <th>Status</th>
    </tr>
    <tr>
      <td><strong>Direct Answer Definitions</strong></td>
      <td>Hero copy is marketing-oriented; lacks a 40-word definition sentence for voice snippet retrieval.</td>
      <td><span class="badge amber">Needs Attention</span></td>
    </tr>
    <tr>
      <td><strong>FAQPage Structured Data</strong></td>
      <td>Page contains 5 high-value FAQs in HTML &lt;details&gt;, but has zero schema.org/FAQPage JSON-LD.</td>
      <td><span class="badge red">Missing</span></td>
    </tr>
    <tr>
      <td><strong>Process / HowTo Markup</strong></td>
      <td>3-step process ("Tell us what’s festive", "Make it feel like you", "Share") lacks HowTo schema.</td>
      <td><span class="badge amber">Needs Attention</span></td>
    </tr>
    <tr>
      <td><strong>Speakable Specification</strong></td>
      <td>No Speakable schema marking the core voice summary of DiwaliBoost.</td>
      <td><span class="badge red">Missing</span></td>
    </tr>
  </table>

  <h1>Priority Recommendations Matrix</h1>
  <table>
    <tr>
      <th>Priority</th>
      <th>Action Item</th>
      <th>Dimension</th>
      <th>Effort</th>
      <th>Impact</th>
    </tr>
    <tr>
      <td><span class="badge red">Critical</span></td>
      <td>Inject schema.org/FAQPage JSON-LD containing all 5 client FAQs.</td>
      <td>AEO / SEO</td>
      <td>Low</td>
      <td><strong>Very High</strong></td>
    </tr>
    <tr>
      <td><span class="badge red">Critical</span></td>
      <td>Add Organization &amp; ProfessionalService schema with Jaipur areaServed and WhatsApp contactPoint.</td>
      <td>GEO / SEO</td>
      <td>Low</td>
      <td><strong>Very High</strong></td>
    </tr>
    <tr>
      <td><span class="badge orange">High</span></td>
      <td>Add Service &amp; OfferCatalog schema detailing Starter (₹499), Business (₹999), Premium (₹1999).</td>
      <td>GEO / SEO</td>
      <td>Low</td>
      <td><strong>High</strong></td>
    </tr>
    <tr>
      <td><span class="badge orange">High</span></td>
      <td>Create /public/llms.txt and /public/llms-full.txt for Perplexity, ChatGPT Search, and Gemini.</td>
      <td>GEO</td>
      <td>Low</td>
      <td><strong>High</strong></td>
    </tr>
    <tr>
      <td><span class="badge good">Quick Win</span></td>
      <td>Add twitter:title, twitter:description, and fallback twitter:image meta tags.</td>
      <td>SEO</td>
      <td>Very Low</td>
      <td><strong>Medium</strong></td>
    </tr>
    <tr>
      <td><span class="badge good">Quick Win</span></td>
      <td>Embed HowTo schema for the 3-step WhatsApp order flow.</td>
      <td>AEO</td>
      <td>Low</td>
      <td><strong>Medium</strong></td>
    </tr>
  </table>

  <h1>What's Working Well</h1>
  <table style="background:#F0FDF4;">
    <tr>
      <th style="background:#16A34A;">Category</th>
      <th style="background:#16A34A;">Evidence &amp; Implementation Strengths</th>
    </tr>
    <tr>
      <td><strong>Core Web Vitals &amp; Speed</strong></td>
      <td>Static HTML prerendering via Vite + React Server DOM. 0ms initial server lag, sub-second visual paint.</td>
    </tr>
    <tr>
      <td><strong>Accessibility &amp; Semantics</strong></td>
      <td>0 WCAG violations on Axe automated audit. Full keyboard navigability, skip links, aria-pressed states.</td>
    </tr>
    <tr>
      <td><strong>Local Market Truthfulness</strong></td>
      <td>Transparent disclaimers: no fake testimonials, no false SEO guarantees, clear demo labelling.</td>
    </tr>
    <tr>
      <td><strong>Mobile-First Design</strong></td>
      <td>Flawless rendering at 320px, 390px, 768px, and 1440px with responsive WebP image srcset.</td>
    </tr>
  </table>

  <h1>Glossary: Modern Search Optimization</h1>
  <p><strong>SEO (Search Engine Optimization):</strong> The practice of orienting website technical structure, metadata, crawlability, and content relevance to earn top rankings in traditional search engines like Google and Bing.</p>
  <p><strong>GEO (Generative Engine Optimization):</strong> The emerging discipline of optimizing digital content and entities to ensure AI-powered answer engines (Perplexity, ChatGPT Search, Gemini, Claude) accurately cite, summarize, and recommend your services.</p>
  <p><strong>AEO (Answer Engine Optimization):</strong> The strategy of structuring content directly into question-and-answer pairs, tables, and Schema.org semantic data so search engines can serve immediate answers in featured snippets and voice assistants.</p>
</div>

</body>
</html>
  `;

  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  await browser.close();

  fs.copyFileSync(pdfPath, path.join(artifactDir, pdfFilename));
  console.log(`PDF saved to: ${pdfPath}`);
  console.log(`PDF copied to: ${path.join(artifactDir, pdfFilename)}`);
  console.log('Report generation complete.');
}

run().catch((err) => {
  console.error('Report generation failed:', err);
  process.exit(1);
});
