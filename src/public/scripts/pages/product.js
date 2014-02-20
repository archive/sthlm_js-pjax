/*define([
	'libs/underscore',
	'libs/jquery',
	'libs/flight'
], function (
	_,
	$,
	Flight
) {
	'use strict';

	return Flight.defineComponent(function Product() {

		// Add some code :)

	});

});*/

var Product = function () {
};

Product.prototype.initialize = function() {
	console.log('Product initialize');
};

Product.prototype.destroy = function() {
};

module.exports = Product;