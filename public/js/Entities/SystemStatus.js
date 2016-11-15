App.module('Entities.SystemStatus', function(SystemStatus, App){
    'use strict';

    SystemStatus.SystemStatusModel = Backbone.Model.extend({
		socketResourceId: 'systemstatus',
		initialize: function(){
			var model = this;
		    App.socket.on(this.socketResourceId, function (data) {
				model.set(model.parse(data));
			});
			this.fetch();
		},
		parse: function(data){
			var newObj = {};
			_.each(data, function(value, key){
				newObj[key.replace('.','-')] = value;
			});
			return newObj;
		},
		fetch: function(){
			App.socket.emit('get:'+this.socketResourceId);
		},
		save: function(){
			console.log('Saving...');
			App.socket.emit('post:'+this.socketResourceId, this.toJSON());
		}
    });

});