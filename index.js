var server = require('./src/http-server')(3000);
var io = require('./src/io');
var proxy = require('./src/proxy');

io.start(server, function(addr) {
	if (!addr.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+/))
		throw 'Add invalid';
	
	var parts = addr.split(':');
	proxy.start(parts[0], parts[1]);
});

proxy.onMessage(function(msg) {
	io.log(msg);
})

server.listen(3000)
