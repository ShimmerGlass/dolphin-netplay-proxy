var express = require('express');
var http = require('http');

module.exports = function() {
	var app = express()
	var server = http.Server(app);

	app.set('views', __dirname + '/../views');
	app.set('view engine', 'html');
	app.use(express.static(__dirname + '/../public'));
	return server;
};