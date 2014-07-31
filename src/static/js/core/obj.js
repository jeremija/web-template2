/**
 * Contains helper functions for manipulating JavaScript objects
 * @module core/obj
 */
define([], function() {

    /**
     * @callback module:core/obj~eachCallback
     * @param {Object|Function} value value of field
     * @param {String|Number} field object's property
     */

    var exports = {
        /**
         * Iterates through object's own properties. Works on arrays too.
         * @param  {Object}   object object to iterate through
         * @param  {module:core/obj~eachCallback} callback to call for each
         * found property
         */
        each: function(object, callback, context) {
            if (!object) return;

            for (var property in object) {
                // convert to number if a string with number
                property = isNaN(property) ? property : +property;
                if (object.hasOwnProperty(property)) {
                    callback.call(context, object[property], property);
                }
            }
        },
        size: function(object) {
            var count = 0;
            this.each(object, function(value, key) {
                count++;
            });
            return count;
        },
        copy: function(dest, src) {
            if (!src || typeof dest !== 'object') return;

            this.each(src, function(value, field) {
                dest[field] = value;
            });

            return dest;
        }
    };

    return exports;

});