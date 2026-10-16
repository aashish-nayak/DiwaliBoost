import {
  ArrowRight,
  ArrowUpRight,
  Check,
  DeviceMobile,
  FlowerLotus,
  Gift,
  GlobeHemisphereWest,
  PaintBrush,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Brand, Footer, WhatsAppLink } from "../components/Shared";
import { EnquiryForm } from "../components/EnquiryForm";
import { packages } from "../data/business";
import { rupees } from "../lib/whatsapp";
import { ThemeControls } from "../components/ThemeControls";

export function Portfolio() {
  return (
    <div className="portfolio">
      <div className="announcement">
        This Diwali, give your business a beautiful place to shine.
      </div>
      <header className="site-header wrap">
        <Brand />
        <nav aria-label="Main navigation">
          <a href="#demo">The demo</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="header-actions">
          <ThemeControls />
          <a className="button button-small" href="#enquire">
            Let’s talk
            <ArrowUpRight size={16} />
          </a>
        </div>
      </header>
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <h1>
              Your Diwali offers.
              <span className="accent">Made to stand out.</span>
            </h1>
            <p className="hero-description">
              Turn your festive collection into a beautiful mobile-friendly
              page. Share one link. Let your customers enquire on WhatsApp.
            </p>
            <div className="hero-actions">
              <a className="button" href="/demo/sweet-shop/">
                Explore the sweet-shop demo
                <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#pricing">
                See packages
                <ArrowRight size={17} />
              </a>
            </div>
            <p className="hero-note">
              <Check size={16} />
              From ₹499, one-time<span aria-hidden="true">/</span>No tech skills
              needed
            </p>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                src="/images/mithai-hero.webp"
                srcSet="/images/mithai-hero-640.webp 640w, /images/mithai-hero-960.webp 960w, /images/mithai-hero.webp 1200w"
                sizes="(max-width: 767px) 100vw, 50vw"
                alt="An open maroon gift box of Indian sweets beside marigolds and a brass diya"
                width="1200"
                height="800"
                fetchPriority="high"
              />
              <div className="image-caption">
                <span>Your shop. Your collection. One beautiful link.</span>
                <FlowerLotus size={25} />
              </div>
            </div>
            <a href="/demo/sweet-shop/" className="sample-link">
              <span className="sample-monogram">G</span>
              <span>
                <strong>Gulab & Co.</strong>
                <small>A sweet-shop concept. See it in action.</small>
              </span>
              <ArrowUpRight size={25} />
            </a>
          </div>
        </section>
        <div className="benefit-strip">
          <div className="wrap">
            <span>
              <DeviceMobile size={23} />
              Made for mobile
            </span>
            <span>
              <WhatsappLogo size={23} />
              Enquiries on WhatsApp
            </span>
            <span>
              <PaintBrush size={23} />
              Your colours. Your brand.
            </span>
            <span>
              <GlobeHemisphereWest size={23} />
              One link to share anywhere
            </span>
          </div>
        </div>
        <section className="section wrap demo-section" id="demo">
          <div className="section-heading">
            <h2>
              Your shop, dressed
              <br />
              for the celebrations.
            </h2>
            <p>
              A thoughtfully designed page puts your products, prices and
              festive offers in one place. Here’s what yours could look like.
            </p>
          </div>
          <a className="demo-preview" href="/demo/sweet-shop/">
            <img
              src="/images/celebration-box.webp"
              alt="Sample assorted mithai gift box for the Gulab & Co. demo"
              width="512"
              height="512"
              loading="lazy"
            />
            <div className="demo-preview-copy">
              <h3>Gulab & Co.</h3>
              <p>Sweet shops & bakeries</p>
              <p>
                A festive collection, gift boxes, and a simple way to start a
                conversation.
              </p>
              <span className="text-link">
                Open live demo
                <ArrowUpRight size={19} />
              </span>
              <small>
                Fictional business. Sample prices & AI-generated imagery.
              </small>
            </div>
          </a>
        </section>
        <section className="section process-section" id="how-it-works">
          <div className="wrap">
            <h2>
              You run the shop.
              <br />
              We’ll take care of the page.
            </h2>
            <div className="process-grid">
              <article>
                <span className="step-symbol">
                  <WhatsappLogo size={27} />
                </span>
                <h3>Tell us what’s festive</h3>
                <p>
                  Send your logo, product photos, prices and offers on WhatsApp.
                  We’ll confirm your package, scope and timeline.
                </p>
              </article>
              <article>
                <span className="step-symbol">
                  <PaintBrush size={27} />
                </span>
                <h3>Make it feel like you</h3>
                <p>
                  Pay a 50% advance and we’ll create your page. Review a private
                  preview and send your included revisions together.
                </p>
              </article>
              <article>
                <span className="step-symbol">
                  <Gift size={27} />
                </span>
                <h3>Share the celebration</h3>
                <p>
                  Approve the page, pay the balance, and get your live link.
                  Share it in your WhatsApp status, Instagram bio or customer
                  messages.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="section wrap" id="pricing">
          <div className="section-heading">
            <p className="eyebrow">SMALL INVESTMENT. SOMETHING BEAUTIFUL.</p>
            <h2>A package for your plans.</h2>
            <p>
              One-time setup prices for our introductory offering. No
              subscription. Choose the space your festive collection needs.
            </p>
          </div>
          <div className="pricing-grid">
            {packages.map((item) => (
              <article
                className={`price-card ${item.name === "Business" ? "featured" : ""}`}
                key={item.name}
              >
                {item.name === "Business" && (
                  <div className="price-ribbon">
                    FOR A FULLER FESTIVE COLLECTION
                  </div>
                )}
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <div className="price">
                  {rupees(item.price)}
                  <span>/ one-time</span>
                </div>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="package-limits">
                  <strong>
                    {item.revisions} revision{" "}
                    {item.revisions === 1 ? "round" : "rounds"}
                  </strong>
                  <span>{item.days} working days after content & advance</span>
                </div>
                <WhatsAppLink
                  className={`button ${item.name !== "Business" ? "button-outline" : ""}`}
                  message={`Hello DiwaliBoost! I’m interested in the ${item.name} package at ${rupees(item.price)}. Please confirm the scope, timeline and payment details.`}
                >
                  Choose {item.name}
                </WhatsAppLink>
              </article>
            ))}
          </div>
          <div className="pricing-terms">
            <p>
              <strong>A few things to know.</strong> Each package includes one
              template-based page and hosting for 90 days after launch on a
              provider subdomain. We’ll agree any continuation cost before that
              period ends. Your content and photos are supplied by you. A
              revision round means one consolidated list of changes within the
              agreed scope.
            </p>
            <p>
              50% advance to start; balance before launch. Domain purchase,
              translation, photography and later updates are quoted separately.
              No automatic renewals. Extra updates begin only after you approve
              the quote.
            </p>
          </div>
        </section>
        <section className="section faq-section wrap">
          <div>
            <h2>
              A few questions,
              <br />
              answered.
            </h2>
            <p>
              Something else on your mind?
              <br />
              <a className="text-link" href="#enquire">
                Just ask us
                <ArrowRight size={17} />
              </a>
            </p>
          </div>
          <div className="faq-list">
            {[
              [
                "Is this an online store?",
                "It’s a product showcase and enquiry page. Customers browse your offers, then contact you on WhatsApp. You confirm availability, delivery and payment directly. There’s no cart or online checkout.",
              ],
              [
                "Can I use Hindi and English?",
                "Yes. We can place your supplied content in either language. The Premium package includes both Hindi and English content placement. Translation is quoted separately.",
              ],
              [
                "What do I need to send?",
                "Your business name, logo (if you have one), product photos you have permission to use, product names and prices, offers, WhatsApp number, and any hours or pickup/delivery details.",
              ],
              [
                "What happens after Diwali?",
                "Your package includes 90 days of hosting after launch. You can request a quote for a new campaign or continued hosting, or ask for the static site files. We’ll agree any ongoing costs first.",
              ],
              [
                "Do you guarantee enquiries or sales?",
                "No. We provide a polished page that you can share with customers. Results depend on your products, offers and promotion; no sales or search-ranking guarantees are included.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="section enquiry-section" id="enquire">
          <div className="wrap enquiry-grid">
            <div>
              <p className="eyebrow">LET’S MAKE SOMETHING FESTIVE</p>
              <h2>
                Your next celebration
                <br />
                starts with a hello.
              </h2>
              <p>
                Tell us about your business. We’ll help you choose a package and
                agree a delivery date.
              </p>
              <WhatsAppLink
                className="text-link"
                message="Hello DiwaliBoost! I'd like to discuss a Diwali sale page for my business."
              >
                Chat directly on WhatsApp
              </WhatsAppLink>
              <p className="hindi-line" lang="hi">
                आपकी दुकान, आपकी पहचान। अब ऑनलाइन।
              </p>
            </div>
            <EnquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
