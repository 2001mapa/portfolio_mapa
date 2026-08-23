self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Requisito mínimo para la instalación nativa (WebAPK en Android).
  // Solo interceptamos pero dejamos que la red haga el trabajo real.
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('Offline - No hay conexión');
    })
  );
});
