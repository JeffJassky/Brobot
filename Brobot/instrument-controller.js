var _ = require("underscore");
// Constructor
var InstrumentController = function(instrument, config) {
	this.config = config;
	_.extend(this, instrument);
}

// properties and methods
InstrumentController.prototype = {

	// DEVELOPMENT METHODS
	determineMinimumDurationForContact: function(){
		var self = this;
		var min = 5; // minimum duration in milliseconds
		var max = 30; // maximum duration in milliseconds
		
		for(var x=min; x<max; x++){
			setTimeout(function(duration){
	                        console.log('starting duration test for '+self.pinNumber+' for '+duration+'ms');
                        	self.pin.brightness(255);
                        	setTimeout(
                        	        function(){
                        	                console.log('Pin ' + self.pinNumber + ' going to 0');
                        	                self.pin.brightness(0);
                        	        },
					duration
                        	)
			}.bind(null, x), 1000 * (x - min));
		}
	},

	// durationForVelocity(velocity:Int) return Int
	// calculates total duration of strike for given :velocity

	durationForVelocity: function(velocity){
		in_min = 127;
		in_max = 0;
		out_max = this.latency;
		out_min = this.latency + 20;
		return Math.ceil((velocity - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
	},

	// queue(velocity:Int) return null
	// Queue a strike for given :velocity
	queue: function(velocity){
		var self = this;
		setTimeout(
			function(){
				self.strike(velocity)
			},
			this.relativeOffset
		);
	},

	// strike(velocity:Int) return null
	// Manipulate pin to trigger solenoid
	strike: function(velocity){
		var self = this;
		if(this.hasOwnProperty('pin')){
			console.log({
				name: this.name,
				pin: this.pinNumber,
				velocity: velocity,
				pwm: 255,
				relativeOffset: this.relativeOffset,
				duration: this.durationForVelocity(velocity)
			});
			this.pin.brightness(255);
			setTimeout(
				function(){
					console.log('Pin ' + self.pinNumber + ' going to 0');
					self.pin.brightness(0);
				},
				this.durationForVelocity(velocity)
			)
		}else{
			console.log('Pin not found');
		}
	}
};

// node.js module export
module.exports = InstrumentController;
