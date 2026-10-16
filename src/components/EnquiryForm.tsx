import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, WhatsappLogo } from "@phosphor-icons/react";
import { packages, service } from "../data/business";
import { serviceMessage, whatsappUrl } from "../lib/whatsapp";

export function EnquiryForm() {
  const [draft, setDraft] = useState("");
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name") ?? "").trim();
    const business = String(fields.get("business") ?? "").trim();
    if (!name || !business) {
      const input = form.elements.namedItem(
        !name ? "name" : "business",
      ) as HTMLInputElement;
      input.setCustomValidity("Please enter more than spaces.");
      input.reportValidity();
      return;
    }
    setDraft(
      serviceMessage({
        name,
        business,
        package: String(fields.get("package")),
        details: String(fields.get("details")),
      }),
    );
  }
  return (
    <>
      <noscript>
        <p>
          Enable JavaScript to prepare your enquiry here, or use the direct
          WhatsApp link to contact us.
        </p>
      </noscript>
      <form
        className="enquiry-form"
        onSubmit={prepare}
        onChange={() => setDraft("")}
      >
        <div className="form-row">
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="e.g. Aashish"
              onInput={(event) => event.currentTarget.setCustomValidity("")}
            />
          </label>
          <label>
            Business name
            <input
              name="business"
              autoComplete="organization"
              required
              maxLength={100}
              placeholder="Your shop or bakery"
              onInput={(event) => event.currentTarget.setCustomValidity("")}
            />
          </label>
        </div>
        <label>
          Which package are you considering?
          <select name="package" defaultValue="Help me choose">
            <option>Help me choose</option>
            {packages.map((item) => (
              <option key={item.name}>
                {item.name} (₹{item.price.toLocaleString("en-IN")})
              </option>
            ))}
          </select>
        </label>
        <label>
          Tell us a little about your page{" "}
          <span className="optional">(optional)</span>
          <textarea
            name="details"
            maxLength={1000}
            rows={3}
            placeholder="Your products, preferred language, or a delivery date…"
          />
        </label>
        <p className="form-privacy">
          These details stay in your browser until you send them through
          WhatsApp. We don’t store form submissions.
        </p>
        <button className="button" type="submit">
          Prepare my enquiry
          <ArrowUpRight size={18} />
        </button>
        {draft && (
          <div className="enquiry-result" role="status">
            <p>
              <Check size={18} /> Your message is ready. It has not been sent.
            </p>
            <pre>{draft}</pre>
            <a
              className="button"
              href={whatsappUrl(service.phone, draft)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo size={20} />
              Review & send in WhatsApp
              <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </form>
    </>
  );
}
