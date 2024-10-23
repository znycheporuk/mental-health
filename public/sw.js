const CACHE_NAME = "assets";
const CACHE_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000;

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			const fetchPromise = fetch(event.request).then(
				async (networkResponse) => {
					const headers = new Headers(networkResponse.headers);
					headers.set("x-last-used-time", Date.now().toString());
					const bodyBuffer = await networkResponse.blob();
					const updatedNetworkResponse = new Response(bodyBuffer, {
						status: networkResponse.status,
						statusText: networkResponse.statusText,
						headers: headers,
					});
					const cache = await caches.open(CACHE_NAME);
					await cache.put(event.request, updatedNetworkResponse.clone());
					return updatedNetworkResponse.clone();
				},
			);
			if (cachedResponse) {
				const headers = new Headers(cachedResponse.headers);
				headers.set("x-last-used-time", Date.now().toString());
				cachedResponse
					.clone()
					.blob()
					.then((bodyBuffer) => {
						const updatedResponse = new Response(bodyBuffer, {
							status: cachedResponse.status,
							statusText: cachedResponse.statusText,
							headers: headers,
						});
						caches
							.open(CACHE_NAME)
							.then((cache) => cache.put(event.request, updatedResponse));
					});
			}
			return cachedResponse || fetchPromise;
		}),
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(async (cache) => {
			const keys = await cache.keys();
			for (const request of keys) {
				const response = await cache.match(request);
				if (response) {
					const lastUsedTime = +(response.headers.get("x-last-used-time") ?? 0);
					if (Date.now() - lastUsedTime > CACHE_EXPIRATION_TIME) {
						await cache.delete(request);
					}
				}
			}
		}),
	);
});
