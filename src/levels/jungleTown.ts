import {scene} from "../igua/scene";
import {JungleTownArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {FunTimes, JungleInn, JungleMusic, Temple} from "../musics";
import {mirror} from "../gameObjects/mirror";
import {now} from "../utils/now";
import {advanceTempleMovingWall} from "./jungleTemple";
import {CracksA, GroundSpeckles, JungleLever} from "../textures";
import {leverOpinionated} from "../gameObjects/lever";
import {Sprite} from "pixi.js";
import {progress} from "../igua/data/progress";
import {ActivateLever, SpiderDown, SpiderUp} from "../sounds";
import {approachLinear} from "../utils/math/number";
import {sleep} from "../cutscene/sleep";
import {decalsOf} from "../gameObjects/decal";
import {wallpaper} from "../gameObjects/wallpaper";
import {cutscene} from "../cutscene/cutscene";
import {show, showAll} from "../cutscene/dialog";
import {ask} from "../cutscene/ask";
import {oracleAdviceJungle} from "../igua/oracleAdvice";
import {npc} from "../gameObjects/npc";
import {rectangleDistance} from "../utils/math/rectangleDistance";
import {player} from "../gameObjects/player";
import {wait} from "../cutscene/wait";
import {blessingStone} from "../gameObjects/blessingStone";
import {makeIguanaPuppetArgsFromLooks} from "../igua/looks/makeIguanaPuppetArgsFromLooks";
import {JungleOracleLooks} from "../gameObjects/npcLooks";
import {iguanaHead} from "../igua/puppet/iguanaPuppet";
import {Blinking} from "../pixins/blinking";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {DestroyBeforeGreatness} from "../pixins/destroyByGreatness";
import {biguaInJungle} from "../gameObjects/biguaInJungle";

function jungleTownLevel() {
    return applyOgmoLevel(JungleTownArgs);
}

export function JungleTown() {
    jukebox.play(JungleMusic).warm(FunTimes, JungleInn, Temple);
    scene.backgroundColor = 0x97D8D8;
    scene.ext.jungleTree = { x: 192 };

    scene.terrainColor = 0x79962E;
    const level = jungleTownLevel();
    mirror(38, 30, 0xB7B7E2, 0xD2D2EC).at([-9, -2].add(level.SignNeonInn)).behind();
    level.WiggleVine.withStep(() => level.WiggleVine.angle = Math.round(Math.sin(now.s * Math.PI)) * 4);

    if (progress.flags.final.oraclesLearnedTruth) {
        level.JungleOracle.destroy();
        enrichOracleTentAfterLeaningTruth(level.JungleTent);
    }
    else {
        level.JungleOracle.withCutscene(jungleOracleCutscene);
    }

    decalsOf(GroundSpeckles).forEach(x => x.tint = 0x877856);
    decalsOf(CracksA).forEach(x => x.tint = 0x28340C);
    scene.backgroundGameObjectStage.addChildAt(wallpaper(level.BehindPillar, 0x4B5B1D), 0);
    level.KeyYellowShrunken.asCollectible(progress.flags.jungle.key, 'shrunkenKey', () =>
        cutscene.play(() => show('Found shrunken temple key.')));

    blessingStone(level.NgBlessingJungle, 2, progress.flags.jungle.bigKey, 'Blessing of Jungle');

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

    if (!progress.flags.jungle.usedBlessing && progress.flags.jungle.bigKey.reward)
        treeSpirit(level);

    enrichBigua(level);
}

function enrichBigua(level: GameObjectsType<typeof JungleTownArgs>) {
    biguaInJungle().at([0, -1].add(level.Bigua)).withPixin(DestroyBeforeGreatness).show();
}

function enrichOracleTentAfterLeaningTruth(tent: Sprite) {
    let count = 0;
    tent.withCutscene(async () => {
        if (count === 0 || count > 2) {
            await show('...');
        }
        else if (count === 1) {
            await showAll(`...`,
                `Please go away.`);
        }
        else if (count === 2) {
            await player.walkTo(tent.x - 48);
            player.scale.x = 1;
            await sleep(500);
            const args = makeIguanaPuppetArgsFromLooks(JungleOracleLooks);
            SpiderUp.play();
            const head = iguanaHead(args).at([0, 4].add(tent))
                .withPixin(Blinking())
                .withStep(() => {
                    (args.eyes as any).closedUnit = head.blink;
                })
                .show();
            head.scale.x = -1;
            await sleep(1000);

            await showAll(`Oh, it's you.`,
                `Sorry, I don't really want to talk right now.`,
                `I am angry at myself... I regret listening to the high oracle.`,
                `I gave away my possessions and ostracized my comrades in the name of our beliefs.`);

            if (progress.flags.global.somethingGreatHappened) {
                await showAll(`But I'm glad that you could still fix the world, despite our flawed guidance.`);
            }
            else {
                await showAll(`I feel helpless in fixing the world now. I don't know the way forward.`,
                    `If the great weapon were real, I would know exactly how to proceed, but...`,);
                await sleep(1000);
                await showAll(`Anyway, I'm sure the others feel similarly.`,
                    `I will just have to grieve for a bit.`);
            }

            await sleep(500);
            SpiderDown.play();
            head.destroy();
        }

        count += 1;
    })
}

function jungleTempleLever() {
    const { templeLever } = progress.flags.jungle;

    return leverOpinionated(JungleLever, () => templeLever.on)
        .withInteraction(() => {
            ActivateLever.play();
            templeLever.on = !templeLever.on;
        });
}

async function jungleOracleCutscene() {
    const { oracle } = progress.flags;
    if (!oracle.lore2) {
        oracle.lore2 = true;
        await show(`I see you are on a mission to fix the world.`);
        await show(`I am aware of the existence of the great weapon, but I don't believe it is here in the jungle.`);
        await show(`A blessing from the jungle guardian might lead the way.`);
    }

    if (await ask("Would you like some advice?"))
        await oracleAdviceJungle();
    else
        await show("I will be here if you change your mind.");
}

function treeSpirit(level: ReturnType<typeof jungleTownLevel>) {
    const n = npc(0, 0, 15).at([0, -2].add(level.SpiritSpawn)).show();
    n.canBlink = false;
    n.ext.opaqueAlpha = 0.75;

    const stump = level.HolyStump;

    n.withStep(() => {
        n.ext.opaqueAlpha = approachLinear(n.ext.opaqueAlpha, stump.playerIsOn ? 0 : 0.75, 0.05);
        n.opaqueTint = 0x59771B;
    });

    n.engine.walkSpeed = 3;

    n.scale.x = -1;
    n.withAsync(async () => {
        await wait(() => rectangleDistance(n, player) < 8 && player.hspeed === 0 && player.vspeed === 0);
        await n.walkTo(n.x - 256);
        await wait(() => player.x < n.x + 24);
        await n.walkTo(stump.x + 40);
        await wait(() => player.x < n.x + 24);
        n.vspeed = -2;
        await n.walkTo(stump.x);
        await wait(() => n.vspeed === 0);
        await sleep(250);
        n.isDucking = true;
    })
}