define(['core/xhr/http', 'core/xhr/Http'], function(http, Http) {

    describe('test/js/core/xhr/http-test.js', function() {

        it('should create a new instance of Http', function() {
            expect(http instanceof Http).to.be(true);

            if (window.XMLHttpRequest) {
                expect(http.XHR).to.be(window.XMLHttpRequest);
            }
            else if (typeof ActiveXObject !== 'undefined') {
                expect(http.XHR).to.be(ActiveXObject);
            }
        });

        // it('get() should retrieve data', function(done) {

        //     http.get('js/core/xhr/data.json')
        //         .success(function(data, xhr) {
        //             expect(data).to.be.an('object');
        //             expect(data.key).to.be('value');
        //             done();
        //         }).send();

        // });

    });

});