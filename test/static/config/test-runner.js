require(['Squire'], function(Squire) {

    window.Squire = Squire;

    mocha.setup('bdd')
        .globals(['jQuery*'])
        .checkLeaks();

    function run() {
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        }
        else {
            mocha.run();
        }
    }

    require(tests, function() {
        run();
    });

});