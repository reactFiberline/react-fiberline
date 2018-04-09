!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.registerObserver=function(e,t){window.PerformanceObserver&&new window.PerformanceObserver(function(e){window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__||(window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__={length:e.getEntries().length,rawMeasures:[],queue:[]}),window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__.rawMeasures=window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__.rawMeasures.concat(e.getEntries())}).observe({entryTypes:["measure"]})}},function(e,t,n){"use strict";e.exports=["bailedOutOnFinishedWork","bailedOutOnLowPriorityWork","commitStart","commitEnd","componentDidMountStart","componentDidMountEnd","componentDidUpdateStart","componentDidUpdateEnd","componentWillMountStart","componentWillMountEnd","componentWillUnmountStart","componentWillUnmountEnd","componentWillReceivePropsStart","componentWillReceivePropsEnd","componentWillUpdateStart","componentWillUpdateEnd","contextChangePropagating","contextConsumerUpdating","contextProviderUpdating","fiberDidNotComplete","fiberNodeCreatedFromElement","fiberNodeCreatedFromFragment","fiberNodeCreatedFromText","fiberNodeCreatedFromPortal","fiberNodeCreatedHostForDeletion","fragmentStartedUpdating","fragmentUpdated","hostComponentUpdating","hostRootUpdating","hostTextUpdating","indeterminateComponentMounting","interruption","loadingComponentUpdating","modeUpdating","functionalComponentUpdating","getChildContextStart","getChildContextEnd","portalComponentUpdating","pushHostRootContext","shouldComponentUpdateStart","shouldComponentUpdateEnd","timeoutComponentUpdating","workLoopStart","workLoopEnded","workStarted","workCompleted"]},function(e,t,n){"use strict";var r=n(1);e.exports=function(e){r.forEach(function(t){e.on(t,function(t,n){var r=t.fiber,o=t.time;e.fiberlineEvents.push({fiber:r,time:o,evt:n})})}),e.on("updateQueue",function(t){var n=t.fiber,r=t.queue,o=t.time;return e.updatequeueLog.push({fiber:n,queue:r,time:o})})}},function(e,t,n){"use strict";e.exports=function(e){var t={_listeners:{},_dataCache:[],on:function(e,n){t._listeners[e]||(t._listeners[e]=[]),t._listeners[e].push(n)},emit:function(e,n){t._listeners[e]&&t._listeners[e].map(function(t){return Promise.resolve().then(t(n,e))})},toJSON:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.fiberlineEvents).reduce(function(e,t){return t.fiber?(e[t.fiber._debugID]||(e[t.fiber._debugID]=[]),e[t.fiber._debugID].push({time:t.time,evt:t.evt,tag:function(e){switch(e){case 0:return"Indeterminate Component";case 1:return"Functional Component";case 2:return"Class Component";case 3:return"Host Root";case 4:return"Host Portal";case 5:return"Host Component";case 6:return"Host Text";case 7:return"Call Component";case 8:return"Call Handler Phase";case 9:return"Return Component";case 10:return"Fragment";case 11:return"Mode";case 12:return"Context Consumer";case 13:return"Context Provider";case 14:return"Loading Component";case 15:return"Timeout Component";default:return"unknown"}}(t.fiber.tag)}),e):e},{}),t=Object.keys(e),n=[];function r(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n}for(var o=this._dataCache.length;o<t.length;o++)for(var i=0;i<e[t[o]].length-1;i++){var a={x0:r(e[t[o]][i].time/1e3,3),x:r(e[t[o]][i+1].time/1e3,3),name:e[t[o]][i].tag,label:e[t[o]][i].evt,y:parseInt(t[o])};n.push(a)}return this._dataCache=this._dataCache.concat(n),JSON.stringify(this._dataCache)},toCircularJSON:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.fiberlineEvents,t=[],n=[];return JSON.stringify(function e(r,o){var i;if(!(!(r instanceof Object&&null!==r)||r instanceof Boolean||r instanceof Date||r instanceof Number||r instanceof RegExp||r instanceof String)){for(var a=0;a<t.length;a+=1)if(t[a]===r)return{$ref:n[a]};if(t.push(r),n.push(o),"[object Array]"===Object.prototype.toString.apply(r)){i=[];for(var u=0;u<r.length;u+=1)i[u]=e(r[u],o+"["+u+"]")}else for(var s in i={},r)Object.prototype.hasOwnProperty.call(r,s)&&(i[s]=e(r[s],o+"["+JSON.stringify(s)+"]"));return i}return r}(e,"$"))},fiberlineEvents:[],updatequeueLog:[]};Object.defineProperty(e,"__REACT_FIBERLINE_GLOBAL_HOOK__",{value:t})}},function(e,t,n){"use strict";var r=n(3),o=n(2),i=n(0).registerObserver,a=";("+r.toString()+"(window));("+i.toString()+"())",u=document.createElement("script");u.textContent=a,document.documentElement.appendChild(u),u.parentNode.removeChild(u),o(window.__REACT_FIBERLINE_GLOBAL_HOOK__)}]);