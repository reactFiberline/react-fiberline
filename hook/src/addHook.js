const installGlobalHook = require('./globalHook.js');
const inject = require('./inject.js');
const { registerObserver } = require('./perfHook.js');

const js = ';(' + installGlobalHook.toString() + '(window))' +
  ';(' + registerObserver.toString() + '())';

const script = document.createElement('script');
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

inject(window.__REACT_FIBERLINE_GLOBAL_HOOK__);
