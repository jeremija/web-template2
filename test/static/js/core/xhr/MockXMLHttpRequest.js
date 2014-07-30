define([], function() {

    function MockXMLHttpRequest() {
        this.headers = [];
    }

    var status;

    MockXMLHttpRequest.prototype.send = function(data) {
        this.send_data = data;
    };
    MockXMLHttpRequest.prototype.open = function(type, url, async) {
        this.open_type = type;
        this.open_url = url;
        this.open_async = async;
    };
    MockXMLHttpRequest.prototype.setRequestHeader = function(key, value) {
        this.headers.push({
            key: key,
            value: value
        });
    };
    MockXMLHttpRequest.prototype.onreadystatechange = function() {
        this.readyState = 4;
        this.status = status;
    };
    MockXMLHttpRequest.prototype.responseText = '{"key": "value"}';

    return MockXMLHttpRequest;
});