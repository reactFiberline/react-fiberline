
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
            'child': b.child,
            'effectTag': b.fiber.effectTag,
            'effectTagEnglish': getEffectTag(b.fiber.effectTag),
            'tag': getTag(b.fiber.tag),
        })
        return a;
      }, {}));
    },
    toCircularJSON: function(object = this.fiberlineEvents) {

        var objects = [],
            paths = [];

        return JSON.stringify((function derez(value, path) {

            var nu;

            if (value instanceof Object && value !== null &&
                    !(value instanceof Boolean) &&
                    !(value instanceof Date)    &&
                    !(value instanceof Number)  &&
                    !(value instanceof RegExp)  &&
                    !(value instanceof String)) {

                for (let i = 0; i < objects.length; i += 1) {
                    if (objects[i] === value) {
                        return {'$ref': paths[i]};
                    }
                }

                objects.push(value);
                paths.push(path);

                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    nu = [];
                    for (let i = 0; i < value.length; i += 1) {
                        nu[i] = derez(value[i], path + '[' + i + ']');
                    }
                } else {

                    nu = {};
                    for (let name in value) {
                        if (Object.prototype.hasOwnProperty.call(value, name)) {
                            nu[name] = derez(value[name],
                                path + '[' + JSON.stringify(name) + ']');
                        }
                    }
                }
                return nu;
            }
            return value;
        }(object, '$')));
    },
    fiberlineEvents: [],
    updatequeueLog: [],
  };

  Object.defineProperty(window, '__REACT_FIBERLINE_GLOBAL_HOOK__', {
    value: hook,
  });
}

module.exports = globalHook;
