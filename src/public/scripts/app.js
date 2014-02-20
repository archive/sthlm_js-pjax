require('./pages/list');
require('./pages/product');
require('./pages/search');

var Bootstrap = require('./bootstrap');
var bootstrap = new Bootstrap();
bootstrap.boot();

var pageComponent = document.getElementById('page-component').value;
var Component = require(pageComponent);
var component = new Component();
component.initialize();

var Pjax = require('./services/pjax');
var pjax = new Pjax();
pjax.bind(document.body);

console.log('boot time', window.performance.now() / 1000, 'sec');
