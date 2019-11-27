var cacheName = "MyLittleNotes";
var filesToCache = ["./index.html", "./styles.css", "./main.js"];

self.addEventListener("install", function(e) {
  e.waitUntil(
  caches.open(cacheName).then(
    function(cache) {
      return cache.addAll(filesToCache);
    }
    )
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin === location.url) {
    e.respondWith(asavedCache(req));
  } else {
    e.respondWith(savedNetwork(req));
  }
});

const savedCache = req => {
  const cacheResponse = caches.match(req);
  return cacheResponse || fetch(req);
};

const savedNetwork = async req => {
  const cache = await caches.open("dynamic-cache");
  try {
    //TODO catch the error from fetch
    const res = await fetch(req);
    cache
      .put(req, res.clone())
    return res;
  } catch (err) {
    return await cache.match(req);
  }
};
