var socketio = require('socket.io');
var io = null;
var socket = null;

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
		process.konsole.log('SOCKET: Initializing');
		io = socketio(server);
		io.on('connection', function (sock) {
			process.konsole.log('SOCKET: Connected');
			socket = sock;
			API.getSystemStatus();
			API.getInstruments();
			socket.on('get:systemstatus', API.getSystemStatus);
			socket.on('get:instruments', API.getInstruments);
			socket.on('post:instruments', API.postInstruments);
		});
	},
	on: function(eventName, method){
		if(socket){
			socket.on(eventName, method);
		}else{
			io.on('connection', function(socket){
				socket.on(eventName, method);
			});
		}
	},
	emit: function(eventName, payload){
		if(socket){
			socket.emit(eventName, payload);
		}
	}
};