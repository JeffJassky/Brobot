App.module('Entities.Instrument', function(Instrument){
    'use strict';

    Instrument.InstrumentCollection = Backbone.Collection.extend({
    	url: '/api/settings',
    	model: Instrument.InstrumentModel
    });

});