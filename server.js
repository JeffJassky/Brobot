// LOCAL DEPENDENCIES
var express = require('express'),
	app 	= express(),
	server 	= require('http').Server(app),
	drumset = require('./Brobot/drumset-controller');

// GLOBAL DEPENDENCIES
process.konsole = require('./Brobot/konsole-controller.js');
process.settings = require('./Brobot/settings-controller');
process.systemstatus = require('./Brobot/systemstatus-controller');
process.serialport = require('./Brobot/serialport-controller');
process.midi	= require('./Brobot/midi-controller');
process.socket = require('./Brobot/socket-controller');

// INITIALIZE CONTROLLERS
process.socket.initialize(server);
process.serialport.beginScanning();
process.midi.initialize();
drumset.initialize();

// SERVER
app.use(express.static('public'));
server.listen(80, function(){
	process.konsole.log('Server running');
});