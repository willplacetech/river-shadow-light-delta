# Render Static Site

This folder contains a plain HTML, CSS, and JavaScript version of the pousada
site. It reuses the existing page styles, fonts, photos, and reservation data;
the original Web Service entry point is unchanged.

Render settings:

- **Root Directory:** repository root
- **Build Command:** `npm install && npm run build:static`
- **Publish Directory:** `StaticSite/dist`
- **Start Command:** none

The static build does not start Nitro or run database migrations. Reservations
open WhatsApp directly in the visitor's browser.
