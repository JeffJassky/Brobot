// REQUIRE DEPENDENCIES
var midiLibrary = require('midi');
var midiPortName = "Brobie";

// MIDI INSTRUCTION MAP
var midiInstructions = {
	144: 'queuenote',
	155: 'queuenote',
	153: 'queuenote',
	128: 'contact',
	129: 'contact'
};

// LOCAL VARS
var midi;


function initialize(){
	midi = new midiLibrary.input();
	midi.openVirtualPort(midiPortName);
	process.konsole.log("MIDI: Opened virtual port ("+midiPortName+")");
	process.systemstatus.set('midi.name', midiPortName);
	midi.on('message', onMidiMessage);
	return this;
}

function onMidiMessage(time, message){
	process.konsole.log('MIDI: Message Received', message);
	var instruction = message[0],
    	note = message[1],
    	velocity = message[2];

    if(midiInstructions[instruction]){
	process.konsole.log('MIDI: Instruction being called', 'drumset:' + midiInstructions[instruction], {
                note: note,
                velocity: velocity
        });
    	process.emit('drumset:' + midiInstructions[instruction], {
    		note: note,
    		velocity: velocity
    	});
    }
}

module.exports = {
	initialize: initialize
}
