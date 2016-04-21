'use strict';
var App = new Backbone.Marionette.Application({
    instrumentCollection: null,
    systemStatus: null,
    pushState: false,
    socket: null,
    onBeforeStart: function(){
    	this.socket = data(io.connect());

        // Instruments Collection
    	this.instrumentCollection = new App.Entities.Instrument.InstrumentCollection();
        dataio.sync(this.instrumentCollection, this.socket.resource('instruments'));
  		this.instrumentCollection.fetch();

        // System Status
        this.systemStatus = new App.Entities.SystemStatus.SystemStatusModel();
        var systemStatusResource = this.socket.resource('systemStatus');
        dataio.syncModel(this.systemStatus, systemStatusResource);
        this.systemStatus.fetch();

    },
    regions: {
        container: 'main#app-container'
    }
});