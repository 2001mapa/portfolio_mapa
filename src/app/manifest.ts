import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MAPA ADMIN',
    short_name: 'MAPA Admin',
    description: 'Panel de Administración y CRM',
    start_url: '/admin/enter',
    display: 'standalone',
    background_color: '#141210',
    theme_color: '#141210',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      }
    ],
  }
}
