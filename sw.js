var CACHE_STATIC_NAME = 'static-v4';
var CACHE_DYNAMIC_NAME = 'dynamic';

self.addEventListener('install',function(event){
  console.log("[ServiceWorker] Installing service worker...", event);
  event.waitUntil(
  caches.open(CACHE_STATIC_NAME).then(function(cache){
       console.log("[ServiceWorker] Pre caching...", cache);
    cache.addAll(['/pwacourse/',
                  '/pwacourse/app.css',
                  '/pwacourse/index.html',
                  '/pwacourse/app.js'
                  ]);
  })
  );
  
});

self.addEventListener('activate',function(event){
  console.log("[ServiceWorker] Activating service worker...", event);
   event.waitUntil(
     caches.keys().then(function(keyList){
       return Promise.all(keyList.map(function(key){
          if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
             console.log("[ServiceWorker] Removing cache...", key);
            caches.delete(key);
          }
       }))
     })
     );
  
  
  return self.clients.claim();
});

self.addEventListener('fetch',function(event){
  console.log("[ServiceWorker] Fetching something...", event);
  event.respondWith(
    caches.match(event.request).then(function(response){
       if(response) return response;
       else fetch(event.request).then(function(res){
          return caches.open(CACHE_DYNAMIC_NAME).then(function(cache){
           // cache.put(event.request.url,res.clone());
            return res;
          }).catch(function(err){
           console.log("Error", err);
          })
       });
    }));
});
