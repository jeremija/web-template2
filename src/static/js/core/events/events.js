/**
 * Serves for dispatching event throughout the application
 * @module core/events/events
 */
define(['core/events/EventListener'],
    function(EventListener) {

    var allListeners = {};

    var exports = {
        /**
         * Determines whether or not to store events to _lastEvents property.
         * @type {Boolean}
         */
        debug: false,
        _getAllListeners: function() {
            return allListeners;
        },
        /**
         * Contains names of events and callback functions
         * @type {Object} which contains eventName as a key and an array of
         * @{link core/EventListener}s.
         */
        addListener: function(eventName, callback, context) {
            var listener = new EventListener(eventName, callback, context);

            var listeners = allListeners[eventName];
            if (!listeners) listeners = allListeners[eventName] = [];
            listeners.push(listener);
        },
        /**
         * Adds multiple listeners at once
         * @param {Object} listenerData map where key defines eventName and
         * value is a callback function
         * @param {Object} context      [description]
         */
        addListeners: function(listenerData, context) {
            for (var eventName in listenerData) {
                if (listenerData.hasOwnProperty(eventName)) {
                    var callback = listenerData[eventName];
                    this.addListener(eventName, callback, context);
                }
            }
        },
        /**
         * Removes all listeners for specific event with specific callback
         * @param  {String}   eventName [description]
         * @param  {Function} callback  [description]
         */
        removeListener: function(eventName, callback) {
            var listeners = allListeners[eventName];
            if (!listeners) return;

            var count = 0;
            for(var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                if (listener.callback === callback) {
                    listeners.splice(i, 1);
                    count++;
                    i--;
                }
            }
            return count;
        },
        /**
         * Removes all listeners which have the same context.
         * @param  {Object} context
         */
        removeListeners: function(context) {
            var count = 0;
            for (var eventName in allListeners) {
                if (allListeners.hasOwnProperty(eventName)) {
                    var listeners = allListeners[eventName];
                    for (var i = 0; i < listeners.length; i++) {
                        var listener = listeners[i];
                        if (listener.context === context) {
                            listeners.splice(i, 1);
                            count++;
                            i--;
                        }
                    }
                }
            }
            return count;
        },
        /**
         * Calls all events
         * @param {String} eventName
         * @param {Object...} args variable number of arguments for callbacks.
         */
        dispatch: function(eventName) {
            var args = Array.prototype.slice.call(arguments, 1);

            if (this.debug) {
                this._lastEvents.push({
                    name: eventName,
                    args: args
                });
            }

            var listeners = allListeners[eventName];

            if (typeof listeners !== 'object') {
                console.warn('no listeners for eventName=' + eventName);
                return;
            }

            listeners.forEach(function(listener) {
                listener.invoke.apply(listener, args);
            });
        },
        _lastEvents: []
    };

    return exports;

});