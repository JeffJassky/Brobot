var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io').listen(server),
	data = require('data.io')(io),
	brobot = require('./brobot'),
	midiLibrary = require('midi');

// SET UP MIDI TO SEND TO BROBOT
var midi = new midiLibrary.input();
midi.on('message', function(deltaTime, message) {
    var channel = message[1],
    	velocity = message[2],
    	instruction = message[0];
	if (instruction === 144){
		brobot.queue(channel, velocity);
	}
});
midi.openVirtualPort("Brobot");


// Make socket resources
var instruments = data.resource('instruments');

instruments.use(function(req, res, next){
	console.log('instrument request');
	var crud = {
		list: function(){
			res.send(brobot.settings());
		}
	};
	crud[req.action]();
});

instruments.on('sync', function (sync) {
	console.log('sync');	
	sync.notify(sync.client);
});


// socketio stuff
io.on('connection', function(socket){
	console.log('socket connected');
});

app.use(express.static('public'));
server.listen(3000, function(){
	console.log('Server running');
});