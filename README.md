# Miguel Albornoz - Software Engineer Portfolio

Professional portfolio built with Next.js 16 (App Router), React, Tailwind CSS, and Framer Motion. Showcases full-stack engineering capabilities, real-time architectures, and AI integrations.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Styling**: React, Tailwind CSS, Framer Motion
- **Architecture**: Server Components, Client Components, Serverless Functions
- **Language**: TypeScript

## 📁 Project Structure

```
├── public/                 # Static assets (images, videos, manifest, service worker)
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, API routes, Proxy)
│   ├── components/         # Reusable React components (UI, layout, sections)
│   ├── data/               # Static data structures
│   └── lib/                # Utility functions
└── proxy.ts                # Next.js 16 Proxy (formerly middleware) for admin route protection
```

## 🛠️ Prerequisites

- Node.js (v18.17.0 or higher)
- npm, yarn, or pnpm

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/2001mapa/portfolio_mapa.git
   cd portfolio_mapa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add the following keys. Do not commit actual secrets.
   ```env
   # Admin Authentication (Optional, for admin panel access)
   ADMIN_PIN=
   JWT_SECRET=
   
   # Database (Supabase)
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```

## 🚀 Scripts

- `npm run dev`: Starts the development server on `localhost:3000`.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch code issues.

## 🏗️ Architecture Decisions

- **Proxy (Middleware):** Uses Next.js 16 Proxy pattern to secure `/admin` routes using JWT validation.
- **PWA Capabilities:** Configured with `manifest.ts` and a service worker to provide a native-like experience.
- **Performance:** Relies on Next/Image and optimized assets for fast load times.
- **Security:** Strict payload validation in API routes to prevent exposure.

## 🚀 Deployment

This project is optimized for deployment on Vercel. 
Simply push to a repository linked to Vercel, and the build settings will be automatically configured for Next.js.
