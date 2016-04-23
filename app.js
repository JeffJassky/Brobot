var express = require('express'),
app = express(),
server = require('http').Server(app),
brobot = require('./Brobot/brobot').initialize();

app.use(express.static('public'));
server.listen(3000, function(){
	console.log('Server running');
});