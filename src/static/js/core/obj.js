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
        each: function(object, callback) {
            if (!object) return;

            for (var property in object) {
                // convert to number if a string with number
                property = isNaN(property) ? property : +property;
                if (object.hasOwnProperty(property)) {
                    callback(object[property], property);
                }
            }
        }
    };

    return exports;

});