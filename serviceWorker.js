const CACHE_NAME = 'big-project-v2';
//stores all of the files so that it can be accessed offline
//you don't type in index.html the first time, so include ./
//sometimes you want to show people with index.html
let urlsToCache = [
  './',
  './index.html',
  'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css',
  'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  './icons/android-chrome-192x192.png',
  './icons/android-chrome-512x512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-16x16.png',
  './icons/favicon-32x32.png',
  'https://unpkg.com/dexie@latest/dist/dexie.js'
];

//installs the service worker
//install, put these stuff into cache
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//deletes all unwated cache
self.addEventListener('activate', (event) => {
  console.log("activating");
  let cacheWhitelist = ['big-project-v2'];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//look at cache first, if not there then fetch it
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        // if you make changes and refresh, it won't show up. Make sure you either delete the cache or 
        // comment this code out
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

