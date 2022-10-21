import {Texture} from "pixi.js";

export class RegionKeys<TFlags> {
    constructor(
        readonly texture: Texture,
        private readonly _key1: () => boolean,
        private readonly _key2: () => boolean,
        private readonly _key3: () => boolean,
        private readonly _doneSearching: () => boolean,) { }

    get key1() {
        return this._key1();
    }

    get key2() {
        return this._key2();
    }

    get key3() {
        return this._key3();
    }

    get doneSearching() {
        return this._doneSearching() && this.key1 && this.key2 && this.key3;
    }

    get keys() {
        return [ this.key1, this.key2, this.key3 ];
    }
}