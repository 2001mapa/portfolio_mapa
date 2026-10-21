self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Do not intercept API calls or static assets without a cache strategy.
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('<!doctype html><title>Sin conexión</title><p>Sin conexión. Revisa tu red e inténtalo de nuevo.</p>', {
        status: 503,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    })
  );
});
