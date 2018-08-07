/**
 * Created by Nutan on 2/13/2017.
 */
var express = require('express');
var router = express.Router();
var apiRoutes = require('./api');

module.exports = (app) => {
    // Load routes
    app.use('/', apiRoutes);
}