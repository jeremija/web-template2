define([], function() {
    'use strict';

    var exports = {
        createEvent: function(type) {
            if (typeof window.Event === 'function') {
                return new window.Event(type);
            }
            var event = document.createEvent('Event');
            event.initEvent(type, true, true);
            return event;
        }

    };

    return exports;

});