# README

En la línea 24 de `basic_googleMap_Overlay.html` reemplazar API_KEY por la que mandé por slack.

Si abrimos `basic_googleMap_Overlay.html` en el navegador va a mostrar el siguiente error:

> d3.v3.min.js:1 Access to XMLHttpRequest at 'file:///...%20Local/stations.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.

Para evitarlo hay que abrir el archivo montando un servidor local. Una forma sencilla de hacerlo es con `http-server` en node. Pre-requisito: instalar [node](https://nodejs.org/es/download/).

```bash
npm install http-server -g
cd ../GoogleMaps with D3 Overlay - Local
http-server
```

Luego en el navegador ir a [localhost:8080](localhost:8080) y seleccionar el archivo html.

# Por hacer

- [x] Cargar mapa de google maps
- [x] Graficar puntos con D3
- [x] Overlay de D3
- [ ] Graficar un área cuyos vértices sean los puntos especificados