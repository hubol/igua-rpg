import {scene} from "../igua/scene";
import {FinalClimbArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {progress} from "../igua/data/progress";
import {Sprite} from "pixi.js";
import {CapitalBrickWall} from "../textures";
import {getWorldBounds} from "../igua/gameplay/getCenter";

export function FinalClimb() {
    scene.backgroundColor = 0x182840;
    scene.terrainColor = 0x4868a0;
    const level = applyOgmoLevel(FinalClimbArgs);
    enrichObstacle(level);
}

function enrichObstacle(level: GameObjectsType<typeof FinalClimbArgs>) {
    if (!progress.flags.capital.openedStorage) {
        level.ObstacleWall.y -= 80;
    }

    Sprite.from(CapitalBrickWall).at(getWorldBounds(level.ObstacleWall)).behind();
    level.ObstacleWall.hide();
}