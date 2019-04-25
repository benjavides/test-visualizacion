//////////////////
// Mapbox stuff
//////////////////
// Set-up map
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGl0b3N0IiwiYSI6ImQtcVkyclEifQ.vwKrOGZoZSj3N-9MB6FF_A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    zoom: 15,
    center: [-70.6109, -33.5005],
});
//////////////////////////
// Mapbox+D3 Connection
//////////////////////////
// Get Mapbox map canvas container
var canvas = map.getCanvasContainer();
// Overlay d3 on the map
var svg = d3.select(canvas).append("svg");
// Projection functions
var transform = d3.geo.transform({ point: projectPoint });
var path = d3.geo.path().projection(transform);
// Load map and dataset
map.on('load', function () {
    d3.json("data/geojson-area.json", function (err, data) {
        drawData(data);
    });

/*    map.addLayer(d3.json("data/geojson-ruta.json", function (err, data) {
        drawData(data);
    })); */

    map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
        "type": "geojson",
        "data": "./data/geojson-ruta.json"
        },
        "layout": {
        "line-join": "round",
        "line-cap": "round"
        },
        "paint": {
        "line-color": "#2513f0",
        "line-width": 8
        }
    });

    map.addLayer({
        "id": "route2",
        "type": "line",
        "source": {
        "type": "geojson",
        "data": "./data/geojson-ruta2.json"
        },
        "layout": {
        "line-join": "round",
        "line-cap": "round"
        },
        "paint": {
        "line-color": "#eb2626",
        "line-width": 8
        }
    });



}); /*
map.on('load', function () {
    d3.json("data/geojson-ruta.json", function (err, data) {
        drawData(data);
    });
}); */
// Project GeoJSON coordinate to the map's current state
function project(d) {
    return map.project(new mapboxgl.LngLat(+d[0], +d[1]));
}
// Project any point (lon, lat) to map's current state
function projectPoint(lon, lat) {
    var point = map.project(new mapboxgl.LngLat(lon, lat));
    this.stream.point(point.x, point.y);
}
//////////////
// D3 stuff
//////////////
// Draw GeoJSON data with d3
var polygons;
function drawData(data) {
    console.log("draw data");
    // Add polygons
    polygons = svg.selectAll("path")
        .data([data])
        .enter()
        .append("path");
    // Call the update function
    update();
    // Update on map interaction
    map.on("viewreset", update);
    map.on("move", update);
    map.on("moveend", update);
}
// Update d3 shapes' positions to the map's current state
function update() {
    console.log("update");
    polygons.attr("d", path);
}
