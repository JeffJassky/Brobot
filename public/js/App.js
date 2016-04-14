'use strict';
var App = new Backbone.Marionette.Application({
    instrumentCollection: null,
    pushState: false,
    onBeforeStart: function(){
    	this.instrumentCollection = new App.Entities.Instrument.InstrumentCollection();
    	this.instrumentCollection.fetch();
    },
    regions: {
        container: 'main#app-container'
    }
});