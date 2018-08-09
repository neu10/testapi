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
        let id = i,panel_id = Math.floor(Math.random() * Math.floor(10)),vol_gen = (i*0.4).toFixed(4),temp = (i*.56).toFixed(4),
            humid = ((i*7)/panel_id).toFixed(2),
            tilt = 35 ,CURRENT_GEN = i*.8,TIMESTAMP = new Date();
        let query = "INSERT INTO censor_data VALUES " +
            "("+id +"," +
            panel_id + "," +
            vol_gen + "," +
            temp + "," +
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
    let payload = req.body;
    let startTime = payload.startTime;
    let endTime = payload.endTime;
    let deviceDataEmitTime = config.deviceDataEmitTimeInSeconds;
    startTime = timeHelper.getDayStartTimestampByDate(startTime);
    endTime = timeHelper.getDayStartTimestampByDate(endTime);
    let TIMESTAMP = startTime;
    let id,panel_id,i=1;
        setInterval(()=>{
            if(i <=1000 && TIMESTAMP && TIMESTAMP < endTime){
                id = i;
                panel_id = Math.floor(Math.random() * Math.floor(9)); // Randomly assign panel for data - currently panels are from id 1 to 10.
                TIMESTAMP +=(deviceDataEmitTime*1000);
                getGeneratedData(panel_id,TIMESTAMP,i);
                i++;
            }
        },50)
}

function getGeneratedData(panel_id,ts,id) {
    let resObj = {};
    let query = 'Select * from panel_electrical_specs where PANEL_ID = '+(panel_id+1);
    // let query = 'Select * from panel_electrical_specs where PANEL_ID = 10';
    let vol_gen,temp,
        humid ,tilt,CURRENT_GEN;
    console.log(query);
    selectData.getData(query).then((resp) => {
        let eSpecs = resp[0];
        let e = (+(eSpecs.max_power_point_volts)*90)/100;
        resObj.vol =  Math.random() * Math.floor(e);
        resObj.temp = 25;
        resObj.humid = Math.floor(Math.random() * Math.floor(90));
        resObj.tilt = Math.random() * Math.floor(90);
        resObj.curr = Math.random() * Math.floor(((eSpecs.max_power_point_current)*90)/100);
        vol_gen = (resObj.vol).toFixed(4);
        temp = (resObj.temp).toFixed(4);
        humid = (resObj.humid).toFixed(4);
        tilt = (resObj.tilt).toFixed(4);
        CURRENT_GEN = (resObj.curr).toFixed(4);
        let query = "INSERT INTO censor_data VALUES " +
            "("+id +"," +
            panel_id + "," +
            vol_gen + "," +
            temp + "," +
            humid + "," +
            tilt + "," +
            CURRENT_GEN + "," +
            +ts+")";
        console.log(query);
        insertData.insert(query).then((resp) => {
            return resObj;
        },(err) => {
            console.log('errored while inserting');
        })
    },(err) => {
        console.log('errored while selecting');
        return resObj;
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
