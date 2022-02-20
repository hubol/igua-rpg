import {scene} from "../igua/scene";
import {UnrealRoyalChamberArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {player} from "../gameObjects/player";
import {jukebox} from "../igua/jukebox";
import {RoyalChamberMusic} from "../musics";
import {giantDuck} from "../gameObjects/giantDuck";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {jungleBigKeyTextures} from "./jungleTemple";
import {wait} from "../cutscene/wait";
import {block} from "../gameObjects/walls";
import {lerp} from "../cutscene/lerp";

export function UnrealRoyalChamber() {
    scene.backgroundColor = 0x7B598E;
    scene.terrainColor = 0xD3A832;
    const level = applyOgmoLevel(UnrealRoyalChamberArgs);
    jukebox.play(RoyalChamberMusic);

    const secretWorshippers = [level.SecretWorshipper1, level.SecretWorshipper2, level.SecretWorshipper3];
    secretWorshippers.forEach(x => x.opaqueTint = 0x4A2D5E);
    const worshippers = [...secretWorshippers, level.Worshipper];
    worshippers.forEach(x => x.withStep(() => {
        x.isDucking = player.x >= x.x;
    }));

    const duck = giantDuck().at(level.DuckSpawn).show();
    duck.aggressive = false;
    duck.scale.x = -1;

    scene.gameObjectStage.withAsync(async () => {
        await wait(() => player.x >= scene.width - 192);
        scene.camera.followPlayer = false;
        const b = scene.terrainStage.addChild(block(scene.width - 256 - 32, 0, scene.width - 256, scene.height));
        b.alpha = 0;
        await lerp(scene.camera, 'x').to(scene.width - 256).over(1000);
        duck.aggressive = true;
    })
}

function createBigKeyPiece() {
    return bigKeyPiece(progress.flags.jungle.bigKey, jungleBigKeyTextures[1], 'piece2').show();
}