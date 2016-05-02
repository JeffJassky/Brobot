var _ = require("underscore");
// Constructor
var InstrumentController = function(instrument, config) {
	this.config = config;
	_.extend(this, instrument);
}

// properties and methods
InstrumentController.prototype = {
	delayForVelocity: function(velocity){
		// TODO : Make exponential, not linear
		var velocityFactor = 1 / 128 * velocity;
		return this.softLatencyAbsolute * velocityFactor;
	},
	durationForVelocity: function(velocity){
		return this.delayForVelocity() + 100;
	},
	trueVelocity: function(velocity){
		in_min = 0
		in_max = 128
		out_min = this.softVelocity
		out_max = 128;
		return (velocity - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	},
	pinValueForVelocity: function(velocity){
		return this.trueVelocity() * 8;
	},
	queue: function(velocity){
		var self = this;
		setTimeout(
			function(){
				self.strike(velocity)
			},
			this.delayForVelocity(velocity)
		);
	},
	strike: function(velocity){
		var self = this;
		if(this.hasOwnProperty('pin')){
			this.pin.digitalWrite(
				this.pinValueForVelocity(velocity)
			);
			setTimeout(
				this.durationForVelocity(velocity),
				function(){
					self.pin.digitalWrite(0);
				}
			)
		}else{
			console.log('Pin not found');
		}
	}
};

// node.js module export
module.exports = InstrumentController;