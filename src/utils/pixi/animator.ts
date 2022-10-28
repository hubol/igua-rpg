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
        // If the previous time falls too far back, pretend it was approximately two frames ago
        // On a 60Hz display, this could happen when you switch browser tabs
        if (this._then < now - 2 * this._targetInterval)
            this._then = now - 2 * this._targetInterval;
        const delta = this._then ? (now - this._then) : Number.MAX_VALUE;
        if (delta > this._targetInterval) {
            // Setting then to now and adding the targetInterval could result in non-determinism!
            // So instead, do this
            this._then += this._targetInterval;
            this._update();
        }
        else {
            console.log('Skipped');
        }
        requestAnimationFrame(this._animationFrameCallback);
    }

    private _update() {
        for (const work of this._work)
            work();
    }

    start() {
        if (this._then) {
            console.trace(`Attempted to start Animator more than once!`);
            return;
        }
        this._then = performance.now();
        this._maybeUpdate();
    }
}