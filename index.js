var server = require('./src/http-server')(3000);
var io = require('./src/io');
var proxy = require('./src/proxy');

proxy.onMessage(function(msg) {
	console.log(msg);
})

io.start(server, function(addr) {
	var parts = addr.split(':');
	proxy.start(parts[0], parts[1]);
});

proxy.onMessage(function(msg) {
	io.log(msg);
})

server.listen(3000)
