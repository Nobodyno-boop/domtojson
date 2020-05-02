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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParserConfig = /*#__PURE__*/function () {
  function ParserConfig() {
    var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, ParserConfig);

    this.api = api;
    this.obj = [];
    this.exc = [];
  }

  _createClass(ParserConfig, [{
    key: "set",
    value: function set(obj) {
      this._set(obj);

      return this;
    }
  }, {
    key: "_set",
    value: function _set(obj) {
      if (this.obj) this.obj.push(obj);
    }
  }, {
    key: "_excludeNode",
    value: function _excludeNode() {
      var _this$exc;

      (_this$exc = this.exc).push.apply(_this$exc, arguments);
    }
  }, {
    key: "getObj",
    value: function getObj() {
      return this.obj;
    }
  }, {
    key: "isApi",
    value: function isApi() {
      return this.api;
    }
  }, {
    key: "isExclude",
    value: function isExclude(node) {
      return this.exc.includes(node);
    }
  }, {
    key: "excludeNode",
    value: function excludeNode() {
      this._excludeNode.apply(this, arguments);

      return this;
    }
  }]);

  return ParserConfig;
}();

exports.ParserConfig = ParserConfig;
},{}],"../src/api/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParserAPI = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Maybe make other custom function.
var ParserAPI = /*#__PURE__*/function () {
  function ParserAPI(config) {
    _classCallCheck(this, ParserAPI);

    this.config = config;
  }

  _createClass(ParserAPI, [{
    key: "set",
    value: function set(obj) {
      this.config.set(obj);
      return this;
    }
  }, {
    key: "excludeNode",
    value: function excludeNode() {
      var _this$config;

      (_this$config = this.config).excludeNode.apply(_this$config, arguments);

      return this;
    }
  }]);

  return ParserAPI;
}();

exports.ParserAPI = ParserAPI;
},{}],"../src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//based on https://gist.github.com/rsms/3744301784eb3af8ed80bc746bef5eeb
var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this.events = new Map();
  }

  _createClass(Emitter, [{
    key: "on",
    value: function on(event, listener) {
      if (this.events.has(event)) {
        this.events.get(event).push(listener);
      } else {
        this.events.set(event, [listener]);
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.events.has(event)) {
        this.events.get(event).forEach(function (x) {
          return x.call.apply(x, [null].concat(args));
        });
      }
    }
  }]);

  return Emitter;
}();

exports.default = Emitter;
},{}],"../src/conversion/version.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Version = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Version = /*#__PURE__*/function () {
  function Version() {
    var _this = this;

    var localVersion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2.0;

    _classCallCheck(this, Version);

    this.localVersion = localVersion; //toJson

    this.json = [{
      "rule": /(\s{5,}|\t{2,})/g,
      "version": 2.0,
      "to": 2.0,
      "resolve": function resolve(s, rule) {
        return _this.fixJ(s, rule);
      },
      word: "⛏($)" // &#9935;

    }];
    this.dom = [{
      rule: /⛏\(([0-9]+)\)/g,
      version: 2.0,
      to: 2.0,
      "resolve": function resolve(s, rule) {
        return _this.fixD(s, rule);
      },
      word: "\xa0" // \xa0

    }];
  }

  _createClass(Version, [{
    key: "matchAll",
    value: function matchAll(s, regex) {
      var m;
      var p = [];

      while ((m = regex.exec(s)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        p.push(m);
      }

      return p;
    }
  }, {
    key: "generateSpace",
    value: function generateSpace(patch, i) {
      var s = "";

      for (var o = 0; 0 < i; o++) {
        s += patch.word;
      }

      console.log(s);
      return s;
    } // https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript?rq=1

  }, {
    key: "replaceAt",
    value: function replaceAt(string, obj, replace) {
      return string.substr(0, obj['index']) + string.substr(obj['index'], obj['0'].length).replace(obj['0'], replace);
    }
  }, {
    key: "fixD",
    value: function fixD(s, path) {
      var _this2 = this;

      var p = this.matchAll(s, path.rule);
      console.log(p);
      p.forEach(function (x) {
        console.log(x[1]);

        var sp = _this2.generateSpace(path, Number(x[1]));
      }); // p.forEach(x => {
      //     s = this.replaceAt(s, x, path.word.replace('$', String(x[0].length)));
      // })

      return s;
    }
  }, {
    key: "fixJ",
    value: function fixJ(s, path) {
      var _this3 = this;

      var p = this.matchAll(s, path.rule);
      p.forEach(function (x) {
        s = _this3.replaceAt(s, x, path.word.replace('$', String(x[0].length)));
      });
      return s;
    }
  }, {
    key: "fixjson",
    value: function fixjson(s) {
      var _this4 = this;

      this.json.forEach(function (x) {
        if (x.version === _this4.localVersion || x.to !== 0 || x.to <= _this4.localVersion) {
          s = x.resolve(s, x);
        }
      });
      return s;
    }
  }, {
    key: "fixDom",
    value: function fixDom(s) {
      var _this5 = this;

      this.dom.forEach(function (x) {
        if (x.version === _this5.localVersion || x.to !== 0 || x.to <= _this5.localVersion) {
          s = x.resolve(s, x);
        }
      });
      return s;
    }
  }]);

  return Version;
}();

exports.Version = Version;
Version.actual = 2.0;
},{}],"../src/lib/dom.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../utils"));

var _version = require("../conversion/version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Event = /*#__PURE__*/function (_Emitter) {
  _inherits(Event, _Emitter);

  var _super = _createSuper(Event);

  function Event() {
    _classCallCheck(this, Event);

    return _super.apply(this, arguments);
  }

  return Event;
}(_utils.default);

var Dom = /*#__PURE__*/function () {
  function Dom(el, config) {
    _classCallCheck(this, Dom);

    this.el = el;
    this.config = config;
    this.event = new Event();
    this.version = new _version.Version();
    this.tmpElement = [];
    this.tmpJson = [{
      version: _version.Version.actual
    }];
    this.init();
  }

  _createClass(Dom, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.event.on("overide", function (x) {
        var el = _this.getElement(x["detail"]["v"]);

        if (el === null) {
          console.error("[!Error!] Cannot catch HTMLELEMENT ! ");
        }

        _this.overide(x["detail"]["o"], el);
      });
      var am = this.el.children;
      var bm = Array.from(this.el.children); //TODO: chekc if has children

      if (this.el.children.length >= 1) {
        this.pre(this.el.children);
        this.el.childNodes.forEach(function (x) {
          _this.parse(x);
        });
      } else {
        throw new Error("[DTM] The element have no children" + this.el);
      }
    }
  }, {
    key: "pre",
    value: function pre(h) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      for (var index = 0; index < h.length; index++) {
        var element = h[index];
        this.tmpElement.push(element);

        if (element.children.length > 0) {
          this.pre(element.children, true);
        }
      }
    }
  }, {
    key: "overide",
    value: function overide(obj, v) {
      var attr = [];

      if (this.config.isApi()) {
        var co = this.config.getObj().filter(function (x) {
          return x.node.toLowerCase() === v.nodeName.toLowerCase();
        });

        if (co.length === 1) {
          var m = co[0];
          var bin = typeof m["include"] !== "undefined";
          var bex = typeof m["exclude"] !== "undefined";

          var _loop = function _loop(i) {
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
              var _xin = m["include"].filter(function (x) {
                return x.toLowerCase() === va.name.toLowerCase();
              });

              if (_xin) {
                attr.push({
                  name: va.name,
                  value: va.value
                });
              }
            }

            if (bex) {
              var _xen = m["exclude"].filter(function (x) {
                return x.toLowerCase() === va.name.toLowerCase();
              });

              if (!(_xen.length >= 1)) {
                attr.push({
                  name: va.name,
                  value: va.value
                });
              } else return {
                v: void 0
              };
            }
          };

          for (var i = 0; i < v.attributes.length; i++) {
            var _ret = _loop(i);

            if (_typeof(_ret) === "object") return _ret.v;
          }
        }
      } else {
        for (var _i = 0; _i < v.attributes.length; _i++) {
          var va = v.attributes.item(_i);
          attr.push({
            name: va.name,
            value: va.value
          });
        }
      }

      if (attr.length >= 1) {
        obj["attr"] = attr;
      }
    }
  }, {
    key: "parse",
    value: function parse(v) {
      var _this2 = this;

      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var nodeName = v.nodeName.toLowerCase();
      var obj = {};
      obj['version'];
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
          obj["text"] = this.version.fixjson(text.textContent);
        }

        if (v.childNodes.length >= 1) {
          obj["childs"] = [];
          v.childNodes.forEach(function (x) {
            _this2.parse(x, obj);
          });
        }
      } else if (v.nodeName === "#text" && base != null) {
        if (base["text"] === v.textContent) {
          delete base["childs"];
        } else {
          obj["text"] = this.version.fixjson(v.textContent);
          base["childs"].push(obj);
        }
      } else if (base != null) {
        base["childs"].push(obj);
      }
    }
  }, {
    key: "getElement",
    value: function getElement(n) {
      var map = this.tmpElement.filter(function (x) {
        return x.isSameNode(n);
      });
      return map.length === 0 ? null : map[0];
    }
  }, {
    key: "getJson",
    value: function getJson() {
      return _objectSpread({}, this.tmpJson);
    }
  }]);

  return Dom;
}();

exports.default = Dom;
},{"../utils":"../src/utils.ts","../conversion/version":"../src/conversion/version.ts"}],"../src/lib/json.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Json = void 0;

var _version = require("../conversion/version");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Json = /*#__PURE__*/function () {
  function Json(json) {
    _classCallCheck(this, Json);

    this.json = json;
    this.tmp = [];
    var config = json[0];
    this.version = new _version.Version(Number(config['version']));

    for (var i = 1; i < Object.keys(json).length; i++) {
      this.parse(json[i], null);
    }
  }

  _createClass(Json, [{
    key: "getT",
    value: function getT(s) {
      var a = this.version.fixDom(s);
      console.log(a);
      return s;
    }
  }, {
    key: "parse",
    value: function parse(obj) {
      var _this = this;

      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (obj['version']) {
        console.log("find", obj);
      } else {
        var node = obj["node"];
        var d = null;

        if (node === "#text") {
          d = document.createTextNode(this.getT(obj["text"]));
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
      }
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.tmp;
    }
  }]);

  return Json;
}();

exports.Json = Json;
},{"../conversion/version":"../src/conversion/version.ts"}],"../src/parser.ts":[function(require,module,exports) {
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parser = /*#__PURE__*/function () {
  function Parser() {
    _classCallCheck(this, Parser);

    this.config = new _config.ParserConfig();
  }

  _createClass(Parser, [{
    key: "api",
    value: function api(fn) {
      var napi = fn(new _config2.ParserAPI(new _config.ParserConfig(true))); // fn((api:IParserConfig) => {
      //     api.set({node:"img", "exclude": ["id"]})
      // })

      this.config = napi.config;
    }
  }, {
    key: "toJson",
    value: function toJson(element) {
      var json = new _dom.default(element, this.config);
      return json.getJson();
    }
  }, {
    key: "toDom",
    value: function toDom(json) {
      var nodeName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "div";
      var dom = new _json.Json(json);
      var d = document.createElement(nodeName);
      dom.getElement().forEach(function (x) {
        d.appendChild(x);
      });
      return d;
    }
  }, {
    key: "newInstance",
    value: function newInstance() {
      return new Parser();
    }
  }]);

  return Parser;
}();

exports.Parser = Parser;
},{"./config":"../src/config.ts","./api/config":"../src/api/config.ts","./lib/dom":"../src/lib/dom.ts","./lib/json":"../src/lib/json.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

var _parser = require("./parser");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46389" + '/');

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