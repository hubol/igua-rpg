import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {BlindHouse, CapitalMusicPlease, MysteryNighttimeHouse, UnbelievableChaos, UnusualOminousMusic} from "../musics";
import {manyCapitalBricks} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {CapitalTownArgs} from "../levelArgs";
import {DisplayObject, filters, Sprite} from "pixi.js";
import {mapRgb} from "../utils/pixi/mapRgb";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {measureCounter} from "../gameObjects/measureCounter";
import {wait} from "../cutscene/wait";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {show, showAll} from "../cutscene/dialog";
import {sparkly} from "../gameObjects/sparkleSmall";
import {sleep} from "../cutscene/sleep";
import {waitHold} from "../cutscene/waitHold";
import {Vibratey} from "../igua/puppet/mods/vibratey";
import {CheckerLooksGood} from "../sounds";
import {progress} from "../igua/data/progress";
import {player} from "../gameObjects/player";
import {cutscene} from "../cutscene/cutscene";
import {capitalBubble} from "../gameObjects/capitalBubble";
import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {animatedSprite} from "../igua/animatedSprite";
import {CapitalAdviceSign, KeyBlue} from "../textures";

export function CapitalTown() {
    scene.pipeStage.style = 2;
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.play(CapitalMusicPlease).warm(BlindHouse, MysteryNighttimeHouse, UnusualOminousMusic, UnbelievableChaos);
    const level = applyOgmoLevel(CapitalTownArgs);

    manyCapitalBricks(
        scene.terrainStage.children.filter(x => x.ext.isBlock),
        makePseudo(287459.32798))
        .show(scene.terrainStage);

    building(level.CapitalBuilding1, 0xA2D6CE, 0xE24F56);
    building(level.ShopBuilding, 0xF07070, 0x5888F0);
    building(level.OracleBuilding, 0xA088F0, 0xF0E840);
    enrichTiming(level);
    enrichStatue(level);
    enrichStorehouse(level);
    enrichOracle(level);
}

function building(d: DisplayObject, walls: number, roof: number) {
    d.filter(mapRgb(new filters.ColorMatrixFilter(), walls, roof));
}

function enrichStorehouse(level: GameObjectsType<typeof CapitalTownArgs>) {
    if (progress.flags.capital.openedStorage)
        level.StorehousePipe.destroy();
}

function enrichOracle(level: GameObjectsType<typeof CapitalTownArgs>) {
    animatedSprite(adviceSignTxs, 0.067).at(level.AdviceSign).show();
    const c = container().at([2, -level.CapitalChimney.height - 5].add(level.CapitalChimney));
    capitalBubble(0, false).show(c);
    c.pivot.set(7, 0);
    c.scale.set(0.25, 0.25);
    c.show();
    capitalBubble.instances.forEach(x => x.tinted(0xf0f0f8));
    if (!progress.flags.capital.turnedFireplaceOn)
        capitalBubble.destroyAll();
}

const adviceSignTxs = subimageTextures(CapitalAdviceSign, 2);

function enrichStatue(level: GameObjectsType<typeof CapitalTownArgs>) {
    const c = level.StatueGuy;

    async function outOfView() {
        await wait(() => isOnScreen(c));
        await wait(() => !isOnScreen(c));
        c.mods.remove(Vibratey);
    }

    c.withAsync(async () => {
        while (true) {
            await outOfView();
            c.duckImmediately();
            await outOfView();
            c.pivot.x += 3;
            c.scale.x = 1;
            c.duckUnit = 0;
            c.isDucking = false;
            await outOfView();
            c.duckImmediately();
            await outOfView();
            c.scale.x = -1;
            c.duckUnit = 0;
            c.isDucking = false;
            c.pivot.x -= 3;
        }
    });

    c.withAsync(async () => {
        while (true) {
            await waitHold(() => !c.mods.has(Vibratey) && isOnScreen(c) && !cutscene.isPlaying, 60 * 5);
            c.mods.add(Vibratey);
        }
    });

    sparkly(c);

    async function normalConversation() {
        await show(`It's a statue...?`);
    }

    async function strugglingConversation() {
        const move = player.walkTo(c.x + 48 * c.scale.x).then(() => player.scale.x = -c.scale.x);
        await show(`It's a statue...!`);
        await sleep(500);
        c.mods.remove(Vibratey);
        c.canBlink = true;
        c.isClosingEyes = true;
        c.isDucking = !c.isDucking;
        c.vspeed = -1.5;
        CheckerLooksGood.play();
        await sleep(500);
        await showAll(`Ah, and I was doing so well!`,
            `I'm Statua.`,
            `I used to run the inn, but when we moved to self-service I had to come up with something to do with my time.`,
            `I'm not an adventurer or oracle so I thought this would work.`);
        await sleep(250);
        c.isDucking = !c.isDucking;
        c.canBlink = false;
        c.isClosingEyes = false;
        await sleep(500);
        if (progress.flags.global.somethingGreatHappened)
            await show(`Anyway, thanks for checking in. Great work on your task! I'm going to get back to mine.`);
        else
            await show(`Anyway, thanks for checking in. Good luck on your task! I'm going to get back to mine.`);
        await move;
    }

    let followUp = 0;

    async function hadStrugglingConversation() {
        if (followUp === 0 || followUp >= 2) {
            await show('...');
            followUp += 1;
        }
        else if (followUp === 1) {
            await show(`...`);
            await show(`My task is to be a statue, remember?`);
            followUp = 2;
        }
    }

    c.withCutscene(() => {
        if (progress.flags.capital.spokeWithStatua)
            return hadStrugglingConversation();
        else if (!c.mods.has(Vibratey))
           return normalConversation();
        else {
            progress.flags.capital.spokeWithStatua = true;
            return strugglingConversation();
        }
    });

    c.canBlink = false;
    c.pivot.y += 2;
}

function enrichTiming(level: GameObjectsType<typeof CapitalTownArgs>) {
    const period = 2;
    const flashStart = period - 2;
    const inactiveStart = period - 1;
    const flashes = 2;

    Sprite.from(KeyBlue).at(level.TimingKeyAnchor).asCollectible(progress.flags.capital.key, 'fromTiming').show();

    const pipe = level.TimingPipe;
    const counter = measureCounter(CapitalMusicPlease, 119).show();

    let jiggle = 0;

    pipe.withStep(() => {
        const m = (counter.measuref * 2) % period;
        const palpha = pipe.alpha;

        pipe.active = m < inactiveStart;
        pipe.visible = pipe.active;
        if (m >= flashStart && m < inactiveStart) {
            const mm = Math.floor((m + (period - flashStart)) * flashes);
            pipe.alpha = 1 - (mm % 2) * 0.33;
        }
        else
            pipe.alpha = 1;

        if (palpha !== pipe.alpha)
            jiggle = 1;
    })
        .withStep(() => {
            pipe.pivot.y = -Math.sign(jiggle);
            jiggle = Math.max(0, jiggle - 0.3);
        });
}