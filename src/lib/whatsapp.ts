import type { Business, Product } from "../data/business";

export function normalizeIndianPhone(input: string): string {
  if (!/^\+?[\d\s()-]+$/.test(input))
    throw new Error("Enter a valid Indian mobile number.");
  const digits = input.replace(/\D/g, "");
  const local =
    digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (!/^[6-9]\d{9}$/.test(local))
    throw new Error(
      "Enter a 10-digit Indian mobile number, optionally prefixed with +91.",
    );
  return `91${local}`;
}

export const rupees = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export function whatsappUrl(phone: string, message: string): string {
  if (!message.trim()) throw new Error("An enquiry message is required.");
  return `https://wa.me/${normalizeIndianPhone(phone)}?text=${encodeURIComponent(message.trim())}`;
}

export function productMessage(business: Business, product: Product): string {
  return [
    business.demo
      ? "DEMO ENQUIRY to DiwaliBoost (not a real food order)."
      : `Hello ${business.name}!`,
    `I am interested in ${product.name} (${product.hindiName}).`,
    `Pack: ${product.unit}. ${business.demo ? "Sample price" : "Listed price"}: ${rupees(product.salePrice ?? product.price)}.`,
    business.demo
      ? `I saw the ${business.name} sample page and would like a similar page for my business.`
      : "Please confirm availability, final price and pickup/delivery options.",
  ].join("\n");
}

export function serviceMessage(fields: {
  name: string;
  business: string;
  package: string;
  details: string;
}): string {
  return `Hello DiwaliBoost! I'd like a festive sale page.\nName: ${fields.name.trim()}\nBusiness: ${fields.business.trim()}\nPackage: ${fields.package}\n${fields.details.trim() ? `Details: ${fields.details.trim()}` : "Please help me choose the next steps."}`;
}
