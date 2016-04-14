App.module('Routes', function(Routes, App){
    'use strict';

    Routes.onStart = function() {
        console.log('Initializing Routes');
        App.Router = new Routes.Router();
        Backbone.history.start();
    };

	Routes.Router = Backbone.Router.extend({
		routes: {
			"home": "defaultRoute"
		},
		defaultRoute: function(){
			console.log('Router: defaultRoute');
			App.Interface.Controller.showInterface();
		}
	});

});