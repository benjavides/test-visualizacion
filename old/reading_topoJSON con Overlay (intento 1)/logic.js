var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.4999668,
            lng: -70.613886
        },
        zoom: 17
    });
    initD3();
}
function initD3() {
    
    d3.queue()
        .defer(d3.json, "topojson.json")
        .await(function (error, world) {
            if (error) {
                console.error('Oh dear, something went wrong: ' + error);
            }
            else {
                drawMap(world);
            }
        });
}

function drawMap(world) {
    var svg = d3.select("body")
        .append("svg")
    var mapa = svg.append("g")
        .attr("class", "map");
    var overlay = new google.maps.OverlayView();
    // Add the container when the overlay is added to the map.
    overlay.onAdd = function () {
        var layer = d3.select(this.getPanes().overlayLayer).append("div")
            .attr("class", "stations");
        
        overlay.draw = function () {
            var projection = this.getProjection(),
                padding = 10;
            
            // geoPath projection
            var path = d3.geoPath().projection(projection);

            // //colors for population metrics
            // var color = d3.scaleThreshold()
            //     .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
            //     .range(["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"]);

            var features = topojson.feature(world, world.objects.zonas).features;
            // var populationById = {};

            // data.forEach(function (d) {
            //     populationById[d.country] = {
            //         total: +d.total,
            //         females: +d.females,
            //         males: +d.males
            //     }
            // });
            // features.forEach(function (d) {
            //     d.details = populationById[d.properties.name] ? populationById[d.properties.name] : {};
            // });

            mapa.append("g")
                .selectAll("path")
                .data(features)
                .enter().append("path")
                .attr("name", function (d) {
                    return d.properties.name;
                })
                .attr("id", function (d) {
                    return d.id;
                })
                .attr("d", path)
                .style("fill", "purple")
                .style("stroke", "black")
        }
    }
    // Bind our overlay to the map…
    overlay.setMap(map);
    
}
