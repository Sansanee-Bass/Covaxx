drawregions = function (map, region_map) {

    let features = region_map.features;

    // region_map.features.forEach(geo => {

    // });
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

    map.on('mousemove', function (e) {

        var features = map.queryRenderedFeatures(e.point);

        features.forEach((feat) => {
            if (feat.layer.id == "health-regions-4zxzxv") {
                //console.log(feat);
                document.getElementById('features').innerHTML = feat.properties.ENGNAME;
            }

        });



        // map.on('mousemove', function (e) {
        //     var features = map.queryRenderedFeatures(e.point);

        //     // Limit the number of properties we're displaying for
        //     // legibility and performance
        // var displayProperties = [
        //     'type',
        //     'properties',
        //     'id',
        //     'layer',
        //     'source',
        //     'sourceLayer',
        //     'state'
        // ];
            var displayProperties = [
                'properties',
                'state'
            ];

        var displayFeatures = features.map(function (feat) {
            var displayFeat = {};
            displayProperties.forEach(function (prop) {
                displayFeat[prop] = feat[prop];
            });
            return displayFeat;
        });

        if (displayFeatures[0] != undefined && displayFeatures[0].properties.ENGNAME != undefined) {
            document.getElementById('features').innerHTML = displayFeatures[0].properties.ENGNAME;
        }
    });


    // if (e.features.length > 0) {
    //     if (hoveredStateId !== null) {
    //         map.setFeatureState(
    //             { source: 'mapdata.data', id: hoveredStateId },
    //             { hover: false }
    //         );
    //     }
    //     hoveredStateId = e.features[0].id;
    //     map.setFeatureState(
    //         { source: 'mapdata.data', id: hoveredStateId },
    //         { hover: true }
    //     );
    // }


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