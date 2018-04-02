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
    toJSON: function(obj = this.fiberlineEvents) {
      return JSON.stringify(obj.reduce((a, b) => {

        if (!b.fiber) return a;

        if (!a[b.fiber._debugID]){
            a[b.fiber._debugID] = {};
        }

        if (!a[b.fiber._debugID][b.evt]) a[b.fiber._debugID][b.evt] = [];
        a[b.fiber._debugID][b.evt].push({
            'time': b.time,
        })
        return a;
      }, {}));
    },
    fiberlineEvents: [],
    updatequeueLog: [],
  };

  Object.defineProperty(window, '__REACT_FIBERLINE_GLOBAL_HOOK__', {
    value: hook,
  });
}

module.exports = globalHook;
