App.module('Interface', function(Interface){
    'use strict';

    Interface.Controller = {
        showInterface: function(){
        	var interfaceLayoutView = new Interface.Views.InterfaceLayoutView();
            App.container.show(interfaceLayoutView);

            interfaceLayoutView.pads.show(new App.Instruments.Views.PadCollectionView({
                collection: App.instrumentCollection
            }));
        }
    };

});