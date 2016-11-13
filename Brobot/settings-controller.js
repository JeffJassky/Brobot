var settings = require('./settings'),
	_ = require('underscore'),
	fs = require('fs');

function saveFile(callback){
	// build file contents
	var contents = 'var settings = ' +
		JSON.stringify(settings) +
		'; module.exports = settings;';
		
	// write file contents
	fs.writeFile(__dirname + '/settings.js', contents, function (err) {
		if (err) return console.log(err);
		console.log('SETTINGS: File saved');
	});
}

module.exports = {
	get: function(key){
		if(key){
			if(settings[key]){
				return settings[key];
			}else{
				return false;
			}
		}else{
			return settings;
		}
	},
	set: function(key, data, callback){
		if(key === 'instruments'){
			var maximumLatency = _.max(data, function(instrument){
				return parseInt(instrument.latency);
			}).latency;
			data = _.each(data, function(instrument){
				instrument.relativeOffset = maximumLatency - instrument.latency;
			});
		}
		settings[key] = data;
		if(callback){
			callback(settings);
		}
		saveFile();
	}
};