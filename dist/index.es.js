var ParserConfig = (function () {
    function ParserConfig(api) {
        if (api === void 0) { api = false; }
        this.api = api;
        this.obj = [];
        this.exc = [];
    }
    ParserConfig.prototype.set = function (obj) {
        this._set(obj);
        return this;
    };
    ParserConfig.prototype._set = function (obj) {
        if (this.obj)
            this.obj.push(obj);
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
}());

var ParserAPI = (function () {
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
}());

var Dom = (function () {
    function Dom(el, config) {
        this.el = el;
        this.config = config;
        this.tmpElement = [];
        this.tmpJson = [];
        this.init();
    }
    Dom.prototype.init = function () {
        var _this = this;
        this.el.addEventListener("override", function (x) {
            var el = _this.getElement(x["detail"]["v"]);
            if (el === null) {
                console.error("[!Error!] Cannot catch HTMLELEMENT ! ");
            }
            _this.override(x["detail"]["o"], el);
        });
        if (this.el.children.length >= 1) {
            this.pre(this.el.children);
            this.el.childNodes.forEach(function (x) {
                _this.parse(x);
            });
        }
        else {
            throw new Error("[DTM] No children ! ");
        }
    };
    Dom.prototype.pre = function (h, base) {
        for (var index = 0; index < h.length; index++) {
            var element = h[index];
            this.tmpElement.push(element);
            if (element.children.length > 0) {
                this.pre(element.children, true);
            }
        }
    };
    Dom.prototype.override = function (obj, v) {
        var attr = [];
        if (this.config.isApi()) {
            var co = this.config
                .getObj()
                .filter(function (x) { return x.node.toLowerCase() === v.nodeName.toLowerCase(); });
            if (co.length === 1) {
                var m = co[0];
                var bin = typeof m["include"] !== "undefined";
                var bex = typeof m["exclude"] !== "undefined";
                var _loop_1 = function (i) {
                    var va = v.attributes.item(i);
                    if (bin && bex) {
                        var xin = m["include"].filter(function (x) { return x.toLowerCase() === va.name.toLowerCase(); });
                        var xen = m["exclude"].filter(function (x) { return x.toLowerCase() === va.name.toLowerCase(); });
                        if (xin.length > 1 && xen.length >= 1) {
                            throw new Error("[DomToJson] " + va.name + "is on exclude and include !");
                        }
                        if (xin.length >= 1) {
                            attr.push({ name: va.name, value: va.value });
                        }
                        if (xen.length >= 1) {
                            attr.push({ name: va.name, value: va.value });
                        }
                    }
                    if (bin) {
                        var xin = m["include"].filter(function (x) { return x.toLowerCase() === va.name.toLowerCase(); });
                        if (xin) {
                            attr.push({ name: va.name, value: va.value });
                        }
                    }
                    if (bex) {
                        var xen = m["exclude"].filter(function (x) { return x.toLowerCase() === va.name.toLowerCase(); });
                        if (!(xen.length >= 1)) {
                            attr.push({ name: va.name, value: va.value });
                        }
                        else
                            return { value: void 0 };
                    }
                };
                for (var i = 0; i < v.attributes.length; i++) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
        }
        else {
            for (var i = 0; i < v.attributes.length; i++) {
                var va = v.attributes.item(i);
                attr.push({ name: va.name, value: va.value });
            }
        }
        if (attr.length >= 1) {
            obj["attr"] = attr;
        }
    };
    Dom.prototype.parse = function (v, base) {
        var _this = this;
        if (base === void 0) { base = null; }
        var nodeName = v.nodeName.toLowerCase();
        var obj = {};
        obj["node"] = nodeName;
        if (base === null && nodeName !== "#text") {
            this.tmpJson.push(obj);
        }
        if (v.nodeName !== "#text") {
            var e = new CustomEvent("override", { detail: { v: v, o: obj } });
            this.el.dispatchEvent(e);
        }
        if (v.hasChildNodes()) {
            if (base != null) {
                if (typeof base["childs"] === "undefined")
                    base["childs"] = [];
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
        }
        else if (v.nodeName === "#text" && base != null) {
            if (base["text"] === v.textContent) {
                delete base["childs"];
            }
            else {
                obj["text"] = v.textContent;
                this._push(base, obj);
            }
        }
        else if (base != null) {
            this._push(base, obj);
        }
    };
    Dom.prototype._push = function (base, obj) {
        if (typeof base["childs"] === "undefined") {
            base["childs"] = [];
        }
        base["childs"].push(obj);
    };
    Dom.prototype.getElement = function (n) {
        var map = this.tmpElement.filter(function (x) { return x.isSameNode(n); });
        return map.length === 0 ? null : map[0];
    };
    Dom.prototype.getJson = function () {
        return this.tmpJson;
    };
    return Dom;
}());

var Json = (function () {
    function Json(json) {
        this.json = json;
        this.tmp = [];
        for (var i = 0; i < Object.keys(this.json).length; i++) {
            this.parse(this.json[i], null);
        }
    }
    Json.prototype.parse = function (obj, base) {
        var _this = this;
        if (base === void 0) { base = null; }
        var node = obj["node"];
        var d = null;
        if (node === "#text") {
            d = document.createTextNode(obj["text"]);
        }
        else {
            d = document.createElement(node);
            if (obj["text"] !== undefined) {
                d.textContent = obj["text"];
            }
        }
        if (base === null) {
            this.tmp.push(d);
        }
        if (obj["attr"] !== undefined) {
            obj["attr"].forEach(function (x) {
                d.setAttribute(x["name"], x["value"]);
            });
        }
        if (obj["childs"] !== undefined) {
            obj["childs"].forEach(function (x) {
                _this.parse(x, d);
            });
        }
        if (base !== null) {
            base.appendChild(d);
        }
    };
    Json.prototype.getElement = function () {
        return this.tmp;
    };
    return Json;
}());

var Parser = (function () {
    function Parser() {
        this.config = new ParserConfig();
    }
    Parser.prototype.api = function (fn) {
        var napi = fn(new ParserAPI(new ParserConfig(true)));
        this.config = napi.config;
    };
    Parser.prototype.toJson = function (element) {
        var json = new Dom(element, this.config);
        return json.getJson();
    };
    Parser.prototype.toDom = function (json, element) {
        var dom = new Json(json);
        var d;
        if (typeof element === "undefined") {
            d = document.createElement("div");
            dom.getElement().forEach(function (x) {
                d.appendChild(x);
            });
        }
        else {
            d = element;
            dom.getElement().forEach(function (x) {
                d.appendChild(x);
            });
        }
        return d;
    };
    Parser.prototype.newInstance = function () {
        return new Parser();
    };
    return Parser;
}());

export default Parser;
//# sourceMappingURL=index.es.js.map
