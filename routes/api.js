const express = require('express');
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const cache = db.Cache;
const { Op } = require('sequelize');

router.get('/orm', async (req, res) => {

    const data = {
        url: 'https://api.covid19tracker.ca/regions',
        content: 'testing...',
        lastFetch: Date.now()
    };

    await cache.create(data);
    res.json(data);

});

router.get('/regions', async (req, res) => {
    let url = 'https://api.covid19tracker.ca/regions';

    data = await cache.findAll({
        order: [['lastFetch', 'DESC']],
        where: {
            [Op.and]: [
                { url: url },
                {
                    lastFetch: {
                        [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
                    }
                }
            ]
        }
    });
    // console.log(data);

    if (data.length == 0) {
        console.log("Fetched data and updated cache");
        const d = await axios.get(url, {
            responseType: 'text'
        });

        const data = {
            url: url,
            content: JSON.stringify(d.data),
            lastFetch: Date.now()
        };
        res.send(
            d.data
        );
        cache.create(data);
    } else {
        // console.log("Fetched data from cache");
        res.send(data[0].content);
    }
});

// reports/regions/:hr_uid
router.get('/reports', async (req, res) => {
    console.log(req.query.region);
    // let url = 'https://api.covid19tracker.ca/reports/regions';
    let url = `https://api.covid19tracker.ca/reports/regions/${req.query.region}`;
    

    data = await cache.findAll({
        order: [['lastFetch', 'DESC']],
        where: {
            [Op.and]: [
                { url: url },
                {
                    lastFetch: {
                        [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
                    }
                }
            ]
        }
    });
    // console.log(data);

    if (data.length == 0) {
        // console.log("Fetched data and updated cache");
        const d = await axios.get(url, {
            responseType: 'text'
        });

        //console.log("data", d.data);

        const data = {
            url: url,
            content: JSON.stringify(d.data),
            lastFetch: Date.now()
        };

        res.send(
            d.data
        );
        cache.create(data);
    } else {
        console.log("Fetched data from cache");
        res.send(data[0].content);

        if (req.query.region == "2407") {
            var rep = JSON.parse(data[0].content);
            // console.log("hr_uid", rep.hr_uid);
            // console.log("last_updated", rep.last_updated);
            for (let daily of rep.data) {
                // console.log("date", daily.date);
                // console.log("new cases", daily.change_cases);

                const data = {
                    // url: url,
                    // content: JSON.stringify(d.data),
                    // lastFetch: Date.now()
                    hr_uid: rep.hr_uid,
                    date: rep.date,

                };
                
                report.create(data);
            }
        }
    }
});


module.exports = router;