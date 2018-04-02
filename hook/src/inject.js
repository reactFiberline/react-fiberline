const types = require('./eventTypes.js');

module.exports = function(hook) {
  // if we want to add the ability to remove listeners later, the 'hook.on'
  // method should return a 'hook.off' method that does that.  All the returned
  // functions should be stored in an array
  types.forEach((type) => {
    hook.on(type, ({ fiber, time }, evt) => {
      hook.fiberlineEvents.push({ fiber, time, evt });
    });
  });
  hook.on('updateQueue', ({ fiber, queue, time }) => hook.updatequeueLog.push({ fiber, queue, time}));
};
