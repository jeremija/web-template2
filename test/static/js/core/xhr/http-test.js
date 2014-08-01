define(['test/js/core/xhr/XMLHttpRequestMock', 'Squire', 'core/json'],
    function(XMLHttpRequestMock, Squire, json) {
    'use strict';

    var injector = new Squire();

    injector.mock({
        'core/xhr/XMLHttpRequest': XMLHttpRequestMock,
        'json': json
    });

    injector.require(['core/xhr/http'],
        function(http) {

        describe('test/js/core/xhr/http-test.js', function() {


            var request;
            describe('get()', function() {
                var requestMock;
                before(function() {
                    requestMock = XMLHttpRequestMock
                        .mock('GET', '/my/test/url').response({
                            key: 'value'
                        });
                });

                it('should set request headers and type', function(done) {
                    var xhr = http.get('/my/test/url')
                        .headers({
                            'custom-header': 'custom-header-val'
                        }).callback(function(err, data, xhr) {
                            done();
                        })
                        .send();

                    expect(xhr.requestHeaders[1].key).to.be('custom-header');
                    expect(xhr.requestHeaders[1].value).to.be('custom-header-val');
                });
                it('should call callback on success', function(done) {
                    requestMock.status(200).readyState(4);

                    var xhr = http.get('/my/test/url')
                        .statusHandlers({
                            404: function(status, xhr) {
                               throw new Error('should not call status handlers');
                            }
                        })
                        .callback(function(err, data, xhr) {
                            expect(xhr instanceof XMLHttpRequestMock).to.be(true);
                            expect(data).to.be.an('object');
                            expect(data.key).to.be('value');
                            done();
                        }).send();
                });

                it('should call callback on failure', function(done) {
                    requestMock.status(404).readyState(4);

                    var called404 = false;
                    var xhr = http.get('/my/test/url')
                        .statusHandlers({
                            404: function(status, xhr) {
                                called404 = true;
                            }
                        })
                        .callback(function(err, data, xhr) {
                            expect(xhr instanceof XMLHttpRequestMock).to.be(true);
                            expect(err instanceof Error);
                            expect(data).to.be.an('object');
                            expect(data.key).to.be('value');
                            expect(called404).to.be(true);
                            done();
                        }).send();
                });
            });

        });

    });
});