import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealBallsArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {JungleUnreal3} from "../musics";
import {shatterball} from "../gameObjects/shatterball";
import {wait} from "../cutscene/wait";
import {spike} from "../gameObjects/spike";
import {sleep} from "../cutscene/sleep";
import {confetti} from "../gameObjects/confetti";
import {PoppingRockPop} from "../sounds";
import {player} from "../gameObjects/player";

export function UnrealBalls() {
    scene.backgroundColor = 0x55B3C4;
    scene.terrainColor = 0xCC2C42;
    const level = applyOgmoLevel(UnrealBallsArgs);
    jukebox.play(JungleUnreal3);
    const ball = shatterball().at(133, 128).behind();
    scene.gameObjectStage.withAsync(async () => {
        await wait(() => ball.destroyed);
        player.invulnerableFrameCount += 30;
        jukebox.currentSong?.fade(1, 0, 1000);
        const spikes = [...spike.instances];
        for (const s of spikes) {
            await sleep(75);
            confetti().at(s).show();
            PoppingRockPop.play();
            s.destroy();
        }
    })
}