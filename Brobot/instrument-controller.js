var _ = require("underscore");

// Constructor
var InstrumentController = function(config) {
	_.extend(this, config);
}

// properties and methods
InstrumentController.prototype = {
	delayForVelocity: function(velocity){
		return 100;
	},
	durationForVelocity: function(velocity){
		return 100;
	},
	queue: function(velocity){
		setTimeout(
			this.getDelayForVelocity(velocity),
			this.strike
		);
	},
	strike: function(velocity){
		pin.digitalWrite(128);
		setTimeout(
			this.durationForVelocity(velocity),
			function(){
				pin.digitalWrite(0);
			}
		)
	}
};

// node.js module export
module.exports = InstrumentController;