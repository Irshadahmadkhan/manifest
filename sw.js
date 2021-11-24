/*importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('irshad').then(function(cache) {
     return cache.addAll([
       './',
       './index.php',
       './include/main.css',
       './include/theme.css',
       './include/main.js',
       './img/menu.png'
     ]);
   })
 );
});


self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
alert(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
*/

const version = "0.1.12";
const cacheName = `irshad-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
       './',
       './index.php',
       './include/main.css',
       './include/theme.css',
       './include/main.js',
       './img/menu.png',
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
