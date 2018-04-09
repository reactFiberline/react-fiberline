
function globalHook(window) {

    function getTag(tag) {
        switch(tag) {
            case 0:
                return 'Indeterminate Component';
            case 1:
                return 'Functional Component';
            case 2:
                return 'Class Component';
            case 3:
                return 'Host Root';
            case 4:
                return 'Host Portal';
            case 5:
                return 'Host Component';
            case 6:
                return 'Host Text';
            case 7:
                return 'Call Component';
            case 8:
                return 'Call Handler Phase';
            case 9:
                return 'Return Component';
            case 10:
                return 'Fragment';
            case 11:
                return 'Mode';
            case 12:
                return 'Context Consumer';
            case 13:
                return 'Context Provider';
            case 14:
                return 'Loading Component';
            case 15:
                return 'Timeout Component';
            default:
                return 'unknown';
        }
    }

    const hook = {
        _listeners: {},
        _dataCache: [],
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
            const raw = obj.reduce((a, b) => {

                if (!b.fiber) return a;

                if (!a[b.fiber._debugID]) a[b.fiber._debugID] = [];
                    a[b.fiber._debugID].push({
                        'time': b.time,
                        'evt': b.evt,
                        'tag': getTag(b.fiber.tag),
                        // 'state': b.fiber.stateNode,
                        // 'type': b.fiber.type
                    });
                return a;
            }, {});

            const keys = Object.keys(raw);
            const result = [];

            // function precisionRound(number, precision) {
            //     var factor = Math.pow(10, precision);
            //     return Math.round(number * factor) / factor;
            // }

            for (let i = this._dataCache.length; i < keys.length; i++) {
                for (let j = 0; j < raw[keys[i]].length-1; j++) {
            
                    const datum = { 
                        x0: raw[keys[i]][j].time/1000, 
                        x: raw[keys[i]][j+1].time/1000,
                        name: raw[keys[i]][j].tag,
                        label: raw[keys[i]][j].evt +
                            ' on ' + raw[keys[i]][j].tag + 
                            '\nat ' + raw[keys[i]][j].time/1000,
                
                        y: parseInt(keys[i]),
                    };
                
                    result.push(datum)
                }
                
            }
            this._dataCache = this._dataCache.concat(result)
            return JSON.stringify(this._dataCache);
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
