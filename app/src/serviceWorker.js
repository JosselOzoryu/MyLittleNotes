var cacheName = "MyLittleNotes";
var filesToCache = ["./index.html", "./styles.css", "./main.js"];

self.addEventListener("install", function(e) {
  // e.waitUntil(
  caches.open(cacheName).then(
    function(cache) {
      return cache.addAll(filesToCache);
    }
    // )
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin === location.url) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkFirst(req));
  }
});

const cache = req => {
  const cacheResponse = caches.match(req);
  return cacheResponse || fetch(req);
};

const network = async req => {
  const cache = await caches.open("dynamic-cache");
  try {
    //TODO catch the error from fetch
    const res = await fetch(req);
    cache
      .put(req, res.clone())
      .then(() => console.log("cached successfully"))
      .catch(err => console.log(err));
    return res;
  } catch (err) {
    return await cache.match(req);
  }
};
