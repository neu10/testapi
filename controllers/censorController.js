const insertData = require('../db/insert');
const selectData = require('../db/select');
const updateData = require('../db/update');
const deleteData = require('../db/delete');
const timeHelper = require('../helpers/datetimehelper');
const config =     require('../config/config').config;

exports.updateCensorData = function(req,res) {
    let i = 100;
    let deviceDataEmitTime = config.deviceDataEmitTimeInSeconds;
    setInterval(()=>{
        let id = i,panel_id = Math.floor(Math.random() * Math.floor(10)),vol_gen = (i*0.4).toFixed(4),tempr = (i*.56).toFixed(4),
            humid = ((i*7)/panel_id).toFixed(2),
            tilt = 35 ,CURRENT_GEN = i*.8,TIMESTAMP = new Date();
        let query = "INSERT INTO censor_data VALUES " +
            "("+id +"," +
            panel_id + "," +
            vol_gen + "," +
            tempr + "," +
            humid + "," +
            tilt + "," +
            CURRENT_GEN + "," +
            +TIMESTAMP+")";
        console.log(query);
        insertData.insert(query).then((resp) => {
           i++;
        },(err) => {
            //res.send(err);
        })
    },deviceDataEmitTime*1000)
}

exports.insertHistoricCensorData = function(req,res) {
    let query = "INSERT INTO test_table VALUES (3,'New one','Once again test!!!','Type 3')";
    insertData.insert(query).then((resp) => {
        res.send(resp);
    },(err) => {
        res.send(err);
    })
}


exports.chartDataForToday = function(req,res) {
    //deviceid, parameter : temp,humidity etc.
    let startOfDay = timeHelper.getDayStartTimestamp();
    let query = "select * from censor_data where timestamp >"+startOfDay+" and panel_id = "+req.body.deviceId;
    selectData.getData(query).then((resp) => {
        res.send(resp);
    },(err) => {
        res.send(err);
    })
}

exports.getChartDataBetweenDates = function(req,res) {
    let payload = req.body;
    let startOfDayOfStartDate = timeHelper.getDayStartTimestampByDate(payload.timestamp.start);
    let startOfDayOfEndDate = timeHelper.getDayStartTimestampByDate(payload.timestamp.end);
    let endOfDay = startOfDayOfEndDate+timeHelper.milliSecondsInADay();
    let panelId = payload.deviceId;
    let query = "select * from censor_data where timestamp > "+startOfDayOfStartDate+" and timestamp < "+endOfDay+" and panel_id = "+panelId;
    selectData.getData(query).then((resp) => {
        res.send(resp);
    },(err) => {
        res.send(err);
    })
}

exports.getChartDataBetweenTime = function(req,res) {
    let payload = req.body;
    let startTime = timeHelper.getUnixTimeStampOfTime(payload.timestamp.start);
    let endTime = timeHelper.getUnixTimeStampOfTime(payload.timestamp.end);
    let query = "select * from censor_data where timestamp > "+startTime+" and timestamp < "+endTime+" and panel_id = "+payload.deviceId;
    selectData.getData(query).then((resp) => {
        res.send(resp);
    },(err) => {
        res.send(err);
    })
}
