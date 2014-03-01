(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    // @include jenga.js

    $.fn.bringToFront = function (options) {
        options = options || {};
        if (this[0]) {
            jenga.bringToFront(this[0], options.createStackingCtx, options.root);
        }
        return this;
    };

    $.fn.sendToBack = function (options) {
        options = options || {};
        if (this[0]) {
            jenga.sendToBack(this[0], options.createStackingCtx, options.root);
        }
        return this;
    };

    $.fn.isStackingCtx = function () {
        return this[0] ? jenga.isStackingCtx(this[0]) : false;
    };

    $.fn.getStackingCtx = function () {
        return this[0] ? jenga.getStackingCtx(this[0]) : undefined;
    };

}));