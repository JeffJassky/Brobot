var _ = require("underscore");
// Constructor
var InstrumentController = function(settings) {
	this.index = settings.index;
}

// properties and methods
InstrumentController.prototype = {
	settings: function(){
		return process.settings.get('instruments')[this.index];
	},
	get: function(key){
		return this.settings()[key];
	},

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
		out_max = this.get('latency');
		out_min = this.get('latency') + 20;
		return Math.ceil((velocity - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
	},

	// strike(velocity:Int) return null
	// Manipulate pin to trigger solenoid
	strike: function(velocity){
		var self = this;
		console.log({
			name: this.get('name'),
			pin: this.get('pinNumber'),
			velocity: velocity,
			pwm: 255,
			duration: this.durationForVelocity(velocity)
		});
		process.serialport.send(this.get('pinNumber'), velocity);
		setTimeout(
			function(){
				process.serialport.send(self.get('pinNumber'), 0);
			},
			this.durationForVelocity(velocity)
		)
	}
};

// node.js module export
module.exports = InstrumentController;
