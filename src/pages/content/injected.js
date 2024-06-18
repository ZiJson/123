(function (xhr) {
    var XHR = XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;
    var setRequestHeader = XHR.setRequestHeader;
    XHR.open = function (method, url) {
        this._method = method;
        this._url = url;
        this._requestHeaders = {};
        return open.apply(this, arguments);
    };
    XHR.setRequestHeader = function (header, value) {
        this._requestHeaders[header] = value;
        return setRequestHeader.apply(this, arguments);
    };
    XHR.send = function (postData) {
        this._requestPayload = JSON.parse(postData);
        this.addEventListener("load", function () {
            console.log(this);
            if (this._url) {
                console.log(this._url);
                console.log("response", this.response);
            }
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);

console.log("injected script loaded");
