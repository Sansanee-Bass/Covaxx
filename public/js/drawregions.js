drawregions = function (map, region_map) {

    let features = region_map.features;

    // region_map.features.forEach(geo => {

    // });

    let mapdata = {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': features
        }
    };

    map.addSource(
        'testregion',
        mapdata
    );
    console.log(region_map.features[0].geometry.coordinates);

    // Add a new layer to visualize the polygon.
    map.addLayer({
        'id': 'testregion',
        'type': 'fill',
        'source': 'testregion', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        }
    });

    // Add a black outline around the polygon.
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'testregion',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 3
        }
    });
}