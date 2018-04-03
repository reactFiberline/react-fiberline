var installGlobalHook = require('./globalHook.js');
var inject = require('./inject.js');

var js = ';(' + installGlobalHook.toString() + '(window))';

var script = document.createElement('script');
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

inject(window.__REACT_FIBERLINE_GLOBAL_HOOK__);
