
self.addEventListener('install',function(event){
  console.log("[ServiceWorker] Installing service worker...", event);
  event.waitUntil(
  caches.open('static').then(function(cache){
       console.log("[ServiceWorker] Pre caching...", cache);
    cache.add('/pwacourse/');
    cache.add('/pwacourse/app.css');
    cache.add('/pwacourse/index.html');
      cache.add('/pwacourse/app.js');
  })
  );
  
});

self.addEventListener('activate',function(event){
  console.log("[ServiceWorker] Activating service worker...", event);
  return self.clients.claim();
});

self.addEventListener('fetch',function(event){
  console.log("[ServiceWorker] Fetching something...", event);
  event.respondWith(
    caches.match(event.request).then(function(response){
       if(response) return response;
       else fetch(event.request);
    }));
});
