parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A2T1":[function(require,module,exports) {
"use strict";function t(t,n){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=e(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,c=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return s=t.done,t},e:function(t){c=!0,i=t},f:function(){try{s||null==r.return||r.return()}finally{if(c)throw i}}}}function e(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.nodes=void 0;var r=document.querySelector(".container");console.log(r);var o=[];exports.nodes=o;var a=40,i=40;function s(){for(var t=0;t<i;t++)for(var e=0;e<a;e++){var n=document.createElement("div");n.setAttribute("data-row",t),n.setAttribute("data-col",e),o.push({name:n,row:t,col:e,isWall:!1,isVisited:!1,tentativeDistance:1/0,previousNode:null}),n.classList.add("node"),r.append(n)}}function c(){s()}function u(t,e){var n=o.find(function(n){return n.row===t&&n.col===e});return n.name.classList.add("startingNode"),n}function d(t,e){var n=o.find(function(n){return n.row===t&&n.col===e});return n.name.classList.add("endingNode"),n.endingNode=!0,n}c();var l=!1;function f(){l&&o.forEach(function(t){return t.name.addEventListener("mousemove",function(e){!l||t.name.classList.contains("startingNode")||t.name.classList.contains("endingNode")||e.target.classList.add("wall")})})}function g(){f()}window.onmousedown=function(){l=!0,console.log(l),g()},window.onmouseup=function(){l=!l,console.log(l)};var v=d(30,25),m=u(3,3),y=document.querySelector(".startingNode"),p=document.querySelector(".endingNode");y.draggable=!0,p.draggable=!0;var h,L=document.querySelectorAll(".node");function b(t){var e=[],n=t.row,r=t.col;return e.push(o.find(function(t){return t.row===n-1&&t.col===r})),e.push(o.find(function(t){return t.row===n+1&&t.col===r})),e.push(o.find(function(t){return t.row===n&&t.col===r-1})),e.push(o.find(function(t){return t.row===n&&t.col===r+1})),e.filter(function(t){return void 0!==t}).filter(function(t){return t.isVisited=!0})}function w(t,e,n){var r=[];e.tentativeDistance=0;for(var a=t;a.length;){E(a);var i=a.shift();if(i.isVisited=!0,!i.name.classList.contains("wall")){if(i.tentativeDistance===1/0)return r;if(r.push(i),i===n)return r;S(i,o)}}}L.forEach(function(t){return t.draggable=!1}),y.addEventListener("drag",function(t){},!1),p.addEventListener("drag",function(t){},!1),document.addEventListener("dragstart",function(t){h=t.target,t.target.classList.contains("startingNode")?t.target.classList.remove("startingNode"):t.target.classList.contains("endingNode")&&t.target.classList.remove("endingNode"),console.log(h.classList)},!1),document.addEventListener("dragend",function(t){t.target.style.opacity=""},!1),document.addEventListener("dragover",function(t){t.preventDefault()},!1),document.addEventListener("dragenter",function(t){"node"==t.target.className&&(t.target.style.background="grey")},!1),document.addEventListener("dragleave",function(t){"node"==t.target.className&&(t.target.style.background="")},!1),document.addEventListener("drop",function(t){t.preventDefault(),console.log(t.target),"node"==t.target.className&&(o.find(function(t){return t.name.classList.contains("startingNode")})?v=d(Number(t.target.dataset.row),Number(t.target.dataset.col)):(t.target.style.background="",console.log(t.target.dataset.row,t.target.dataset.col),m=u(Number(t.target.dataset.row),Number(t.target.dataset.col))),l=!1)},!1);var N=document.querySelector(".startDijsktra");function E(t){t.sort(function(t,e){return t.tentativeDistance-e.tentativeDistance})}function S(e,n){var r,o=t(b(e,n));try{for(o.s();!(r=o.n()).done;){var a=r.value;a.tentativeDistance=e.tentativeDistance+1,a.previousNode=e}}catch(i){o.e(i)}finally{o.f()}}function D(t){for(var e=[],n=t;null!==n;)e.unshift(n),n=n.previousNode;return e}function A(){for(var t=w(o,m,v),e=function(e){setTimeout(function(){t[e].name.classList.add("visited")},10*e)},n=0;n<t.length;n++)e(n);var r=D(v);setTimeout(function(){for(var t=function(t){setTimeout(function(){r[t].name.classList.add("shoretstPath")},50*t)},e=r.length-1;e>=0;e--)t(e)},10*t.length)}N.addEventListener("click",function(t){A()});
},{}]},{},["A2T1"], null)
//# sourceMappingURL=/app.10b76a53.js.map