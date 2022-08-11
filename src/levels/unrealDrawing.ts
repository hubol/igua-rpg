import {scene} from "../igua/scene";
import {UnrealDrawingArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {trace} from "../gameObjects/trace";
import {jukebox} from "../igua/jukebox";
import {UnrealDrawingMusic} from "../musics";
import {bigKeyPiece, makeFlyIn} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {volcanoBigKeyTextures} from "./volcanoTemple";
import {teleportToTheRoomOfDoors} from "../gameObjects/portalFluid";
import {wait} from "../cutscene/wait";

export function UnrealDrawing() {
    scene.backgroundColor = 0xE0B050;
    scene.terrainColor = 0x7060E0;
    const level = applyOgmoLevel(UnrealDrawingArgs);

    jukebox.play(UnrealDrawingMusic);

    const path = trace(level.Path).show();

    scene.gameObjectStage.withAsync(async () => {
        await wait(() => path.winner);
        createReward();
    });
}

function createReward() {
    const key = makeFlyIn(bigKeyPiece(progress.flags.volcano.bigKey, volcanoBigKeyTextures[2], "piece3"))
        .at(128, -20)
        .show();
    key.onCollect = teleportToTheRoomOfDoors;
}