# Deploying RSVPin on Vercel

This tutorial walks you through deploying the RSVPin project to [Vercel](https://vercel.com) with a Vercel Postgres database and Cloudinary for image uploads.

## Prerequisites

- A [GitHub](https://github.com) account with the RSVPin repository pushed
- A [Vercel](https://vercel.com) account (free tier works)
- A [Cloudinary](https://cloudinary.com) account (free tier works)

## Step 1 — Push Your Repository to GitHub

If your project is not already on GitHub, create a new repository and push it:

```bash
git remote add origin https://github.com/<your-username>/rsvpin.git
git push -u origin main
```

## Step 2 — Create a Vercel Postgres Database

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** in the top navigation
3. Click **Create Database** and select **Postgres**
4. Choose a name (e.g. `rsvpin-db`) and a region close to your users
5. Click **Create**

After creation, Vercel provides the following environment variables automatically:

- `POSTGRES_URL`
- `POSTGRES_HOST`
- `POSTGRES_DATABASE`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`

These will be linked to your project in the next step.

## Step 3 — Import the Project on Vercel

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Select **Import Git Repository** and choose your `rsvpin` repository
4. Under **Framework Preset**, Vercel should auto-detect **Next.js**
5. Under **Root Directory**, leave it as the default (`.`)
6. Expand **Environment Variables** and add the following:

| Variable                | Value                                                         |
| ----------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL`  | Your Vercel deployment URL (e.g. `https://rsvpin.vercel.app`) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name                                    |
| `CLOUDINARY_API_KEY`    | Your Cloudinary API key                                       |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret                                    |
| `LOCALE`                | `en-US` (optional — defaults to system locale)                |

> **Note:** You do NOT need to add `PGHOST`, `PGDATABASE`, `PGUSERNAME`, or `PGPASSWORD`. The app automatically maps the Vercel `POSTGRES_*` variables to the standard `PG*` names at runtime (see `lib/config.ts`).

7. Click **Deploy**

## Step 4 — Connect the Database to the Project

If the database was not auto-linked during project creation:

1. Go to **Storage** in the Vercel Dashboard
2. Select your Postgres database
3. Click the **Projects** tab
4. Click **Connect Project** and select your RSVPin project
5. Choose the environments to connect (Production, Preview, Development)
6. Click **Connect**

This injects the `POSTGRES_*` environment variables into your project automatically.

## Step 5 — Run Database Migrations

Vercel does not run migrations automatically. You need to run them manually against the production database.

1. Copy the `POSTGRES_URL` connection string from the Vercel Dashboard (Storage → your database → `.env.local` tab)

2. Run the migration command with the Vercel Postgres environment variables:

   ```bash
   POSTGRES_URL="<connection-string>" \
   POSTGRES_HOST="<host>" \
   POSTGRES_DATABASE="<database>" \
   POSTGRES_USER="<user>" \
   POSTGRES_PASSWORD="<password>" \
   NODE_ENV=production \
   pnpm migrate up
   ```

## Step 6 — Update `NEXT_PUBLIC_BASE_URL`

After the first deployment, Vercel assigns a URL to your project. If you used a placeholder value earlier:

1. Go to **Settings** → **Environment Variables** in your Vercel project
2. Update `NEXT_PUBLIC_BASE_URL` to your actual production URL (e.g. `https://rsvpin.vercel.app`)
3. Redeploy for the change to take effect:
   - Go to the **Deployments** tab
   - Click the three-dot menu on the latest deployment
   - Select **Redeploy**

## Step 7 — Set Up a Custom Domain (Optional)

1. Go to **Settings** → **Domains** in your Vercel project
2. Add your custom domain and follow the DNS configuration instructions
3. Update `NEXT_PUBLIC_BASE_URL` to match the custom domain
4. Redeploy

## Verify the Deployment

After deployment and migrations:

1. Visit your Vercel URL
2. Create a new account via the sign-up page
3. Create an event with an image upload to verify Cloudinary is working
4. RSVP to an event to verify database writes

## Troubleshooting

### Build fails with missing environment variables

Make sure all required environment variables are set in Vercel's project settings and the Postgres database is connected. The `dotenv-safe` package is skipped in production (`NODE_ENV=production`), so `.env` is not required — but the actual environment variables must exist.

### Database connection errors

- Verify the Postgres database is connected to the project under **Storage** → **Projects**
- The app enables SSL automatically when `POSTGRES_URL` is present. Do not set `PGHOST` manually on Vercel.

### Images not loading

- Confirm `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are set in Vercel
- Verify `res.cloudinary.com` is already allowed in `next.config.ts` under `images.remotePatterns` (it is by default)

### `NEXT_PUBLIC_BASE_URL` mismatch

This variable is inlined at build time (it uses the `NEXT_PUBLIC_` prefix). If you change it, you must redeploy — a restart is not enough.
