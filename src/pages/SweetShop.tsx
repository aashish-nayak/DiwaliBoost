import { useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  FlowerLotus,
  Gift,
  MapPin,
  Package,
} from "@phosphor-icons/react";
import type { Business, Product } from "../data/business";
import { productMessage, rupees } from "../lib/whatsapp";
import { WhatsAppLink } from "../components/Shared";
import { ThemeControls } from "../components/ThemeControls";

function ProductCard({
  business,
  product,
}: {
  business: Business;
  product: Product;
}) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={`${product.name}${business.demo ? ", illustrative sample presentation" : ""}`}
        width="512"
        height="512"
        loading="lazy"
      />
      <div className="product-info">
        <div className="product-title">
          <h3>{product.name}</h3>
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
        </div>
        <p className="product-hindi" lang="hi">
          {product.hindiName}
        </p>
        <p>{product.description}</p>
        <div className="product-price">
          <strong>{rupees(product.salePrice ?? product.price)}</strong>
          {product.salePrice !== undefined && (
            <del>{rupees(product.price)}</del>
          )}
          <span>/ {product.unit}</span>
        </div>
        <WhatsAppLink
          phone={business.phone}
          className="button button-outline"
          message={productMessage(business, product)}
        >
          {business.demo ? "Try sample enquiry" : "Enquire on WhatsApp"}
        </WhatsAppLink>
      </div>
    </article>
  );
}

export function SweetShop({ business }: { business: Business }) {
  const [category, setCategory] = useState("All sweets");
  const products = business.products.filter(
    (product) =>
      category === "All sweets" ||
      category === product.category ||
      (category === "Festive offers" && product.salePrice !== undefined),
  );
  const generalMessage = business.demo
    ? `DEMO ENQUIRY to DiwaliBoost: I saw the ${business.name} sample page and would like a similar page for my business. This is not a real food order.`
    : `Hello ${business.name}! I'd like to enquire about your festive collection.`;
  return (
    <div
      className="shop"
      style={
        {
          "--shop-accent": business.accent,
          "--shop-background": business.background,
        } as CSSProperties
      }
    >
      {business.demo && (
        <div className="demo-notice">
          <a href="/">
            <ArrowLeft size={15} />
            Back to DiwaliBoost
          </a>
          <span>
            Fictional shop · Sample prices & AI imagery · No food orders
          </span>
        </div>
      )}
      <header className="site-header wrap">
        <a className="shop-brand" href="#main">
          {business.logo ? (
            <img src={business.logo} alt="" width="42" height="42" />
          ) : (
            <span className="shop-monogram">{business.initials}</span>
          )}
          <span>
            {business.name}
            <small lang="hi">{business.hindiName}</small>
          </span>
        </a>
        <nav aria-label="Shop navigation">
          <a href="#collection">The collection</a>
          <a href="#gifting">Festive gifting</a>
          <a href="#visit">Details</a>
        </nav>
        <div className="header-actions">
          <ThemeControls />
          <a className="button button-small shop-header-cta" href="#collection">
            Explore sweets
            <ArrowUpRight size={16} />
          </a>
        </div>
      </header>
      <main id="main">
        <nav className="shop-categories wrap" aria-label="Browse sweets">
          {[
            { name: "All sweets", image: business.products[0]?.image },
            { name: "Classics", image: business.products[1]?.image },
            { name: "Gift boxes", image: business.gift.image },
            { name: "Festive offers", image: business.products[2]?.image },
          ].map((item) => (
            <a
              key={item.name}
              href="#collection"
              onClick={() => setCategory(item.name)}
            >
              <img src={item.image} alt="" width="72" height="72" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        <section className="hero shop-hero wrap">
          <div className="hero-copy">
            <FlowerLotus
              className="hero-flower"
              size={38}
              weight="duotone"
              aria-hidden="true"
            />
            <h1>{business.headline}</h1>
            <p className="hero-description">{business.description}</p>
            <a className="button" href="#collection">
              Discover the collection
              <ArrowUpRight size={19} />
            </a>
            <p className="hindi-line" lang="hi">
              इस दिवाली, खुशियाँ बाँटिए।
            </p>
            {business.demo && (
              <p className="demo-copy">
                A sample storefront designed by DiwaliBoost. All products and
                offers are illustrative.
              </p>
            )}
          </div>
          <div className="shop-hero-image">
            <img
              src={business.heroImage}
              srcSet={business.heroSrcSet}
              sizes="(max-width: 767px) 100vw, 50vw"
              alt="Festive mithai gift box styled with marigolds and a diya"
              width="1200"
              height="800"
              fetchPriority="high"
            />
          </div>
        </section>
        <section className="section wrap" id="collection">
          <div className="collection-heading">
            <FlowerLotus size={25} weight="duotone" aria-hidden="true" />
            <h2>A box full of happy moments.</h2>
            <FlowerLotus size={25} weight="duotone" aria-hidden="true" />
          </div>
          <p className="collection-description">
            From familiar favourites to festive gifts, find a little sweetness
            to share.{business.demo && " All prices below are samples."}
          </p>
          <div
            className="filters"
            role="group"
            aria-label="Filter the collection"
          >
            {["All sweets", "Classics", "Gift boxes", "Festive offers"].map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  className={category === filter ? "active" : ""}
                  aria-pressed={category === filter}
                  onClick={() => setCategory(filter)}
                >
                  {filter}
                </button>
              ),
            )}
          </div>
          <p className="sr-only" role="status">
            {products.length} products shown
          </p>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                business={business}
              />
            ))}
          </div>
        </section>
        <section className="section wrap" id="gifting">
          <div className="gift-feature">
            <img
              src={business.gift.image}
              alt={
                business.demo
                  ? "Sample festive gift box with assorted Indian sweets"
                  : "Festive gift collection"
              }
              width="512"
              height="512"
              loading="lazy"
            />
            <div>
              <Gift className="gift-symbol" size={32} aria-hidden="true" />
              <h2>{business.gift.headline}</h2>
              <p>{business.gift.description}</p>
              <WhatsAppLink phone={business.phone} message={generalMessage}>
                {business.demo
                  ? "Ask about a page like this"
                  : "Ask about gift boxes"}
              </WhatsAppLink>
              {business.demo && (
                <small className="demo-copy">
                  Demo enquiries go to DiwaliBoost, not a sweet shop.
                </small>
              )}
            </div>
          </div>
        </section>
        <section className="section wrap shop-details" id="visit">
          <div>
            <h2>
              A sweeter way
              <br />
              to get in touch.
            </h2>
            {business.demo && (
              <p>
                Illustrative shop information. This business does not take
                orders.
              </p>
            )}
          </div>
          <div className="shop-info">
            <p>
              <Clock size={22} />
              <span>
                <strong>Opening hours</strong>
                {business.hours}
              </span>
            </p>
            <p>
              <Package size={22} />
              <span>
                <strong>Pickup & delivery</strong>
                {business.fulfillment}
              </span>
            </p>
            {business.address && (
              <p>
                <MapPin size={22} />
                <span>
                  <strong>Find us</strong>
                  {business.address}
                </span>
              </p>
            )}
            <WhatsAppLink phone={business.phone} message={generalMessage}>
              {business.demo ? "Contact DiwaliBoost" : "Start an enquiry"}
            </WhatsAppLink>
          </div>
        </section>
      </main>
      <footer className="shop-footer wrap">
        <span className="shop-brand">{business.name}</span>
        <span>
          {business.demo
            ? "A fictional sweet-shop concept. No real shop or customer claims."
            : business.hindiName}
        </span>
        <a href="/">
          Your business could look this good
          <ArrowUpRight size={17} />
        </a>
      </footer>
    </div>
  );
}
