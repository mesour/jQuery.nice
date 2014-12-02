# jQuery.nice

jQuery helper for creating jQuery plugins.

- [Author](http://mesour.com)
- [Contact](http://mesour.com/contact)

# Simple plugin
Create plugin core:
```javascript
(function ($) {
        var NICE_PLUGIN = 'SayHello';

        if (!$.nice.createPlugin) {
            throw new Error('jQuery.nice.' + NICE_PLUGIN + ' require jQuery.nice core.');
        }

        var plugin = $.nice.createPlugin(NICE_PLUGIN, '0.1.0');
        plugin.options = { // default options

            textHello: 'Hello!'

        };

        $.fn.sayHello = function () {
            return $.nice.init(this, plugin, SayHello, arguments);
        };

        var SayHello = function (element, options) {
            element.text(options.textHello); // replace text for textHello from options
        };
})(jQuery);
```

Using:
```javascript
// replace text on all .test-selector to "Hallo!"
$('.test-selector').sayHello();

// replace text on all .test-selector to "My Hallo!"
$('.test-selector').sayHello({
	textHello: "My Hallo!" // overwrite default options
});

// change default options
// "SayHello" is your nice plugin name
$.nice.getPlugin('SayHello').options.textHello = 'Hallo :)';
```