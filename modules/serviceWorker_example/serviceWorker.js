const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "https://zhoricc3398.github.io/ugt-csp/modules/serviceWorker_example/",
  "https://zhoricc3398.github.io/ugt-csp/modules/serviceWorker_example/index.html",
  "https://zhoricc3398.github.io/ugt-csp/modules/serviceWorker_example/css/style.css",
  "https://zhoricc3398.github.io/ugt-csp/modules/serviceWorker_example/js/app.js",
  "https://zhoricc3398.github.io/ugt-csp/modules/serviceWorker_example/images/coffee1.jpg",
  "https://zhoricc3398.github.io/ugt-csp/modules/serviceWorker_example/images/coffee2.jpg",
  "https://zhoricc3398.github.io/ugt-csp/modules/serviceWorker_example/images/coffee3.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  )
})