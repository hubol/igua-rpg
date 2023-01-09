import {scene} from "../igua/scene";
import {FinalTempleOuterArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {ProgressBigKey} from "../igua/data/getCompletion";
import {BLEND_MODES, DisplayObject, Graphics, Texture} from "pixi.js";
import {bigKeyMeter} from "../gameObjects/bigKey";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {desertBigKeyTextures} from "./desertTemple";
import {jungleBigKeyTextures} from "./jungleTemple";
import {volcanoBigKeyTextures} from "./volcanoTemple";
import {capitalBigKeyTextures} from "./capitalTemple";
import {makeShadowCastFilter, ShadowCastDirection} from "../gameObjects/lightRayCrude";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {Vector} from "../utils/math/vector";
import {capitalBricksWall} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {sparkly} from "../gameObjects/sparkleSmall";

export function FinalTempleOuter() {
    scene.backgroundColor = 0x536087;
    scene.terrainColor = 0x182840;
    const level = applyOgmoLevel(FinalTempleOuterArgs);

    const { desert, jungle, volcano, capital } = progress.flags;

    showBigKeyMeter(desert.bigKey, desertBigKeyTextures, level.BigKey1);
    showBigKeyMeter(jungle.bigKey, jungleBigKeyTextures, level.BigKey2);
    showBigKeyMeter(volcano.bigKey, volcanoBigKeyTextures, level.BigKey3);
    showBigKeyMeter(capital.bigKey, capitalBigKeyTextures, level.BigKey4);

    [level.Sparkles1, level.Sparkles2].map(sparkly);

    capitalBricksWall(scene.width, scene.height, makePseudo(169.452)).behind(0).opaqueTint = 0x405080;

    showLightRays(level);
}

const colors = [0xe0b0b0, 0xc0a0a0];

function simpleLightRay(g: Graphics, v: Vector) {
    const r1 = 15;
    const r2 = 30;
    const o1 = 1.067;
    const o2 = 1.15;
    const y1 = 1;

    for (let i = 0; i < colors.length; i++) {
        const oo1 = Math.pow(o1, i + 1);
        const oo2 = Math.pow(o2, i + 1);
        const dy = (colors.length - i - 1) * -2;

        g
            .beginFill(colors[i])
            .moveTo(v.x + r1 * oo1, 0)
            .lineTo(v.x + r2 * oo2, 194 + dy + y1)
            .lineTo(v.x, 194 + dy + 2 + y1)
            .lineTo(v.x - r2 * oo2, 194 + dy + y1)
            .lineTo(v.x - r1 * oo1, 0)
            .closePath()
    }

    return g
        .beginFill(0xffffff)
        .moveTo(v.x + r1, 0)
        .lineTo(v.x + r2, 191 + y1)
        .lineTo(v.x, 192 + y1)
        .lineTo(v.x - r2, 191 + y1)
        .lineTo(v.x - r1, 0)
        .closePath();
}

function showLightRays(level: GameObjectsType<typeof FinalTempleOuterArgs>) {
    const g = new Graphics();

    for (const v of [ level.LightRay1, level.LightRay2 ])
        simpleLightRay(g, v);

    // g.alpha = 0.3;
    g.tint = 0x5D6166;
    g.alpha = 0.3;

    ShadowCastDirection.value.x = 0;

    g.ahead();
    g.filter(makeShadowCastFilter()).ahead();
    g.filters[0].blendMode = BLEND_MODES.ADD;
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