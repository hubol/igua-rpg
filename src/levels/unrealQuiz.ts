import {scene} from "../igua/scene";
import {UnrealQuizArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {Graphics} from "pixi.js";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {cutscene} from "../cutscene/cutscene";
import {quiz} from "../cutscene/quiz";
import {sleep} from "../cutscene/sleep";
import {show} from "../cutscene/dialog";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {whiten} from "../utils/pixi/whiten";
import {lerp} from "../cutscene/lerp";
import {approachLinear} from "../utils/math/number";
import {spikeBounce} from "../gameObjects/spikeBounce";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {capitalBigKeyTextures} from "./capitalTemple";
import {BallonPop, ClownExplode, SharpStep, VileStepR} from "../sounds";
import {container} from "../utils/pixi/container";
import {rng} from "../utils/math/rng";
import {player} from "../gameObjects/player";
import {confetti} from "../gameObjects/confetti";
import {smallPop} from "../gameObjects/smallPop";
import {move} from "../cutscene/move";
import {decalsOf} from "../gameObjects/decal";
import {CapitalUnrealQuestion} from "../textures";
import {now} from "../utils/now";
import {jukebox} from "../igua/jukebox";
import {UnrealQuizMusic} from "../musics";

export function UnrealQuiz() {
    scene.backgroundColor = 0xE0C8D8;
    scene.terrainColor = 0x8058D0;
    const level = applyOgmoLevel(UnrealQuizArgs);
    jukebox.play(UnrealQuizMusic);

    [level.Block, level.Block_1].forEach(x =>
        new Graphics().beginFill(0xE0E020).drawEllipse(x.width / 2, 0, x.width / 2, 6).at(getWorldBounds(x)).show(scene.terrainDecalsStage));

    cutscene.play(async () => {
        const [ correctAnswers, totalQuestions ] = await doQuiz();
        await show(`You got ${correctAnswers} out of ${totalQuestions} questions correct. You needed a perfect score to pass.`);
        if (correctAnswers < totalQuestions)
            await lose(level);
        else
            await win(level);
    });

    decalsOf(CapitalUnrealQuestion).forEach((x, i) => {
        x.alpha = 1 - (x.y / 256);
        x.withStep(() => x.pivot.y = Math.abs(Math.sin(now.s * Math.PI * 0.5 + i)))
    })
}

function hideProctor(level: GameObjectsType<typeof UnrealQuizArgs>) {
    BallonPop.play();
    const w = whiten(level.NpcIguana);
    level.NpcIguana.canBlink = false;
    level.NpcIguana.withStep(() => {
        w.factor = approachLinear(w.factor, 1, 0.03);
        level.NpcIguana.scale.y = approachLinear(level.NpcIguana.scale.y, 0, 0.03);
        level.NpcIguana.scale.x = Math.sign(level.NpcIguana.scale.x) * level.NpcIguana.scale.y;
    });
}

async function win(level: GameObjectsType<typeof UnrealQuizArgs>) {
    hideProctor(level);

    const spirit = container().at(level.NpcIguana)
        .withAsync(async () => {
            while (true) {
                await sleep(66);
                smallPop().at(rng.unitVector.scale(6).add(spirit));
            }
        })
        .withAsync(async () => {
            let rate = 1.2;
            while (true) {
                // @ts-ignore
                SharpStep.rate(rate).play();
                rate += 0.1;
                await sleep(127);
            }
        })
        .show();

    await move(spirit).to(127, 119).over(500);
    ClownExplode.play();
    confetti().at(spirit).show();
    spirit.destroy();
    await sleep(66);
    bigKeyPiece(progress.flags.capital.bigKey, capitalBigKeyTextures[2], 'piece3').at(80, 100).show(scene.gameObjectStage, 0);
}

async function lose(level: GameObjectsType<typeof UnrealQuizArgs>) {
    const playerX = player.x;
    hideProctor(level);
    const c = container().at(level.NpcIguana.x, 0).show();

    scene.gameObjectStage.withAsync(async () => {
        while (true) {
            VileStepR.play();
            spikeBounce().at([rng.polar * 12, 0].add(c)).show();
            await sleep(66);
        }
    })
    .withAsync(async () => {
        await sleep(500);
        await lerp(c, 'x').to(playerX).over(1500);
    });
}

async function doQuiz() {
    let questions = 0;
    let correctAnswers = 0;

    async function question(...args: Parameters<typeof quiz>) {
        const [title, ...rest] =  args;
        questions += 1;
        const correct = await quiz(`Question ${questions}.
${title}`,
            ...rest);
        if (correct)
            correctAnswers += 1;
        await sleep(500);
    }

    await sleep(500);
    await show(`Welcome to this place. I will ask you multiple questions.`);
    await show(`At the end of the quiz, you will receive your score.`);
    await sleep(500);
    await question(`What is the name of the knight of the volcano clan?`,
        2,
        'Bigua',
        'Prankster',
        'Iguard');
    await question(`How many big keys are there in total?`,
        0,
        '4',
        '5',
        '6');
    await question(`When the 4 big keys are collected, what do the oracles say will be found?`,
        1,
        'A great treasure',
        'A great weapon',
        'A hidden fortress');
    await question(`The space angel is looking for...`,
        1,
        'The strange man',
        'The dark haired guy',
        'The unusual boy');

    return [ correctAnswers, questions ];
}