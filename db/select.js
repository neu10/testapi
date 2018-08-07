const dbConnection = require('../services/database')

async function getData(query) {
    return new Promise((resolve,reject)=>{
        let db = dbConnection.getDBInstance();
        db.transaction(() => {
            db.query(query).then((res) => {
                resolve(res);
            },(err) => {
                console.log(err);
                reject(err);
            });
        });
    })
}

module.exports.getData = getData;