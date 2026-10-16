import { Portfolio } from "./pages/Portfolio";
import { SweetShop } from "./pages/SweetShop";
import { sweetShop } from "./data/business";
import { ThemeProvider } from "next-themes";

export function App({ path }: { path: string }) {
  const normalized = path.replace(/\/+$/, "") || "/";
  return (
    <ThemeProvider
      attribute="data-theme"
      storageKey="diwaliboost-theme"
      defaultTheme="system"
      scriptProps={{ src: "/theme-init.js" }}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {normalized === "/" ? (
        <Portfolio />
      ) : normalized === "/demo/sweet-shop" ? (
        <SweetShop business={sweetShop} />
      ) : (
        <main id="main" className="not-found wrap">
          <p className="eyebrow">PAGE NOT FOUND</p>
          <h1>This page isn’t here.</h1>
          <p>Let’s get you back to something festive.</p>
          <a className="button" href="/">
            Back to DiwaliBoost
          </a>
        </main>
      )}
    </ThemeProvider>
  );
}
