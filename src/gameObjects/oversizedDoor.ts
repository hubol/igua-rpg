import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {FinalLargeDoorBack, FinalLargeMetalDoor} from "../textures";
import {Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {merge} from "../utils/object/merge";
import {wait} from "../cutscene/wait";
import {range} from "../utils/range";

export function oversizedDoor() {
    const mask = new Graphics().beginFill(0).drawRect(0, 0, 64, 64);
    const c = container(mask);

    const doors = range(4).map(i => largeMetalDoor((i * 90) % 360));
    c.addChild(...[...doors].reverse());

    c.withAsync(async () => {
        for (const door of doors) {
            door.active = true;
            await wait(() => door.destroyed);
        }
    });

    c.on('added', () => {
        Sprite.from(FinalLargeDoorBack)
            .at([-1, -1].add(c))
            .show(c.parent, 1);
    })

    c.mask = mask;
    return c;
}

const largeMetalDoorTxs = subimageTextures(FinalLargeMetalDoor, 3);

function largeMetalDoor(angle) {
    const s0 = merge(Sprite.from(largeMetalDoorTxs[0]), { active: false });
    if (angle === 90 || angle === 180)
        s0.x = 64;
    if (angle === 180 || angle === 270)
        s0.y = 64;
    s0.angle = angle;
    const s1 = Sprite.from(largeMetalDoorTxs[1]);
    const s2 = Sprite.from(largeMetalDoorTxs[2]);
    const c1 = container(s2, s1).show(s0);
    return s0
        .withAsync(async () => {
            await wait(() => s0.active);
            await lerp(c1.pivot, 'y').to(16).over(500);
            await sleep(100);
            await lerp(s2.pivot, 'y').to(3).over(300);
            await sleep(200);
            await lerp(s0.pivot, 'y').to(48).over(1000);
            s0.destroy();
        });
}