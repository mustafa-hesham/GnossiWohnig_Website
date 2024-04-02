/* eslint-disable no-magic-numbers */
/* eslint-disable new-cap */
importScripts('workbox-sw.js');
importScripts('md5.js');

workbox.core.clientsClaim();

workbox.routing.registerRoute(
    /(jpe?g|png|gif|svg|webp)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 50, maxAge: 3600 * 60 })
      ]
    })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request)
  .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
