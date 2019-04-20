# README

## Setup pruebas

### Google Map Overlay

> D3 sobre un mapa de google maps

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

### Reading topoJSON

> Leer un archivo en formato topoJSON (vendría en ese formato del servidor) y mostrarlo usando D3.

Todavía no sé cómo hacer que el zoom inicial sea aquel que muestra de cerca todas las figuras dibujadas, por eso al correr esta prueba pareciera que no hay nada, pero al hacer zoom se puede encontrar un polígono negro.

Me [basé](https://www.youtube.com/watch?v=045-bsOsbJc) en este tutorial.

Dibujé un geoJSON usando [esta](http://geojson.io/#map=16/-33.4991/-70.6125) página, el resultado lo copié en el archivo `geojson.json`

Para crear el topoJSON (que llegaría del servidor) usé:

```bash
npm install topojson-server -g
geo2topo zonas=geojson.json > topojson.json
```

Más instrucciones [aqui](https://github.com/topojson/topojson-server/blob/master/README.md#geo2topo)

### Reading topoJSON con Overlay (Intento 1)

Intenté combinar las 2 pruebas anteriores, pero no me ha funcionado.

## Por hacer

- [x] Cargar mapa de google maps
- [x] Graficar puntos con D3
- [x] Overlay de D3
- [ ] Cargar topoJSON
- [ ] Graficar un área cuyos vértices sean los puntos especificados

## Herramientas

Se encuentran en la carpeta `./tools`

- shapefile: librería para convertir `.shp` a geoJSON

## Notas

- The `d3.geoInterpolate()` method creates a function that accepts input between 0 and 1 and interpolates between two `[lon, lat]` locations. [Fuente](https://d3indepth.com/geographic/)