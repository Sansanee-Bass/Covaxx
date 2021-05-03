const express = require('express');
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const cache = db.Cache;
const report = db.Report;
const { Op, QueryTypes } = require('sequelize');
const e = require('express');
const { sequelize } = require('../models');

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

    if (data.length == 0) {
        //console.log("Fetched data and updated cache");
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
        res.send(data[0].content);
    }
});

router.get('/reports', async (req, res) => {
    let hr = req.query.region;
    let lastdate = req.query.date;
    let url = `https://api.covid19tracker.ca/reports/regions/${hr}?after=${lastdate}`;

    const d = await axios.get(url, {
        responseType: 'json'
    });

    let rep = d.data;
    for (let daily of rep.data) {
        const dailyData = {
            hr_uid: rep.hr_uid,
            date: daily.date, change_case: daily.change_case, change_fatalities: daily.change_fatalities,
            change_tests: daily.change_tests,
            change_hospitalizations: daily.change_hospitalizations,
            change_criticals: daily.change_criticals,
            change_recoveries: daily.change_recoveries,
            change_vaccinations: daily.change_vaccinations,
            change_vaccines_distributed: daily.change_vaccines_distributed,
            total_cases: daily.total_cases,
            total_fatalities: daily.total_fatalities,
            total_tests: daily.total_tests,
            total_hospitalizations: daily.total_hospitalizations,
            total_criticals: daily.total_criticals,
            total_recoveries: daily.total_recoveries,
            total_vaccinations: daily.total_vaccinations,
            total_vaccines_distributed: daily.total_vaccines_distributed
        }
        // 2020-06-30 00:00:00  <- use for date and time query example.
        const row = await sequelize.query("SELECT `id`, `hr_uid`, `date` FROM`Reports` AS `Report` "
            + "WHERE(`hr_uid` = 2407 AND `date` > '" + dailyData.date
            + "' AND `date` < DATE('" + dailyData.date + "', '+1 day')) LIMIT 1;");

        console.log(row[0].length);
        if (row[0].length) {
            // dailyData.id = row.id;
            // report.update(dailyData);
        } else {
            //console.log("dddd", dailyData);
            report.create(dailyData);
        }

    };

});

router.get('/recent', async (req, res) => {
    let region = req.query.region;
    console.log("region", region);
    // let last = new Date(lastdate);
    // lastdate = "2021-05-02"
    // let first = new Date(lastdate);
    // first.setDate(first.getDate() - 3);
    // console.log(first.toISOString().substring(0, 10), lastdate);
    // console.log((new Date(new Date(lastdate).getDate() - 3)).substring(0,10));

    data = await report.findAll({
        order: [['date', 'ASC']],
        where: {
            [Op.and]: [
                { hr_uid: region },
                {
                    date: {
                        [Op.gte]: new Date(new Date() - 15 * 24 * 60 * 60 * 1000)
                        // 14 days
                    }
                }
            ]
        }
    });

    res.send(
        data
    );
});

module.exports = router;