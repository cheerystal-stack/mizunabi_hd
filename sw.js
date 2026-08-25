const CACHE='aimizu-v3';
const ASSETS=[
  './','./index.html','./manifest.json',
  './assets/icon-192.png','./assets/icon-512.png','./mascot.PNG',
  './assets/med_water.png','./assets/cup_water.png','./assets/tea.png',
  './assets/coffee.png','./assets/milk.png','./assets/bottle.png',
  './assets/soup.png','./assets/other.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
