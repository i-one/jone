

/**
 * Brings cross-browser inheritance.
 * @author i-one
 */
;(function (glob, undef) {
    'use strict';

    var jone = {},
        Constr;

    /**
     * Creates a new object with the specified prototype and properties.
     * @param {Object} proto The object to be the prototype of the newly 
     *      created object.
     * @param {Object} properties Optional. The object that defines properties
     *      of the newly created object. The properties defined here override 
     *      the prototype properties.
     */
    // jone.create = function (proto, properties) {};

    // Check whether the Object.create method is available natively
    if (Object.create) {

        jone.create = function (proto, properties) {
            var obj = Object.create(proto),
                name;
            if (properties) {
                for (name in properties) {
                    obj[name] = properties[name];
                }
            }
            return obj;
        };

    } else {

        // Create an empty function to be used for inheritance. This function is
        // created only once and then reused in each call of jone.create
        Constr = function () {};

        jone.create = function (proto, properties) {
            var obj,
                name;
            Constr.prototype = proto;
            obj = new Constr();
            if (properties) {
                for (name in properties) {
                    obj[name] = properties[name]
                }
            }
            return obj;
        };
    }

    /**
     * Inherits the prototype of the superConstr in the constr.
     * @param {Function} constr The constructor function to inherit the 
     *      prototype of the specified super constrcutor.
     * @param {Function} superConstr The super constructor function whose 
     *      properties to be inherited.
     */
    jone.extend = function (constr, superConstr, properties) {
        constr.prototype = jone.create(superConstr, properties);
    };

    // export
    glob.jone = jone;

}(window));