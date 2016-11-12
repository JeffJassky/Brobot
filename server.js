var express = require('express'),
	app 	= express(),
	server 	= require('http').Server(app),
	io 		= require('socket.io')(server),
	config = require('./Brobot/config-controller');

var brobot	= require('./Brobot/brobot').initialize();

app.use(express.static('public'));

server.listen(80, function(){
	console.log('Server running');
});

io.on('connection', function (socket) {
	// GET INSTRUMENTS
	socket.on('get:instruments', function(){
		// emit the new data
		socket.emit('instruments', config.get('instruments'));
	});

	// POST INSTRUMENTS
	socket.on('post:instruments', function (data) {
		// save the data
		config.save('instruments', data, function(){
			// emit the new data
			// socket.emit('instruments', config.get('instruments'));
		});
	});
});