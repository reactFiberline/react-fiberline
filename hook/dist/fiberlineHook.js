!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.registerObserver=function(e,t){window.PerformanceObserver&&new window.PerformanceObserver(function(e){window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__||(window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__={length:e.getEntries().length,rawMeasures:[],queue:[]}),window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__.rawMeasures=window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__.rawMeasures.concat(e.getEntries())}).observe({entryTypes:["measure"]})}},function(e,t,n){"use strict";e.exports=["bailedOutOnFinishedWork","bailedOutOnLowPriorityWork","callComponentUpdating","classComponentUpdating","commitHostEffectsStart","commitHostEffectsEnd","commitLifeCyclesStart","commitLifeCyclesEnd","commitStart","commitEnd","componentDidMountStart","componentDidMountEnd","componentDidUpdateStart","componentDidUpdateEnd","componentWillMountStart","componentWillMountEnd","componentWillUnmountStart","componentWillUnmountEnd","componentWillReceivePropsStart","componentWillReceivePropsEnd","componentWillUpdateStart","componentWillUpdateEnd","contextChangePropagating","contextConsumerUpdating","contextProviderUpdating","fiberDidNotComplete","fiberNodeCreatedFromElement","fiberNodeCreatedFromFragment","fiberNodeCreatedFromText","fiberNodeCreatedFromPortal","fiberNodeCreatedHostForDeletion","fragmentStartedUpdating","fragmentUpdated","hostComponentUpdating","hostRootUpdating","hostTextUpdating","indeterminateComponentMounting","interruption","loadingComponentUpdating","modeUpdating","functionalComponentUpdating","getChildContextStart","getChildContextEnd","portalComponentUpdating","pushHostRootContext","shouldComponentUpdateStart","shouldComponentUpdateEnd","timeoutComponentUpdating","workLoopStart","workLoopEnded","workStarted","workCompleted"]},function(e,t,n){"use strict";var o=n(1);e.exports=function(e){o.forEach(function(t){e.on(t,function(t,n){var o=t.fiber,r=t.time;e.fiberlineEvents.push({fiber:o,time:r,evt:n})})}),e.on("updateQueue",function(t){var n=t.fiber,o=t.queue,r=t.time;return e.updatequeueLog.push({fiber:n,queue:o,time:r})})}},function(e,t,n){"use strict";e.exports=function(e){var t={_listeners:{},on:function(e,n){t._listeners[e]||(t._listeners[e]=[]),t._listeners[e].push(n)},emit:function(e,n){t._listeners[e]&&t._listeners[e].map(function(t){return Promise.resolve().then(t(n,e))})},toJSON:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.fiberlineEvents;return JSON.stringify(e.reduce(function(e,t){return t.fiber?(e[t.fiber._debugID]||(e[t.fiber._debugID]={time:t.time,evt:t.evt,tag:t.fiber.tag}),e):e},{}))},toCircularJSON:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.fiberlineEvents,t=[],n=[];return JSON.stringify(function e(o,r){var i;if(!(!(o instanceof Object&&null!==o)||o instanceof Boolean||o instanceof Date||o instanceof Number||o instanceof RegExp||o instanceof String)){for(var a=0;a<t.length;a+=1)if(t[a]===o)return{$ref:n[a]};if(t.push(o),n.push(r),"[object Array]"===Object.prototype.toString.apply(o)){i=[];for(var u=0;u<o.length;u+=1)i[u]=e(o[u],r+"["+u+"]")}else for(var s in i={},o)Object.prototype.hasOwnProperty.call(o,s)&&(i[s]=e(o[s],r+"["+JSON.stringify(s)+"]"));return i}return o}(e,"$"))},fiberlineEvents:[],updatequeueLog:[]};Object.defineProperty(e,"__REACT_FIBERLINE_GLOBAL_HOOK__",{value:t})}},function(e,t,n){"use strict";var o=n(3),r=n(2),i=n(0).registerObserver,a=";("+o.toString()+"(window));("+i.toString()+"())",u=document.createElement("script");u.textContent=a,document.documentElement.appendChild(u),u.parentNode.removeChild(u),r(window.__REACT_FIBERLINE_GLOBAL_HOOK__)}]);