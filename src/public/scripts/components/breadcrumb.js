var Breadcrumb = function () {
};

var p = Breadcrumb.prototype;

p._changeBreadcrumb = function (evt) {
	var payload = evt.detail;
	document.querySelector('.breadcrumb-text').textContent = payload.breadcrumb;
};

p.initialize = function() {
	console.log('Breadcrumb initialize');
	document.body.addEventListener('ui:navigation:after', this._changeBreadcrumb);
};

p.destroy = function() {
};

module.exports = Breadcrumb;