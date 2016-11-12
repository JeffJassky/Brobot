var config = require('./config'),
	_ = require("underscore"),
	midiLibrary = require('midi'),
	five = require("johnny-five"),
	instrumentController = require("./instrument-controller"),
	board = five.Board(),
	instruments = {};

module.exports = {
	// =====================
	// INIT
	// =====================
	initialize: function(){
		// Calculate maximum latency
		var slowestInstrument = _.max(config.instruments, function(instrument){
			return instrument.latency;
		});
		var maximumLatency = slowestInstrument.latency;

		// instantiate instrument controllers
		_.each(config.instruments, function(instrument){
			instrument.relativeOffset = maximumLatency - instrument.latency;
			instruments[instrument.note] = new instrumentController(instrument);
		});
		this.initializeArduino();
		this.initializeMidi();
		// this.warmUp();
	},
	initializeArduino: function(){
		board.on("ready", function() {
			console.log('Arduino connected');
			_.each(instruments, function(instrument){
				instrument.pin = five.Led(instrument.pinNumber);
			});
		});
	},
	initializeMidi: function(){
		midi = new midiLibrary.input();
		midi.openVirtualPort("Brobie Node");
		midi.on('message', this.onMidiMessage.bind(this));
	},
	warmUp: function(){
		console.log('Warming Up');
		var timeout = 0;
		for(var velocity = 0; velocity <= 127; velocity++){
			_.each(instruments, function(instrument){
				setTimeout(function(){
					instrument.queue(velocity);
				}, timeout)
				timeout += 150;
			});
		}
		console.log('Warmup Complete');
	},

	// =====================
	// Event Manager
	// =====================
	onMidiMessage: function(time, message){
		var instruction = message[0],
	    	channel = message[1],
	    	velocity = message[2];

		console.log("Midi message incoming", channel, velocity, instruction);
		if ([144,155,153].indexOf(instruction) !== -1){
			this.onMidiNote(channel, velocity)
		}
		if([128,129].indexOf(instruction) !== -1){
			this.onInstruction({
				instruction: instruction,
				channel: channel,
				velocity: velocity
			});
		}
	},
	onInstruction: function(e){
		if(e.instruction === 128){
			if(instruments[e.channel]){
				instruments[e.channel].determineMinimumDurationForContact();
			}
		}
	},
	onMidiNote: function (channel, velocity){
		console.log("Midi note incoming", channel, velocity);
		if(new Date().getHours() >= 10 || true){
			if(instruments[channel]){
				instruments[channel].queue(velocity);
			}
		}else{
			console.log("Not within operating hours");
		}
	}
};
