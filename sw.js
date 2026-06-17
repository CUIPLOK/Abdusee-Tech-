/* ==========================================================================
   ATN — Abdusee Tech Network — Service Worker
   Provides offline support via a cache-first strategy for the app shell
   and a network-first strategy for content (articles.json, etc).
   ========================================================================== */

const CACHE_VERSION = 'atn-v1';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const CONTENT_CACHE = `${CACHE_VERSION}-content`;

// Core files needed for the app to load offline.
const APP_SHELL_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/articles.json',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

/* ------------------------------------------------------------------
   Install: pre-cache the app shell
   ------------------------------------------------------------------ */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL_FILES))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[SW] Pre-cache failed (non-fatal):', err))
  );
});

/* ------------------------------------------------------------------
   Activate: clean up old caches
   ------------------------------------------------------------------ */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('atn-') && key !== APP_SHELL_CACHE && key !== CONTENT_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* ------------------------------------------------------------------
   Fetch strategy
   - Navigation requests: cache-first, fallback to offline shell
   - JSON / data requests: network-first, fallback to cache
   - Everything else (CSS/JS/images): cache-first, fallback to network
   ------------------------------------------------------------------ */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle same-origin requests; let cross-origin (CDN fonts, YouTube, etc) pass through
  if (url.origin !== self.location.origin) return;

  // Network-first for dynamic JSON content
  if (url.pathname.endsWith('.json')) {
    event.respondWith(networkFirst(request, CONTENT_CACHE));
    return;
  }

  // Navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((cached) => cached || fetch(request))
    );
    return;
  }

  // Default: cache-first for static assets
  event.respondWith(cacheFirst(request, APP_SHELL_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return cached || Response.error();
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw err;
  }
}
