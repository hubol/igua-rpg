import {scene} from "../igua/scene";
import {CapitalOracleArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {decalsOf} from "../gameObjects/decal";
import {CapitalArc, CapitalFireplace, CapitalFireplaceFlame, GroundSpeckles} from "../textures";
import {jukebox} from "../igua/jukebox";
import {CapitalMusicPlease, UnbelievableChaos} from "../musics";
import {Sprite} from "pixi.js";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {animatedSprite} from "../igua/animatedSprite";
import {progress} from "../igua/data/progress";
import {FlameOff, FlameOn} from "../sounds";
import {show, showAll} from "../cutscene/dialog";
import {makeCapitalWindow} from "./capitalShop";
import {ask} from "../cutscene/ask";
import {oracleAdviceCapital} from "../igua/oracleAdvice";

export function CapitalOracle() {
    scene.backgroundColor = 0x4E2FB5;
    scene.terrainColor = 0xCEC25A;
    const level = applyOgmoLevel(CapitalOracleArgs);

    makeCapitalWindow(level.Window);

    decalsOf(CapitalArc).forEach(x => x.tinted(scene.terrainColor));
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x9FAAF9));
    jukebox.play(UnbelievableChaos).warm(CapitalMusicPlease);
    enrichFireplace();
    level.Oracle.cutscene = oracleCutscene;

    if (progress.flags.final.oraclesLearnedTruth)
        level.Oracle.destroy();
}

async function oracleCutscene() {
    const { capital } = progress.flags;

    if (!capital.spokeWithOracle) {
        await showAll(`Long time no see.`,
        `Your task has taken you far, but you are near the end.`,
        `Legend has it that the great weapon will be unlocked with the four big keys.`);
        capital.spokeWithOracle = true;
    }

    if (await ask('Do you need my advice?'))
        await oracleAdviceCapital();
    else
        await show('Make haste, then!');
}

function enrichFireplace() {
    const { capital } = progress.flags;
    const fireplace = Sprite.from(CapitalFireplace).at(104, 56).show(scene.terrainDecalsStage);
    const flame = animatedSprite(flameTxs, 5 / 60)
        .withStep(() => {
            flame.visible = capital.turnedFireplaceOn;
            if (!flame.visible)
                flame.imageIndex = 0;
        })
        .withCutscene(async () => {
            capital.turnedFireplaceOn = !capital.turnedFireplaceOn;
            if (capital.turnedFireplaceOn) {
                FlameOn.play();
                await show('Turned the fireplace on.');
            }
            else {
                FlameOff.play();
                await show('Turned the fireplace off.');
            }
        })
        .at([12, 123].add(fireplace))
        .show(scene.terrainDecalsStage);
}

const flameTxs = subimageTextures(CapitalFireplaceFlame, 3);