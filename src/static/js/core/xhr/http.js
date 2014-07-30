/**
 * Module for easier dispatching of AJAX HTTP requests.
 * @module core/xhr/http
 */
define(['core/json', 'core/xhr/XMLHttpRequest'], function(json, XMLHttpRequest)
{
    'use strict';

     function parse(xhr) {
        var result = json.parse(xhr.responseText);
        return result;
    }

    function createXhrRequest(type, url, data) {
        var settings = {
            callback: function() {},
            statusHandlers: {},
            headers: {}
        };

        var xhr = new XMLHttpRequest('MSXML2.XMLHTTP.3.0');
        xhr.open(type, url, true);

        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;

            var status = xhr.status;
            var statusHandler = settings.statusHandlers[status];
            if (statusHandler) statusHandler.call(settings, status, xhr);

            var err;
            if (status !== 200) err = new Error('xhr error, status=' + status);

            settings.callback(err, parse(xhr), xhr);
        };

        /**
         * Http request config
         * @typedef {Object} core/xhr/Http.config
         */
        return {
            callback: function(callback) {
                settings.callback = callback;
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
     * Http request callback
     * @callback module:core/xhr/http~callback
     * @param {Error} err if it happens
     * @param {Object} data response data
     * @param {core/xhr/XMLHttpRequest}
     */

    var exports = {
        /**
         * Dispatch a GET request
         * @param  {String} url
         * @param  {module:core/xhr/http~callback} callback
         * @return {core/xhr/Http.config}
         */
        get: function(url, callback) {
            var http = createXhrRequest('GET', url);
            if (callback) http.callback(callback);
            return http;
        },
        /**
         * Dispatch a PUT request
         * @param  {String} url
         * @param  {Object} data
         * @param  {module:core/xhr/http~callback} callback
         * @return {core/xhr/Http.config}
         */
        put: function(url, data, callback) {
            var http = createXhrRequest('PUT', url, data);
            if (callback) http.callback(callback);
            return http;
        },
        /**
         * Dispatch a POST request
         * @param  {String} url
         * @param  {Object} data
         * @param  {module:core/xhr/http~callback} callback
         * @return {core/xhr/Http.config}
         */
        post: function(url, data, callback) {
            var http = createXhrRequest('POST', url, data);
            if (callback) http.callback(callback);
            return http;
        },
        /**
         * Dispatch a DELETE request
         * @param  {String} url
         * @param  {Function} callback
         * @return {core/xhr/Http.config}
         */
        delete: function(url, callback) {
            var http = createXhrRequest('DELETE', url);
            if (callback) http.callback(callback);
            return http;
        }
    };

    return exports;

});