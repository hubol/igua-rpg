import {Sprite} from "pixi.js";
import {JungleTreeStump} from "../textures";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {resolvePipeHorizontal} from "./walls";

export const resolveTreeStump = resolveGameObject('TreeStump', e => treeStump().at(e));

function treeStump() {
    const s = Sprite.from(JungleTreeStump)
        .withAsync(async () => {
            resolvePipeHorizontal({ x: s.x - 17, y: s.y - 14, width: 32, visible: false } as any)
        });

    s.anchor.set(60 / 128, 16 / 64);
    return s;
}