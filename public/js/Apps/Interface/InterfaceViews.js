App.module('Interface.Views', function(Views){
    'use strict';

    Views.InterfaceLayoutView = Backbone.Marionette.LayoutView.extend({
        id: 'interface-layout',
		template: function(data){
			return Handlebars.compile(
                '<div class="pads-region"></div>'
			)(data);
		},
        regions: {
            pads: 'div.pads-region'
        }
    });

});