// This file is a TEMPLATE. The PRECACHE_URLS array below is populated
// automatically by scripts/generate-sw.mjs after `vite build`.
// Don't hand-edit the placeholder comment — it's a string match target.

const CACHE_VERSION = '78e41de2cc'; // injected at build time
const CACHE_NAME = `swr-cache-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/assets/index-DnFX9sh0.css",
  "/assets/index-Dv1FAZNV.js",
  "/assets/products-B4SlR-7b.json",
  "/assets/products_sold-CMpPtPIB.json",
  "/img/android-chrome-192x192.png",
  "/img/android-chrome-512x512.png",
  "/img/apple-touch-icon.png",
  "/img/favicon-16x16.png",
  "/img/favicon-32x32.png",
  "/img/favicon.ico",
  "/img/logo.jpg",
  "/index.html"
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // addAll fails atomically if any single request fails — that's fine,
            // it just means this install attempt is retried later.
            return cache.addAll(PRECACHE_URLS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(staleWhileRevalidate(request));
});

async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    const networkFetch = fetch(request)
        .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch(() => {
            if (cachedResponse) return cachedResponse;
            throw new Error('Network request failed and no cache available');
        });

    return cachedResponse || networkFetch;
}