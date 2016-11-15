// LOAD DEPENDENCIES
var SerialPort = require('serialport');
var _ = require('underscore');

var refreshIntervalTime = 10000;
var refreshInterval = null;

// PROCESS GLOBALS
var port = null;


function beginScanning(){
	stopScanning();
	listDevices();
	refreshInterval = setInterval(listDevices, refreshIntervalTime);
	process.konsole.log('SERIALPORT: Scanning for devices');
}

function stopScanning(){
	clearInterval(refreshInterval);
	process.konsole.log('SERIALPORT: Stopped scanning for devices');
}

function listDevices(){
	SerialPort.list(function (err, ports) {
		process.konsole.log('SERIALPORT: '+ports.length+' devices detected');
		var deviceFound = _.find(ports, function(port){
			if(port.manufacturer){
				return port.manufacturer.toLowerCase().indexOf('arduino') !== -1
			}
			return false;
		});
		if(deviceFound){
			connectToPort(deviceFound.comName);
		}
	});
}

function connectToPort(deviceComName){

	stopScanning();

	if(port && port.isOpen()){
		port.close();
	}
	port = new SerialPort.SerialPort(deviceComName);

	port.on('open', function() {
		process.systemstatus.set('arduino.status', 'connected');
		process.konsole.log('SERIALPORT: Connected to ' + deviceComName);
	});
	port.on('error', function(err) {
		process.konsole.log('SERIALPORT: error - ' + err);
	});
	port.on('close', function(err) {
		process.systemstatus.set('arduino.status', 'disconnected');
		process.konsole.log('SERIALPORT: Closed');
		beginScanning();
	});
	port.on('disconnect', function(err) {
		process.systemstatus.set('arduino.status', 'disconnected');
		process.konsole.log('SERIALPORT: Disconnected');
		beginScanning();
	});
}

function send(note, velocity){
	if(port && port.isOpen()){
		var data = 's '+note+' '+velocity+"\n";
		process.konsole.log('SERIALPORT: Writing ' + data);
		port.write(data);
	}
}

// EXPORT
module.exports = {
	beginScanning: beginScanning,
	listDevices: listDevices,
	connectToPort: connectToPort,
	send: send
};