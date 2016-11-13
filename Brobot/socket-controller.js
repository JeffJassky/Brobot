var socketio = require('socket.io');

module.exports = {
	initialize: function(server, callback){
		var io = socketio(server);
		io.on('connection', function (socket) {
			console.log('SOCKET: Connected');

			socket.on('get:systemstatus', function(){
				socket.emit('systemstatus', process.systemstatus.get());
			});

			// // GET INSTRUMENTS
			socket.on('get:instruments', function(){
				// emit the new data
				socket.emit('instruments', process.settings.get('instruments'));
			});

			// // POST INSTRUMENTS
			socket.on('post:instruments', function (data) {
				// save the data
				process.settings.set('instruments', data, function(){
					// emit the new data
					socket.emit('instruments', process.settings.get('instruments'));
				});
			});
			callback(socket);
		});
	}
};