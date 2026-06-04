const CACHE_NAME = 'blogger-pwa-ua-cache-v2';
const urlsToCache = ['/'];

const CUSTOM_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.0.0 Safari/53";

// 1. Service Worker Install & Cache Config
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 2. Network Fetch Intercept & User-Agent Injection
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('http')) {
    
    const modifiedHeaders = new Headers(event.request.headers);
    
    event.respondWith(
      self.clients.get(event.clientId).then(client => {
        // PWA Mode tracking logic
        const isAppMode = event.request.referrer === '' || (client && client.url && !client.url.includes('?utm_source=browser'));

        // Shudhu App mode hole header modify hobe
        if (isAppMode) {
          modifiedHeaders.set('User-Agent', CUSTOM_USER_AGENT);
        }
        
        // Modified headers shoho request toiri kora holo
        const modifiedRequest = new Request(event.request, {
          headers: modifiedHeaders,
          mode: event.request.mode === 'navigate' ? 'navigate' : event.request.mode,
          credentials: event.request.credentials,
          redirect: 'manual' // Redirect safety network loop break korar jonno
        });

        // Request-ti server e pathano holo, fail korle cache fallback hobe
        return fetch(modifiedRequest).catch(() => caches.match(event.request));
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});

// 3. Purono Cache Clear Kora
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
