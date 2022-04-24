import {scene} from "../igua/scene";
import {JungleTownArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {FunTimes, JungleInn, JungleMusic, Temple} from "../musics";
import {mirror} from "../gameObjects/mirror";
import {now} from "../utils/now";
import {advanceTempleMovingWall} from "./jungleTemple";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {CracksA, GroundSpeckles, JungleLever} from "../textures";
import {lever} from "../gameObjects/lever";
import {Sprite} from "pixi.js";
import {progress} from "../igua/data/progress";
import {ActivateLever} from "../sounds";
import {approachLinear} from "../utils/math/number";
import {sleep} from "../cutscene/sleep";
import {decalsOf} from "../gameObjects/decal";
import {wallpaper} from "../gameObjects/wallpaper";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";
import {ask} from "../cutscene/ask";
import {oracleAdviceJungle} from "../igua/oracleAdvice";

export function JungleTown() {
    jukebox.play(JungleMusic).warm(FunTimes, JungleInn, Temple);
    scene.backgroundColor = 0x97D8D8;
    scene.ext.jungleTree = { x: 160 };

    scene.terrainColor = 0x79962E;
    const level = applyOgmoLevel(JungleTownArgs);
    mirror(38, 30, 0xB7B7E2, 0xD2D2EC).at([-9, -2].add(level.SignNeonInn)).behind();
    level.WiggleVine.withStep(() => level.WiggleVine.angle = Math.round(Math.sin(now.s * Math.PI)) * 4);
    level.JungleOracle.withCutscene(jungleOracleCutscene);
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0x877856);
    decalsOf(CracksA).forEach(x => x.tint = 0x28340C);
    scene.backgroundGameObjectStage.addChildAt(wallpaper(level.BehindPillar, 0x4B5B1D), 0);
    level.KeyYellowShrunken.asCollectible(progress.flags.jungle.key, 'shrunkenKey', () =>
        cutscene.play(() => show('Found shrunken temple key.')));

    jungleTempleLever().at(level.TempleLever).show();

    const wall = advanceTempleMovingWall(false, true);
    level.JungleTempleExterior.withAsync(async () => {
        while (true) {
            if (wall.isAdvancing) {
                level.JungleTempleExterior.x -= 1;
                await sleep(100);
                level.JungleTempleExterior.x += 1;
            }
            await sleep(100);
        }
    })
}

function jungleTempleLever() {
    const { templeLever } = progress.flags.jungle;
    const offAngle = 45;

    const getTargetAngle = () => templeLever.on ? -offAngle : offAngle;

    const t = subimageTextures(JungleLever, 3);
    const l = lever(t[2], t[1], getTargetAngle())
        .withStep(() => {
            l.angle = approachLinear(l.angle, getTargetAngle(), 5);
        })
        .withInteraction(() => {
            ActivateLever.play();
            templeLever.on = !templeLever.on;
        });
    const s = Sprite.from(t[0]);
    s.anchor.set(0.5, 1);
    l.addChildAt(s, 0);
    return l;
}

async function jungleOracleCutscene() {
    const { oracle } = progress.flags;
    if (!oracle.lore2) {
        oracle.lore2 = true;
        await show(`I see you are on a mission to fix the world.`);
        await show(`I have heard rumors of the great weapon, but I don't believe it is here in the jungle.`);
        await show(`A blessing from the jungle guardian might lead the way.`);
    }

    if (await ask("Would you like some advice?"))
        await oracleAdviceJungle();
    else
        await show("I will be here if you change your mind.");
}