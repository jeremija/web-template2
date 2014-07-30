define([], function() {

    var exports = {
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