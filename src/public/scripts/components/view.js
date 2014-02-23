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
	var payload = evt.detail;
	this._currentView.destroy();

	document.querySelector('.view').innerHTML = payload.view.content;

	var Component = require('..' + payload.view.component);
	var component = new Component();
	component.initialize();

	this._currentView = component;
};

p._loadComponent = function (evt) {
	var Component = require('..' + evt.detail.component);
	var component = new Component();
	component.initialize();

	this._currentView = component;
};

p.initialize = function() {
	document.body.addEventListener('ui:navigation:after', this._changeView.bind(this));
	document.body.addEventListener('ui:navigation:boot', this._loadComponent.bind(this));
};

module.exports = View;