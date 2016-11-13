var status = {
	'arduino.status': 'disconnected',
	'arduino.port': null,
	'midi.status': 'closed',
	'midi.name': null,
};

module.exports = {
	get: function(key){
		if(key){
			if(status[key]){
				return status[key];
			}else{
				return false;
			}
		}else{
			return status;
		}
	},
	set: function(key, data){
		status[key] = data;
		process.socket.emit('systemstatus', status);
	}
};