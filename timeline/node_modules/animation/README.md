# [animation](https://github.com/dodo/node-animation/)

Handles Animation Timing and Handling for you.

Uses requesAnimationFrame when running on browser side.

## Installation

```bash
$ npm install animation
```

## Usage

```javascript
// get a tick every 100ms
var animation = new Animation({frame:'100ms'});
animation.on('tick', function (dt) { … });
animation.start();
```

```javascript
// get next tick with delta time to last tick
var animation = new Animation({frame:'100ms'});
var animate = function (dt) {

    // do your animation stuff

    if (process.stdout.write(data)) {
        animation.nextTick(animate);
    } else {
        var t = new Date().getTime()
        process.stdout.once('drain', function () {
            var now = new Date().getTime();
            animate(now - t + dt);
        });
    }
};
animation.nextTick(animate); // no start required
```

```javascript
// doesnt really matter when its executed, but it should happen
// (use this in browser if you want to update your dom on requesAnimationFrame)
var animation = new Animation();
animation.start();
animation.push(function (dt) {
    // happens (once) on the next few ticks,
    // depending on how much tasks are allready pushed
});
```

[Δt](http://dodo.github.com/node-dynamictemplate/) adapters for [DOM](http://dodo.github.com/node-dt-dom/) and [jQuery](http://dodo.github.com/node-dt-dom/) depending on this module to do heavy DOM manipulation like insertion only on requesAnimationFrame.

[surrender-cube](https://github.com/dodo/node-surrender-cube/blob/master/src/index.coffee) uses this module to draw a rotating wireframe cube in terminal.

[ceilingled](https://github.com/c3d2/ceilingled) uses this to draw images fetched from superfeedr to draw either on SDL or on a LED wall.

## Animation

```javascript
animation = new Animation({
    // defaults
    timeoutexecution:'20ms', // allowed execution time per animation tick timeout
    execution: '5ms', // allowed execution time per animation tick
    timeout:   null,  // maximum time of a animation tick interval else runs continuously if null
    toggle:    false, // if true animation pauses and resumes itself when render queue gets empty or filled
    frame:     '16ms' // time per frame
});
```

Creates a new Animation controller.

### animation.start

```javascript
animation.start();
```

Starts animation.

### animation.stop

```javascript
animation.stop();
```

Stops animation.

### animation.pause

```javascript
animation.pause();
```
When autotoggle is enabled the Animation pauses itself if the render queue is empty.

### animation.resume

```javascript
animation.resume();
```

When autotoggle is enabled the Animation resumes itself when the render queue gets filled again after it was emtpy.

### animation.nextTick

```javascript
animation.nextTick(function (dt) { … });
```

Given callback gets called on next animation tick when running and not paused.

## Events

### 'start'

```javascript
animation.on('start', function () { … });
```

Emits `start` event every time the animation gets started.

### 'stop'

```javascript
animation.on('stop', function () { … });
```

Emits `stop` event every time the animation gets stopped.

### 'pause'

```javascript
animation.on('pause', function () { … });
```

Emits `pause` event every time the animation gets paused.

### 'resume'

```javascript
animation.on('resume', function () { … });
```

Emits `resume` event every time the animation gets resumed.

### 'tick'

```javascript
animation.on('tick', function (dt) { … });
```

Emits `tick` event every time the animation executes a animation tick.

`dt` is the time since last animation tick finished.

Use this to do your animation stuff.





