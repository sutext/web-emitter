Object.defineProperty(exports, "__esModule", { value: true });
Object.assign =
    Object.assign ||
    function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, "findIndex", {
        value: function (predicate) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== "function") {
                throw new TypeError("predicate must be a function");
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len) {
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                k++;
            }
            return -1;
        },
    });
}
var __extends =
    globalThis.__extends ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
globalThis.__extends = __extends;
var Emitter = (function () {
    function Emitter() {
        var _this = this;
        _this.observers = {};
        _this.on = function (evt, target, callback, once) {
            var list = _this.observers[evt] || (_this.observers[evt] = []);
            var idx = list.findIndex(function (ele) {
                return ele.target === target && ele.once === !!once;
            });
            if (idx === -1) {
                list.push({ callback: callback, target: target, once: !!once });
            }
        };
        _this.off = function (evt, target) {
            if (typeof evt === "string") {
                if (target) {
                    _this.removeByTarget(_this.observers[evt], target);
                } else {
                    _this.observers[evt] = [];
                }
            } else if (typeof evt === "object") {
                for (var key in _this.observers) {
                    _this.removeByTarget(_this.observers[key], evt);
                }
            }
        };
        _this.once = function (event, target, callback) {
            _this.on(event, target, callback, true);
        };
        _this.emit = function (event) {
            if (typeof event !== "string") return;
            var list = _this.observers[event];
            if (!Array.isArray(list)) return;
            var args = [];
            for (var i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            for (var i = 0; i < list.length; i++) {
                var ele = list[i];
                ele.callback.apply(ele.target, args);
            }
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].once) {
                    list.splice(i, 1);
                }
            }
        };
        _this.offall = function () {
            _this.observers = {};
        };
    }
    Emitter.prototype.removeByTarget = function (list, target) {
        if (Array.isArray(list)) {
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].target === target) {
                    list.splice(i, 1);
                }
            }
        }
    };
    return Emitter;
})();
var EventCenter = (function (_super) {
    __extends(EventCenter, _super);
    function EventCenter() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return EventCenter;
})(Emitter);
EventCenter.shared = new EventCenter();

module.exports.default = Emitter;
module.exports.EventCenter = EventCenter;
