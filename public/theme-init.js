// External bootstrap keeps static-host script-src 'self' intact.
(() => {
  let preference = "system";
  try {
    preference = localStorage.getItem("diwaliboost-theme") || "system";
  } catch {
    /* Storage can be blocked. */
  }
  const theme =
    preference === "dark" || preference === "light"
      ? preference
      : matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
})();
