// This file is a TEMPLATE. The PRECACHE_URLS array below is populated
// automatically by scripts/generate-sw.mjs after `vite build`.
// Don't hand-edit the placeholder comment — it's a string match target.

const PREFIX = 'ukayfinds-cache';
const CACHE_VERSION = '72ca95f36a'; // injected at build time
const CACHE_NAME = `${PREFIX}-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/assets/index-B_Jie0W_.js",
  "/assets/index-DnFX9sh0.css",
  "/assets/products-BgRQG6di.json",
  "/assets/products_sold-CRz2l8sR.json",
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
        caches.open(CACHE_NAME).then(async (cache) => {
            const results = await Promise.allSettled(
                PRECACHE_URLS.map((url) =>
                    fetch(url, { cache: 'reload' }).then((res) => {
                        if (!res.ok) throw new Error(`${res.status} ${url}`);
                        return cache.put(url, res);
                    })
                )
            );
            results.forEach((r, i) => {
                if (r.status === 'rejected') {
                    console.error('[sw] precache failed:', PRECACHE_URLS[i], r.reason);
                }
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key.startsWith(PREFIX) && key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    // Have it cached — serve it, no network call at all.
    if (cachedResponse) return cachedResponse;

    // Not cached yet — fetch from network and cache for next time.
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
    }
    return networkResponse;
}