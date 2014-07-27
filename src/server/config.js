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
        minified: false
    }
};