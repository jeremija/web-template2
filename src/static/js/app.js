define(['bootstrap'], function(bootstrap) {
    'use strict';

    // fallback if window.console is not defined
    window.console = window.console || {
        debug: function() {},
        log: function() {},
        error: function() {}
    };

    console.log('app.js loaded');

    return {
        log: function() {
            console.log('app.js logger');
        }
    };

});