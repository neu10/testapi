const insertData = require('../db/insert');
const selectData = require('../db/select');
const updateData = require('../db/update');
const deleteData = require('../db/delete');

exports.updateCensorData = function(req,res) {
    let i = 100;
    setInterval(()=>{
        let id = i,panel_id = Math.floor(Math.random() * Math.floor(10)),vol_gen = (i*0.4).toFixed(4),tempr = (i*.56).toFixed(4),
            humid = ((i*7)/panel_id).toFixed(2),
            tilt = 35 ,CURRENT_GEN = i*.8,TIMESTAMP = new Date();
        // (2018-08-07T10:48:45.104Z
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
    },1000)
}

exports.insertHistoricCensorData = function(req,res) {
    let query = "INSERT INTO test_table VALUES (3,'New one','Once again test!!!','Type 3')";
    insertData.insert(query).then((resp) => {
        res.send(resp);
    },(err) => {
        res.send(err);
    })
}
