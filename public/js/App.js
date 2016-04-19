'use strict';
var App = new Backbone.Marionette.Application({
    instrumentCollection: null,
    systemStatus: null,
    pushState: false,
    socket: null,
    onBeforeStart: function(){
    	this.socket = data(io.connect());
    	this.systemStatus = new App.Entities.SystemStatus.SystemStatusModel();
    	this.instrumentCollection = new App.Entities.Instrument.InstrumentCollection();
	    dataio.sync(this.instrumentCollection, this.socket.resource('instruments'));
  		this.instrumentCollection.fetch();

		// this.instruments = this.socket.resource('instruments');
		// this.instruments.subscribe('create', 'update', function (instruments) {
		// 	console.log(instruments);
		// });
    },
    // syncModel: function(){

    // }
    regions: {
        container: 'main#app-container'
    }
});