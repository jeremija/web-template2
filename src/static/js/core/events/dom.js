/**
 * Makes it easier to manipulate with DOM events.
 * @module core/events/dom
 */
define([], function() {
    'use strict';

    var exports = {
        /**
         * Creates new event instance which can be dispatched to a DOM element
         * @param  {String} type event tpye
         * @return {external:Event} new event instance
         */
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