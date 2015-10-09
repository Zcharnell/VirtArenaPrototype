'use strict';

var express = require('express'),
	app = express();

app.use('/js', express.static(__dirname + '/dev/js'));
app.use('/scss', express.static(__dirname + '/dev/scss'));
app.use('/templates', express.static(__dirname + '/dev/templates'));
app.use('/json', express.static(__dirname + '/dev/json'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/jquery', express.static(__dirname + '/jquery'));

app.get('/',function(req,res){
	res.sendFile('index.html',{'root':__dirname + '/dev'});
});

app.listen('4567', function(){
	console.log('Server running on port 4567');
});