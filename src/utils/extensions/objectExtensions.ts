import {normalize, Vector} from "../math/vector";

declare global {
    interface Object {
        vcpy(): Vector;
        add(x: number): Vector;
        add(x: number, y: number): Vector;
        add(vector: Vector): Vector;
        add(vector: Vector, scalar: number): Vector;
        normalize(): Vector;
        scale(f: number): Vector;
    }
}

Object.defineProperties(Array.prototype, {
    x: {
        get: function () {
            return this[0] ?? 0;
        },
        set: function (x) {
            this[0] = x;
        },
        enumerable: false,
        configurable: true,
    },
    y: {
        get: function () {
            return this[1] ?? 0;
        },
        set: function (y) {
            this[1] = y;
        },
        enumerable: false,
        configurable: true,
    },
});

Object.defineProperties(Object.prototype, {
    add: {
        value: function (...args) {
            const me = this;

            if (typeof args[0] === 'object') {
                const scalar = args[1] ?? 1;
                me.x += (args[0].x ?? 0) * scalar;
                me.y += (args[0].y ?? 0) * scalar;
            }
            else {
                me.x += args[0] ?? 0;
                me.y += args[1] ?? 0;
            }
            return me;
        },
        enumerable: false,
        configurable: true,
        writable: true,
    },
    scale: {
        value: function (...args) {
            const me = this;
            me.x *= args[0];
            me.y *= args[0];
            return me;
        },
        enumerable: false,
        configurable: true,
        writable: true,
    },
    vcpy: {
        value: function () {
            if (Array.isArray(this)) {
                return { x: this[0] ?? 0, y: this[1] ?? 0 };
            }
            return { x: this.x, y: this.y };
        },
        enumerable: false,
        configurable: true,
        writable: true,
    },
    normalize: {
        value: function () {
            return normalize(this);
        },
        enumerable: false,
        configurable: true,
        writable: true,
    }
})
