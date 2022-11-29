import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealFireflyArgs} from "../levelArgs";
import {firefly} from "../gameObjects/firefly";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {capitalBigKeyTextures} from "./capitalTemple";

export function UnrealFirefly() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    scene.camera.mode = 'ahead';

    const level = applyOgmoLevel(UnrealFireflyArgs);

    for (const key in level) {
        if (key.includes('Anchor'))
            firefly().at(level[key]).show();
    }

    bigKeyPiece(progress.flags.capital.bigKey, capitalBigKeyTextures[1], 'piece2').at(level.Piece).show();
}