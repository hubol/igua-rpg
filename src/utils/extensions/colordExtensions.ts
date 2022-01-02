import {Colord} from "colord";

declare module "colord" {
    interface Colord {
        toPixi(): number;
    }
}

Object.defineProperties(Colord.prototype, {
    toPixi: {
        value: function () {
            return Number(`0x${this.toHex().substr(1)}`);
        },
        enumerable: false,
        configurable: true,
        writable: true,
    },
});

export default 0;
