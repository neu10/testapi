const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const dbConfig = require('../config/database.js');
const database = require('./database');
const defaultThreadPoolSize = 4;
var router = require('../routes/index');
var cors = require('cors');
var bodyParser = require('body-parser');
// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = dbConfig.db.poolMax + defaultThreadPoolSize;

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();
        initializeExpressApp(app);
        httpServer = http.createServer(app);
        router(app);
        httpServer.listen(webServerConfig.port, err => {
            if (err) {
                reject(err);
                return;
            }
            console.log(`Web server listening on localhost:${webServerConfig.port}`);

            resolve();
        });
    });
}

function initializeExpressApp(app){
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}

module.exports.initialize = initialize;

