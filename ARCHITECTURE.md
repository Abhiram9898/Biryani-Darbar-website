# Architecture

## Frontend

The React app is a public restaurant showcase. React Router exposes six pages, TanStack Query loads public content, Axios calls the API, and Framer Motion provides interface animation.

## Backend

Express exposes a small public API backed by MongoDB. Shared Zod schemas validate review and contact form submissions before Mongoose persists them.

## API Groups

- `GET /api/products`
- `GET /api/content/gallery`
- `GET` and `POST /api/content/reviews`
- `POST /api/content/reviews/:id/helpful`
- `POST /api/content/contact`
- `GET /api/content/faqs`
- `GET /api/health` and `GET /api/ready`

The project intentionally has no authentication, registration, cart, checkout, orders, payments, Redis, or live tracking.
