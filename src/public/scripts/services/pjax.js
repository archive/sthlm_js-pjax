var Pjax = function () {
};

Pjax.dataAttributeName = 'data-pjax';

var p = Pjax.prototype;

p.bind = function(container) {
    container.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.nodeName !== 'A' || !target.hasAttribute('data-pjax')) {
            return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        var url = evt.target.pathname;
        this._makePjaxCall(url);
    }.bind(this), false);

    window.addEventListener('popstate', this._stateChanged);
};

p._stateChanged = function (evt) {
    var payload = evt.state;
    if (payload) {
        if (Object.keys(payload).length !== 0) {
            document.body.dispatchEvent(new CustomEvent('ui:navigation:after', { 'detail': payload }));
        } else {
            window.document.location.reload();
        }
    } else {
        // Quick solution
        history.replaceState({}, document.title, location.pathname);
    }
};

p._pjaxSuccess = function (url, evt) {
    var xhr = evt.target;
    if (xhr.status >= 200 && xhr.status < 400){
        var payload = JSON.parse(xhr.responseText);
        history.pushState(payload, '', url);
        document.body.dispatchEvent(new CustomEvent('ui:navigation:after', { 'detail': payload }));
    } else {
        console.log(arguments);
    }
};

p._pjaxFailure = function (url, jqXHR, textStatus, errorThrown) {
    window.document.location.href = url + '?pjax-error';
};

p._makePjaxCall = function (url) {
    document.body.dispatchEvent(new CustomEvent('ui:navigation:before', {}));
    var xhr = new XMLHttpRequest();
    xhr.onload = this._pjaxSuccess.bind(this, url);
    xhr.onerror = this._pjaxFailure.bind(this, url);
    xhr.open('GET', url);
    xhr.setRequestHeader('X-PJAX', 'true');
    xhr.send();
};

module.exports = Pjax;