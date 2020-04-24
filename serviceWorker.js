const bigProject = "big-project-v1"
//stores all of the files so that it can be accessed offline
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/images/virus.jpg",
]

//installs the service worker
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(bigProject).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})