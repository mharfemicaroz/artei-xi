# ARTEI XI website

A responsive Nuxt 4 / Vue 3 website for the Association of Region XI Teacher Education Institutions. Vite is provided by Nuxt. The current verified content comes from `pics/info.txt`; the site can later read leadership and updates from WordPress without a front-end rebuild.

Use Node.js 24.15 or newer (active LTS) for development and deployment.

## Local development

```powershell
npm install
npm run dev
```

Production checks:

```powershell
npm run typecheck
npm run build
```

## Content architecture

- `data/site.ts` — verified local fallback content and organization profile.
- `types/content.ts` — the CMS-neutral content contract.
- `server/api/site.get.ts` — server-side WordPress adapter with a safe local fallback.
- `wordpress-plugin/artei-xi-headless/` — installable WordPress plugin for Leadership and ARTEI Updates.
- `pics/` — original ARTEI XI source media and supplied information.
- `public/media/` — deployable copies of the supplied image assets, served at `/media/*`.

## Connect WordPress later

1. Copy `wordpress-plugin/artei-xi-headless` into `wp-content/plugins/` and activate **ARTEI XI Headless Content**.
2. Add Leadership and ARTEI Update records in WordPress. Use **Order** to control officer ordering and set each featured image and role.
3. Copy `.env.example` to `.env` and set `WORDPRESS_API_URL` to the WordPress origin (without `/wp-json`).
4. Restart or rebuild Nuxt.

Nuxt requests `/wp-json/artei/v1/site`. Empty CMS sections retain the verified local fallback, allowing content to migrate gradually.

## Source notes

The site uses no invented metrics, testimonials, addresses, fees, or member counts. Officer names, roles, ceremony facts, and association priorities are derived from `pics/info.txt`. Membership inquiries go to the supplied official Facebook page until ARTEI XI provides a formal registration route.
