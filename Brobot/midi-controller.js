// REQUIRE DEPENDENCIES
var midiLibrary = require('midi');

// MIDI INSTRUCTION MAP
var midiInstructions = {
	144: 'queuenote',
	155: 'queuenote',
	153: 'queuenote',
	128: 'contact',
	129: 'contact'
};

module.exports = {
	initialize: function(){
		midi = new midiLibrary.input();
		midi.openVirtualPort("Brobie Node");
		midi.on('message', this.onMidiMessage.bind(this));
	},
	onMidiMessage: function(time, message){
		var instruction = message[0],
	    	note = message[1],
	    	velocity = message[2];

	    if(midiInstructions[instruction]){
	    	process.emit(midiInstructions[instruction], {
	    		note: note,
	    		velocity: velocity
	    	});
	    }
	}
};