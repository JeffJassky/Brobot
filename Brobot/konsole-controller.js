module.exports = {
	log: function(){
		process.socket.emit('log', arguments);
		console.log.apply(this, arguments);
	}
};