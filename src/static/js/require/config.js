var require = {
    // urlArgs: new Date().getTime().toString(),
    ////  baseUrl: 'js',
    paths: {
        'Extendable': '../bower/extendable.js/dist/extendable',

        'jquery': '../bower/jquery/dist/jquery',
        'bootstrap': '../bower/bootstrap/dist/js/bootstrap'
    },

    map: {
        '*': {
            //enable jquery's no conflict mode
            'jquery' : 'require/jquery-private',
        },
        'require/jquery-private': {
            'jquery': 'jquery'
        }
    },

    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
    }
};