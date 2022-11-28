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
import {BallonPop} from "../sounds";

export function UnrealQuiz() {
    scene.backgroundColor = 0xE0C8D8;
    scene.terrainColor = 0x8058D0;
    const level = applyOgmoLevel(UnrealQuizArgs);

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
}

function hideProctor(level: GameObjectsType<typeof UnrealQuizArgs>) {
    BallonPop.play();
    const w = whiten(level.NpcIguana);
    level.NpcIguana.withStep(() => {
        w.factor = approachLinear(w.factor, 1, 0.03);
        level.NpcIguana.scale.y = approachLinear(level.NpcIguana.scale.y, 0, 0.03);
        level.NpcIguana.scale.x = Math.sign(level.NpcIguana.scale.x) * level.NpcIguana.scale.y;
    });
}

async function win(level: GameObjectsType<typeof UnrealQuizArgs>) {
    hideProctor(level);
    bigKeyPiece(progress.flags.capital.bigKey, capitalBigKeyTextures[2], 'piece3').at(128, 128).show();
}

async function lose(level: GameObjectsType<typeof UnrealQuizArgs>) {
    hideProctor(level);

    scene.gameObjectStage.withAsync(async () => {
        while (true) {
            for (let x = 256; x > 0; x -= 16) {
                spikeBounce().at(x, 0).show();
                await sleep(125);
            }
            for (let x = 0; x < 256; x += 16) {
                spikeBounce().at(x, 0).show();
                await sleep(125);
            }
        }
    })
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