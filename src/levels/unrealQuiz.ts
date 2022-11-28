import {scene} from "../igua/scene";
import {UnrealQuizArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {Graphics} from "pixi.js";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {cutscene} from "../cutscene/cutscene";
import {quiz} from "../cutscene/quiz";
import {sleep} from "../cutscene/sleep";
import {show} from "../cutscene/dialog";

export function UnrealQuiz() {
    scene.backgroundColor = 0xE0C8D8;
    scene.terrainColor = 0x8058D0;
    const level = applyOgmoLevel(UnrealQuizArgs);

    [level.Block, level.Block_1].forEach(x =>
        new Graphics().beginFill(0xE0E020).drawEllipse(x.width / 2, 0, x.width / 2, 6).at(getWorldBounds(x)).show(scene.terrainDecalsStage));

    cutscene.play(doQuiz);

    async function doQuiz() {
        await sleep(500);
        await show(`Welcome to this place. I will ask you multiple questions.`);
        await show(`At the end of the quiz, you will receive your score.`);
        await sleep(500);
        await quiz(`What is the name of the knight of the volcano clan?`,
            2,
            'Bigua',
            'Prankster',
            'Iguard');
    }
}