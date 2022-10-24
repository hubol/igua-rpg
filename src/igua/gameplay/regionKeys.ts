import {Texture} from "pixi.js";
import {progress, Progress} from "../data/progress";
import {Undefined} from "../../utils/types/undefined";

export class RegionKeys {
    constructor(
        readonly texture: Texture,
        private readonly _key1: (p: Progress) => boolean,
        private readonly _key2: (p: Progress) => boolean,
        private readonly _key3: (p: Progress) => boolean,
        private readonly _doneSearching: (p: Progress) => boolean,
        private readonly __progress = Undefined<Progress>()) { }

    private get _progress() {
        return this.__progress ?? progress;
    }

    get key1() {
        return this._key1(this._progress);
    }

    get key2() {
        return this._key2(this._progress);
    }

    get key3() {
        return this._key3(this._progress);
    }

    get doneSearching() {
        return this._doneSearching(this._progress) && this.key1 && this.key2 && this.key3;
    }

    get keys() {
        return [ this.key1, this.key2, this.key3 ];
    }

    clone(p: Progress) {
        return new RegionKeys(this.texture, this._key1, this._key2, this._key3, this._doneSearching, p);
    }
}