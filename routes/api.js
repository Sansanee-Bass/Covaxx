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

router.get('/hydrantsx', async (req, res) => {
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

    if (data.length <= 0) {
        const d = await axios.get(url, {
            responseType: 'text'
        });



        const data = {
            url: url,
            content: d.data,
            lastFetch: Date.now()
        };
        res.send(
            d.data
        );
        cache.create(data);


    } else {

        res.send(data[0].content);
    }


});

module.exports = router;