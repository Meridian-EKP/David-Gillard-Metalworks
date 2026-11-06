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
- Replace placeholder phone `01234 567 890` and email `hello@dagmetals.co.uk` (search `tel:` / `mailto:` in index.html).
- Shop: product names, descriptions and prices (`£00.00`) are placeholders. The Buy now buttons are UI only (`.buy` in index.html).
- Contact form only shows a thank-you message; it needs a real handler (email service or form backend).
- Add `og:image`, canonical URL and a sitemap once the domain is final.
- Confirm David is happy for the Yell photos to be used.
- Reviews button links to David's Google search result; swap for his Google Business "write a review" link when he has one.
