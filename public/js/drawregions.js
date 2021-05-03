drawregions = function (map, region_map) {

    let features = region_map.features;

    var hoveredStateId = null;

    let mapdata = {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': features
        }
    };

    map.addSource(
        'regions',
        mapdata
    );

    // map.addLayer({
    //     'id': 'region-borders',
    //     'type': 'line',
    //     'source': 'regions',
    //     'layout': {},
    //     'paint': {
    //         'line-color': '#FFF',
    //         'line-width': 1
    //     }
    // });

    // When the user moves their mouse over the region-fill layer, we'll update the
    // feature state for the feature under the mouse.
    map.on('mousemove', 'region-fills', function (e) {
        if (e.features.length > 0) {
            if (hoveredStateId !== null) {
                map.setFeatureState(
                    { source: 'regions', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
                { source: 'regions', id: hoveredStateId },
                { hover: true }
            );
        }
    });

    map.on('mouseleave', 'region-fills', function () {
        if (hoveredStateId !== null) {
            map.setFeatureState(
                { source: 'regions', id: hoveredStateId },
                { hover: false }
            );
        }
        hoveredStateId = null;
    });

    map.on('mousemove', function (e) {

        var features = map.queryRenderedFeatures(e.point);

        features.forEach((feat) => {
            if (feat.layer.id == "health-regions-4zxzxv") {
                document.getElementById('features').innerHTML = feat.properties.ENGNAME;
            }
        });

        var displayProperties = [
            'properties',
            'state'
        ];

        // let el = document.getElementById('features')[0];
        // el.style.backgroundColor = "red";

        var displayFeatures = features.map(function (feat) {
            var displayFeat = {};
            displayProperties.forEach(function (prop) {
                displayFeat[prop] = feat[prop];
            });
            return displayFeat;
        });

        let thisFeature = displayFeatures[0];

        if (thisFeature != undefined && thisFeature.properties.ENGNAME != undefined) {

            if (thisFeature.properties.HR_UID.substring(0, 2) == "59" || thisFeature.properties.HR_UID.substring(0, 2) == "47") {
                document.getElementById('pd').innerHTML = '<h2>' + thisFeature.properties.ENGNAME + "</h2>";
                document.getElementById('pd').innerHTML += "<h3>Regional reports not available for this province.</h3>";
            } else {

                latest = getRecent(thisFeature.properties.HR_UID);
                latest.then(value => {
                    console.log("LATEST: ", value);
                    document.getElementById('pd').innerHTML = "";
                    document.getElementById('pd').innerHTML = '<h2>' + thisFeature.properties.ENGNAME + "</h2>";
                    document.getElementById('pd').innerHTML += '<h3>Total cases: </h3>';

                    var sum = 0;
                    for (let x = 0; x < value.length; x++) {
                        sum += value[x].total_cases;
                    }
                    document.getElementById('pd').innerHTML += "<p>" + sum / value.length + "</p>";

                    document.getElementById('pd').innerHTML += '<h3>Total hospitalizations:  </h3>';

                    var sum = 0;
                    for (let x = 0; x < value.length; x++) {
                        sum += value[x].total_hospitalizations;
                    }
                    document.getElementById('pd').innerHTML += "<p>" + sum / value.length + "</p>";


                    document.getElementById('pd').innerHTML += "<h3>Total recoveries: </h3>";

                    var sum = 0;
                    for (let x = 0; x < value.length; x++) {
                        sum += value[x].total_recoveries;
                    }
                    document.getElementById('pd').innerHTML += "<p>" + sum / value.length + "</p>";
                });
            }
        }
    });

    // When the mouse leaves the region-fill layer, update the feature state of the
    // previously hovered feature.
    map.on('mouseleave', 'region-fills', function () {
        if (hoveredStateId !== null) {
            map.setFeatureState(
                { source: 'mapdata.data', id: hoveredStateId },
                { hover: false }
            );
        }
        hoveredStateId = null;
    });

}

let getRecent = async (region) => {
    let req = await fetch(`/api/recent?region=${region}`);
    let data = await req.text();
    var rept = JSON.parse(data);
    return rept;
}
