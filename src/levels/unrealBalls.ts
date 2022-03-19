import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealBallsArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {JungleUnreal3} from "../musics";
import {shatterBall} from "../gameObjects/shatterBall";
import {wait} from "../cutscene/wait";
import {spike} from "../gameObjects/spike";
import {sleep} from "../cutscene/sleep";
import {confetti} from "../gameObjects/confetti";
import {PoppingRockPop} from "../sounds";
import {player} from "../gameObjects/player";
import {trimFrame} from "../utils/pixi/trimFrame";
import {Texture} from "pixi.js";
import {advanceTempleMovingWall, jungleBigKeyTextures} from "./jungleTemple";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {teleportToTheRoomOfDoors} from "../gameObjects/portalFluid";

const keyPieceTexture = trimFrame(new Texture(jungleBigKeyTextures[2].baseTexture, jungleBigKeyTextures[2].frame));

export function UnrealBalls() {
    advanceTempleMovingWall(true);

    scene.backgroundColor = 0x55B3C4;
    scene.terrainColor = 0xCC2C42;
    applyOgmoLevel(UnrealBallsArgs);
    jukebox.play(JungleUnreal3);
    const ball = shatterBall().at(133, 128).behind();
    const piece = bigKeyPiece(progress.flags.jungle.bigKey, keyPieceTexture, 'piece3').centerAnchor();
    piece.hitbox = [0, 0, 1, 1];
    piece.collectible = false;
    piece.onCollect = teleportToTheRoomOfDoors;
    ball.stage.addChild(piece)
    scene.gameObjectStage.withAsync(async () => {
        await wait(() => ball.dead);
        player.invulnerableFrameCount += 30;
        player.withStep(() => player.visible = true);
        jukebox.currentSong?.fade(1, 0, 1000);
        const spikes = [...spike.instances];
        for (const s of spikes) {
            await sleep(75);
            confetti().at(s).show();
            PoppingRockPop.play();
            s.destroy();
        }
        await wait(() => player.invulnerableFrameCount <= 0);
        piece.collectible = true;
    });
    ball.withStep(() => {
        if (piece.collectible) {
            if (ball.y < 108)
                ball.y += 1;
        }
    });
}