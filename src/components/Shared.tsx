import { ArrowUpRight, FlowerLotus, WhatsappLogo } from "@phosphor-icons/react";
import { service } from "../data/business";
import { whatsappUrl } from "../lib/whatsapp";
import type { ReactNode } from "react";

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="DiwaliBoost home">
      <FlowerLotus size={29} weight="duotone" />
      <span>
        Diwali<span className="brand-light">Boost</span>
      </span>
    </a>
  );
}

export function WhatsAppLink({
  message,
  children,
  className = "button",
  phone = service.phone,
}: {
  message: string;
  children: ReactNode;
  className?: string;
  phone?: string;
}) {
  return (
    <a
      className={className}
      href={whatsappUrl(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsappLogo size={20} aria-hidden="true" />
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="footer wrap">
      <div>
        <Brand />
        <p>Small business. Big festive energy.</p>
      </div>
      <div>
        <p>Made for Jaipur. Available across India.</p>
        <a href="tel:+916376566753">+91 63765 66753</a>
      </div>
      <p className="footer-note">
        © {new Date().getFullYear()} DiwaliBoost
        <br />A personal web design service.
      </p>
    </footer>
  );
}
