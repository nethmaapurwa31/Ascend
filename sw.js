const CACHE = 'ascend-v1self.addEventListener('install', e => self.skipWaiting());

self.addEventListener('activate', e => e.waitUntil(clients.cl()));

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(hit =>
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => hit)
    )
  );
});
