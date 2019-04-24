1. Generar grilla con /tools/geoJson_grid

   abrir `index.html`

   Se genera el arvhivo `grid.json` en formato geoJSON.

2. Recortar grilla con máscara
   POR HACER

3. Convertir geoJSON a topoJSON

   ```bash
   npm install topojson-server -g
   geo2topo geojson-grid.json > topojson-grid.json
   ```

