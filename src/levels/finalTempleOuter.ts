import {scene} from "../igua/scene";
import {FinalTempleOuterArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {ProgressBigKey} from "../igua/data/getCompletion";
import {DisplayObject, Texture} from "pixi.js";
import {bigKeyMeter} from "../gameObjects/bigKey";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {desertBigKeyTextures} from "./desertTemple";
import {jungleBigKeyTextures} from "./jungleTemple";
import {volcanoBigKeyTextures} from "./volcanoTemple";
import {capitalBigKeyTextures} from "./capitalTemple";

export function FinalTempleOuter() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(FinalTempleOuterArgs);

    const { desert, jungle, volcano, capital } = progress.flags;

    showBigKeyMeter(desert.bigKey, desertBigKeyTextures, level.BigKey1);
    showBigKeyMeter(jungle.bigKey, jungleBigKeyTextures, level.BigKey2);
    showBigKeyMeter(volcano.bigKey, volcanoBigKeyTextures, level.BigKey3);
    showBigKeyMeter(capital.bigKey, capitalBigKeyTextures, level.BigKey4);
}

function hasAllPieces(bigKey: ProgressBigKey) {
    return bigKey.piece1 && bigKey.piece2 && bigKey.piece3;
}

function showBigKeyMeter(bigKey: ProgressBigKey, txs: Texture[], at: DisplayObject) {
    const m = bigKeyMeter(
        [txs[0], bigKey.piece1],
        [txs[1], bigKey.piece2],
        [txs[2], bigKey.piece3],)
    m.at(getWorldCenter(at)).behind();
    m.pivot.set(m.width / 2, m.height / 2);
    return m;
}