# RSVPin

An event management and RSVP platform where users can discover, create, and register for events. Built with Next.js, PostgreSQL, and Tailwind CSS.

## Features

- **Authentication** — Email/password sign-up and sign-in with bcrypt hashing and cookie-based sessions
- **Event creation** — Create events with name, description, image upload (Cloudinary), location, category, date/time, and guest capacity
- **Event discovery** — Public listing of all events with guest counts
- **RSVP system** — Register and unregister for events with race-condition safe capacity enforcement using PostgreSQL advisory locks
- **User profiles** — Public profiles with bio, location, website, and hosted event history (upcoming/past)
- **Event management** — Hosts can edit or delete their events
- **Share events** — Copy event links to clipboard
- **Image uploads** — Cloudinary integration with automatic cropping (1200×600)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router, Server Actions)
- **Language:** TypeScript
- **Database:** PostgreSQL via [postgres.js](https://github.com/porsager/postgres) — [Database schema (DrawSQL)](https://drawsql.app/teams/soneddjr/diagrams/rsvpin)
- **Migrations:** [@upleveled/ley](https://github.com/upleveled/ley)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) 4
- **UI Components:** [Radix UI](https://www.radix-ui.com) (Dialog, Tabs)
- **Validation:** [Zod](https://zod.dev)
- **Image hosting:** [Cloudinary](https://cloudinary.com)
- **Testing:** [Vitest](https://vitest.dev), [MSW](https://mswjs.io)
- **Linting:** ESLint, Prettier, Stylelint, commitlint

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io)
- PostgreSQL

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up the database

Create a PostgreSQL database and user. See `databaseExample.sql` for the full schema reference.

### 3. Configure environment variables

Create a `.env` file in the project root with the following variables:

```env
PGHOST=localhost
PGDATABASE=rsvpin
PGUSERNAME=rsvpin
PGPASSWORD=<your-password>

NEXT_PUBLIC_BASE_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

LOCALE=en-US
```

## Environment Variables

### Local Development (`.env`)

| Variable                | Required | Description                                                                                |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `PGHOST`                | Yes      | PostgreSQL host address (e.g. `localhost`)                                                 |
| `PGDATABASE`            | Yes      | PostgreSQL database name                                                                   |
| `PGUSERNAME`            | Yes      | PostgreSQL username                                                                        |
| `PGPASSWORD`            | Yes      | PostgreSQL password                                                                        |
| `NEXT_PUBLIC_BASE_URL`  | Yes      | App base URL (e.g. `http://localhost:3000`). Used for share links. Exposed to the browser. |
| `CLOUDINARY_CLOUD_NAME` | Yes      | Cloudinary cloud name for image uploads                                                    |
| `CLOUDINARY_API_KEY`    | Yes      | Cloudinary API key                                                                         |
| `CLOUDINARY_API_SECRET` | Yes      | Cloudinary API secret                                                                      |
| `LOCALE`                | No       | Locale for date/time formatting (e.g. `en-US`). Falls back to system default.              |

### Production / Vercel

In production on Vercel, the following variables replace the local `PG*` variables. The app automatically maps them to the standard `PG*` names and enables SSL.

| Variable            | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `POSTGRES_URL`      | Vercel Postgres connection string. Triggers SSL and `PG*` variable mapping. |
| `POSTGRES_HOST`     | Mapped to `PGHOST`                                                          |
| `POSTGRES_DATABASE` | Mapped to `PGDATABASE`                                                      |
| `POSTGRES_USER`     | Mapped to `PGUSERNAME`                                                      |
| `POSTGRES_PASSWORD` | Mapped to `PGPASSWORD`                                                      |

### Automatically Set

| Variable                      | Description                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| `NODE_ENV`                    | Set by Next.js. Enables secure cookies in `production` and skips `dotenv-safe` loading. |
| `CI`                          | Set by CI systems (e.g. GitHub Actions). Skips `dotenv-safe` loading.                   |
| `NEXT_PUBLIC_API_MSW_ENABLED` | Set inline by the `pnpm mock` script to enable MSW API mocking in development.          |

### 4. Run migrations

```bash
pnpm migrate up
```

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `pnpm dev`          | Start development server                  |
| `pnpm build`        | Build for production                      |
| `pnpm start`        | Start production server                   |
| `pnpm migrate up`   | Run database migrations                   |
| `pnpm migrate down` | Rollback last migration                   |
| `pnpm test`         | Run tests with Vitest                     |
| `pnpm mock`         | Start dev server with MSW mocking enabled |

## Project Structure

```
app/
├── (auth)/              # Sign-in and sign-up pages
├── api/
│   └── upload/          # POST /api/upload (Cloudinary)
├── components/          # Shared UI components
├── events/
│   ├── create/          # Event creation page
│   └── [eventId]/       # Event detail, registration, settings
└── user/
    └── [username]/      # User profile and settings
database/                # PostgreSQL queries (events, users, sessions)
lib/                     # Auth, config, types, validation, utilities
migrations/              # Database migration files (ley)
mocks/                   # MSW handlers and mock data
```

## Database Schema

| Table          | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `users`        | User accounts with profile fields (name, email, username, bio, location, website)  |
| `events`       | Events with details, capacity, location type (offline/online), and timestamps      |
| `event_hosts`  | Many-to-many relationship between events and host users                            |
| `event_guests` | Many-to-many relationship between events and guest users (status: going/not_going) |
| `sessions`     | Cookie-based auth sessions with 24-hour expiry                                     |

## Deployment

Deploy to [Vercel](https://vercel.com) with a PostgreSQL database. In production, set the `POSTGRES_URL`, `POSTGRES_HOST`, `POSTGRES_DATABASE`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` environment variables — the app maps these to the standard `PG*` variables and enables SSL automatically.

See the full step-by-step guide in [DEPLOYMENT.md](DEPLOYMENT.md).
