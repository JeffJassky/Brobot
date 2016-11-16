App.module('Console.Views', function(Views, App){
    'use strict';

    Views.ConsoleView = Backbone.Marionette.ItemView.extend({
	className: 'console',
	template: function(data){
		return Handlebars.compile(' ')(data);
	},
	initialize: function(){
            App.socket.on('log', this.addLog.bind(this));
        },
	addLog: function(line){
		var line = line[0]
		console.log(line);
		var p = $('<p>').text(line);
		this.$el.append(p);
	}
    });

});
