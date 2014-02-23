require('../pages/list');
require('../pages/product');
require('../pages/search');

var View = function () {
	this._currentView = {
		destroy: function () {}
	};
};

var p = View.prototype;

p._changeView = function (evt) {
	var pjaxData = evt.detail;
	this._currentView.destroy();

	document.querySelector('.view').innerHTML = pjaxData.view.content;

	this._loadComponent(pjaxData.view.component);
};

p._loadComponent = function (componentName) {
	var Component = require('..' + componentName);
	var component = new Component();
	component.initialize();

	this._currentView = component;
};

p._boot = function function_name (evt) {
	this._loadComponent(evt.detail.component);
};

p.initialize = function() {
	document.body.addEventListener('ui:navigation:after', this._changeView.bind(this));
	document.body.addEventListener('ui:navigation:boot', this._boot.bind(this));
};

module.exports = View;