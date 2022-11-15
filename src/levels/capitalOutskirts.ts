import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease} from "../musics";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { CapitalOutskirtsArgs } from "../levelArgs";
import {manyCapitalBricks} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";

export function CapitalOutskirts() {
    scene.pipeStage.style = 2;
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.play(CapitalMusicPlease);
    const level = applyOgmoLevel(CapitalOutskirtsArgs);

    manyCapitalBricks(
        scene.terrainStage.children.filter(x => x.ext.isBlock),
        makePseudo(287459.32798))
        .show(scene.terrainStage);
}