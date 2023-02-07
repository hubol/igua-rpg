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
import {Graphics} from "pixi.js";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {approachLinear} from "../utils/math/number";
import {sleep} from "../cutscene/sleep";
import {cutscene} from "../cutscene/cutscene";
import {DialogSpeaker, show, showAll} from "../cutscene/dialog";
import {player} from "../gameObjects/player";
import {CheckerLooksGood, DassMoveUp, Gate} from "../sounds";
import {move} from "../cutscene/move";
import {jukebox} from "../igua/jukebox";
import {simpleWallSwitch} from "../gameObjects/simpleWallSwitch";
import {dassmann} from "../gameObjects/dassmann";
import {emoWizardBall} from "./emoWizardBall";
import {vnew} from "../utils/math/vector";
import {showBlessingEffect} from "../igua/gameplay/templeLevelUtil";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {PermanentDefeatTracker} from "../gameObjects/permanentDefeatTracker";
import {derivedProgress} from "../igua/gameplay/derivedStats";
import {showCreditsSequence} from "./credits";
import {migrateProgressToNewGamePlus} from "../igua/data/migrateProgressToNewGamePlus";
import {level} from "../igua/level/level";
import {emoClock} from "../gameObjects/emoClock";

export function FinalTempleInner() {
    scene.backgroundColor = 0x536087;
    scene.terrainColor = 0x000820;
    const level = applyOgmoLevel(FinalTempleInnerArgs);

    capitalBricksWall(level.Shadow.width, level.Shadow.height, makePseudo(2369.1452))
        .at(level.Shadow.x, level.Shadow.y + 20)
        .behind()
        .opaqueTint = 0x405080;

    capitalBricksWall(level.Shadow.width, level.Shadow.height, makePseudo(69.1452))
        .at(level.Shadow.x - 61, level.Shadow.y + 69)
        .behind()
        .opaqueTint = 0x405080;

    cracks(38425.74, 0x405080).behind();

    emoClock().at(128, 114).behind();

    enrichCutscene(level);

    game.hudStage.ticker.update();
}

function enrichCutscene(level: GameObjectsType<typeof FinalTempleInnerArgs>) {
    const deps = makeCutsceneDeps(level);

    if (!progress.flags.final.playerMetEmoWizard)
        return enrichFirstMeeting(deps);

    const deps2 = makeAfterFirstMeetingCutsceneDeps(deps);
    if (derivedProgress.permanentlyDefeatedRequiredEnemies)
        enrichCompleteFinalQuest(deps2);
    else
        enrichIncompleteFinalQuest(deps2);
}

function enrichIncompleteFinalQuest({ dassmann: d, wizard: e }: AfterFirstMeetingCutsceneDeps) {
    d.withCutscene(() => showAll(
        `He says he needs you to finish your task before I can get my soda.`,
        `I don't know. He works in mysterious ways.`));

    e.withCutscene(() => showAll(
        `It looks like my clients are still waiting on the delivery of some units.`,
        `The quicker you fill the receptacles, the quicker you get your reward!!!`));
}

function enrichCompleteFinalQuest({}: AfterFirstMeetingCutsceneDeps) {
    cutscene.play(async () => {
        await sleep(500);
        await showCreditsSequence();
        migrateProgressToNewGamePlus();
        level.goto(progress.levelName);
    });
}

function enrichFirstMeeting({ light, level, wizard: e, ball }: CutsceneDeps) {
    jukebox.stop();
    player.x -= 24;
    const hide = container().withStep(() => player.visible = false).show();

    cutscene.play(async () => {
        e.isCrouching = true;
        e.facing = 1;
        e.autoFacing = 'off';
        e.head.away = true;
        e.autoEmote = true;

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
        await sleep(500);
        e.isCrouching = false;
        await sleep(200);
        e.head.away = false;
        await sleep(200);
        e.facing = -1;
        await sleep(1000);

        await showAll(`Thank you.`,
            `At some point, I got bored and started bouncing a ball.`,
            `It hit the light switch and I had just been in the dark ever since.`);

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
        await show(`I have been looking all over for you!`);

        e.autoFacing = 'off';
        await Promise.all([
            move(d).off(83, 0).over(750),
            sleep(400).then(x => move(e).off(20, 0).over(350))
        ]);
        e.autoFacing = 'direction';

        await sleep(250);
        await show(`I've come to pick up the newest batch.`);

        DialogSpeaker.value.speaker = e;
        await showAll(`Eh? Oh. I completely forgot about all of my arrangements.`,
            `I've been stuck in the vault for so long...`,
            `Um... I can get you what you need. Just give me a little time to sort things out.`,
            `I have a feeling I've neglected some other deals, too...`);

        DialogSpeaker.value.speaker = d;
        d.armr.raise().over(170);
        await show(`The other guys are here, too, you know.`);
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

        await showAll(`Listen. The reason you can't defeat them is you need to give them what they were promised.`);

        e.isCrouching = false;
        await sleep(250);
        await showAll(`They are just stupid receptacles. I will give you the power to fill them. Once they are satisfied, you just give them a little push and they will be on their way.`);

        await e.arms.raise().over(250);
        await sleep(500);

        const v = getWorldCenter(e);
        DialogSpeaker.value.speaker = undefined;

        progress.flags.final.playerMetEmoWizard = true;
        progress.flags.final.enemiesCanBePermanentlyDefeated = true;
        progress.levels.humor += 1;
        await showBlessingEffect(v.x, v.y, 'Blessing of Emotion');

        e.arms.lower().over(250);
        await sleep(250);

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

function makeCutsceneDeps(level: GameObjectsType<typeof FinalTempleInnerArgs>) {
    const wizard = emoWizard().at(level.EmoWizardInitial).show();
    const light = enrichLight(level).show();

    const ball = emoWizardBall().at(wizard.x - 64, wizard.y)
        .withStep(() => ball.alpha = Math.round(light.lightUnit * 4) / 4)
        .ahead();

    ball.register(player, vnew());

    return {
        level,
        wizard,
        light,
        ball
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