var Search = function () {
};

var p = Search.prototype;

p._search = function () {
	alert('search!');
};

Search.prototype.initialize = function() {
	document.querySelector('[name=search-action]').addEventListener('click', this._search, false);
};

Search.prototype.destroy = function() {
	document.querySelector('[name=search-action]').removeEventListener('click', this._search, false);
};

module.exports = Search;