import {Texture} from "pixi.js";
import {progress, Progress} from "../data/progress";
import {Undefined} from "../../utils/types/undefined";
import {ProgressBigKey} from "../data/getCompletion";

export class RegionKeys {
    constructor(
        readonly texture: Texture,
        private readonly _key1: (p: Progress) => boolean,
        private readonly _key2: (p: Progress) => boolean,
        private readonly _key3: (p: Progress) => boolean,
        private readonly _bigKey: (p: Progress) => ProgressBigKey,
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

    get bigKey() {
        return this._bigKey(this._progress);
    }

    get reward() {
        return this.bigKey.reward;
    }

    get foundAllBigKeyPieces() {
        return this.bigKey.piece1 && this.bigKey.piece2 && this.bigKey.piece3;
    }

    get doneSearching() {
        return this.reward && this.key1 && this.key2 && this.key3 && this.foundAllBigKeyPieces;
    }

    get keys() {
        return [ this.key1, this.key2, this.key3 ];
    }

    clone(p: Progress) {
        return new RegionKeys(this.texture, this._key1, this._key2, this._key3, this._bigKey, p);
    }
}