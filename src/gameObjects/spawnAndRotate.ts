import {DisplayObject} from "pixi.js";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/merge";
import {sleep} from "../cutscene/sleep";

export function spawnAndRotate(spawnFn: () => DisplayObject, count: number, radius: number, rotationDelta: number, spawnDelayMs: number) {
    let rotation = 0;
    let toSpawnCount = count;
    const rotationPerObject = (Math.PI * 2) / count;
    const c = merge(container(), { rotationDelta, radius, fullySpawned: false })
        .withAsync(async () => {
            while (toSpawnCount > 0) {
                c.addChild(spawnFn());
                await sleep(spawnDelayMs);
                toSpawnCount--;
            }
            c.fullySpawned = true;
        })
        .withStep(() => {
            c.children.forEach((d, i) => {
                const r = rotation - rotationPerObject * i + Math.PI / 2;
                const x = Math.cos(r) * radius;
                const y = -Math.sin(r) * radius;
                d.at(x, y);
            })
            rotation -= rotationDelta;
        });
    return c;
}