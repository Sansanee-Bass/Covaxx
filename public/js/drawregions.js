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
            'line-color': '#FFF',
            'line-width': 1
        }
    });

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

        let thisFeature = displayFeatures[0];

        if (thisFeature != undefined && thisFeature.properties.ENGNAME != undefined) {
            // document.getElementById('features').innerHTML = thisFeature.properties.ENGNAME;
            // document.getElementById('features').innerHTML += "<br />" + thisFeature.properties.HR_UID;
            latest = getRecent(thisFeature.properties.HR_UID);
            console.log("LATEST: ", latest);
            document.getElementById('features').innerHTML = thisFeature.properties.ENGNAME + "<br />"
                + "Vaccines today: " + latest.change_vaccinations;
            // let req = await fetch(`/api/recent?region=${thisFeature.properties.HR_UID}`);
        //     let data = await req.text();
        //     var regReports = JSON.parse(data).data;

        //     console.log("reports", regReports);
        //     regions.forEach(element => {
        //         // console.log("Requesting region" + element.hr_uid);

        //         // fetch(`/api/reports?region=${element.hr_uid}&date=2021-04-28`);
        //         // document.getElementById('regions').innerHTML += `<div id="${element.hr_uid}">${element.hr_uid} ${element.province} ${element.engname}</div>`;
        //     });


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

let getRecent = async (region) => {
    // let req = await fetch("/api/regions");
    let req = await fetch(`/api/recent?region=${region}`);
    let data = await req.text();
    var rept = JSON.parse(data);

    // console.log("DATA ", data);
    if(rept !== undefined) {
        console.log("REPT ", rept[0].hr_uid, "VAX ", rept[0].change_vaccinations);
        return rept[0];
    } else {
        console.log("NO RECENT DATA");
    }

    // console.log("number of regions " + regions.length);
    // fetch(`/api/reports?region=${region}&date=2021-04-28`);
    // regions.forEach(element => {
    // });

}
