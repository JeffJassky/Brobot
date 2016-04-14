var
	five = require("johnny-five"),
	$ = require("jquery"),
	_ = require("underscore"),
	board = new five.Board(),
	pins = {

	},
	instruments = [
		{
			name: "snare",
			note: 36,
			pinNumber: 3,
			minimumPwm: 30,
			piezoPin: 0,
			delay: 100,
			keyCode: 49
		},
		{
			name: "kick",
			note: 39,
			pinNumber: 5,
			minimumPwm: 30,
			piezoPin: 1,
			delay: 100,
			keyCode: 50
		},
		{
			name: "hat",
			note: 40,
			pinNumber: 9,
			minimumPwm: 30,
			piezoPin: 2,
			delay: 100,
			keyCode: 51
		}
	];

// Returns instrument object
function getInstrumentWithNote(note){
	return _.find(instruments,{note: note});
}

// Returns a Pin Object
function getPinWithNote(note){
	var index = _.findIndex(instruments, {note: note});
	return index >= 0 ? pins[index] : false;
}

board.on("ready", function() {
	for(var i in instruments){
		pins[i] = five.Led(instruments[i].pinNumber);
	}
});

exports.queue = function(note, velocity){
	console.log('queueStrike', note, velocity);
	var instrument = getInstrumentWithNote(note);
	if(instrument){
		if(instrument.delay){
			setTimeout(
				this.strike.bind(null, note, velocity),
				instrument.delay
			);
		}else{
			this.strike(note, velocity);
		}
	}
};

exports.strike = function(note, velocity){
	console.log('strike', note, velocity);
	var pin = getPinWithNote(note);
	if(pin){
		pin.brightness(velocity * 2);
		setTimeout(function(){
			pin.brightness(0);
		}, 2000);
	}else{
		console.log('strike', 'No pin for note ' + note);
	}
};

exports.settings = function(data){
	if(data){
		instruments = data;
	}
	return instruments
};