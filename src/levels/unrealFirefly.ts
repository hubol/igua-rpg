import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealFireflyArgs} from "../levelArgs";
import {firefly} from "../gameObjects/firefly";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {capitalBigKeyTextures} from "./capitalTemple";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";

export function UnrealFirefly() {
    scene.backgroundColor = 0xEDDC44;
    scene.terrainColor = 0x000898;
    scene.camera.mode = 'ahead';

    const level = applyOgmoLevel(UnrealFireflyArgs);

    for (const key in level) {
        if (key.includes('Anchor'))
            firefly().at(level[key]).show();
    }

    decalsOf(GroundSpeckles).forEach(x => x.tinted(0xC92C42));

    bigKeyPiece(progress.flags.capital.bigKey, capitalBigKeyTextures[1], 'piece2').at(level.Piece).show();
}