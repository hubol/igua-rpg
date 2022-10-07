import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {BlindHouse} from "../musics";
import {manyCapitalBricks} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {CapitalTownArgs} from "../levelArgs";
import {DisplayObject, filters} from "pixi.js";
import {mapRgb} from "../utils/pixi/mapRgb";

export function CapitalTown() {
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.stop().warm(BlindHouse);
    const level = applyOgmoLevel(CapitalTownArgs);

    manyCapitalBricks(
        scene.terrainStage.children.filter(x => x.ext.isBlock),
        makePseudo(287459.32798))
        .show(scene.terrainStage);

    building(level.CapitalBuilding1, 0xA2D6CE, 0xE24F56);
}

function building(d: DisplayObject, walls: number, roof: number) {
    d.filter(mapRgb(new filters.ColorMatrixFilter(), walls, roof));
}