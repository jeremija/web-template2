define(['core/xhr/Http', 'test/js/core/xhr/XmlHttpRequestMock'],
    function(Http, XmlHttpRequestMock) {

    describe('test/js/core/xhr/Http-test.js', function() {

        var request, successCalled, failCalled, called404;

        describe('get()', function() {
            beforeEach(function() {
                successCalled = false;
                failCalled = false;
                called404 = false;

                var http = new Http(XmlHttpRequestMock);

                request = http.get('/my/test/url')
                    .headers({
                        'custom-header': 'custom-header-val'
                    })
                    .statusHandlers({
                        404: function(status, xhr) {
                            expect(status).to.be(404);
                            expect(xhr instanceof XmlHttpRequestMock);
                            called404 = true;
                        }
                    })
                    .success(function(data, xhr) {
                        expect(xhr instanceof XmlHttpRequestMock).to.be(true);
                        expect(data).to.be.an('object');
                        expect(data.key).to.be('value');
                        successCalled = true;
                    }).fail(function(data, xhr) {
                        failCalled = true;
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
            it('should call success callback on success', function() {
                var xhr = request.send();

                xhr.readyState = 4;
                xhr.status = 200;
                xhr.onreadystatechange();

                expect(successCalled).to.be(true);
                expect(failCalled).to.be(false);
            });

            it('should call fail callback on failure', function() {
                var xhr = request.send();

                xhr.readyState = 4;
                xhr.status = 404;
                xhr.onreadystatechange();

                expect(successCalled).to.be(false);
                expect(failCalled).to.be(true);
                expect(called404).to.be(true);
            });
        });

    });

});