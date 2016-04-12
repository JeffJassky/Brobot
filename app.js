var brobot = require('./brobot'),
	midiLibrary = require('midi'),
	express = require('express'),
	$ = require('jquery'),
	bodyParser = require('body-parser');

// SET UP MIDI TO SEND TO BROBOT
var midi = new midiLibrary.input();
midi.on('message', function(deltaTime, message) {
    var channel = message[1],
    	velocity = message[2],
    	instruction = message[0];
	if (instruction === 144){
		brobot.queue(channel, velocity);
	}
});
midi.openVirtualPort("Brobot");


// SET UP HTTP SERVER FOR INTERFACE
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/command/hit', function (req, res) {
	brobot.strike(36, 1);
	res.send('success');
});

app.get('/api/settings', function (req, res) {
	var settings = brobot.settings();
	res.json(settings);
});

app.post('/api/settings', function (req, res) {
	console.log(req.body);
	brobot.settings(req.body);
	res.json(brobot.settings());
});

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});