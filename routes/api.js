/**
 * Created by Nutan on 2/13/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    console.log('received reques from '+req);
    res.send('Hello from post');
});

module.exports = router;