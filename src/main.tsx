import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";
import "@fontsource-variable/outfit";
import "@fontsource/dm-serif-display/latin-400.css";

const root = document.getElementById("root")!;
document.documentElement.classList.add("js");
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);
if (root.querySelector("main")) hydrateRoot(root, app);
else createRoot(root).render(app);
