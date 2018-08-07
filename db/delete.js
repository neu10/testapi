const dbConnection = require('../services/database');

async function deleteData(query) {
    return new Promise((resolve,reject)=>{
        let db = dbConnection.getDBInstance();
        db.transaction(() => {
            db.statement(query).then((res) => {
                resolve(res);
            },(err) => {
                console.log(err);
                reject(err);
            });
        });
    })
}

module.exports.deleteData = deleteData;