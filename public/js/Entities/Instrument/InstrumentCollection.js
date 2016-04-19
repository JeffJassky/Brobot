App.module('Entities.Instrument', function(Instrument){
    'use strict';

    Instrument.InstrumentCollection = App.Entities.Core.AppCollection.extend({
    	model: Instrument.InstrumentModel
    });

});