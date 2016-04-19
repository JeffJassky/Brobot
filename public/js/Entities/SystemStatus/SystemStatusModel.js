App.module('Entities.SystemStatus', function(SystemStatus){
  'use strict';

  SystemStatus.SystemStatusModel = Backbone.Model.extend({
  	defaults: {
  		arduinoConnected: false,
  		midiConnected: false
  	}
  });

});