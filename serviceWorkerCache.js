self.addEventListener('install', (function(event){
    event.waitUntil(
        caches.open('restaurants-cache').then(function(cache){
           return cache.addAll([
               '/',
               'index.html',
               'restaurant.html',
               'js/main.js',
               'js/dbhelper.js',
               'js/restaurant_info.js',
               'css/styles.css',
               'data/restaurants.json',
               'images/1-1600_large_2x.jpg',
               'images/2-1600_large_2x.jpg',
               'images/3-1600_large_2x.jpg',
               'images/4-1600_large_2x.jpg',
               'images/5-1600_large_2x.jpg',
               'images/6-1600_large_2x.jpg',
               'images/7-1600_large_2x.jpg',
               'images/8-1600_large_2x.jpg',
               'images/9-1600_large_2x.jpg',
               'images/10-1600_large_2x.jpg'

           ])
        })
    )
}));


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurants-') &&
                        !allCaches.includes(cacheName);
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});