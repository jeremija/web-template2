define(['Extendable'], function(Extendable) {

    /**
     * @class handles information about event listener and it's callback
     * @name modules/EventListener
     * @private
     */
    function EventListener(name, callback, context) {
        this.name = name;
        this.callback = callback;
        this.context = context;
    }

    var EventListenerPrototype = /** @lends EventListener.prototype */ {
        invoke: function(/** variable arguments */) {
            this.callback.apply(this.context, arguments);
        }
    };

    return Extendable.extend(EventListener, EventListenerPrototype);

});