
(function (global) {
    "use strict";

    var undefined,
        Object = global.Object,
        Function = global.Function,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        jone;

    jone = {
        version: 1.0,

        ownsProperty: function (obj, propertyName) {
            return hasOwnProperty.call(obj, propertyName);
        },

        copyProperties: function (to, from) {
            var name,
                value;
            for (name in from) {
                if (hasOwnProperty.call(from, name)) {
                    value = from[name];
                    if (value !== undefined) {
                        to[name] = value;
                    }
                }
            }
        },

        _simpleCreateObject: (Object.create)
            ? function (base) {
                return Object.create(base);
            }
            : function (base) {
                var Temp = function () {},
                    obj;
                Temp.prototype = base;
                obj = new Temp();
                return obj;
            },

        createObject: function (base, properties) {
            var obj = jone._simpleCreateObject(base);
            if (properties) {
                jone.copyProperties(obj, properties);
            }
            return obj;
        },

        extend: function (ctor, baseCtor, properties) {
            ctor.prototype = jone.createObject(baseCtor.prototype, properties);
        },

        createBoundFunction: (Function.prototype.bind)
            ? function (obj, fn) {
                return fn.bind(obj);
            }
            : function (obj, fn) {
                return function () {
                    fn.apply(obj, arguments);
                };
            }
    };

    global.jone = jone;

}(this));
