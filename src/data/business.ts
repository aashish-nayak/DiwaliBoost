export type Product = {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  price: number;
  salePrice?: number;
  unit: string;
  category: "Classics" | "Gift boxes";
  image: string;
  badge?: string;
};

export type Business = {
  name: string;
  hindiName: string;
  initials: string;
  logo?: string;
  headline: string;
  description: string;
  phone: string;
  accent: string;
  background: string;
  heroImage: string;
  heroSrcSet?: string;
  gift: { image: string; headline: string; description: string };
  address?: string;
  hours: string;
  fulfillment: string;
  demo: boolean;
  products: Product[];
};

export const service = {
  name: "DiwaliBoost",
  phone: "+91 7062182162",
  location: "Jaipur, Rajasthan",
};

export const sweetShop: Business = {
  name: "Gulab & Co.",
  hindiName: "गुलाब मिठाई",
  initials: "G",
  headline: "A little sweetness. A lot of celebration.",
  description:
    "Celebrate the people who make life sweeter, with a festive collection of mithai and thoughtfully packed gift boxes.",
  phone: service.phone,
  accent: "#124d3e",
  background: "#fcf8ef",
  heroImage: "/images/mithai-hero.webp",
  heroSrcSet:
    "/images/mithai-hero-640.webp 640w, /images/mithai-hero-960.webp 960w, /images/mithai-hero.webp 1200w",
  gift: {
    image: "/images/celebration-box.webp",
    headline: "For every person on your festive list.",
    description:
      "A thank-you for your team. A little love for family. A thoughtful hello to your neighbours. A box of mithai says it beautifully.",
  },
  hours: "Sample hours: 9 am to 9 pm, every day",
  fulfillment:
    "Sample service: shop pickup and local delivery, subject to confirmation.",
  demo: true,
  products: [
    {
      id: "kaju-katli",
      name: "Kaju Katli",
      hindiName: "काजू कतली",
      description: "Delicate cashew diamonds, finished with a touch of silver.",
      price: 650,
      salePrice: 549,
      unit: "500 g",
      category: "Classics",
      image: "/images/kaju-katli.webp",
      badge: "Festive offer",
    },
    {
      id: "motichoor-ladoo",
      name: "Motichoor Ladoo",
      hindiName: "मोतीचूर लड्डू",
      description:
        "Golden little celebrations with a fragrant cardamom finish.",
      price: 380,
      salePrice: 329,
      unit: "500 g",
      category: "Classics",
      image: "/images/motichoor-ladoo.webp",
    },
    {
      id: "pista-barfi",
      name: "Pista Barfi",
      hindiName: "पिस्ता बर्फी",
      description: "Rich pistachio squares for your festive table.",
      price: 590,
      unit: "500 g",
      category: "Classics",
      image: "/images/pista-barfi.webp",
    },
    {
      id: "gulab-jamun",
      name: "Gulab Jamun",
      hindiName: "गुलाब जामुन",
      description: "Soft, syrup-soaked favourites made for sharing.",
      price: 280,
      unit: "6 pieces",
      category: "Classics",
      image: "/images/gulab-jamun.webp",
    },
    {
      id: "kesar-peda",
      name: "Kesar Peda",
      hindiName: "केसर पेड़ा",
      description: "A comforting milk sweet with delicate saffron notes.",
      price: 420,
      unit: "500 g",
      category: "Classics",
      image: "/images/kesar-peda.webp",
    },
    {
      id: "celebration-box",
      name: "The Celebration Box",
      hindiName: "मिठास का उपहार",
      description: "A little of everything, wrapped for someone special.",
      price: 1199,
      salePrice: 999,
      unit: "1 kg assortment",
      category: "Gift boxes",
      image: "/images/celebration-box.webp",
      badge: "Ready to gift",
    },
  ],
};

export const packages = [
  {
    name: "Starter",
    price: 499,
    summary: "A lovely first step online.",
    products: 6,
    revisions: 1,
    days: 2,
    features: [
      "Your logo, colours & contact details",
      "Up to 6 products with WhatsApp enquiries",
      "Mobile-friendly template page",
      "Page title & social-sharing preview",
    ],
  },
  {
    name: "Business",
    price: 999,
    summary: "More room for your festive range.",
    products: 12,
    revisions: 2,
    days: 3,
    features: [
      "Everything in Starter",
      "Up to 12 products & an offers section",
      "Hours, address & pickup/delivery details",
      "A dedicated festive gift section",
    ],
  },
  {
    name: "Premium",
    price: 1999,
    summary: "A little more personal, everywhere.",
    products: 20,
    revisions: 2,
    days: 4,
    features: [
      "Everything in Business",
      "Up to 20 products",
      "Hindi & English content placement",
      "Extra visual customisation",
      "Connect your own domain",
    ],
  },
] as const;
