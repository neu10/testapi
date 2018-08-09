const insertData = require('../db/insert');
const selectData = require('../db/select');
const updateData = require('../db/update');
const deleteData = require('../db/delete');
const config = require('../config/config').config;
let request = require('request');

exports.getWeatherData = function(req,res) {
    //https://samples.openweathermap.org/data/2.5/weather?
    let payload = req.body;
    let req_url = 'https://samples.openweathermap.org/data/2.5/weather?lat='+payload.lat+'&lon='+payload.lng+'&appid='+config.weatherAPIID;
    request(req_url,(res)=>{
        console.log(res);

    },(err)=>{

    })
}

