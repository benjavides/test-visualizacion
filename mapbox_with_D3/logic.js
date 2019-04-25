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



/*
map.on('load', function () {
    d3.json("data/topojson-grid.json", function (err, data) {
        //Convertimos topoJSON a geoJSON
        var data = topojson.feature(data, data.objects.zonas);
        drawData(data);
    });
});



*/
map.on('load', function () {
     map.addLayer({
        "id": "grid",
        "type": "fill",
        "source": {
        "type": "geojson",
        "data": "./data/geojson-grid.json"
        },
        "paint": {
            //"fill-color": "#00ffff",
            "fill-color": [
                'match',
                ['get', 'main_value'],
                '10', '#FF5733',
                '11', '#fbb03b',
                '12', '#fbb03b',
                '13', '#fbb03b',
                '25', '#3CB371',
                /* other */ '#ccc'
            ],
            "fill-opacity": 0.5

        //    "fill-color": "#00ffff",
        //    "line-color": "#e55e5e",


        //    "line-width": 2
        }
    });

/*
    map.addLayer({
        "id": "earthquakes-heat",
        "type": "heatmap",
        "source": {
            "type": "geojson",
            "data": "./data/geojson-grid2.json"
        },
        "maxzoom": 9,
        "paint": {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["main_value", "secondary_value"],
                0, 0,
                6, 1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 1,
                9, 3
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(33,102,172,0)",
                0.2, "rgb(103,169,207)",
                0.4, "rgb(209,229,240)",
                0.6, "rgb(253,219,199)",
                0.8, "rgb(239,138,98)",
                1, "rgb(178,24,43)"
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 2,
                9, 20
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, 1,
                9, 0
            ],
        }
    }, 'waterway-label');


    map.addLayer({
        "id": "earthquakes-point",
        "type": "circle",
        "source": {
            "type": "geojson",
            "data": "./data/geojson-grid2.json"
        },
        "minzoom": 7,
        "paint": {
        // Size circle radius by earthquake magnitude and zoom level
        "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        7, [
        "interpolate",
        ["linear"],
        ["get", "mag"],
        1, 1,
        6, 4
        ],
        16, [
        "interpolate",
        ["linear"],
        ["get", "mag"],
        1, 5,
        6, 50
        ]
        ],
        // Color circle by earthquake magnitude
        "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "mag"],
        1, "rgba(33,102,172,0)",
        2, "rgb(103,169,207)",
        3, "rgb(209,229,240)",
        4, "rgb(253,219,199)",
        5, "rgb(239,138,98)",
        6, "rgb(178,24,43)"
        ],
        "circle-stroke-color": "white",
        "circle-stroke-width": 1,
        // Transition from heatmap to circle layer by zoom level
        "circle-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        7, 0,
        8, 1
        ]
        }
    }, 'waterway-label');

    */
});




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
