import {scene} from "../igua/scene";
import {FinalTempleInnerArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {Emotion, emoWizard} from "../gameObjects/emoWizard";
import {capitalBricksWall} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {terrainGradient} from "../gameObjects/outerGradient";
import {game} from "../igua/game";
import {cracks} from "../gameObjects/cracks";
import {BLEND_MODES, DisplayObject, filters, Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {approachLinear} from "../utils/math/number";
import {sleep} from "../cutscene/sleep";
import {cutscene} from "../cutscene/cutscene";
import {DialogSpeaker, show, showAll} from "../cutscene/dialog";
import {player} from "../gameObjects/player";
import {BallBounce, CheckerLooksGood, DassMoveUp, Gate, SharpNotice} from "../sounds";
import {move} from "../cutscene/move";
import {jukebox} from "../igua/jukebox";
import {simpleWallSwitch} from "../gameObjects/simpleWallSwitch";
import {ArmTx, dassmann} from "../gameObjects/dassmann";
import {emoWizardBall} from "./emoWizardBall";
import {vnew} from "../utils/math/vector";
import {showBlessingEffect} from "../igua/gameplay/templeLevelUtil";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {PermanentDefeatTracker} from "../gameObjects/permanentDefeatTracker";
import {showCreditsSequence} from "./credits";
import {migrateProgressToNewGamePlus} from "../igua/data/migrateProgressToNewGamePlus";
import {level} from "../igua/level/level";
import {emoClock} from "../gameObjects/emoClock";
import {CreditsMusic, EmoWizard, FinalTempleMusic, TheOfficialEmoWizardSong} from "../musics";
import {lerp} from "../cutscene/lerp";
import {sodaPotAndBurner} from "../gameObjects/sodaPotAndBurner";
import {CrateWooden, EndingSodaBottle, EndingStairs} from "../textures";
import {decalsOf} from "../gameObjects/decal";
import {resolvePipeHorizontal} from "../gameObjects/walls";
import {Hbox} from "../gameObjects/hbox";
import {wait} from "../cutscene/wait";
import {ask} from "../cutscene/ask";


export function FinalTempleInner() {
    scene.backgroundColor = 0x536087;
    scene.terrainColor = 0x000820;
    const level = applyOgmoLevel(FinalTempleInnerArgs);
    jukebox.warm(TheOfficialEmoWizardSong, EmoWizard, FinalTempleMusic);

    capitalBricksWall(level.Shadow.width, level.Shadow.height, makePseudo(2369.1452))
        .at(level.Shadow.x, level.Shadow.y + 20)
        .behind()
        .opaqueTint = 0x405080;

    capitalBricksWall(level.Shadow.width, level.Shadow.height, makePseudo(69.1452))
        .at(level.Shadow.x - 61, level.Shadow.y + 69)
        .behind()
        .opaqueTint = 0x405080;

    cracks(38425.74, 0x405080).behind();

    level.Couch.on('removed', () => !level.CouchPipe.destroyed && level.CouchPipe.destroy());

    hideDeliveredBoxesUntilSomethingGreatHappened(false);
    enrichCutscene(level);

    game.hudStage.ticker.update();
}

export function hideDeliveredBoxesUntilSomethingGreatHappened(createPipes = true) {
    const someBoxesFilter = new filters.ColorMatrixFilter();
    someBoxesFilter.brightness(0.8, true);
    someBoxesFilter.saturate(0.2, true);

    decalsOf(CrateWooden).forEach((crate, i) => {
        if (!progress.flags.global.somethingGreatHappened)
            return crate.hide();

        if (createPipes)
            resolvePipeHorizontal({ x: crate.x, y: crate.y, width: crate.width, visible: false });
        if (i % 2 === 0)
            crate.filter(someBoxesFilter);
    });
}

function enrichCutscene(level: GameObjectsType<typeof FinalTempleInnerArgs>) {
    const deps = makeCutsceneDeps(level);

    if (!progress.flags.final.playerMetEmoWizard)
        return enrichFirstMeeting(deps);

    const deps2 = makeAfterFirstMeetingCutsceneDeps(deps);
    if (progress.flags.global.somethingGreatHappened)
        enrichCompleteFinalQuest(deps2);
    else
        enrichIncompleteFinalQuest(deps2);
}

function enrichIncompleteFinalQuest({ dassmann: d, wizard: e, ...deps }: AfterFirstMeetingCutsceneDeps) {
    jukebox.play(TheOfficialEmoWizardSong);

    scene.gameObjectStage.withAsync(() => seatDassmannOnCouch(deps, d, 0));

    d.withCutscene(() => showAll(
        `He says he needs you to finish your task before I can get my soda.`,
        `I don't know. He works in mysterious ways.`));

    e.withCutscene(async () => {
        await showAll(
            `It looks like my clients are still waiting on the delivery of some units.`,
            `The quicker you fill the receptacles, the quicker you get your reward!!!`);
        if (progress.flags.objects.permanentlyDefeatedEnemies.size < 4)
            await showAll(`You can fill the receptacles using the gift I gave you.`);
    });
}

function enrichCompleteFinalQuest({ level: lvl, wizard, ball, dassmann }: AfterFirstMeetingCutsceneDeps) {
    jukebox.play(TheOfficialEmoWizardSong).warm(CreditsMusic);

    Sprite.from(EndingStairs).at(164, 142).show(scene.gameObjectStage, 0);
    sodaPotAndBurner().at(120, 120).show(scene.gameObjectStage, 0);
    lvl.Couch.destroy();
    wizard.at(174, 144);
    wizard.head.chefHat.visible = true;

    const bottle = Sprite.from(EndingSodaBottle).withStep(() => bottle.at(dassmann.armr.fistWorldPos)).show();
    bottle.anchor.set(0.5, 0.8);

    const wizardPlatform = resolvePipeHorizontal({ x: wizard.x - 10, y: wizard.y, width: 20, visible: false });
    ball.destroy();

    const fadeState = { unit: 0 };
    const dissolve = new Hbox(0, 0, 256, 256, true, 0xffffff)
        .withStep(() => dissolve.alpha = Math.round(fadeState.unit * 10) / 10)
        .show(game.hudStage);
    scene.gameObjectStage.on('removed', () => !dissolve.destroyed && dissolve.destroy());
    dissolve.blendMode = BLEND_MODES.SUBTRACT;

    async function fadeOut(ms: number) {
        jukebox.fadeOut(0, ms);
        await lerp(fadeState, 'unit').to(1).over(ms);
    }

    async function speak(speaker: DisplayObject, message: string, ...additionalMessages: string[]) {
        if (speaker === dassmann)
            dassmann.head.agape = 1;
        DialogSpeaker.value.speaker = speaker;
        await showAll(message, ...additionalMessages);
        DialogSpeaker.value.speaker = undefined;
        if (speaker === dassmann)
            dassmann.head.agape = 0;
    }

    cutscene.play(async () => {
        player.x -= 32;
        player.walkTo(player.x + 32);

        const e = wizard;
        e.autoFacing = 'off';
        e.facing = 1;
        const d = dassmann;
        d.armr.pose = ArmTx.Raise;

        await sleep(500);

        await speak(d, `This is without a doubt your best batch yet.`);
        d.armr.rest().over(250);
        await speak(e, `Aw shucks, thank you!`);

        await sleep(250);
        e.autoFacing = 'player';
        await sleep(250);
        SharpNotice.play();
        e.speed.y = -1;
        await wait(() => e.speed.y === 0 && e.isOnGround);
        e.arms.raise().over(250);
        await speak(e, `Look who's here!`);
        e.arms.lower().over(250);
        wizardPlatform.destroy();

        await wait(() => e.speed.y > 0);
        await wait(() => e.isOnGround);
        await sleep(150);

        await move(e).off(-48, 0).over(750);

        await speak(e,
            `You did it!`,
            `And in exchange for your exceptional work, I am willing to offer you a position as my apprentice.`);

        e.arms.raise().over(250);

        await speak(e, `In this world, you will always need some kind of task.`,
            `So why not create delicious beverages that inspire emotion in others?!`);

        dassmann.gravity = 0.2;
        const bounceDassmann = merge(container(), { go: true }).withAsync(async () => {
            while (true) {
                await wait(() => bounceDassmann.go && d.speed.y === 0 && d.isOnGround);
                d.speed.y = -1;
            }
        })
        bounceDassmann.show();

        d.armr.raise().over(250);
        await speak(d, `Emotion is an understatement!`);
        d.armr.rest().over(250);
        bounceDassmann.go = false;

        DialogSpeaker.value.speaker = e;
        await ask(`What do you say?`, [`Yes`, `Yes`]);
        DialogSpeaker.value.speaker = undefined;

        e.arms.lower().over(250);
        e.isCrouching = true;
        await wait(() => e.dress.crouchUnit >= 1);
        e.isCrouching = false;
        await sleep(100);
        e.arms.raise().over(250);
        e.speed.y = -3;
        await wait(() => e.speed.y > 0);
        await speak(e, `Yahoo!`);

        await fadeOut(5000);
        await sleep(500);
        await showCreditsSequence();
        await sleep(1000);
        migrateProgressToNewGamePlus();
        level.goto(progress.levelName);
    });
}

function enrichFirstMeeting({ light, level, wizard: e, ball, ...deps }: CutsceneDeps) {
    jukebox.stop().warm(TheOfficialEmoWizardSong);
    player.x -= 24;
    const hide = container().withStep(() => player.visible = false).show();

    cutscene.play(async () => {
        e.isCrouching = true;
        e.facing = 1;
        e.autoFacing = 'player';
        e.autoEmote = true;

        await deps.sitOnCouch(e, 0);

        await sleep(125);
        Gate.play();
        hide.destroy();

        await sleep(1000);
        await showAll(
            `Oh!`,
            `Is someone there?`,
            `I thought I would be trapped forever...`);
        await sleep(1000);
        await showAll(
            `Can you do me a favor?`,
            `There should be a light switch on the wall...`,
            `It should just be a few steps in front of you...`);
        await sleep(250);
        await player.walkTo(player.x + 38);
        await sleep(500);
        player.vspeed = -1.4;
        await sleep(200);
        CheckerLooksGood.play();
        light.lit = true;
        await sleep(1333);

        await showAll(`Thank you.`,
            `At some point, I got bored and started bouncing a ball.`,
            `It hit the light switch and I had just been in the dark ever since.`);

        e.isCrouching = false;
        await deps.getOffCouch(e);
        jukebox.play(TheOfficialEmoWizardSong);
        await sleep(500);
        await move(e).off(-48, 0).over(750);

        e.autoEmote = false;
        e.arms.raise().over(170);
        await e.say(`Uh, but I am the wizard of emotion.`, Emotion.Cool);
        e.arms.lower().over(250);
        await e.say(`I really appreciate your coming here. I know it was not easy.`, Emotion.Happy);
        await e.say(`Everyone is expecting you to find a weapon?`, Emotion.Shocked);
        await e.say(`Well, it's not here. That thing broke a long time ago. And no one alive can repair it.`, Emotion.Sad);
        await e.say(`Indeed, repairing weapons is way outside of my wheelhouse.`, Emotion.Dead);
        await e.say(`Instead, my strongest abilities are establishing interstellar trade deals and producing refreshing drinks.`, Emotion.Cool);
        e.autoEmote = true;

        await sleep(250);
        DassMoveUp.play();
        await sleep(125);
        await show(`Did someone say refreshing drinks?!`);

        await sleep(250);
        Gate.play();
        await sleep(60);
        const d = dassmann().at([20, 32].add(level.Door)).show();
        d.body.playFootsteps = true;
        d.expression.facing = 'off';
        d.head.face = 1;
        d.body.face = 1;

        ball.register(d, vnew());

        DialogSpeaker.value.speaker = d;
        await sleep(1000);
        d.head.agape = 1;
        await show(`I have been looking all over for you!`);
        d.head.agape = 0;

        e.autoFacing = 'off';
        ball.index = ball.parent.children.length - 1;
        await Promise.all([
            move(d).off(83, 0).over(750).then(() => ball.index = level.Door.index + 1),
            sleep(400).then(() => move(e).off(20, 0).over(350))
        ]);
        e.autoFacing = 'direction';

        await sleep(250);
        d.head.agape = 1;
        await show(`I've come to pick up the newest batch.`);
        d.head.agape = 0;

        DialogSpeaker.value.speaker = e;
        await showAll(`Eh? Oh. I completely forgot about all of my arrangements.`,
            `I've been stuck in the vault for so long...`,
            `Um... I can get you what you need. Just give me a little time to sort things out.`,
            `I have a feeling I've neglected some other deals, too...`);

        DialogSpeaker.value.speaker = d;
        d.armr.raise().over(170);
        d.head.agape = 1;
        await show(`The other guys are here, too, you know.`);
        d.head.agape = 0;
        d.armr.rest().over(130);

        DialogSpeaker.value.speaker = e;
        await show(`Oh... then that explains why I'm being asked for a weapon.`);

        e.index = d.index;
        await Promise.all([
            move(e).off(-60, 0).over(900),
            sleep(400)
                .then(() => player._forceWalkAnimation = 2)
                .then(() => d.expression.facing = 'auto')
                .then(() => move(player).off(-28, 0).over(350))
                .then(() => player._forceWalkAnimation = 0),
        ]);

        await sleep(250);
        e.isCrouching = true;

        scene.gameObjectStage.withAsync(async () => {
            await sleep(250);
            await seatDassmannOnCouch(deps, d);
        })

        await showAll(`Listen. The reason you can't defeat them is you need to give them what they were promised.`);

        e.isCrouching = false;
        await sleep(250);
        await showAll(`They are just stupid receptacles. I will give you the power to fill them. Once they are satisfied, you just give them a little push and they will be on their way.`);

        jukebox.fadeOut(0, 500);
        await e.arms.raise().over(250);
        await sleep(500);

        const v = getWorldCenter(e);
        DialogSpeaker.value.speaker = undefined;

        progress.flags.final.playerMetEmoWizard = true;
        progress.flags.final.enemiesCanBePermanentlyDefeated = true;
        progress.levels.humor += 1;
        await showBlessingEffect(v.x, v.y, 'Blessing of Emotion');

        jukebox.fadeIn(0, 1000);

        e.arms.lower().over(250);
        await sleep(1000);

        DialogSpeaker.value.speaker = e;
        await show(`Thank you for doing this errand for me. Please return when the terms of the deal are upheld and we can discuss a reward for you.`);

        if (progress.levels.humor === 1) {
            await sleep(1000);

            DialogSpeaker.value.speaker = undefined;
            await show(`You can now press Q to cast a spell.`)
        }

        PermanentDefeatTracker.value.showFrames = 120;
    });
}

async function seatDassmannOnCouch(deps: Pick<CutsceneDeps, 'sitOnCouch'>, d: ReturnType<typeof dassmann>, timeScale = 1) {
    const bootPromise = lerp(d.body, 'bootPivotYOffset').to(2).over(250 * timeScale);
    await deps.sitOnCouch(d, 1.2 * timeScale);
    d.body.feetFace = -1;
    d.armr.pose = ArmTx.Tpose;
    await bootPromise;
}

function makeCutsceneDeps(level: GameObjectsType<typeof FinalTempleInnerArgs>) {
    const clock = emoClock().at(128, 114).behind();
    const wizard = emoWizard().at(level.EmoWizardInitial).show();
    const light = enrichLight(level).show();

    const ball = emoWizardBall().at(wizard.x - 64, wizard.y)
        .withStep(() => ball.alpha = Math.round(light.lightUnit * 4) / 4)
        .show();

    ball.register(player, vnew());

    async function sitOnCouch(d: DisplayObject, timeScale = 1) {
        const isDassmann = d !== wizard;
        const couchX = level.Couch.x + (isDassmann ? 16 : 14);
        const pivotY = isDassmann ? 4 : 6;

        await lerp(d, 'x').to(couchX).over(500 * timeScale);
        await sleep(200 * timeScale);
        await lerp(d.pivot, 'y').to(pivotY).over(100 * timeScale);
    }

    async function getOffCouch(d: DisplayObject) {
        await lerp(d.pivot, 'y').to(0).over(250);
        // @ts-ignore
        BallBounce.rate(0.75).play();
    }

    return {
        clock,
        level,
        wizard,
        light,
        ball,
        sitOnCouch,
        getOffCouch
    };
}

type CutsceneDeps = ReturnType<typeof makeCutsceneDeps>;

function makeAfterFirstMeetingCutsceneDeps(deps: CutsceneDeps) {
    deps.light.lit = true;
    deps.light.lightUnit = 0.3;
    deps.wizard.x = 128;
    deps.wizard.autoEmote = true;
    deps.wizard.autoFacing = 'player';
    const myDassmann = dassmann().at([160, 32].add(deps.level.Door)).show();

    return {
        ...deps,
        dassmann: myDassmann,
    }
}

type AfterFirstMeetingCutsceneDeps = ReturnType<typeof makeAfterFirstMeetingCutsceneDeps>;

const terrainColors = [0x182840, 0x102038, 0x081830, 0x001028].reverse();

function enrichLight(level: GameObjectsType<typeof FinalTempleInnerArgs>) {
    const b = scene.terrainColor;
    const c = terrainColors;

    const switchObj = simpleWallSwitch(() => !q.lit)
        .at(105 + 16, 150)
        .behind();

    new Graphics()
        .beginFill(scene.backgroundColor)
        .drawRect(switchObj.x - 1, switchObj.y - 1, switchObj.width + 2, switchObj.height + 2)
        .behind(switchObj.index);

    const steps = [
        new Graphics().beginFill(0).drawRect(0, 0, 256, 256).show(),
        new Graphics().beginFill(0, 0.5).drawRect(0, 0, 256, 256).show(),
        terrainGradient([ level.Shadow ], [b, b, b, c[0]]),
        terrainGradient([ level.Shadow ], [b, b, c[0], c[1]]),
        terrainGradient([ level.Shadow ], [b, c[0], c[1], c[2]]),
        terrainGradient([ level.Shadow ], [...c]),
    ];

    let light = 0;

    const q = merge(container(), { lit: false, get lightUnit() { return light; }, set lightUnit(value) { light = value; } })
        .withStep(() => {
            light = approachLinear(light, q.lit ? 1 : 0, 0.03);
            steps.forEach(x => x.visible = false);
            const index = Math.round(light * (steps.length - 1));
            steps[index].visible = true;
        });

    return q;
}