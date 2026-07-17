const CACHE_NAME = 'pythonai-v1';
const STATIC_ASSETS = [
    '/',
    '/static/css/style.css',
    '/static/js/api.js',
    '/static/js/auth.js',
    '/static/js/components.js',
    '/static/js/pages.js',
    '/static/js/app.js',
    '/static/manifest.json',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) {
        event.respondWith(networkFirst(event.request));
    } else {
        event.respondWith(cacheFirst(event.request));
    }
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached || fetch(request);
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
        return response;
    } catch (error) {
        const cached = await caches.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}
