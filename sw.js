const V = 'mise-v2';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    // Network first so updates arrive, cache as the offline fallback.
    e.respondWith(fetch(r).then(res => {
      const copy = res.clone();
      caches.open(V).then(c => c.put(r, copy));
      return res;
    }).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
  } else if (u.host === 'fonts.googleapis.com' || u.host === 'fonts.gstatic.com') {
    // Fonts: serve from cache, refresh in the background.
    e.respondWith(caches.open(V).then(c => c.match(r).then(hit => {
      const net = fetch(r).then(res => { c.put(r, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
