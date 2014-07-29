define(['Extendable', 'core/json'], function(Extendable, json) {
    'use strict';

     function parse(xhr) {
        var result = json.parse(xhr.responseText);
        return result;
    }

    function createXhrRequest(XHR, type, url, data) {
        var settings = {
            success: function() {},
            fail: function() {},
            statusHandlers: {},
            headers: {}
        };

        var xhr = new XHR('MSXML2.XMLHTTP.3.0');
        xhr.open(type, url, true);

        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            var status = xhr.status;
            var statusHandler = settings.statusHandlers[status];
            if (statusHandler) statusHandler.call(settings, status, xhr);

            if (status === 200) settings.success(parse(xhr), xhr);
            else settings.fail(parse(xhr), xhr);
        };

        /**
         * Http request config
         * @typedef {Object} core/xhr/Http.config
         */
        return {
            success: function(callback) {
                settings.success = callback;
                return this;
            },
            fail: function(callback) {
                settings.fail = callback;
                return this;
            },
            send: function() {
                for (var header in settings.headers) {
                    if (settings.headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header, settings.headers[header]);
                    }
                }

                xhr.send(json.stringify(data));
                return xhr;
            },
            statusHandlers: function(statusHandlersMap) {
                settings.statusHandlers = statusHandlersMap;
                return this;
            },
            headers: function(headers) {
                settings.headers = headers;
                return this;
            }
        };
    }

    /**
     * Sets the callbacks
     * @param {core/Http} http
     * @param {Function} success callback
     * @param {Function} fail callback
     */
    function setCallbacks(http, success, fail) {
        if (success) http.success(success);
        if (fail) http.fail(fail);
    }

    /**
     * @class Helps with creating http requests
     * @param {external:XMLHttpRequest} XHR
     */
    function Http(XHR) {
        this.XHR = XHR;
    }

    var HttpPrototype = /** @lends HttpPrototype */ {
        /**
         * Dispatch a GET request
         * @param  {String} url
         * @param  {Function} success
         * @param  {Function} fail
         * @return {core/xhr/Http.config}
         */
        get: function(url, success, fail) {
            var http = createXhrRequest(this.XHR, 'GET', url);
            setCallbacks(http, success, fail);
            return http;
        },
        /**
         * Dispatch a PUT request
         * @param  {String} url
         * @param  {Object} data
         * @param  {Function} success
         * @param  {Function} fail
         * @return {core/xhr/Http.config}
         */
        put: function(url, data, success, fail) {
            var http = createXhrRequest(this.XHR, 'PUT', url, data);
            setCallbacks(http, success, fail);
            return http;
        },
        /**
         * Dispatch a POST request
         * @param  {String} url
         * @param  {Object} data
         * @param  {Function} success
         * @param  {Function} fail
         * @return {core/xhr/Http.config}
         */
        post: function(url, data, success, fail) {
            var http = createXhrRequest(this.XHR, 'POST', url, data);
            setCallbacks(http, success, fail);
            return http;
        },
        /**
         * Dispatch a DELETE request
         * @param  {String} url
         * @param  {Function} success
         * @param  {Function} fail
         * @return {core/xhr/Http.config}
         */
        delete: function(url, success, fail) {
            var http = createXhrRequest(this.XHR, 'DELETE', url);
            setCallbacks(http, success, fail);
            return http;
        }
    };

    return Extendable.extend(Http, HttpPrototype);

});