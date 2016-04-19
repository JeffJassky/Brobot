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
		}
    });

    Views.PadCollectionView = Backbone.Marionette.CollectionView.extend({
        className: 'pads',
        tagName: 'ul',
    	childView: Views.PadItemView
    });

});