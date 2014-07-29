/**
 * @module core/xhr/http
 */
define(['core/xhr/Http'], function(Http) {

    var exports = new Http(window.XMLHttpRequest || ActiveXObject);

    return exports;

});