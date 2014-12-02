/*
 * jquery.nice
 *
 * @version 0.1.0
 *
 * Copyright (c) 2014 Matous Nemec <mesour.com>
 *
 * Licensed under MIT license:
 *      http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    var Nice = function () {
        var _this = this,
            plugins = {},
            NicePlugin = function (name, version) {
                this.options = {};
                var dataName = _this.uniqid(name);
                this.getVersion = function () {
                    return version;
                };
                this.getDataName = function () {
                    return dataName;
                };
            };

        this.isFn = function (arg) {
            return typeof arg === 'function';
        };
        this.call = function (callback, closure, args) {
            if (this.isFn(callback)) return callback.apply(closure || this, args || []);
        };
        this.createPlugin = function (name, version) {
            if (!plugins[name]) {
                plugins[name] = new NicePlugin(name, version);
            }
            return plugins[name];
        };
        var uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        this.uniqid = function (prefix, more_entropy) {
            if (typeof prefix === 'undefined') {
                prefix = '';
            }
            var retId;
            var formatSeed = function(seed, reqWidth) {
                seed = parseInt(seed, 10).toString(16);
                if (reqWidth < seed.length) {
                    return seed.slice(seed.length - reqWidth);
                }
                if (reqWidth > seed.length) {
                    return Array(1 + (reqWidth - seed.length)).join('0') + seed;
                }
                return seed;
            };
            uniqidSeed++;
            retId = prefix;
            retId += formatSeed(parseInt(new Date()
                .getTime() / 1000, 10), 8);
            retId += formatSeed(uniqidSeed, 5);
            if (more_entropy) {
                retId += (Math.random() * 10).toFixed(8).toString();
            }
            return retId;
        };
        this.getPlugins = function () {
            return plugins;
        };
        this.getPlugin = function (name) {
            return plugins[name];
        };
        this.init = function (elements, plugin, object, parameters, validate, create) {
            if(typeof object !== 'function')
                throw new Error('Third parameter must be a function.');

            var is_init = (parameters[0] && typeof parameters[0] === 'string') ? false : true,
                options = parameters[0];

            if (is_init)
                options = $.extend({}, plugin.options, parameters[0]);

            delete parameters[0];
            parameters = $.grep(parameters, function (n) {
                return (n !== "" && n != null);
            });

            return $(elements).each(function () {
                var valid = true,
                    $this = $(this);

                if (_this.isFn(validate))
                    valid = _this.call(validate, $this);

                if (!valid) return;

                if (!$this.data(plugin.getDataName())) {
                    if (!is_init) return;
                    _this.call(create, $this);
                    $this.data(plugin.getDataName(), new object($this, options));
                } else {
                    if ($this.data(plugin.getDataName())[options]) {
                        $this.data(plugin.getDataName())[options]
                            .apply($this.data(plugin.getDataName()), parameters);
                    } else {
                        throw new Error('Call undefined method ' + options + '!');
                    }
                }
            });
        };
    };

    if (!$.nice || !$.nice.created) {
        var nice = new Nice();

        if (typeof $.nice === 'object') {
            nice = $.extend(nice, $.nice);
        }
        $.nice = nice;
        $.nice.created = true;
    }
})(jQuery);