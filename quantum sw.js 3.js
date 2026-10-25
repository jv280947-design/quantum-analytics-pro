/*
 * Quantum Analytics Pro · Service Worker
 *
 * Estrategia:
 *  - Instalación: precarga el "app shell" (HTML, manifiesto, iconos) para funcionar sin conexión.
 *  - Navegaciones: sirve index.html desde caché al instante y lo actualiza en segundo plano.
 *  - Resto de recursos propios: caché primero, red como respaldo.
 *  - Recursos de otros orígenes (enlaces a WhatsApp, Telegram, etc.) no se interceptan.
 *  - Al publicar una nueva versión, cambia VERSION para renovar la caché.
 */

const VERSION = 'v1.0.0';
const CACHE_PREFIX = 'quantum-analytics-pro-';
const CACHE_NAME = CACHE_PREFIX + VERSION;

// Base de la aplicación: funciona en la raíz o en una subcarpeta (p. ej. GitHub Pages)
const BASE_URL = new URL('./', self.location.href).href;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
].map((ruta) => new URL(ruta, BASE_URL).href);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(
        claves
          .filter((clave) => clave.startsWith(CACHE_PREFIX) && clave !== CACHE_NAME)
          .map((clave) => caches.delete(clave))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(BASE_URL)) return;

  if (request.mode === 'navigate') {
    event.respondWith(responderNavegacion(event));
  } else {
    event.respondWith(responderCachePrimero(event));
  }
});

async function responderNavegacion(event) {
  const cache = await caches.open(CACHE_NAME);
  const urlIndex = new URL('./index.html', BASE_URL).href;
  const enCache = await cache.match(urlIndex);

  // Pide la versión más reciente y la guarda para la próxima carga
  const actualizacion = fetch(event.request)
    .then((respuesta) => {
      if (respuesta.ok) {
        cache.put(urlIndex, respuesta.clone());
      }
      return respuesta;
    })
    .catch(() => null);

  if (enCache) {
    event.waitUntil(actualizacion);
    return enCache;
  }

  const red = await actualizacion;
  return red || respuestaSinConexion();
}

async function responderCachePrimero(event) {
  const { request } = event;
  const cache = await caches.open(CACHE_NAME);
  const enCache = await cache.match(request, { ignoreSearch: true });
  if (enCache) return enCache;

  try {
    const respuesta = await fetch(request);
    if (respuesta.ok && respuesta.type === 'basic') {
      event.waitUntil(cache.put(request, respuesta.clone()));
    }
    return respuesta;
  } catch (error) {
    return respuestaSinConexion();
  }
}

function respuestaSinConexion() {
  return new Response('Recurso no disponible sin conexión', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
