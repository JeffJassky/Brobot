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
                process.on('drumset:queuenote', this.queueNote.bind(this));
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
		process.konsole.log('DRUMSET: Maximum Latency ' + maximumLatency);
	},
	instrumentForNote: function(note){
		return instruments[noteToInstrumentMap[note]];
	},

	// =====================
	// Event Manager
	// =====================

        queueNote: function(e){
                process.konsole.log('DRUMSET: queueNote', e.note, e.velocity);
                var drumset = this;
                setTimeout(
                        function(){
                                process.konsole.log(drumset);
                                drumset.instrumentForNote(e.note).strike(e.velocity);
                        },
                        this.relativeOffset
                );
        },
	onButtonPress: function(e){
		process.konsole.log('DRUMSET: onButtonPress', e.note, e.velocity);
		var drumset = this;
		setTimeout(
			function(){
				process.konsole.log(drumset);
				drumset.instrumentForNote(e.note).strike(e.velocity);
			},
			this.relativeOffset
		);
	}
};
