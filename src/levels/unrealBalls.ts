import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealBallsArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {JungleUnreal3} from "../musics";

export function UnrealBalls() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(UnrealBallsArgs);
    jukebox.play(JungleUnreal3);
}