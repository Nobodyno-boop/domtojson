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
})({"../src/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParserConfig = void 0;

var ParserConfig =
/** @class */
function () {
  function ParserConfig(api) {
    if (api === void 0) {
      api = false;
    }

    this.api = api;
    this.obj = [];
    this.exc = [];
  }

  ParserConfig.prototype.set = function (obj) {
    this._set(obj);

    return this;
  };

  ParserConfig.prototype._set = function (obj) {
    if (this.obj) this.obj.push(obj);
  };

  ParserConfig.prototype._excludeNode = function () {
    var _a;

    var node = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      node[_i] = arguments[_i];
    }

    (_a = this.exc).push.apply(_a, node);
  };

  ParserConfig.prototype.getObj = function () {
    return this.obj;
  };

  ParserConfig.prototype.isApi = function () {
    return this.api;
  };

  ParserConfig.prototype.isExclude = function (node) {
    return this.exc.includes(node);
  };

  ParserConfig.prototype.excludeNode = function () {
    var node = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      node[_i] = arguments[_i];
    }

    this._excludeNode.apply(this, node);

    return this;
  };

  return ParserConfig;
}();

exports.ParserConfig = ParserConfig;
},{}],"../src/api/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParserAPI = void 0;

// Maybe make other custom function.
var ParserAPI =
/** @class */
function () {
  function ParserAPI(config) {
    this.config = config;
  }

  ParserAPI.prototype.set = function (obj) {
    this.config.set(obj);
    return this;
  };

  ParserAPI.prototype.excludeNode = function () {
    var _a;

    var node = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      node[_i] = arguments[_i];
    }

    (_a = this.config).excludeNode.apply(_a, node);

    return this;
  };

  return ParserAPI;
}();

exports.ParserAPI = ParserAPI;
},{}],"../src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//based on https://gist.github.com/rsms/3744301784eb3af8ed80bc746bef5eeb
var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var Emitter =
/** @class */
function () {
  function Emitter() {
    this.events = new Map();
  }

  Emitter.prototype.on = function (event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).push(listener);
    } else {
      this.events.set(event, [listener]);
    }
  };

  Emitter.prototype.emit = function (event) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    if (this.events.has(event)) {
      this.events.get(event).forEach(function (x) {
        return x.call.apply(x, __spreadArrays([null], args));
      });
    }
  };

  return Emitter;
}();

var _default = Emitter;
exports.default = _default;
},{}],"../src/lib/dom.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Event =
/** @class */
function (_super) {
  __extends(Event, _super);

  function Event() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return Event;
}(_utils.default);

var Dom =
/** @class */
function () {
  function Dom(el, config) {
    this.el = el;
    this.config = config;
    this.event = new Event();
    this.tmpElement = [];
    this.tmpJson = [];
    this.init();
  }

  Dom.prototype.init = function () {
    var _this = this;

    this.event.on("overide", function (x) {
      var el = _this.getElement(x["detail"]["v"]);

      if (el === null) {
        console.error("[!Error!] Cannot catch HTMLELEMENT ! ");
      }

      _this.overide(x["detail"]["o"], el);
    });
    var am = this.el.children;
    var bm = Array.from(this.el.children);
    console.log(am);
    console.log(bm); //TODO: chekc if has children

    if (this.el.children.length >= 1) {
      this.pre(this.el.children);
      this.el.childNodes.forEach(function (x) {
        _this.parse(x);
      });
    } else {
      throw new Error("[DTM] The element have no children" + this.el);
    }
  };

  Dom.prototype.pre = function (h, base) {
    if (base === void 0) {
      base = false;
    }

    for (var index = 0; index < h.length; index++) {
      var element = h[index];
      this.tmpElement.push(element);

      if (element.children.length > 0) {
        this.pre(element.children, true);
      }
    }
  };

  Dom.prototype.overide = function (obj, v) {
    var attr = [];

    if (this.config.isApi()) {
      var co = this.config.getObj().filter(function (x) {
        return x.node.toLowerCase() === v.nodeName.toLowerCase();
      });

      if (co.length === 1) {
        var m = co[0];
        var bin = typeof m["include"] !== "undefined";
        var bex = typeof m["exclude"] !== "undefined";

        var _loop_1 = function _loop_1(i) {
          var va = v.attributes.item(i);

          if (bin && bex) {
            var xin = m["include"].filter(function (x) {
              return x.toLowerCase() === va.name.toLowerCase();
            });
            var xen = m["exclude"].filter(function (x) {
              return x.toLowerCase() === va.name.toLowerCase();
            });

            if (xin.length > 1 && xen.length >= 1) {
              throw new Error("[DomToJson] " + va.name + "is on exclude and include !");
            }

            if (xin.length >= 1) {
              attr.push({
                name: va.name,
                value: va.value
              });
            }

            if (xen.length >= 1) {
              attr.push({
                name: va.name,
                value: va.value
              });
            }
          }

          if (bin) {
            var xin = m["include"].filter(function (x) {
              return x.toLowerCase() === va.name.toLowerCase();
            });

            if (xin) {
              attr.push({
                name: va.name,
                value: va.value
              });
            }
          }

          if (bex) {
            var xen = m["exclude"].filter(function (x) {
              return x.toLowerCase() === va.name.toLowerCase();
            });

            if (!(xen.length >= 1)) {
              attr.push({
                name: va.name,
                value: va.value
              });
            } else return {
              value: void 0
            };
          }
        };

        for (var i = 0; i < v.attributes.length; i++) {
          var state_1 = _loop_1(i);

          if (_typeof(state_1) === "object") return state_1.value;
        }
      }
    } else {
      for (var i = 0; i < v.attributes.length; i++) {
        var va = v.attributes.item(i);
        attr.push({
          name: va.name,
          value: va.value
        });
      }
    }

    if (attr.length >= 1) {
      obj["attr"] = attr;
    }
  };

  Dom.prototype.parse = function (v, base) {
    var _this = this;

    if (base === void 0) {
      base = null;
    }

    var nodeName = v.nodeName.toLowerCase();
    var obj = {};
    obj['node'] = nodeName;

    if (base === null && nodeName !== "#text") {
      this.tmpJson.push(obj);
    }

    if (v.nodeName !== "#text") {
      this.event.emit("overide", {
        "detail": {
          "v": v,
          "o": obj
        }
      });
    }

    if (v.hasChildNodes()) {
      if (base != null) {
        if (typeof base["childs"] === "undefined") base["childs"] = [];
        base["childs"].push(obj);
      }

      var text = v.childNodes.item(0);

      if (text.nodeName === "#text") {
        obj["text"] = text.textContent;
      }

      if (v.childNodes.length >= 1) {
        obj["childs"] = [];
        v.childNodes.forEach(function (x) {
          _this.parse(x, obj);
        });
      }
    } else if (v.nodeName === "#text" && base != null) {
      if (base["text"] === v.textContent) {
        delete base["childs"];
      } else {
        obj["text"] = v.textContent;
        base["childs"].push(obj);
      }
    } else if (base != null) {
      base["childs"].push(obj);
    }
  };

  Dom.prototype.getElement = function (n) {
    var map = this.tmpElement.filter(function (x) {
      return x.isSameNode(n);
    });
    return map.length === 0 ? null : map[0];
  };

  Dom.prototype.getJson = function () {
    var o = Object.assign({}, this.tmpJson);
    return o;
  };

  return Dom;
}();

var _default = Dom;
exports.default = _default;
},{"../utils":"../src/utils.ts"}],"../src/lib/json.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Json = void 0;

var Json =
/** @class */
function () {
  function Json(json) {
    this.json = json;
    this.tmp = [];

    for (var j in this.json) {
      this.parse(j, null);
    }
  }

  Json.prototype.parse = function (obj, base) {
    var _this = this;

    if (base === void 0) {
      base = null;
    }

    var node = obj["node"];
    var d = null;

    if (node === "#text") {
      d = document.createTextNode(obj["text"]);
    } else {
      d = document.createElement(node);

      if (obj["text"] !== undefined) {
        d.textContent = obj["text"];
      }
    }

    if (obj["attr"] !== undefined) {
      obj["attr"].forEach(function (x) {
        d.setAttribute(x["name"], x["value"]);
      });
    }

    if (obj['childs'] !== undefined) {
      obj["childs"].forEach(function (x) {
        _this.parse(x, d);
      });
    }

    if (base !== null) {
      base.appendChild(d);
    } else {
      this.tmp.push(d);
    }
  };

  Json.prototype.getElement = function () {
    return this.tmp;
  };

  return Json;
}();

exports.Json = Json;
},{}],"../src/parser.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var _config = require("./config");

var _config2 = require("./api/config");

var _dom = _interopRequireDefault(require("./lib/dom"));

var _json = require("./lib/json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parser =
/** @class */
function () {
  function Parser() {
    this.config = new _config.ParserConfig();
  }

  Parser.prototype.api = function (fn) {
    var napi = fn(new _config2.ParserAPI(new _config.ParserConfig(true))); // fn((api:IParserConfig) => {
    //     api.set({node:"img", "exclude": ["id"]})
    // })

    this.config = napi.config;
  };

  Parser.prototype.toJson = function (element) {
    var json = new _dom.default(element, this.config);
    return json.getJson();
  };

  Parser.prototype.toDom = function (json, nodeName) {
    if (nodeName === void 0) {
      nodeName = "div";
    }

    var dom = new _json.Json(json);
    var d = document.createElement(nodeName);
    dom.getElement().forEach(function (x) {
      d.appendChild(x);
    });
    return d;
  };

  Parser.prototype.newInstance = function () {
    return new Parser();
  };

  return Parser;
}();

exports.Parser = Parser;
},{"./config":"../src/config.ts","./api/config":"../src/api/config.ts","./lib/dom":"../src/lib/dom.ts","./lib/json":"../src/lib/json.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

var _parser = require("./parser");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
  window["DTM"] = new _parser.Parser();
} else {
  module.exports = new _parser.Parser();
} // interface Try{
//     "try": String
// }
// class Foo extends Emitter<Try> {
// }
// let f = new Foo();
// f.on("try", (msg, a, b) => console.log(msg, b));
// f.emit('try', "Ma bite", " est", " un volcan")
},{"./parser":"../src/parser.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42721" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.ts"], null)
//# sourceMappingURL=/src.9caef6c7.js.map