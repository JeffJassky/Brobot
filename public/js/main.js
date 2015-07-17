var brobot = {
    settings: {
        numberOfOutputs: 10,
        outputs: [
            {
                name: 'Snare 1',
                note: 41,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Snare 2',
                note: 41,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Kick 1',
                note: 42,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Kick 2',
                note: 42,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Tom 1',
                note: 43,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Tom 2',
                note: 44,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Tom 3',
                note: 45,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Hats',
                note: 46,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Ride',
                note: 47,
                minPwm: 100,
                delay: 0
            },
            {
                name: 'Crash',
                note: 48,
                minPwm: 100,
                delay: 0
            }
        ]
    },
    $mainContainer: $('#main-container'),
    initialize: function(){
        this.controller.loadSettings();
    },
    controller: {
        render: function(){
            brobot.$mainContainer.empty();
            var html = '<form>';
            html += '<table>';
            for(var i=0; i<brobot.settings.numberOfOutputs; i++){
                html += '<tr id="outout-'+i+'">';
                html += '   <td>'+(i+1)+'.</td>';
                html += '   <td><input type="text" name="outputs['+i+'].name" value="'+brobot.settings.outputs[i].name+'">.</td>';
                html += '   <td><input type="number" name="outputs['+i+'].note" value="'+brobot.settings.outputs[i].note+'">.</td>';
                html += '   <td><input type="button" value="test"></td>';
                html += '</tr>';
            }
            html += '</table>';
            html += '<input type="submit" value="Save Changes">';
            html += '</form>';
            brobot.$mainContainer.html(html);

            $('form').submit(function(e){
                e.preventDefault();
                brobot.settings.outputs = this.serializeObject();
                brobot.controller.saveSettings();
            })
        },
        loadSettings: function(){
            return $.get('/api/settings').done(function(response){
                brobot.config = response;
                brobot.controller.render();
            });
        },
        saveSettings: function(){
            return $.ajax({
                url: '/api/settings',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(brobot.settings.outputs),
                contentType: 'application/json'
            });
        }
    }
};
brobot.initialize();


(function($){
    $.fn.serializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);