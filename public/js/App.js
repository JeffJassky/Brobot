var App = new Backbone.Marionette.Application({
	socket: null,
    regions: {
        channelStrips: '#js-channel-strips-region',
        systemStatus: '#js-system-status-region',
	console: '#js-console-region'
    },
    onBeforeStart: function(){
    	this.socket = io.connect(window.document.location.origin);
        this.systemstatus = new App.Entities.SystemStatus.SystemStatusModel();
        this.instruments = new App.Entities.Instrument.InstrumentCollection();
    },
    onStart: function(){
    	App.ControlPanel.Controller.show();
    }
});
