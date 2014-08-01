/*jslint node: true */
'use strict';

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = {
    setup: function(app) {
        for (var field in this.settings) {
            if (this.settings.hasOwnProperty(field)) {
                app.set(field, this.settings[field]);
            }
        }
    },
    settings: {
        title: 'Template v2',
        development: endsWith(__dirname, '/src/server')
    }
};