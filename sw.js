const CACHE_NAME = 'site-static-v1';

const assets = [
  '/',
  './index.html',
  './script.js',
  './styles.css',
  './manifest.json',
  './icon-192.jpg',
  './icon-512.jpg'
];

// Se instala el service worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(assets);
    })
  );
});

// Activate event (runs when the SW is updated)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event (Interacts with the cache)
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      // Return cached file or go to network
      return cacheRes || fetch(evt.request);
    })
  );
});