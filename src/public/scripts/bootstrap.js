var Bootstrap = function () {
};

Bootstrap.prototype.boot = function() {
	new (require('./components/title'))().initialize(); // event
	new (require('./components/breadcrumb'))().initialize();
	new (require('./components/view'))().initialize();
	console.log('boot!');
};

module.exports = Bootstrap;