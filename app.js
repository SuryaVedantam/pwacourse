if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function(){
    console.log('Service worker registered!');
  });

}

//before prompt install banner we will stop and show our banner to install
window.addEventListener("beforeinstallprompt", function(event){
  console.log("Before install prompt fired...!", event);
  event.preventDefault();
  
});
