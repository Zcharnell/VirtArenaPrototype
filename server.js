'use strict';

// var express = require('express'),
// 	app = express();
var ENV_VARIABLE = process.env.ENV_VARIABLE || 'dev';
var ENV_DIR = '/' + ENV_VARIABLE;

var express = require('express');
var app = express();
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var server = require('http').createServer(app);

app.use(express.static(__dirname + ENV_DIR));
app.use('/js', express.static(__dirname + ENV_DIR + '/js'));
app.use('/assets', express.static(__dirname + ENV_DIR + '/assets'));
app.use('/sass', express.static(__dirname + ENV_DIR + '/sass'));
app.use('/css', express.static(__dirname + ENV_DIR + '/css'));
app.use('/templates', express.static(__dirname + ENV_DIR + '/templates'));
app.use('/json', express.static(__dirname + ENV_DIR + '/json'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/jquery', express.static(__dirname + '/jquery'));

app.use(morgan(ENV_VARIABLE));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
if(ENV_VARIABLE === 'dev') {
	app.use(errorhandler({
	  dumpExceptions: true,
	  showStack: true
	}));
}

// app.get('/',function(req,res){
// 	res.sendFile('index.html',{'root':__dirname + '/dev'});
// });

// app.listen('4567', function(){
// 	console.log('Server running on port 4567');
// });

// =====================
//      [LISTEN]
// =====================
app.set('port', (process.env.PORT || 8080));
// app.listen(8080);
// console.log("App listening on port 8080");

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});