import {Graphics, Sprite} from "pixi.js";
import { Rectangle } from "../utils/math/rectangle";
import {container} from "../utils/pixi/container";
import {forceRenderable} from "../igua/forceRenderable";
import {scene} from "../igua/scene";

export function outerGradient(transitions: Rectangle[], colors: number[]) {
    const t = container();
    for (let i = 0; i < colors.length; i++) {
        const p = i * 4;
        for (const transition of transitions) {
            const { width: tw, height: th } = transition;
            const w = tw - p * 2;
            const h = th - p * 2;
            new Graphics().beginFill(colors[i]).drawRect(0, 0, w, h).at([p, p].add(transition)).show(t);
        }
    }

    return t;
}

export function terrainGradient(...args: Parameters<typeof outerGradient>) {
    const t = outerGradient(...args);

    forceRenderable(scene.terrainStage);

    t.mask = scene.terrainStage;
    t.show(scene.cameraStage, scene.terrainStage.index + 1);
    return t;
}