require(['Squire'], function(Squire) {

    window.Squire = Squire;

    var injectCount = 0;
    window.inject = function(injector, deps, factory) {
        injectCount++;
        injector.require(deps, function() {
            factory.apply(null, arguments);
            injectCount--;
            if (injectCount === 0) {
                console.log('all inject() callbacks completed, running tests...');
                run();
            }
        });
    };

    mocha.setup('bdd')
        .globals(['jQuery*'])
        .checkLeaks();


    var running = false;
    function run() {
        if (running) return;
        running = true;
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        }
        else {
            mocha.run();
        }
    }
    require(tests, function() {
        if (injectCount === 0) run();
    });

});