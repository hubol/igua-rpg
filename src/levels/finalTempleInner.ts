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

    emoWizard().at(level.EmoWizardInitial).show();
    enrichShadowBox(level);

    game.hudStage.ticker.update();
}

function enrichShadowBox(level: GameObjectsType<typeof FinalTempleInnerArgs>) {
    const terrainColors = [0x182840, 0x102038, 0x081830, 0x001028].reverse();
    terrainGradient([ level.Shadow ], terrainColors);
}