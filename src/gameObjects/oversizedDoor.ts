import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {FinalLargeDoorBack, FinalLargeMetalDoor} from "../textures";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {merge} from "../utils/object/merge";
import {wait} from "../cutscene/wait";
import {range} from "../utils/range";
import {mirror} from "./mirror";
import {ToRad} from "../utils/math/angles";
import {move} from "../cutscene/move";

function angle(i: number) {
    return (i * 90) % 360;
}

type Door = DisplayObject & { active: boolean; complete: boolean; }

export function oversizedDoor() {
    const mask = new Graphics().beginFill(0).drawRect(0, 0, 64, 64);
    const c = container(mask);

    const doors: Door[] = [
        ...range(4).map(i => largeMetalDoor(angle(i))),
        ...range(4).map(i => mirrorDoor(angle(i))),
    ];
    c.addChild(...[...doors].reverse());

    c.withAsync(async () => {
        for (const door of doors) {
            door.active = true;
            await wait(() => door.complete);
        }
    });

    c.on('added', () => {
        Sprite.from(FinalLargeDoorBack)
            .at([-3, -3].add(c))
            .show(c.parent, 1);
    })

    c.mask = mask;
    return c;
}

const largeMetalDoorTxs = subimageTextures(FinalLargeMetalDoor, 3);

function largeMetalDoor(angle: number) {
    const s0 = merge(Sprite.from(largeMetalDoorTxs[0]), { active: false, complete: false });
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
            s0.complete = true;
            s0.destroy();
        });
}

function mirrorDoor(angle = 0) {
    const m = merge(container(mirror(64, 64, 0xC0C2E5, 0xD9DCF2)), { active: false, complete: false });
    new Graphics()
        .beginFill(0x405080, 0.0825)
        .drawRect(-3 , -3, 70, 70)
        .drawRect(-2 , -2, 68, 68)
        .drawRect(-1 , -1, 66, 66)
        .show(m, 0);

    return m.withAsync(async () => {
        await wait(() => m.active);

        const dx = Math.sin(angle * ToRad) * 64;
        const dy = Math.cos(angle * ToRad) * 64;

        await move(m).off(dx, dy).over(1000);

        m.complete = true;
        m.destroy();
    });
}