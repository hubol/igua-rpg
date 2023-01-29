import {scene} from "../igua/scene";
import {FinalTempleInnerArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {emoWizard} from "../gameObjects/emoWizard";
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
import {show, showAll} from "../cutscene/dialog";
import {player} from "../gameObjects/player";
import {ActivateLever} from "../sounds";

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

    enrichCutscene(level);

    game.hudStage.ticker.update();
}

function enrichCutscene(level: GameObjectsType<typeof FinalTempleInnerArgs>) {
    emoWizard().at(level.EmoWizardInitial).show();
    const light = enrichLight(level).show();

    player.x -= 24;

    cutscene.play(async () => {
        await sleep(500);
        await showAll(
            `Oh!`,
            `Is someone there?`,
            `I thought I would be trapped forever...`);
        await sleep(500);
        await showAll(
            `Can you do me a favor?`,
            `There should be a light switch on the wall...`,
            `It should just be a few steps in front of you...`);
        await sleep(250);
        await player.walkTo(player.x + 36);
        await sleep(250);
        player.vspeed = -1;
        await sleep(200);
        ActivateLever.play();
        light.lit = true;
    })
}

const terrainColors = [0x182840, 0x102038, 0x081830, 0x001028].reverse();

function enrichLight(level: GameObjectsType<typeof FinalTempleInnerArgs>) {
    const b = scene.terrainColor;
    const c = terrainColors;

    const steps = [
        new Graphics().beginFill(0).drawRect(0, 0, 256, 256).show(),
        new Graphics().beginFill(0, 0.5).drawRect(0, 0, 256, 256).show(),
        terrainGradient([ level.Shadow ], [b, b, b, c[0]]),
        terrainGradient([ level.Shadow ], [b, b, c[0], c[1]]),
        terrainGradient([ level.Shadow ], [b, c[0], c[1], c[2]]),
        terrainGradient([ level.Shadow ], [...c]),
    ];

    let light = 0;

    const q = merge(container(), { lit: false })
        .withStep(() => {
            light = approachLinear(light, q.lit ? 1 : 0, 0.03);
            steps.forEach(x => x.visible = false);
            const index = Math.round(light * (steps.length - 1));
            steps[index].visible = true;
        });

    return q;
}