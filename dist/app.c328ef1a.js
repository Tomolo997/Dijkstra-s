// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodes = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//select a container
var container = document.querySelector('.container');
console.log(container); //make a grid

var nodes = [];
exports.nodes = nodes;
var COLS = 20;
var ROWS = 20;

function grid() {
  for (var i = 0; i < ROWS; i++) {
    for (var j = 0; j < COLS; j++) {
      var div = document.createElement('div');
      div.setAttribute('data-row', i);
      div.setAttribute('data-col', j);
      nodes.push({
        name: div,
        row: i,
        col: j,
        isWall: false,
        isVisited: false,
        tentativeDistance: Infinity,
        previousNode: null
      });
      div.classList.add('node');
      container.append(div);
    }
  }
}

function init() {
  grid(); //return
}

init();

function setStartingPoint(rows, cols) {
  var startingNode = nodes.find(function (el) {
    return el.row === rows && el.col === cols;
  });
  startingNode.name.classList.add('startingNode');
  return startingNode;
}

function setEndingPoint(rows, cols) {
  var endingNode = nodes.find(function (el) {
    return el.row === rows && el.col === cols;
  });
  endingNode.name.classList.add('endingNode');
  endingNode.endingNode = true;
  return endingNode;
} //when i click the node it must log


var mouseisDown = false;
var dragStartingNode = false;

window.onmousedown = function () {
  mouseisDown = true;
  console.log(mouseisDown);
  drawWall();
};

window.onmouseup = function () {
  mouseisDown = false;
  console.log(mouseisDown);
};

function mouseDraw() {
  if (mouseisDown) {
    nodes.forEach(function (el) {
      return el.name.addEventListener('mousemove', function (e) {
        if (mouseisDown && !el.name.classList.contains('startingNode') && !el.name.classList.contains('endingNode')) {
          e.target.classList.add('wall');
        }
      });
    });
  }
}

function drawWall() {
  mouseDraw();
} //djkstra Algo
// const t = setInterval(() => {
//   nodes.forEach((el) => (el.name.style.backgroundColor = 'blue'));
// }, 100);
//iterate skozi vse neighboure in jih pobarvaj rdeco


var endPoint = setEndingPoint(10, 16);
var startingPoins = setStartingPoint(3, 3); //select the current staring point
//plan
//select the staringNodePosition

var startNo = document.querySelector('.startingNode');
var endNo = document.querySelector('.endingNode');
startNo.draggable = true;
endNo.draggable = true;
var tpdragged;
startNo.addEventListener('drag', function (event) {}, false);
endNo.addEventListener('drag', function (event) {}, false);
document.addEventListener('dragstart', function (event) {
  // store a ref. on the dragged elem
  tpdragged = event.target;

  if (event.target.classList.contains('startingNode')) {
    event.target.classList.remove('startingNode');
  } else if (event.target.classList.contains('endingNode')) {
    event.target.classList.remove('endingNode');
  }

  console.log(tpdragged.classList); // make it half transparent
}, false);
document.addEventListener('dragend', function (event) {
  // reset the transparency
  event.target.style.opacity = '';
}, false);
document.addEventListener('dragover', function (event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);
document.addEventListener('dragenter', function (event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == 'node') {
    event.target.style.background = 'grey';
    event.target.style.opacity = 1;
  }
}, false);
document.addEventListener('dragleave', function (event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == 'node') {
    event.target.style.background = '';
  }
}, false);
document.addEventListener('drop', function (event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  console.log(event.target); // move dragged elem to the selected drop target

  if (event.target.className == 'node') {
    if (!nodes.find(function (el) {
      return el.name.classList.contains('startingNode');
    })) {
      event.target.style.background = '';
      console.log(event.target.dataset.row, event.target.dataset.col);
      startingPoins = setStartingPoint(Number(event.target.dataset.row), Number(event.target.dataset.col));
    } else {
      endPoint = setEndingPoint(Number(event.target.dataset.row), Number(event.target.dataset.col));
    }
  }

  mouseisDown = false;
}, false); // startNo.addEventListener(
//   'dragend',
//   function (event) {
//     console.log(tpdragged);
//     tpdragged.name.classList.add('startingNode');
//   },
//   false
// );
//find neighbbour

function findNeighbour(currentNode) {
  var neighbours = [];
  var row = currentNode.row,
      col = currentNode.col; //najdemo leve, desne neighgboure v nodes !

  neighbours.push(nodes.find(function (el) {
    return el.row === row - 1 && el.col === col;
  }));
  neighbours.push(nodes.find(function (el) {
    return el.row === row + 1 && el.col === col;
  }));
  neighbours.push(nodes.find(function (el) {
    return el.row === row && el.col === col - 1;
  }));
  neighbours.push(nodes.find(function (el) {
    return el.row === row && el.col === col + 1;
  }));
  return neighbours.filter(function (el) {
    return el !== undefined;
  }).filter(function (el) {
    return el.isVisited = true;
  });
}

function dijkstra(grid, startingNode, endNode) {
  var visitedNodes = [];
  startingNode.tentativeDistance = 0;
  var UNVisitedNodes = grid; //dokler ni prazna !

  while (!!UNVisitedNodes.length) {
    //sortamo node po distance => 0 gre na začetek za začetek, tako dobimo starting node kak začetek
    sortNodes(UNVisitedNodes);
    var closestNode = UNVisitedNodes.shift();
    closestNode.isVisited = true; //dodamo wall ==>

    if (closestNode.name.classList.contains('wall')) continue; //če je closest node enak end nodu potem je SUCCSESS

    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes; //updejtamo neighboure

    updateNeighbours(closestNode, nodes);
  }
}

var start = document.querySelector('.startDijsktra');
start.addEventListener('click', function (e) {
  animateDijs();
}); //sortamo node, da dobimo 0 na začetku !

function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort(function (a, b) {
    return a.tentativeDistance - b.tentativeDistance;
  });
}

function updateNeighbours(closestNode, grid) {
  var unvisitedNeigh = findNeighbour(closestNode, grid);

  var _iterator = _createForOfIteratorHelper(unvisitedNeigh),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var neighbour = _step.value;
      neighbour.tentativeDistance = closestNode.tentativeDistance + 1;
      neighbour.previousNode = closestNode;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} //returnati moramo shortest path =>


function getNodesInShortestPath(startNode) {
  var nodesShoretes = [];
  var currentNode = startNode;

  while (currentNode !== null) {
    //dodamo na začezek
    nodesShoretes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesShoretes;
} //TO DO
//1. [OK] animate the neighbouring nodes that appear
//2. animate the shortest path
//3. get starting and ending node to appear any where
//1.Animate the neighboiuzrs nodest that appear


function animateDijs() {
  var visitedNodes = dijkstra(nodes, startingPoins, endPoint); //dijsktra returna vse visited nodese
  //loopamo skozi vsakega in mu dodamo class listo visited z delajom

  var _loop = function _loop(i) {
    setTimeout(function () {
      var element = visitedNodes[i];
      element.name.classList.add('visited');
    }, 10 * i);
  };

  for (var i = 0; i < visitedNodes.length; i++) {
    _loop(i);
  }

  var shortestPath = getNodesInShortestPath(endPoint);
  setTimeout(function () {
    var _loop2 = function _loop2(_i) {
      setTimeout(function () {
        var element = shortestPath[_i];
        element.name.classList.add('shoretstPath');
      }, 50 * _i);
    };

    for (var _i = shortestPath.length - 1; _i >= 0; _i--) {
      _loop2(_i);
    }
  }, 10 * visitedNodes.length);
}
},{}],"../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59965" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map