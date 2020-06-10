
self.addEventListener('install',function(event){
  console.log("[ServiceWorker] Installing service worker...", event);
  event.waitUntil(
  caches.open('static').then(function(cache){
       console.log("[ServiceWorker] Pre caching...", cache);
      cache.add('/pwacourse/app.js');
  });
  );
  
});

self.addEventListener('activate',function(event){
  console.log("[ServiceWorker] Activating service worker...", event);
  return self.clients.claim();
});

self.addEventListener('fetch',function(event){
  console.log("[ServiceWorker] Fetching something...", event);
  event.respondWith(fetch(event.request));
});
