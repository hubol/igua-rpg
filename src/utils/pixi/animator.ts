import {Force} from "../types/force";

export class Animator {
    private readonly _work: Function[] = [];
    private readonly _targetInterval: number;
    private readonly _animationFrameCallback: () => void;

    constructor(private readonly _targetFps: number) {
        this._targetInterval = 1000 / this._targetFps;
        this._animationFrameCallback = () => this._maybeUpdate();
    }

    add(work: Function) {
        this._work.unshift(work);
    }

    private _then = Force<number>();

    // Logic based on a random sample I found
    // https://codepen.io/rishabhp/pen/XKpBQX
    private _maybeUpdate() {
        const now = performance.now();
        const delta = this._then ? (now - this._then) : Number.MAX_VALUE;
        if (delta > this._targetInterval) {
            this._then = now - (delta % this._targetInterval);
            this._update();
        }
        requestAnimationFrame(this._animationFrameCallback);
    }

    private _update() {
        for (const work of this._work)
            work();
    }

    start() {
        this._then = performance.now();
        this._maybeUpdate();
    }
}