var socketio = require('socket.io');

var io;

function sendLog(msg) {
	io.emit('log', '[' + new Date() + '] ' + msg);
}

module.exports = {
	start: function(server, cb) {
		io = socketio(server);

		io.on('connection', function(socket){
			sendLog('a user connected');
			
			socket.on('addr', function(msg) {
				cb(msg);
			});
		});
	},
	log: function(msg) {
		sendLog(msg);
	}
}