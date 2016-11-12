App.module('ControlPanel', function(ControlPanel){
    'use strict';

    ControlPanel.Controller = {
        show: function(){
            App.channelStrips.show(new App.Instruments.Views.ChannelStripCollectionView({
                collection: App.instruments
            }));
        }
    };

});