App.module('Instruments.Views', function(Views, App){
    'use strict';

    Views.ChannelStripView = Backbone.Marionette.ItemView.extend({
        className: 'channel-strip',
		template: function(data){
			return Handlebars.compile(
                '<form>' +
                    '<div class="channel-strip">' +
                        '<div class="channel-strip-cell channel-strip-name">' +
                            '<input type="text" name="name" value="{{name}}">' + 
                        '</div>' +
                        '<div class="channel-strip-cell">' +
                            '<label>MIDI Note</label>' +
                            '<input type="text" name="note" value="{{note}}">' + 
                        '</div>' +
                        '<div class="channel-strip-cell">' +
                            '<label>Arduino Pin</label>' +
                            '<input type="text" name="pinNumber" value="{{pinNumber}}">' + 
                        '</div>' +
                        '<div class="channel-strip-cell">' +
                            '<label>Physical Latency</label>' +
                            '<input type="text" name="latency" value="{{latency}}">' + 
                        '</div>' +
                        '<div class="channel-strip-cell">' +
                            '<label>Relative Offset</label>' +
                            '-{{relativeOffset}}' + 
                        '</div>' +
                    '</div>' +
                '</form>'
			)(data);
		},
        ui: {
            form: 'form',
            inputs: 'input'
        },
      	events: {
          'change @ui.inputs': 'updateModel'
        },
        updateModel: function(){
            var data = {};
            _.each(this.ui.form.serializeArray(), function(input){
                data[input.name] = input.value;
            });
            this.model.set(data);
        }
    });

    Views.ChannelStripCollectionView = Backbone.Marionette.CollectionView.extend({
    	className: 'channel-strip-container',
    	childView: Views.ChannelStripView
    });

});