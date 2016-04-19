App.module('Entities.Core', function(Core){
    'use strict';

    Core.AppCollection = Backbone.Collection.extend({
        initialize: function(options){
            if(this.resource){
                resource.subscribe('create', function (data) {
                    collection.add(data);
                });
                resource.subscribe('update', function (data) {
                    var item = collection.get(data.id);
                    if (item) item.set(data);
                });
                resource.subscribe('delete', function (data) {
                    collection.remove(data.id);
                });
            }
        },
        sync: function (method, model, options) {
            options || (options = {});

            var success = options.success || function () {};
            var error = options.error || function () {};

            delete options.success;
            delete options.error;

            var deferred = $.Deferred();

            if (method === 'read' && !model.id) method = 'list';

            resource.sync(method, model, options, function (err, res) {
            if (err) {
                error(err);
                deferred.reject(err);
            } else {
                success(res);
                deferred.resolve(res);
            }
            });

            return deferred.promise();
        }
    });

});