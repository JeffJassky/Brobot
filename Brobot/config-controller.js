var config = require('./config'),
	fs = require('fs');

function saveFile(){
	// build file contents
	var contents = 'var config = ' +
		JSON.stringify(config) +
		'; module.exports = config;';
		
	// write file contents
	fs.writeFile(__dirname + '/config.js', contents, function (err) {
		if (err) return console.log(err);
		console.log('Settings file saved');
	});
}

module.exports = {
	get: function(key){
		return config[key];
	},
	save: function(key, data){
		config[key] = data;
		saveFile(callback);
	}
};