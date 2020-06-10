
self.addEventListener('install',function(event){
  console.log("[ServiceWorker] Installing service worker...", event);
  event.waitUntil(
  caches.open('static-v2').then(function(cache){
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
          if(key !== 'static-v2' && key !== 'dynamic') {
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
          return caches.open('dynamic').then(function(cache){
            cache.put(event.request.url,res.clone());
            return res;
          }).catch(function(err){
           console.log("Error", err);
          })
       });
    }));
});
