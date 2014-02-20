require('../pages/list');
require('../pages/product');
require('../pages/search');

var View = function () {
};

var p = View.prototype;

p._changeView = function (evt) {
	var payload = evt.detail;

	// unload all js and all bindings

	document.querySelector('.view').innerHTML = payload.view.content;

	var Component = require('.' + payload.view.component);
	var component = new Component();
	component.initialize();
};

p.initialize = function() {
	document.body.addEventListener('ui:navigation:after', this._changeView);
};

p.destroy = function() {
};

module.exports = View;