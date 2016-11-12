var App = new Backbone.Marionette.Application({
	socket: null,
    regions: {
        channelStrips: 'main#js-channel-strips-region'
    },
    onBeforeStart: function(){
    	this.socket = io.connect(window.document.location.origin);
    	this.instruments = new App.Entities.Instrument.InstrumentCollection();
    },
    onStart: function(){
    	App.ControlPanel.Controller.show();
    }
});