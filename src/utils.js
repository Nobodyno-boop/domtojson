"use strict";
//based on https://gist.github.com/rsms/3744301784eb3af8ed80bc746bef5eeb
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.events = new Map();
    }
    Emitter.prototype.on = function (event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).push(listener);
        }
        else {
            this.events.set(event, [listener]);
        }
    };
    Emitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.events.has(event)) {
            this.events.get(event).forEach(function (x) { return x.call.apply(x, __spreadArrays([null], args)); });
        }
    };
    return Emitter;
}());
exports.Emitter = Emitter;
