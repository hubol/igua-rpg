import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {FinalLargeDoorBack, FinalLargeMetalDoor, FinalStoneDoorColumn} from "../textures";
import {BLEND_MODES, DisplayObject, Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {merge} from "../utils/object/merge";
import {wait} from "../cutscene/wait";
import {range} from "../utils/range";
import {mirror} from "./mirror";
import {ToRad} from "../utils/math/angles";
import {move} from "../cutscene/move";
import {FinalDoorFinish, FinalDoorLightOn, FinalDoorMoveLow, FinalDoorMoveMedium, FinalDoorMoveSlow} from "../sounds";

function angle(i: number) {
    return (i * 90) % 360;
}

type Door = DisplayObject & { active: boolean; complete: boolean; }

export function oversizedDoor() {
    const mask = new Graphics().beginFill(0).drawRect(0, 0, 64, 64);
    const c = merge(container(mask), { active: false, complete: false });

    const doors: Door[] = [
        ...range(4).map(i => stoneColumnsDoor(i)),
        ...range(4).map(i => largeMetalDoor(angle(i))),
        ...range(4).map(i => mirrorDoor(angle(i))),
    ];
    c.addChild(...[...doors].reverse());

    c.withAsync(async () => {
        await wait(() => c.active);
        for (const door of doors) {
            door.active = true;
            await wait(() => door.complete);
        }

        c.complete = true;
        FinalDoorFinish.play();
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
            // @ts-ignore
            FinalDoorMoveSlow.rate(1).play();
            await lerp(c1.pivot, 'y').to(16).over(500);
            await sleep(100);
            // @ts-ignore
            FinalDoorLightOn.rate(0.3).play();
            await lerp(s2.pivot, 'y').to(3).over(300);
            await sleep(200);
            // @ts-ignore
            FinalDoorMoveLow.rate(1).play();
            // @ts-ignore
            FinalDoorMoveLow.rate(0.3).play();
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

        // @ts-ignore
        FinalDoorMoveSlow.rate(0.67).play();
        // @ts-ignore
        FinalDoorMoveLow.rate(0.5).play();

        const dx = Math.sin(angle * ToRad) * 64;
        const dy = Math.cos(angle * ToRad) * 64;

        await move(m).off(dx, dy).over(1000);

        m.complete = true;
        m.destroy();
    });
}

const stoneColumnOrders = [
    [0, 7, 1, 6, 2, 5, 3, 4],
    [7, 6, 5, 4, 3, 2, 1, 0]
] as const;

function stoneColumnsDoor(seed = 0) {
    seed = Math.floor(seed);
    const ypolar = (seed % (stoneColumnOrders.length * 2)) < stoneColumnOrders.length ? 1 : -1;
    const style = seed % stoneColumnOrders.length;

    const order = stoneColumnOrders[style];
    let index = -1;
    const c = merge(container(), { active: false, complete: false })
        .withStep(() => {
            for (let i = 0; i < Math.min(index, order.length); i++) {
                const d = c.children[order[i]];
                if (d.y === 0) {
                    // @ts-ignore
                    FinalDoorMoveLow.rate(1.1 - i / 16).play();
                }
                d.y += ypolar + Math.sign(ypolar) * (i / 8);
                if (i === order.length - 1 && Math.abs(d.y) >= 64) {
                    c.complete = true;
                    return c.destroy();
                }
            }
            if (c.active)
                index += 0.1;
        })
        .withAsync(async () => {
            await wait(() => c.active);
            // @ts-ignore
            FinalDoorMoveMedium.rate(0.3).play();
        });

    for (let i = 0; i < 8; i++) {
        const cc = container().at(i * 8, 0).show(c)
        const g = new Graphics().beginFill(0x405080, 0.1)
            .drawRect(-1, -5, 10, 74)
            .drawRect(-1, -4, 10, 72)
            .drawRect(-1, -3, 10, 70)
            .drawRect(-1, -2, 10, 68)
            .drawRect(-1, -1, 10, 66)
            .show(cc);
        g.blendMode = BLEND_MODES.MULTIPLY;
        Sprite.from(FinalStoneDoorColumn).show(cc);
    }

    return c;
}