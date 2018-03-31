const types = require('./eventTypes.js');

module.exports = function(hook) {
  types.forEach((type) => {
    hook.on(type, ({ fiber, time }, evt) => {
      hook.fiberlineEvents.push({ fiber, time, evt });
    });
  });
  hook.on('updateQueue', ({ fiber, queue, time }) => hook.updatequeueLog.push({ fiber, queue, time}));
};
