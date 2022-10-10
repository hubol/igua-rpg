import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {BlindHouse, CapitalMusicPlease} from "../musics";
import {manyCapitalBricks} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {CapitalTownArgs} from "../levelArgs";
import {DisplayObject, filters} from "pixi.js";
import {mapRgb} from "../utils/pixi/mapRgb";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {measureCounter} from "../gameObjects/measureCounter";

export function CapitalTown() {
    scene.pipeStage.style = 2;
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.play(CapitalMusicPlease).warm(BlindHouse);
    const level = applyOgmoLevel(CapitalTownArgs);

    manyCapitalBricks(
        scene.terrainStage.children.filter(x => x.ext.isBlock),
        makePseudo(287459.32798))
        .show(scene.terrainStage);

    building(level.CapitalBuilding1, 0xA2D6CE, 0xE24F56);
    enrichTiming(level);
}

function building(d: DisplayObject, walls: number, roof: number) {
    d.filter(mapRgb(new filters.ColorMatrixFilter(), walls, roof));
}

function enrichTiming(level: GameObjectsType<typeof CapitalTownArgs>) {
    const period = 2;
    const flashStart = period - 2;
    const inactiveStart = period - 1;
    const flashes = 2;

    const pipe = level.TimingPipe;
    const counter = measureCounter(CapitalMusicPlease, 119).show();

    let jiggle = 0;

    pipe.withStep(() => {
        const m = (counter.measuref * 2) % period;
        const palpha = pipe.alpha;

        pipe.active = m < inactiveStart;
        pipe.visible = pipe.active;
        if (m >= flashStart && m < inactiveStart) {
            const mm = Math.floor((m + (period - flashStart)) * flashes);
            pipe.alpha = 1 - (mm % 2) * 0.33;
        }
        else
            pipe.alpha = 1;

        if (palpha !== pipe.alpha)
            jiggle = 1;
    })
        .withStep(() => {
            pipe.pivot.y = -Math.sign(jiggle);
            jiggle = Math.max(0, jiggle - 0.3);
        });
}