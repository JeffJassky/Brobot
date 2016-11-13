var socketio = require('socket.io');

var API = {
	getSystemStatus: function(){
		process.socket.emit('systemstatus', process.systemstatus.get());
	},
	getInstruments: function(){
		process.socket.emit('instruments', process.settings.get('instruments'));
	},
	postInstruments: function (data) {
		// save the data
		process.settings.set('instruments', data, function(){
			// emit the new data
			process.socket.emit('instruments', process.settings.get('instruments'));
		});
	}
}
module.exports = {
	initialize: function(server, callback){
		var io = socketio(server);
		io.on('connection', function (socket) {
			process.socket = socket;
			console.log('SOCKET: Connected');
			API.getSystemStatus();
			API.getInstruments();
			socket.on('get:systemstatus', API.getSystemStatus);
			socket.on('get:instruments', API.getInstruments);
			socket.on('post:instruments', API.postInstruments);
			callback(socket);
		});
	}
};