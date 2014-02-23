var Pjax = function () {
    this._hasPushed = false;
};

var p = Pjax.prototype;

p.initialize = function() {
    document.body.addEventListener('click', this._possiblePjaxNavigation.bind(this), false);
    window.addEventListener('popstate', this._popstate.bind(this));
};

p._possiblePjaxNavigation = function (evt) {
    var target = evt.target;
    if (this._isPjax(target)) {
        evt.preventDefault();
        evt.stopPropagation();

        var url = target.pathname;
        this._makePjaxCall(url, true);
    }
};

p._isPjax = function (target) {
    return target.nodeName === 'A' && target.hasAttribute('data-pjax');
};

p._popstate = function (evt) {
    if(!this._hasPushed) {
        return;
    }

    var state = evt.state || {};
    if (Object.keys(state).length !== 0) {
        this._makePjaxCall(state.url, false);
    } else {
        window.document.location.href = location.pathname;
    }
};

p._loadPjaxData = function (shouldPush, evt) {
    var xhr = evt.target;
    if (this._hasValidStatus(xhr)){
        var pjaxData = JSON.parse(xhr.responseText);
        if (shouldPush) {
            // Put everything in the state bag if you want to cache the page
            history.pushState({url: pjaxData.url}, '', pjaxData.url);
            this._hasPushed = true;
        }
        document.body.dispatchEvent(new CustomEvent('ui:navigation:after', { 'detail': pjaxData }));
    }
};

p._hasValidStatus = function (xhr) {
    return xhr.status >= 200 && xhr.status < 400;
};

p._navigateWithoutPjax = function (url, xhr, textStatus, errorThrown) {
    window.document.location.href = url + '?pjax-error=' + textStatus;
};

p._makePjaxCall = function (url, shouldPush) {
    document.body.dispatchEvent(new CustomEvent('ui:navigation:before', {}));
    var xhr = new XMLHttpRequest();
    xhr.onload = this._loadPjaxData.bind(this, shouldPush);
    xhr.onerror = this._navigateWithoutPjax.bind(this, url);
    xhr.open('GET', url);
    xhr.setRequestHeader('X-PJAX', 'true');
    xhr.send();
};

module.exports = Pjax;