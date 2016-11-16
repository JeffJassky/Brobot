App.module('ControlPanel', function(ControlPanel){
    'use strict';

    ControlPanel.Controller = {
        show: function(){
        	App.channelStrips.show(new App.Instruments.Views.ChannelStripCollectionView({
        		collection: App.instruments
        	}));
        	App.systemStatus.show(new App.ControlPanel.Views.SystemStatusView({
        		model: App.systemstatus
        	}));
		App.console.show(new App.Console.Views.ConsoleView());
        }
    };

});
