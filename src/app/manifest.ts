import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Miguel Albornoz | Ecosistemas Digitales',
    short_name: 'Miguel A.',
    description: 'Ingeniería de Software de Alto Nivel enfocada en E-commerce, CRO y Motores de Venta.',
    start_url: '/',
    display: 'standalone',
    background_color: '#161616',
    theme_color: '#161616',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
  }
}
