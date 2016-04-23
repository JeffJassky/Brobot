var config = require('./config'),
	$ = require("jquery"),
	_ = require("underscore"),
	midiLibrary = require('midi'),
	five = require("johnny-five"),
	instrumentController = require("./instrument-controller"),
	board = five.Board(),
	instruments = [];

module.exports = {
	// =====================
	// INIT
	// =====================
	initialize: function(socketData){
		_.each(config.instruments, function(instrument){
			instruments[instrument.note] = new instrumentController(instrument);
		});
		this.initializeArduino();
		this.initializeMidi();
	},
	initializeArduino: function(){
		board.on("ready", function() {
			_.each(config.instruments, function(instrument){
				instruments[instrument.note].pin = five.Led(instruments[i].pinNumber);
			});
		});
	},
	initializeMidi: function(){
		midi = new midiLibrary.input();
		midi.openVirtualPort("Brobot");
		midi.on('message', this.onMidiMessage.bind(this));
	},

	// =====================
	// Event Manager
	// =====================
	onMidiMessage: function(){
		var instruction = message[0],
	    	channel = message[1],
	    	velocity = message[2];
		if (instruction === 144){
			this.onMidiNote(channel, velocity)
		}
	},
	onMidiNote: function (channel, velocity){
		if(instruments.hasOwnProperty(channel)){
			instruments[channel].queue(velocity);
		}
	}
};