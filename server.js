// LOCAL DEPENDENCIES
var express = require('express'),
	app 	= express(),
	server 	= require('http').Server(app),
	drumset = require('./Brobot/drumset-controller');

// GLOBAL DEPENDENCIES
process.settings = require('./Brobot/settings-controller');
process.systemstatus = require('./Brobot/systemstatus-controller');
process.serialport = require('./Brobot/serialport-controller');
process.midi	= require('./Brobot/midi-controller');

require('./Brobot/socket-controller').initialize(server, function(socket){
	process.socket = socket;
	process.serialport.beginScanning();
	process.midi.initialize();
	drumset.initialize();
});


// SERVER
app.use(express.static('public'));
server.listen(80, function(){
	console.log('Server running');
});