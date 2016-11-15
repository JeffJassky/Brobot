App.module('Console.Views', function(Views, App){
    'use strict';

    Views.SystemStatusView = Backbone.Marionette.ItemView.extend({
        className: 'console',
		initialize: function(){
            App.socket.on('log', function (data) {
                console.log(data[0]);
            });
        }
    });

});