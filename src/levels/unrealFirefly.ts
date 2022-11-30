import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealFireflyArgs} from "../levelArgs";
import {firefly} from "../gameObjects/firefly";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {capitalBigKeyTextures} from "./capitalTemple";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {cracks} from "../gameObjects/cracks";
import {forceRenderable} from "../igua/forceRenderable";
import {jukebox} from "../igua/jukebox";
import {UnrealFirefly as UnrealFireflyMusic} from "../musics";
import {game} from "../igua/game";

export function UnrealFirefly() {
    scene.backgroundColor = 0xEDDC44;
    scene.terrainColor = 0x000898;
    scene.camera.mode = 'ahead';

    const level = applyOgmoLevel(UnrealFireflyArgs);
    jukebox.play(UnrealFireflyMusic);

    for (const key in level) {
        if (key.includes('Anchor'))
            firefly().at(level[key]).show();
    }

    const c = cracks(3245.1269, 0x000663).show(scene.terrainDecalsStage, 0);
    c.mask = scene.terrainStage;
    forceRenderable(scene.terrainStage);

    decalsOf(GroundSpeckles).forEach(x => x.tinted(0xC92C42));

    bigKeyPiece(progress.flags.capital.bigKey, capitalBigKeyTextures[1], 'piece2').at(level.Piece).show();
    game.hudStage.ticker.update();
}