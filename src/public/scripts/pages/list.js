var List = function () {};

var p = List.prototype;

p._sort = function () {
	alert('descending!');
};

List.prototype.initialize = function() {
	document.querySelector('.list-sort-by-name-descending').addEventListener('click', this._sort, false);
};

List.prototype.destroy = function() {
	document.querySelector('.list-sort-by-name-descending').removeEventListener('click', this._sort, false);
};

module.exports = List;