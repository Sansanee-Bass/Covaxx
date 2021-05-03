

let getRegions = async () => {
    let req = await fetch("/api/regions");
    let data = await req.text();
    var regions = JSON.parse(data).data;

    fetch(`/api/reports?region=2407&date=2021-04-28`);
    regions.forEach(element => {
        // console.log("Requesting region" + element.hr_uid);

        // fetch(`/api/reports?region=${element.hr_uid}&date=2021-04-28`);
        // document.getElementById('regions').innerHTML += `<div id="${element.hr_uid}">${element.hr_uid} ${element.province} ${element.engname}</div>`;
    });

}

window.onload = async () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVpbHdpY2siLCJhIjoiY2trend6anJtMGw3OTJxcDVobjAzMXF0NyJ9.GdU99dksEsLt6TlpXlODVQ';
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/neilwick/cko1q3iet15ch17ohs0tpw1qz', // style URL
        center: [-96.5, 55], // starting position [lng, lat]
        zoom: 3, // starting zoom
        minZoom: 3,
        maxZoom: 22
    });

    console.log(map);
    getRegions();
    let region_map = await readGeojson();
    map.on('load', () => {
        drawregions(map, region_map)

        map.addLayer({
            'id': 'region-fills',
            'type': 'fill',
            'source': 'regions',
            'layout': {},
            'paint': {
                'fill-color': '#CC7890',
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    0.5,
                    0.0
                ]
            }
        });
    });

};

let readGeojson = async function () {

    let response = await fetch('/geojson/health_regions.geojson');

    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return await response.json();

}


