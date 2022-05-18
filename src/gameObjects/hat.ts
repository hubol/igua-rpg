import {merge} from "../utils/object/merge";
import {DisplayObject} from "pixi.js";
import {Force} from "../utils/types/force";

export function hat<D extends DisplayObject>(d: D, gravity = 0.3): D & { bounce(): void } {
    let y = 0;
    let vspeed = 0;

    function bounce() {
        vspeed = -2;
    }

    let lastParentY = Force<number>();
    let parent = Force<DisplayObject>();

    const s = merge(d, { bounce })
        .withStep(() => {
            if (!parent) {
                let p: DisplayObject = s;
                while (p = p.parent) {
                    if (p.ext.isHatParent)
                        parent = p;
                }
                if (!parent)
                    return;
            }
            const parentY = parent.y;
            if (lastParentY) {
                const dy = parentY - lastParentY;
                if (dy > 0) {
                    y -= dy;
                }
            }
            lastParentY = parentY;
            y = Math.min(0, y + vspeed);
            if (y === 0)
                vspeed = 0;
            else
                vspeed = Math.min(vspeed + gravity, y * -gravity);
            s.y = Math.round(y);
        });
    return s as any;
}