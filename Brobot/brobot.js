var config = require('./config'),
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
	initialize: function(){
		// Calculate maximum latency
		var maximumLatency = _.max(config.instruments, function(instrument){
			return instrument.softLatencyAbsolute;
		});
		// instantiate instrument controllers
		_.each(config.instruments, function(instrument){
			instrument.softLatencyRelative = instrument.softLatencyAbsolute - maximumLatency;
			instruments[instrument.note] = new instrumentController(instrument);
		});
		this.initializeArduino();
		this.initializeMidi();
	},
	initializeArduino: function(){
		board.on("ready", function() {
			console.log('Arduino connected');
			_.each(config.instruments, function(instrument){
				instruments[instrument.note].pin = five.Led(instruments[i].pinNumber);
			});
		});
	},
	initializeMidi: function(){
		midi = new midiLibrary.input();
		midi.openVirtualPort("Brobie Node");
		midi.on('message', this.onMidiMessage.bind(this));
	},

	// =====================
	// Event Manager
	// =====================
	onMidiMessage: function(time, message){
		var instruction = message[0],
	    	channel = message[1],
	    	velocity = message[2];

		if ([144,155].indexOf(instruction) !== -1){
			this.onMidiNote(channel, velocity)
		}
	},
	onMidiNote: function (channel, velocity){
		if(instruments[channel]){
			instruments[channel].queue(velocity);
		}
	}
};