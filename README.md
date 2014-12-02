# jQuery.nice

jQuery helper for creating jQuery plugins.

- [Author](http://mesour.com)
- [Contact](http://mesour.com/contact)

# Simple plugin
Create plugin core:
```javascript
(function ($) {
        var NICE_PLUGIN = 'MyPlugin';

        if (!$.nice.createPlugin) {
            throw new Error('jQuery.nice.' + NICE_PLUGIN + ' require jQuery.nice core.');
        }

        var plugin = $.nice.createPlugin(NICE_PLUGIN, '0.1.0');
        plugin.options = {
            // default options
        };

        $.fn.myPlugin = function () {
            return $.nice.init(this, plugin, MyPlugin, arguments);
        };

        var MyPlugin = function (element, options) {
            console.log(element, options);
            // applied for all matches elements
        };
})(jQuery);
```