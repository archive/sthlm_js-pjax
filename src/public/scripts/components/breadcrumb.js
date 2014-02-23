var Breadcrumb = function () {};

var p = Breadcrumb.prototype;

p._changeBreadcrumb = function (evt) {
	var payload = evt.detail;
	document.querySelector('.breadcrumb-text').textContent = payload.breadcrumb;
};

p.initialize = function() {
	document.body.addEventListener('ui:navigation:after', this._changeBreadcrumb);
};

module.exports = Breadcrumb;