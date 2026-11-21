// ---------- Visitor analytics (Google Analytics 4) ----------
// 1. Create a GA4 property at https://analytics.google.com (Admin > Data streams > Web).
// 2. Copy its Measurement ID (looks like G-XXXXXXXXXX) and paste it below.
// Until you do, nothing is loaded and the site works exactly as before.
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

(function () {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes("XXXX")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(s);

  // Track clicks on the contact email and the "Let's Talk" / project links
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("mailto:")) {
      window.gtag("event", "email_click", { link_url: href });
    } else if (href.includes("projects") || href.includes("contact")) {
      window.gtag("event", "nav_click", { link_url: href });
    }
  });
})();
