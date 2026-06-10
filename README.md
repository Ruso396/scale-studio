# Scale Studio

Premium B2B lead generation platform for interior designers.

## Features

- Public Landing Page
- Designer Dashboard
- Admin Dashboard
- Lead Management
- Credits System
- JWT Authentication

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- MongoDB
- JWT

## Installation

```bash
npm install
cp .env.example .env.local
```

Fill in the values in `.env.local`, then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` from `.env.example`:

```env
MONGODB_URI=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Optional:

```env
NEXT_PUBLIC_LOGO_VERSION=1
SEED_DESIGNER_PASSWORD=
```

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for lead image storage |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_LOGO_VERSION` | Cache-bust version for the logo asset |
| `SEED_DESIGNER_PASSWORD` | Password for sample designers when running `npm run seed` |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run seed` | Seed sample leads and optional designers |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  app/           # Next.js App Router pages and API routes
  components/    # UI and feature components
  lib/           # Auth, database, validations
  models/        # Mongoose models
  services/      # Business logic
  types/         # Shared TypeScript types
public/          # Static assets
```

## Admin Access

Admin login is available at `/admin/login` using the credentials configured in `.env.local`.

## Designer Access

Designers can register at `/register` and sign in at `/login`.

## Deployment (Vercel)

Lead images are uploaded to **Cloudinary** (not the local filesystem). Add all environment variables from `.env.example` in the Vercel project settings, including the three `CLOUDINARY_*` values from your [Cloudinary dashboard](https://cloudinary.com/console).

## Security Notes

- Never commit `.env.local` or real credentials.
- Use strong values for `JWT_SECRET` and `ADMIN_PASSWORD` in production.
- Lead images are stored on Cloudinary; only secure URLs are saved in MongoDB.

## License

Private trial submission.
