define(['core/xhr/XMLHttpRequest'], function(XMLHttpRequest) {

    describe('test/js/core/xhr/XMLHttpRequest-test.js', function() {
        it('should be an instance of XMLHttpRequest', function() {
            if (window.XMLHttpRequest)
                expect(XMLHttpRequest).to.be(window.XMLHttpRequest);
            else if (ActiveXControl)
                expect(XMLHttpRequest).to.be(ActiveXControl);
        });
    });

});