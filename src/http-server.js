var express = require('express');
var http = require('http');
var basicAuth = require('basic-auth-connect');

module.exports = function() {
	var app = express()
	var server = http.Server(app);

	app.use(basicAuth("dnp", "BwenJJ4Cfio3AW"));

	app.use(express.static(__dirname + '/../public'));
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/../views');

	app.get('/', function(req, res) {
		res.render('index', { ip: req.ip })
	});

	return server;
};