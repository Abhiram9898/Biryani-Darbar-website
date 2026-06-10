# Publish Biryani Darbar

This project is configured to run the website and API together as one Render web service.

## 1. Put The Project On GitHub

1. Create a private GitHub repository.
2. Push this project to it.
3. Confirm that neither `apps/api/.env` nor `apps/web/.env` appears in GitHub.

## 2. Deploy On Render

1. Sign in at [Render](https://render.com).
2. Select **New +** and **Blueprint**.
3. Connect the GitHub repository and choose `render.yaml`.
4. Enter the existing MongoDB Atlas connection string for `MONGO_URI`.
5. Create the Blueprint and wait for the health check to pass.
6. Open the generated `onrender.com` URL and test all six pages.

The Render service builds the React website, seeds the public MongoDB content, and starts the Express API. The React app uses `/api` on the same domain in production.

## 3. Buy A Domain

Recommended domain styles:

- `biryanidarbarpatna.com`
- `biryanidarbarpatna.in`
- `thebiryanidarbar.com`

Buy the domain from a trusted registrar. Cloudflare Registrar is a good option because it sells domains without registrar markup. Before paying, check both the first-year and renewal prices.

## 4. Connect The Domain

1. In Render, open the `biryani-darbar` service.
2. Open **Settings**, then **Custom Domains**.
3. Add the root domain, such as `biryanidarbarpatna.com`.
4. Add `www.biryanidarbarpatna.com` too.
5. In the registrar DNS dashboard, create the exact DNS records Render shows.
6. Wait for Render to verify the records and issue HTTPS certificates.

Use the root domain as the primary domain and redirect `www` to it.

## 5. Production Checks

- Open Home, Menu, Gallery, Reviews, About, and Contact.
- Submit a test review and confirm it appears.
- Submit a test contact message and confirm WhatsApp opens.
- Check `/api/health` and `/api/ready`.
- Confirm HTTPS is active and MongoDB Atlas has backups enabled.
