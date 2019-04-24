# README

## Setup pruebas

### Mapbox with D3

> D3 sobre un mapa de mapbox. Se grafican polígonos de un topoJSON.

Abrir el archivo montando un servidor local. Una forma sencilla de hacerlo es con `http-server` en node. Pre-requisito: instalar [node](https://nodejs.org/es/download/).

```bash
npm install http-server -g
cd ../mapbox_with_D3
http-server
```

Luego en el navegador ir a [localhost:8080](localhost:8080) y seleccionar el archivo html.

1. Generar grilla con /tools/geoJson_grid

   abrir `index.html`

   Se genera el arvhivo `grid.json` en formato geoJSON.

2. Recortar grilla con máscara del predio
   POR HACER... usar [esto](https://github.com/mfogel/geojson-clipping)

3. Convertir geoJSON a topoJSON

   ```bash
   npm install topojson-server -g
   geo2topo geojson-grid.json > topojson-grid.json
   ```



## Por hacer

- [x] Cargar mapa de mapbox
- [x] Overlay de D3
- [x] Graficar puntos con D3
- [x] Convertir topoJSON a geoJSON
- [x] Cargar polígonos de un geoJSON
- [x] Generar topoJSON con valor de temperatura por celda
- [ ] Mostrar valor de temperatura por celda en color
- [ ] Mostrar simbología
- [ ] Desplegar valor onHover
- [ ] Desplegar ventana con valor secundario onClick
- [ ] Poder mostrar puntos y áreas de forma simultánea

## Herramientas

Se encuentran en la carpeta `./tools`

- shapefile: librería para convertir `.shp` a geoJSON
- geoJSON-grid: versión de [geojson-grid](https://github.com/cityofaustin/geojson-grid) que modifiqué con la que se puede crear una grilla en formato geoJSON.

## Notas

- The `d3.geoInterpolate()` method creates a function that accepts input between 0 and 1 and interpolates between two `[lon, lat]` locations. [Fuente](https://d3indepth.com/geographic/)