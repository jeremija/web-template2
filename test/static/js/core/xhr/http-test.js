define(['test/js/core/xhr/MockXMLHttpRequest'], function(MockXMLHttpRequest) {

    var injector = new Squire();

    injector.mock('core/xhr/XMLHttpRequest', MockXMLHttpRequest);

    injector.require(['core/xhr/http'],
        function(http) {

        describe('test/js/core/xhr/http-test.js', function() {

            var request, callbackCalled, error, called404;

            describe('get()', function() {
                beforeEach(function() {
                    callbackCalled = false;
                    called404 = false;
                    error = undefined;

                    request = http.get('/my/test/url')
                        .headers({
                            'custom-header': 'custom-header-val'
                        })
                        .statusHandlers({
                            404: function(status, xhr) {
                                expect(status).to.be(404);
                                expect(xhr instanceof MockXMLHttpRequest);
                                called404 = true;
                            }
                        })
                        .callback(function(err, data, xhr) {
                            error = err;
                            expect(xhr instanceof MockXMLHttpRequest).to.be(true);
                            expect(data).to.be.an('object');
                            expect(data.key).to.be('value');
                            callbackCalled = true;
                        });

                });
                it('should set request headers and type', function() {
                    var xhr = request.send();

                    expect(xhr.open_type).to.be('GET');
                    expect(xhr.open_url).to.be('/my/test/url');
                    expect(xhr.open_async).to.be(true);
                    expect(xhr.headers[0].key).to.be('Content-type');
                    expect(xhr.headers[1].key).to.be('custom-header');
                });
                it('should call callback on success', function() {
                    var xhr = request.send();

                    xhr.readyState = 4;
                    xhr.status = 200;
                    xhr.onreadystatechange();

                    expect(callbackCalled).to.be(true);
                    expect(called404).to.be(false);
                    expect(error).to.not.be.ok();
                });

                it('should call callback on failure', function() {
                    var xhr = request.send();

                    xhr.readyState = 4;
                    xhr.status = 404;
                    xhr.onreadystatechange();

                    expect(callbackCalled).to.be(true);
                    expect(called404).to.be(true);
                    expect(error instanceof Error).to.be(true);
                });
            });

        });

    });
});