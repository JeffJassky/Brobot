App.module('Entities.Instrument', function(Instrument, App){
	
	Instrument.InstrumentModel = Backbone.Model.extend({

	});

    Instrument.InstrumentCollection = Backbone.Collection.extend({
		model: Instrument.InstrumentModel,
		socketResourceId: 'instruments',
		initialize: function(){
			var collection = this;
		    App.socket.on(this.socketResourceId, function (data) {
				collection.set(collection.parse(data));
			});
			this.fetch();
			this.listenTo(this, 'change', this.save);
		},
		fetch: function(){
			App.socket.emit('get:'+this.socketResourceId);
		},
		save: function(){
			console.log('Saving instruments collection...');
			App.socket.emit('post:'+this.socketResourceId, this.toJSON());
		}
    });

});