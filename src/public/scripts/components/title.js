var Title = function () {
};

var p = Title.prototype;

p._changeTitle = function (evt) {
	var payload = evt.detail;
	document.title = payload.title;
};

p.initialize = function() {
	document.body.addEventListener('ui:navigation:after', this._changeTitle);
};

module.exports = Title;