import {container} from "../utils/pixi/container";
import {game} from "../igua/game";
import {merge} from "../utils/object/merge";
import {wait} from "../cutscene/wait";
import {jukebox} from "../igua/jukebox";
import {Howl} from "howler";

export function measureCounter(song: Howl, bpm: number) {
    let measure = 0;
    const c = merge(container(), {
            get measuref() {
                return measure;
            },
            get measure() {
                return Math.floor(measure);
            },
            get halfMeasure() {
                return Math.floor(measure * 2);
            },
            get quarterMeasure() {
                return Math.floor(measure * 4);
            }
        })
        .withTicker(game.hudStage.ticker)
        .withAsync(async () => {
            await wait(() => !!jukebox.currentSong && song.playing());
            c.withStep(() => measure = (jukebox.currentSong!.seek() * bpm) / 240);
        });

    return c;
}