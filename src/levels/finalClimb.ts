import {scene} from "../igua/scene";
import {FinalClimbArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {progress} from "../igua/data/progress";
import {Sprite} from "pixi.js";
import {CapitalBrickWall} from "../textures";
import {getWorldBounds} from "../igua/gameplay/getCenter";

export function FinalClimb() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
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