new (require('./components/title'))().initialize(); // event
new (require('./components/breadcrumb'))().initialize();
new (require('./components/view'))().initialize();
new (require('./services/pjax'))().initialize();

var pageComponent = document.getElementById('page-component').value;
document.body.dispatchEvent(new CustomEvent('ui:navigation:boot', { 'detail': {component: pageComponent} }));
