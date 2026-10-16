import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeIndianPhone,
  productMessage,
  rupees,
  serviceMessage,
  whatsappUrl,
} from "../src/lib/whatsapp";
import { sweetShop } from "../src/data/business";

test("normalizes local and international Indian mobile formats", () => {
  for (const input of [
    "6376566753",
    "+91 63765 66753",
    "916376566753",
    "+91 (63765) 66753",
  ])
    assert.equal(normalizeIndianPhone(input), "916376566753");
});
test("rejects malformed, short, overseas, landline and injected phone numbers", () => {
  for (const input of [
    "",
    "1234",
    "5062182162",
    "+1 202 555 0123",
    "6376566753?text=bad",
    "91+91+6376566753",
    "637+6566753",
    "06376566753",
    "abcdef",
  ])
    assert.throws(() => normalizeIndianPhone(input));
});
test("encodes Hindi, ampersands, newlines and currency as one message", () => {
  const message = "नमस्ते! Kaju & Pista\n₹549 / 500 g? #gift + delivery";
  const url = new URL(whatsappUrl("6376566753", message));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/916376566753");
  assert.equal(url.searchParams.get("text"), message);
  assert.equal([...url.searchParams].length, 1);
});
test("requires a non-empty enquiry", () =>
  assert.throws(() => whatsappUrl("6376566753", "  ")));
test("every demo product supplies its name, pack, effective price and demo disclaimer", () => {
  for (const product of sweetShop.products) {
    const message = productMessage(sweetShop, product);
    assert.ok(message.includes(product.name));
    assert.ok(message.includes(product.unit));
    assert.ok(message.includes(rupees(product.salePrice ?? product.price)));
    assert.ok(message.includes("not a real food order"));
  }
});
test("real-business configuration uses order enquiry copy without a demo claim", () => {
  const message = productMessage(
    { ...sweetShop, demo: false },
    sweetShop.products[0],
  );
  assert.ok(message.startsWith(`Hello ${sweetShop.name}!`));
  assert.ok(message.includes("confirm availability"));
  assert.ok(!message.includes("DEMO"));
});
test("form message preserves user content and trims surrounding whitespace", () => {
  const message = serviceMessage({
    name: "  Aashish  ",
    business: "मिठाई & Co.",
    package: "Business",
    details: "  Need 12 products  ",
  });
  assert.ok(message.includes("Name: Aashish\n"));
  assert.ok(message.includes("Business: मिठाई & Co."));
  assert.ok(message.includes("Details: Need 12 products"));
});
