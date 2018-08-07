const insertData = require('../db/insert');
const selectData = require('../db/select');
const updateData = require('../db/update');
const deleteData = require('../db/delete');

exports.getPanelList = function(req,res) {
    let query = "select * from SOLAR_PANELS";
    selectData.getData(query).then((resp) => {
        console.log(resp.length);
        res.send(resp);
    },(err) => {
        res.send(err);
    })
}

exports.getDeviceDetails = function(req,res) {
    console.log(req.body);
    let payload = req.body;
    let query = 'select * from censor_data, SOLAR_PANELS where timestamp > '+payload.timestamp+'' +
        ' and SOLAR_PANELS.id='+ payload.deviceid +' and SOLAR_PANELS.id = censor_data.panel_id';
    selectData.getData(query).then((resp) => {
        console.log(resp.length);
        res.send(resp);

    },(err) => {
        res.send(err);
    })
}
