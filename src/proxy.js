var proxy = require('udp-proxy');
var getIp = require('./ip');

var baseOptions = {
    ipv6: false,
    localaddress: '0.0.0.0',
    localport: 53535,
    localipv6: false,
    timeOutTime: 10000
};

var proxyInstance;
var eventListeners = [];

function sendMessage(msg) {
	for (var i in eventListeners)
		eventListeners[i](msg)
}

module.exports = {
	start: function(addr, port) {
		if (proxyInstance)
			proxyInstance.close();

		baseOptions.address = addr;
		baseOptions.port = port;

		proxyInstance = proxy.createServer(baseOptions);

		proxyInstance.on('listening', function (details) {
		    sendMessage('dolphin-netplay-proxy ready on <b>' + getIp() + ':' + details.server.port + '</b>');
		    sendMessage('traffic is forwarded to <b>' + details.target.address + ':' + details.target.port + '</b>');
		});

		// 'bound' means the connection to server has been made and the proxying is in action
		proxyInstance.on('bound', function (details) {
		    sendMessage('proxy is bound to <b>' + getIp() + ':' + details.route.port + '</b>');
		    sendMessage('peer is bound to <b>' + details.peer.address + ':' + details.peer.port + '</b>');
		});

		// 'proxyClose' is emitted when the socket closes (from a timeout) without new messages
		proxyInstance.on('proxyClose', function (peer) {
		    sendMessage('disconnecting socket from ' + peer.address);
		});

		proxyInstance.on('proxyError', function (err) {
		    sendMessage('ProxyError! ' + err);
		});

		proxyInstance.on('error', function (err) {
		    sendMessage('Error! ' + err);
		});
	},
	stop: function() {
		proxy.close();
	},
	onMessage: function(cb) {
		eventListeners.push(cb);
	}
};