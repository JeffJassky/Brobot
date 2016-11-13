// REQUIRE DEPENDENCIES
var instrumentController = require("./instrument-controller"),
	_ = require('underscore');

// LOCAL VARIABLES
var numberOfInstruments = 10;
var instruments = [];
var noteToInstrumentMap = {};
var maximumLatency = 0;

module.exports = {
	initialize: function(){
		// INITIALIZE ALL INSTRUMENT CONTROLLERS
		_(numberOfInstruments).times(function(index){
			instruments[index] = new instrumentController({
				index: index
			});
		});
		this.assignNotesToInstruments();
		this.getMaximumLatency();

		// LISTEN FOR EVENTS

		process.socket.on('buttonpress', this.onButtonPress.bind(this));
	},
	onSettingsChange: function(){
		this.assignNotesToInstruments();
		this.getMaximumLatency();
	},
	assignNotesToInstruments: function(){
		_.each(process.settings.get('instruments'), function(instrument, index){
			noteToInstrumentMap[instrument.note] = index;
		});
	},
	getMaximumLatency: function(){
		maximumLatency = _.max(process.settings.get('instruments'), function(instrument){
			return parseInt(instrument.latency);
		}).latency;
		console.log('DRUMSET: Maximum Latency ' + maximumLatency);
	},
	instrumentForNote: function(note){
		return instruments[noteToInstrumentMap[note]];
	},

	// =====================
	// Event Manager
	// =====================
	onButtonPress: function(e){
		console.log('DRUMSET: onButtonPress', e.note, e.velocity);
		var drumset = this;
		setTimeout(
			function(){
				console.log(drumset);
				drumset.instrumentForNote(e.note).strike(e.velocity);
			},
			this.relativeOffset
		);
	}
};
