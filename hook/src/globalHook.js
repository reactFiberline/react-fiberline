function globalHook(window) {

  const hook = {
    _listeners: {},
    on: function(evt, fn) {
      if (!hook._listeners[evt]) {
        hook._listeners[evt] = [];
      }
      hook._listeners[evt].push(fn);
    },
    emit: function(evt, data) {
      if (hook._listeners[evt]) {
        hook._listeners[evt].map(fn => Promise.resolve().then(fn(data, evt)));
      }
    },
    fiberlineEvents: [],
    updatequeueLog: [],
  };

  Object.defineProperty(window, '__REACT_FIBERLINE_GLOBAL_HOOK__', {
    value: hook,
  });
}

module.exports = globalHook;
