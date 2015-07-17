var five = require("johnny-five");
var $ = require("jquery");
var board = new five.Board();
var calibrating = false;

var channels = {
	36: {
		name: "snare",
		pinNumber: 3,
		minimumPwm: 30,
		piezoPin: 0,
	},
	39: {
		name: "kick",
		pinNumber: 5,
		minimumPwm: 30,
		piezoPin: 1
	},
	42: {
		name: "hat",
		pinNumber: 9,
		minimumPwm: 30,
		piezoPin: 2
	}
};

board.on("ready", function() {
	for(var channel in channels){
		channels[channel].pin = five.Led(channels[channel].pinNumber);
	}
	if(calibrating){
		for(var channel in channels){
			this.analogRead(channels[channel].piezoPin, function(reading) {
				if(reading > 100){

				}
			});
		}
	}
});

exports.calibrate = function(){
	calibrating = true;
	for(var channel in channels){
		channels[channel].deferred = $.Deferred();
		
		for(var velocity = 10; velocity <= 128; velocity+= 5){
			this.strike(channel, velocity);
		}
	}
};

exports.queueStrike = function(channel, velocity){
	if(channels[channel]){
		if(channels[channel].delay){
			setTimeout(
				function(){
					strike(channel, velocity);
				},
				channels[channel].delay
			);
		}else{
			this.strike(channel, velocity);
		}
	}
};

exports.strike = function(channel, velocity){
	console.log('hit', channel, velocity);
	if(channels[channel] && channels[channel].pin){
		channels[channel].pin.brightness(velocity * 2);
		setTimeout(function(){
			channels[channel].pin.brightness(0);
		}, 2000);
	}
};

exports.settings = function(data){
	if(data){
		channels = data;
	}
	return channels;
};