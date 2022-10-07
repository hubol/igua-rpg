import {scene} from "../igua/scene";
import {CapitalEntryArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {heatWaves} from "../gameObjects/heatWaves";
import {cracks} from "../gameObjects/cracks";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {decalsOf} from "../gameObjects/decal";
import {CapitalVolcanoBackdrop, GroundSpeckles} from "../textures";
import {terrainGradient} from "../gameObjects/outerGradient";
import {region} from "../gameObjects/region";
import {AmbientLava} from "../musics";
import {keyChain} from "../gameObjects/keyChain";
import {progress} from "../igua/data/progress";
import {manyCapitalBricks} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {freezeSceneAndShowMessage} from "../cutscene/freezeSceneAndShowMessage";
import {game} from "../igua/game";

export function CapitalEntry() {
    scene.backgroundColor = 0xF0C8D0;
    scene.terrainColor = 0xF0B020;
    jukebox.stop().warm(AmbientLava);
    const level = applyOgmoLevel(CapitalEntryArgs);
    enrichVolcanoTransition(level);
    enrichSharpClownWithKey(level);

    manyCapitalBricks(
        scene.terrainStage.children.filter(x => x.ext.isBlock && getWorldBounds(x).x < 256),
        makePseudo(387459.92793))
    .show(scene.terrainStage);

    level.Sign.interactFn = () => freezeSceneAndShowMessage(level.Sign.message);
    game.hudStage.ticker.update();
}

function enrichSharpClownWithKey(level: GameObjectsType<typeof CapitalEntryArgs>) {
    if (progress.flags.capital.key.fromClown)
        return;
    level.SharpWithKey.addChild(keyChain().at(7, -4));
}

function enrichVolcanoTransition(level: GameObjectsType<typeof CapitalEntryArgs>) {
    const drop = level.CapitalVolcanoBackdrop;
    decalsOf(CapitalVolcanoBackdrop).forEach(x => x.tinted(0x78917D));

    cracks(3789.8267, 0x481018, drop.width, drop.height)
        .at(drop)
        .behind(1)
        .add(26, 12);

    const waves = heatWaves(drop.width + 30, 80)
        .at([-110, 110].add(drop))
        .behind();
    waves.angle = -8;

    const transitions = region.instances;
    const colors = [0xE89830, 0xD87838, 0xB85038, 0x912235];
    terrainGradient(transitions, colors);

    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x6D1913));

    const bgWaves = heatWaves(scene.width + 256, 80, -0.33, 0x912235)
        .at(-128, level.CapitalVolcanoBackdrop_1.y + 40)
        .show(scene.parallax1Stage);

    bgWaves.scale.x = 1.33;
    bgWaves.angle = -8;
}