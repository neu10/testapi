/**
 * Created by Nutan on 2/12/2017.
 */

var express = require('express');
var path = require('path');

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(require('node-sass-middleware')({
    src: path.join(__dirname),
    dest: path.join(__dirname),
    indentedSyntax: false,
    debug: true,
    sourceMap: true
}));

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false,
    debug: true,
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/ap*i', api);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
