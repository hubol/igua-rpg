import {scene} from "../igua/scene";
import {FinalClimbArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {progress} from "../igua/data/progress";
import {Sprite} from "pixi.js";
import {CapitalBrickWall, CracksA, CrackSmall, GroundSpeckles} from "../textures";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {decalsOf} from "../gameObjects/decal";
import {cracks} from "../gameObjects/cracks";
import {forceRenderable} from "../igua/forceRenderable";
import {game} from "../igua/game";
import {container} from "../utils/pixi/container";
import {jukebox} from "../igua/jukebox";
import {EmoWizard} from "../musics";

export function FinalClimb() {
    scene.backgroundColor = 0x182840;
    scene.terrainColor = 0x4868a0;
    jukebox.play(EmoWizard);
    const level = applyOgmoLevel(FinalClimbArgs);
    enrichObstacle(level);
    applyFinalFilters();
}

export function applyFinalFilters(seed = 38.1269 * (scene.name?.length ?? 1)) {
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x304888));
    decalsOf(CrackSmall).forEach(x => x.tinted(0x304888));
    decalsOf(CracksA).forEach(x => x.tinted(0x304888));

    const cc = cracks(seed, 0x304888);
    // Putting a mask on the cc Graphics object seems to not look correct sometimes
    // Not sure why...
    // So I put the cc inside a Container.
    const c = container(cc).show(scene.terrainDecalsStage, 0)
    c.mask = scene.terrainStage;
    forceRenderable(scene.terrainStage);
    game.hudStage.ticker.update();
}

function enrichObstacle(level: GameObjectsType<typeof FinalClimbArgs>) {
    if (!progress.flags.capital.openedStorage) {
        level.ObstacleWall.y -= 80;
    }

    Sprite.from(CapitalBrickWall).at(getWorldBounds(level.ObstacleWall)).behind();
    level.ObstacleWall.hide();
}