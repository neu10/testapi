/**
 * Created by Nutan on 2/13/2017.
 */
var express = require('express');
var router = express.Router();
var database = require('../services/database');
var censorController = require('../controllers/censorController');
var panelController = require('../controllers/panel');
var weatherController = require('../controllers/weatherController');
// router.get('/', async (req, res) => {
//     const result = await database.simpleExecute('select user, systimestamp from dual');
//     const user = result.rows[0].USER;
//     const date = result.rows[0].SYSTIMESTAMP;
//
//     res.end(`DB user: ${user}\nDate: ${date}`);
// });

router.post('/updateCensorData',censorController.updateCensorData);


router.get('/getPanelList',panelController.getPanelList);

router.post('/devicedetail',panelController.getDeviceDetails);

router.get('/chartDataForToday',censorController.chartDataForToday);

router.post('/chartData',censorController.getChartDataBetweenDates);

router.post('/chartDataByTime',censorController.getChartDataBetweenTime);

router.post('/seedData',censorController.insertHistoricCensorData);

router.get('/weather',weatherController.getWeatherData);
//
// router.post('/chartData',censorController.getChartData);



module.exports = router;