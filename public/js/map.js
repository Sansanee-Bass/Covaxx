mapboxgl.accessToken = 'pk.eyJ1IjoibmVpbHdpY2siLCJhIjoiY2trend6anJtMGw3OTJxcDVobjAzMXF0NyJ9.GdU99dksEsLt6TlpXlODVQ';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/neilwick/cknkdys7t0g6m17o64ppw9dia', // style URL
    center: [-96.5, 55], // starting position [lng, lat]
    zoom: 2.8 // starting zoom
});

let getRegions = async () => {
    let req = await fetch("/api/regions");
    let data = await req.text();
    var regions = JSON.parse(data).data;

    //let parsed = new window.DOMParser().parseFromString(data, 'text/xml');
    // let regions = parsed;//.querySelectorAll();

    console.log(regions.length);
    regions.forEach(element => {
        console.log(element.hr_uid + " " + element.province + " " + element.engname);
        document.getElementById('regions').innerHTML += `<div id="${element.hr_uid}">${element.hr_uid} ${element.province} ${element.engname}</div>`;
    });
}

window.onload = async () => {
    getRegions();
    // let location = false;
    // let tracker;
    // if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition((p) => {
    //         console.log(p.coords);
    //         location = true;
    //         map.setCenter({ lon: p.coords.longitude, lat: p.coords.latitude });
    //     });
    // }

    // if (!location) {
    //     // geolocation not available
    //     if ('geolocation' in navigator) {
    //         let allowGeo = await navigator.permissions.query({ name: 'geolocation' });
    //         if (allowGeo.state == "prompt") {
    //             allowGeo.onchange = (e) => {
    //                 if (e.target.state == "granted") {

    //                     //console.log(e);
    //                     navigator.geolocation.getCurrentPosition((p) => {
    //                         console.log(p.coords);
    //                         location = true;
    //                         map.setCenter({ lon: p.coords.longitude, lat: p.coords.latitude });
    //                     });

    //                 }
    //             };
    //         }
    //     }
    //     // getServerGeo();
    // };
};
