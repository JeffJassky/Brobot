App.module('Instruments.Views', function(Views){
    'use strict';

    Views.PadItemView = Backbone.Marionette.ItemView.extend({
        className: 'pad',
        tagName: 'li',
		template: function(data){
			return Handlebars.compile(
                '<button></button>' +
                '<span class="date">{{name}}</span>'
			)(data);
		},
        events: {
            'mousedown button': 'onMouseDown',
            'mouseup button': 'onMouseUp',
        },
        ui:{
            button: 'button'
        },
        status: 'idle',
        initialize: function(){
            $(window).on('keydown', this.onKeyDown.bind(this));
            $(window).on('keyup', this.onKeyUp.bind(this));
        },

        // Computer Interactions
        onMouseDown: function(){
            this.press();
        },
        onMouseUp: function(){
            this.release();
        },
        onKeyDown: function(e){
            if(e.keyCode === this.model.get('keyCode')){
                e.preventDefault();
                this.press();
            }
        },
        onKeyUp: function(e){
            if(e.keyCode === this.model.get('keyCode')){
                e.preventDefault();
                this.release();
            }
        },

        // Analog Interactions
        press: function(){
            this.ui.button.addClass('press');
        },
        release: function(){
            this.ui.button.removeClass('press');
        }

    });

    Views.PadCollectionView = Backbone.Marionette.CollectionView.extend({
        className: 'pads',
        tagName: 'ul',
    	childView: Views.PadItemView
    });

});