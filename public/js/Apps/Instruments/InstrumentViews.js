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
                            '<input type="number" name="note" value="{{note}}">' + 
                        '</div>' +
                        '<div class="channel-strip-cell">' +
                            '<label>Arduino Pin</label>' +
                            '<input type="number" name="pinNumber" value="{{pinNumber}}">' + 
                        '</div>' +
                        '<div class="channel-strip-cell">' +
                            '<label>Physical Latency</label>' +
                            '<input type="number" name="latency" value="{{latency}}">' + 
                        '</div>' +
                        '<div class="channel-strip-cell">' +
                            '<label>Relative Offset</label>' +
                            '-{{relativeOffset}}' + 
                        '</div>' +
                        '<div class="channel-strip-cell channel-strip-pad"></div>' +
                    '</div>' +
                '</form>'
			)(data);
		},
        ui: {
            form: 'form',
            inputs: 'input',
            pad: '.channel-strip-pad'
        },
      	events: {
          'change @ui.inputs': 'updateModel',
          'mousedown @ui.pad': 'onMouseDownPad',
          'mouseup @ui.pad': 'onMouseUpPad'
        },
        updateModel: function(){
            var data = {};
            _.each(this.ui.form.serializeArray(), function(input){
                // Make sure not to parse numbers as strings
                input.value = (Number(input.value) == input.value) ? Number(input.value) : input.value;
                data[input.name] = input.value;
            });
            this.model.set(data);
        },
        onMouseDownPad: function(e){
            var percentage = (100 / this.ui.pad.outerWidth()) * (e.pageX - this.ui.pad.offset().left);
            this.ui.pad.css('opacity',percentage / 100);
            this.ui.pad.addClass('mousedown');
            App.socket.emit('buttonpress', {
                note: this.model.get('note'),
                velocity: Math.round((127 / 100) * percentage)
            });
        },
        onMouseUpPad: function(){
            this.ui.pad.css('opacity', 1);
            this.ui.pad.removeClass('mousedown');
        }
    });

    Views.ChannelStripCollectionView = Backbone.Marionette.CollectionView.extend({
    	className: 'channel-strip-container',
    	childView: Views.ChannelStripView
    });

});