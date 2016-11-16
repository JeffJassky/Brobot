App.module('ControlPanel.Views', function(Views, App){
    'use strict';

    Views.SystemStatusView = Backbone.Marionette.ItemView.extend({
	modelEvents: {
		change: 'render'
	},
        className: 'system-status',
		template: function(data){
			return Handlebars.compile(
                '<span class="indicator {{arduino-status}}"></span>' +
                '<label>' + 
                    '{{#if arduino-status}}USB Connected{{else}}USB Disconnected{{/if}}' + 
                '</label>'
			)(data);
		}
    });

});
