import {scene} from "./scene";
import {Container, Graphics} from "pixi.js";
import {container} from "../utils/pixi/container";

export function cutOutWindow(skyColor: number, ...containers: Container[]) {
    scene.parallax1Stage.addChildAt(new Graphics().beginFill(skyColor).drawRect(0, 0, 1000, 1000), 0);
    scene.parallax1Stage.mask = container(
        ...containers.map(x => new Graphics().beginFill(0x1).drawRect(x.x, x.y, x.width, x.height)))
        .show();
}
