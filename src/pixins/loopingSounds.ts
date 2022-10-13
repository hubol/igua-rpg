import {Pixin} from "../utils/pixi/pixin";
import {Howl} from "howler";
import {merge} from "../utils/object/merge";
import {Force} from "../utils/types/force";

export const LoopingSounds = <T extends Record<keyof T, Howl>>(t: T) => {
    return Pixin({})
        .applies(src => {
            const loops: Record<keyof T, WrappedHowlLoop> = {} as any;
            for (const k in t) {
                const howl = t[k];
                loops[k] = new WrappedHowlLoop(howl);
                src.on('removed', () => loops[k].stop());
            }
            return merge(src, loops);
        })
        ();
}

class WrappedHowlLoop {
    private instance = Force<number>();

    constructor(private readonly howl: Howl) { }

    get isPlaying() {
        return this.instance && this.howl.playing(this.instance);
    }

    play() {
        if (this.isPlaying)
            return;
        this.instance = this.howl.play(this.instance);
        this.howl.loop(this.instance);
    }

    set volume(volume: number) {
        this.howl.volume(volume, this.instance);
    }

    stop() {
        this.howl.stop(this.instance);
    }

    fade(to: number, ms: number) {
        if (!this.isPlaying)
            return;
        this.howl.fade(<number>this.howl.volume(this.instance), to, ms, this.instance);
        const instance = this.instance;
        setTimeout(() => this.howl.stop(instance), ms + 100);
        this.instance = Force<number>();
    }
}