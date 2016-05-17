var _ = require("underscore");
// Constructor
var InstrumentController = function(instrument, config) {
	this.config = config;
	_.extend(this, instrument);
}

// properties and methods
InstrumentController.prototype = {

	// delayForVelocity(velocity:Int) return Int
	// calculates delay in MS from strike to impact for given :velocity
	delayForVelocity: function(velocity){
		// TODO : Make exponential, not linear
		var velocityFactor = 1 / 128 * velocity;
		return Math.ceil(this.softLatencyAbsolute * velocityFactor);
	},

	// durationForVelocity(velocity:Int) return Int
	// calculates total duration of strike for given :velocity

	durationForVelocity: function(velocity){
		in_min = 127;
		in_max = 0;
		out_min = 30;
		out_max = 30 + this.softLatencyAbsolute;
		return Math.ceil((velocity - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
	},

	// trueVelocity(velocity:Int) return Int
	// Returns proper velocity considering actual velocity range
	trueVelocity: function(velocity){
		in_min = 0;
		in_max = 127;
		out_min = this.softVelocity;
		out_max = 127;
		return Math.ceil((velocity - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
	},

	// pinValueForVelocity(velocity:Int) return Int
	// Returns a PWM pin value for given :velocity
	pinValueForVelocity: function(velocity){
		return this.trueVelocity(velocity) * 2;
	},

	// queue(velocity:Int) return null
	// Queue a strike for given :velocity
	queue: function(velocity){
		var self = this;
		setTimeout(
			function(){
				self.strike(velocity)
			},
			this.delayForVelocity(velocity)
		);
	},

	// strike(velocity:Int) return null
	// Manipulate pin to trigger solenoid
	strike: function(velocity){
		var self = this;
		if(this.hasOwnProperty('pin')){
			console.log({
				pin: this.pinNumber,
				velocity: velocity,
				trueVelocity: this.trueVelocity(velocity),
				pwm: this.pinValueForVelocity(velocity),
				delay: this.delayForVelocity(velocity),
				duration: this.durationForVelocity(velocity)
			});
			this.pin.brightness(
				this.pinValueForVelocity(velocity)
			);
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