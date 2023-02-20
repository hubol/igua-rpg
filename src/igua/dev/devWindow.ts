import {merge} from "../../utils/object/merge";
import {game} from "../game";
import {scene, sceneStack} from "../scene";
import {level} from "../level/level";
import {jukebox} from "../jukebox";
import {progress} from "../data/progress";
import {environment} from "../environment";
import {player} from "../../gameObjects/player";
import {DisplayObject, Graphics} from "pixi.js";
import {colord} from "colord";
import {rng} from "../../utils/math/rng";
import {getWorldBounds} from "../gameplay/getCenter";

function createDev() {
    return {
        game,
        scene: sceneStack.toArray()[0],
        scenes: sceneStack.toArray(),
        level,
        jukebox,
        player,
        progress,
        environment,
        highlight: devHighlight,
    };
}

export function devHighlight(d: DisplayObject) {
    const c = colord({ h: rng.int(360), s: 50, v: 100 }).toPixi();
    const g = new Graphics()
        .withStep(() => {
            if (d.destroyed)
                g.destroy();
            const r = getWorldBounds(d);
            r.add(scene.camera, -1);
            g.clear().beginFill(c).drawRect(r.x, r.y, r.width, r.height);
        })
        .show(game.hudStage);
    g.alpha = 0.5;
}

export function devWindow()
{
    merge(window, {
        get dev()
        {
            return createDev();
        }
    });
}