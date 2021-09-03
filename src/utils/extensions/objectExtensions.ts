import {Vector} from "../math/vector";

declare global {
    interface Object {
        add(x: number): Vector;
        add(x: number, y: number): Vector;
        add(vector: Vector): Vector;
    }
}

Object.defineProperties(Object.prototype, {
    add: {
        value: function (...args) {
            let me = this;
            if (Array.isArray(this)) {
                me = { x: this[0] ?? 0, y: this[1] ?? 0 };
            }
            if (typeof args[0] === 'object') {
                me.x += args[0].x ?? 0;
                me.y += args[0].y ?? 0;
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
    }
})
