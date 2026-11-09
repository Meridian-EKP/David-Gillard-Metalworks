# David Gillard Metalworks: website

Static, mobile-first site. No build step: open `index.html` or serve the folder.

```
index.html      page markup
css/styles.css  all styles (design tokens in :root)
js/main.js      nav, logo scroll, gallery + lightbox, sparks, form
images/         project photos (cropped, webp)
logo-icon.svg (logo + favicon)  robots.txt
```

Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000

## Before launch
- Shop: one product (Metal Folding Hand Machine 600mm, £133, from David's eBay listing). Buy now is UI only (`.buy` in index.html): wire to a checkout link. Confirm multi-buy prices, £9.95 courier / free collection and the eBay feedback quotes with David.
- Contact form only shows a thank-you message; it needs a real handler (email service or form backend).
- Add `og:image`, canonical URL and a sitemap once the domain is final.
- Confirm David is happy for the Yell photos to be used.
- Reviews button links to David's Google reviews. WhatsApp link uses his mobile (447833087439).

## Stripe
Checkout is a Stripe Payment Link, reachable only from the Buy now button (`#buy`, attribute `data-stripe`). No Stripe scripts load on the site. After payment Stripe redirects to `thanks.html`. See `STRIPE-SETUP.md` for David's step-by-step guide.
