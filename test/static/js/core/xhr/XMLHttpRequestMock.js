define(['core/obj'], function(obj) {

    var mocks = {
        GET: {},
        PUT: {},
        POST: {},
        DELETE: {}
    };

    var xhrs = [];

    /**
     * @class Serves for mocking of {@link core/xhr/XMLHttpRequest}.
     * @name core/xhr/XMLHttpRequestMock
     */
    function XMLHttpRequestMock() {
        this.requestHeaders = [];
        xhrs.push(this);
    }

    XMLHttpRequestMock.prototype.send = function(requestBody) {
        this.requestBody = requestBody;

        var mock;
        try {
            mock = mocks[this.requestType][this.requestUrl][requestBody];
        } catch(e) {
            return console.warn('no mock found for ' + this.requestType + ' ' +
                this.requestUrl);
        }

        var self = this;

        setTimeout(function() {
            self.status = mock.status;
            self.readyState = mock.readyState;
            self.responseText = mock.responseText;
            self.onreadystatechange();
        });
    };
    XMLHttpRequestMock.prototype.open = function(type, url, async) {
        this.requestType = type;
        this.requestUrl = url;
        this.requestAsync = async;
    };
    XMLHttpRequestMock.prototype.setRequestHeader = function(key, value) {
        this.requestHeaders.push({
            key: key,
            value: value
        });
    };
    XMLHttpRequestMock.prototype.onreadystatechange = function() {
    };

    XMLHttpRequestMock.prototype.responseText = '';

    /**
     * Mocks a HTTP response
     * @param  {String} type        GET, PUT, POST or DELETE
     * @param  {String} url         Url to mock
     * @param  {Object} requestBody Request body to mock
     * @param  {core/xhr/XMLHttpRequestMock~HttpMockConfig} test bla
     * @memberOf core/xhr/XMLHttpRequestMock
     */
    XMLHttpRequestMock.prototype.mock = function(type, url, requestBody) {
        var mockType = mocks[type];
        if (!mockType) throw new Error('invalid mock request type: ' + type);

        var urlMock = mockType[url] = mockType[url] || {};

        // mock result for specific request data
        var mock = urlMock[requestBody] = {
            responseText: undefined,
            status: 200,
            readyState: 4
        };

        return new HttpMockConfig(mock);
    };

    XMLHttpRequestMock.prototype.getRequests = function() {
        return xhrs;
    };

    XMLHttpRequestMock.prototype.clear = function() {
        mocks.GET = {};
        mocks.PUT = {};
        mocks.POST = {};
        mocks.DELETE = {};
        xhrs = [];
    };

    /**
     * @class Http mock configuration
     * @name core/xhr/XMLHttpRequestMock~HttpMockConfig
     * @param {Object} mock
     * @protected
     */
    function HttpMockConfig(mock) {
            this.mock = mock;
    }

    HttpMockConfig.prototype = {
        /**
         * @param  {Object} response
         * @return {core/xhr/XMLHttpRequestMock~HttpMockConfig}
         * @memberOf core/xhr/XMLHttpRequestMock~HttpMockConfig
         */
        response: function(response) {
            this.mock.responseText = JSON.stringify(response);
            return this;
        },
        /**
         * @param  {Number} status
         * @return {core/xhr/XMLHttpRequestMock~HttpMockConfig}
         * @memberOf core/xhr/XMLHttpRequestMock~HttpMockConfig
         */
        status: function(status) {
            this.mock.status = status;
            return this;
        },
        /**
         * @param  {Number} readyState
         * @return {core/xhr/XMLHttpRequestMock~HttpMockConfig}
         * @memberOf core/xhr/XMLHttpRequestMock~HttpMockConfig
         */
        readyState: function(readyState) {
            this.mock.readyState = readyState;
            return this;
        }
    };

    return XMLHttpRequestMock;
});