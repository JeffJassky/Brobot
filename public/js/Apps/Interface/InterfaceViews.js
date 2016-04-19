App.module('Interface.Views', function(Views){
    'use strict';

    Views.InterfaceLayoutView = Backbone.Marionette.LayoutView.extend({
        id: 'interface-layout',
		template: function(data){
			return Handlebars.compile(
                '<div class="system-status-region"></div>' +
                '<div class="pads-region"></div>'
			)(data);
		},
        regions: {
            pads: 'div.pads-region'
        }
    });

});