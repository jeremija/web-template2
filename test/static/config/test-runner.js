require(['Squire'], function(Squire) {
    'use strict';
    var squireRequire = Squire.prototype.require;

    var injectCount = 0;
    Squire.prototype.require = function(deps, factory) {
        injectCount++;
        squireRequire.call(this, deps, function() {
            factory.apply(null, arguments);
            injectCount--;
            if (injectCount === 0) {
                console.log('all callbacks completed');
                run();
            }
        });
    };

    mocha.setup('bdd')
        .globals(['jQuery*'])
        .checkLeaks();

    function run() {
        if (!testsLoaded || injectCount > 0) return;
        console.log('running tests');

        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        }
        else {
            mocha.run();
        }
    }

    var testsLoaded = false;
    require(tests, function() {
        console.log('all tests loaded');
        testsLoaded = true;
        run();
    });

});