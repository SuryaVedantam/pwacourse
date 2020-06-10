var deferredPrompt;

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function(){
    console.log('Service worker registered!');
  });

}

//before prompt install banner we will stop and show our banner to install
window.addEventListener("beforeinstallprompt", function(event){
  console.log("Before install prompt fired...!", event);
  event.preventDefault();
  deferredPrompt = event;
  return false;
});


fetch("https://suryaphani1729.github.io/myresources/cart.json").then(function(response){
  console.log(response);
 return response.json();
}).then(function(res){
   var data = "<ul>";
   for(var i=0;i<res.data.length;i++) {
     data += "<li>"+res.data[i].title+"</li>";
   };
  data += "</ul>";
  document.getElementById("data").innerHTML = data;
});

document.getElementById("cacheBtn").addEventListener("click", function(event){
 console.log("clicked");
});


document.getElementById("myBtn").addEventListener("click", function(event){
  if(deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult){
      console.log("Outcome", choiceResult.outcome);
       if(choiceResult.outcome === "dismissed") {
          console.log("User cancelled installation"); 
       }else {
         console.log("User added to home screen"); 
         
       }
      
    });
    deferredPrompt = null;
  }


});
