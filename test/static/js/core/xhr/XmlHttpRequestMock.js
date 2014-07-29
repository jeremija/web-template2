define([], function() {

    function XmlHttpRequestMock() {
        this.headers = [];
    }

    var status;

    XmlHttpRequestMock.prototype.send = function(data) {
        this.send_data = data;
    };
    XmlHttpRequestMock.prototype.open = function(type, url, async) {
        this.open_type = type;
        this.open_url = url;
        this.open_async = async;
    };
    XmlHttpRequestMock.prototype.setRequestHeader = function(key, value) {
        this.headers.push({
            key: key,
            value: value
        });
    };
    XmlHttpRequestMock.prototype.onreadystatechange = function() {
        this.readyState = 4;
        this.status = status;
    };
    XmlHttpRequestMock.prototype.responseText = '{"key": "value"}';

    return XmlHttpRequestMock;
});