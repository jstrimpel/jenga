// Jenga: fuck z-indexes.
// ----------------------------------
// v0.0.1
//
// Copyright (c)2014 Jason Strimpel
// Distributed under MIT license
define(function () {

    'use strict';

    // fixed - the version where position fixed started creating a stacking context
    var browsers = {
        chrome: {
            fixed: 22
        }
    };
    
    // get browser version and name
    // i did not write this; if someone knows who did please let me know
    // so i can attribute the code to the author
    var browser = (function () {
        var N = navigator.appName;
        var ua = navigator.userAgent;
        var tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) {
            M[2] = tem[1];
        }
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    
        return {
            name: M[0].toLowerCase(),
            version: M[1]
        };
    })();
    
    var isFixedStackingCtx = (function () {
        return browsers[browser.name].fixed >= browser.version;
    })();
    
    function isPosAndHasZindex(el) {
        return el.style.position !== 'static' && el.style.zIndex !== 'auto';
    }
    
    // these values cause an element to create a stacking context
    function doesStyleCreateStackingCtx(el) {
        var styles = el.style;
    
        if (styles.opacity < 1) {
            return true;
        }
        if (styles.transform !== 'none') {
            return true;
        }
        if (styles.transformStyle === 'preserve-3d') {
            return true;
        }
        if (styles.perspective !== 'none') {
            return true;
        }
        if (styles.flowFrom !== 'none' && styles.content !== 'normal') {
            return true;
        }
        if (styles.position === 'fixed' && isFixedStackingCtx) {
            return true;
        }
    
        return false;
    }
    
    function modifyZindex(el, increment) {
        var stackingCtxEl = this.getStackingCtx(el);
        var siblings = stackingCtxEl.childNodes;
        var siblingsMaxMinZindex = 0;
    
        for (var i = 0; i < siblings.length; i++) {
            if (isPosAndHasZindex(siblings[i]) && siblings[i] !== el) {
                var siblingZindex = siblings[i].styles.zIndex;
                if (increment) {
                    siblingsMaxMinZindex = (siblingZindex > siblingsMaxMinZindex && siblingsMaxMinZindex) > el.styles.zIndex ?
                        siblingZindex : siblingsMaxMinZindex;
                } else {
                    siblingsMaxMinZindex = (siblingZindex < siblingsMaxMinZindex && siblingsMaxMinZindex) < el.styles.zIndex ?
                        siblingZindex : siblingsMaxMinZindex;
                }
            }
        }
    
        el.styles.zIndex = increment ? siblingsMaxMinZindex + 1 : siblingsMaxMinZindex - 1;
    }
    
    function moveUpDown(el, createStackingCtx, root, increment) {
        var stackingCtxEl = getStackingCtx(el);
    
        if (createStackingCtx && stackingCtxEl !== el.parentNode) {
            el.parentNode.styles.position = 'relative';
            el.parentNode.styles.zIndex = 0;
        }
    
        modifyZindex(el, increment);
        if (root && (root !== getStackingCtx(el) && stackingCtxEl.tageName !== 'HTML')) {
            moveUpDown(stackingCtxEl, createStackingCtx, root, increment);
        }
    }
    
    var jenga = {
    
        isStackingCtx: function (el) {
            return el.tagName === 'HTML' || (isPosAndHasZindex(el) && doesStyleCreateStackingCtx(el));
        },
    
        getStackingCtx: function (el) {
            var parentNode = el.parentNode;
    
            while (!isStackingCtx(parentNode)) {
                parentNode = parentNode.parentNode;
            }
    
            return parentNode;
        },
    
        bringToTop: function (el, createStackingCtx, root) {
            moveUpDown(el, createStackingCtx, root, true);
        },
    
        sendToBack: function (el, createStackingCtx, root) {
            moveUpDown(el, createStackingCtx, root, false);
        }
    };

    return jenga;

});