# BISHUDDHO Frontend

Premium Bengali-first storefront concept for **বিশুদ্ধ | BISHUDDHO**. Responsive Next.js frontend with product search/categories, cart, quantity controls, checkout form, contact form and newsletter form.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```
Open http://localhost:3000

Build check:

```bash
npm run build
```

## Email delivery (important)

The checkout, contact and newsletter forms currently use FormSubmit to deliver submissions to `delowerdipu420@gmail.com`. This is a form-to-email service, not your Cloudflare Email Routing address. On the **first submission**, FormSubmit normally sends an activation/confirmation email to the destination Gmail. Open that message and confirm the activation before expecting form submissions to arrive. Check spam if needed. FormSubmit is a third-party service; review its privacy/terms before using it with real customer data.

Cloudflare Email Routing for `delower@bishuddho.bond` is separate: it forwards mail *sent to* that address into your destination Gmail. It does not automatically send website forms or make Gmail able to send as `delower@bishuddho.bond`.

## Production notes

- This package is a frontend prototype. Product catalogue and cart are currently in the browser; no persistent order database or admin panel is connected.
- Before taking real orders at scale, connect the checkout to the BISHUDDHO Laravel API, store orders securely, and configure a transactional email provider. Never put secret API keys in frontend code.
- Product images/prices are demo content. Update them before launch.
- Payment methods other than cash on delivery are shown as manual-confirmation choices only; no payment gateway is connected.
- Replace the sample contact/support policies and add real delivery/return/privacy terms before launch.

## Deploy

Recommended: push this folder to a GitHub repository and import it into Vercel. Framework preset: Next.js. Build command: `npm run build`.
