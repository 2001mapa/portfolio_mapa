# Miguel Albornoz - Software Engineer Portfolio

Professional portfolio built with Next.js 16 (App Router), React, Tailwind CSS, and Framer Motion. Showcases full-stack engineering capabilities and client work.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Styling**: React, Tailwind CSS, Framer Motion
- **Architecture**: Server Components, Client Components, Serverless Functions
- **Language**: TypeScript

## 📁 Project Structure

```
├── public/                 # Static assets (images, videos, manifest, service worker)
├── src/
│   ├── app/                # Next.js App Router (pages, layouts and public API routes)
│   ├── components/         # Reusable React components (UI, layout, sections)
│   └── data/               # Static data structures
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
   # Add public integrations here only when the portfolio requires them.
   ```

## 🚀 Scripts

- `npm run dev`: Starts the development server on `localhost:3000`.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch code issues.

## 🏗️ Architecture Decisions

- **PWA Capabilities:** Configured with `manifest.ts` and a service worker to provide a native-like experience.
- **Performance:** Relies on Next/Image and optimized assets for fast load times.
- **Security:** Strict payload validation in API routes to prevent exposure.

## 🚀 Deployment

This project is optimized for deployment on Vercel. 
Simply push to a repository linked to Vercel, and the build settings will be automatically configured for Next.js.
