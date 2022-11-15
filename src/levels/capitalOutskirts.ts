import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, Temple} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { CapitalOutskirtsArgs } from "../levelArgs";
import {manyCapitalBricks} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {makeCapitalWindow} from "./capitalShop";

export function CapitalOutskirts() {
    scene.pipeStage.style = 2;
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.play(CapitalMusicPlease).warm(Temple);
    const level = applyOgmoLevel(CapitalOutskirtsArgs);

    manyCapitalBricks(
        scene.terrainStage.children.filter(x => x.ext.isBlock),
        makePseudo(287459.32798))
        .show(scene.terrainStage);

    [level.Window1, level.Window2].forEach(x => makeCapitalWindow(x, 0xE87880));
}