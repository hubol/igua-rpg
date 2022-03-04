import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealBallsArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {JungleUnreal3} from "../musics";
import {shatterball} from "../gameObjects/shatterball";
import {wait} from "../cutscene/wait";
import {spike} from "../gameObjects/spike";

export function UnrealBalls() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(UnrealBallsArgs);
    jukebox.play(JungleUnreal3);
    const ball = shatterball().at(133, 128).behind();
    scene.gameObjectStage.withAsync(async () => {
        await wait(() => ball.destroyed);
        spike.destroyAll();
    })
}