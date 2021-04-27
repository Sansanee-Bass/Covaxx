drawregions = function (map, region_map) {

    let features = region_map.features;

    // region_map.features.forEach(geo => {

    // });
    let hoveredStateId = null;

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
    // console.log(region_map.features[0].geometry.coordinates);

    // Add a new layer to visualize the polygon.
    map.addLayer({
        'id': 'region-fills',
        'type': 'fill',
        'source': 'regions', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        }
    });

    // Add a black outline around the polygon.
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
    map.on('mousemove', 'region-fills', function (e) {
        console.log(mapdata.data);
        if (e.features.length > 0) {
            if (hoveredStateId !== null) {
                map.setFeatureState(
                    { source: 'mapdata.data', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
                { source: 'mapdata.data', id: hoveredStateId },
                { hover: true }
            );
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