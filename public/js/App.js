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
        var instrumentCollectionResource = this.socket.resource('instruments');
        dataio.sync(this.instrumentCollection, instrumentCollectionResource);
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