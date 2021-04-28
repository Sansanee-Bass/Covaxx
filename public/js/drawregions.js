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

    map.addLayer({
        'id': 'region-borders',
        'type': 'line',
        'source': 'regions',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 1
        }
    });

    // When the user moves their mouse over the region-fill layer, we'll update the
    // feature state for the feature under the mouse.
    map.on('mousemove', function (e) {
        var regions = map.data(e.point, {
            layers: ['region-borders']
        });
        console.log(regions);
        if (regions.length > 0) {
            document.getElementById('pd').innerHTML = '<h3><strong>' + region - borders[0].properties.engname + '</strong></h3><p><strong><em>';
        } else {
            document.getElementById('pd').innerHTML = '<p>Hover over a Region!</p>';
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