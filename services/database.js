const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');
let pool;
var sworm = require('sworm');
var db = sworm.db({driver: 'oracle',
    config: {
        user : dbConfig.db['username'],
        password : dbConfig.db['password'],
        connectString: dbConfig.db['connectString'],
        pool: true,
        options: {
            // options to set on `oracledb`
            maxRows: 1000
        }
    }
});
let connection;
async function initialize(){
    connection = await db.connect({
        driver: 'oracle',
        config: {
            user : dbConfig.db['username'],
            password : dbConfig.db['password'],
            connectString: dbConfig.db['connectString'],
            pool: true,
            options: {
                // options to set on `oracledb`
                maxRows: 1000
            }
        }
    });
}

function getDBInstance() {
    return db;
}

function close(connection) {
    db.close(
        function(err) {
            if (err)
                console.error(err.message);
        });
}

function simpleExecute(statement) {
    return new Promise(async (resolve, reject) => {
        let conn;
        try {
            db.query(statement).then(function (records) {
                console.log(records);
                resolve(records);
            });
        } catch (err) {
            reject(err);
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await db.close();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
}

module.exports.initialize = initialize;

module.exports.close = close;

module.exports.getDBInstance = getDBInstance;

module.exports.simpleExecute = simpleExecute;