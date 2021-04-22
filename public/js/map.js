mapboxgl.accessToken = 'pk.eyJ1IjoibmVpbHdpY2siLCJhIjoiY2trend6anJtMGw3OTJxcDVobjAzMXF0NyJ9.GdU99dksEsLt6TlpXlODVQ';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/neilwick/cknkdys7t0g6m17o64ppw9dia', // style URL
    center: [-75, 45], // starting position [lng, lat]
    zoom: 15 // starting zoom
});

let getHydrants = async () => {
    let req = await fetch("/api/hydrantsx");
    let data = await req.text();
    let parsed = new window.DOMParser().parseFromString(data, 'text/xml');

    let hydrants = parsed.querySelectorAll("GEOM");

    //console.log(hydrants.length);
    hydrants.forEach((el) => {
        let loc = el.innerHTML;
        // POINT (-75.738712 45.500612)
        loc = loc.substring(7, loc.length - 1).split(' ');
        //console.log(loc);

        var marker = new mapboxgl.Marker()
            .setLngLat([loc[0], loc[1]])
            .addTo(map);
    });


    // 
    //     console.log(el.innerHTML);
    // });


}

window.onload = async () => {
    getHydrants();
    let location = false;
    let tracker;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((p) => {
            console.log(p.coords);
            location = true;
            map.setCenter({ lon: p.coords.longitude, lat: p.coords.latitude });
        });
    }

    if (!location) {
        // geolocation not available
        if ('geolocation' in navigator) {
            let allowGeo = await navigator.permissions.query({ name: 'geolocation' });
            if (allowGeo.state == "prompt") {
                allowGeo.onchange = (e) => {
                    if (e.target.state == "granted") {

                        //console.log(e);
                        navigator.geolocation.getCurrentPosition((p) => {
                            console.log(p.coords);
                            location = true;
                            map.setCenter({ lon: p.coords.longitude, lat: p.coords.latitude });
                        });

                    }
                };
            }
        }
        getServerGeo();
    };
};
