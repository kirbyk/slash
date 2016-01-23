require('dotenv').config({
  path: '../.env',
  silent: true
});
var express = require('express');
var bodyParser = require('body-parser');
var slackController = require('./controllers/slack');


var app = express();
app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', slackController.webhook);

var server = app.listen(app.get('port'), function () {
  console.log('the server is listening on port %s', app.get('port'));
});
