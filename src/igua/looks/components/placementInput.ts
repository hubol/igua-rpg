import {button} from "./button";
import {merge} from "../../../utils/merge";
import {Container, Graphics, Sprite} from "pixi.js";
import {Key} from "../../../utils/browser/key";
import {looksContext} from "./looksUiRoot";
import {Vector} from "../../../utils/math/vector";
import {makeKeyRepeat} from "../makeKeyRepeat";
import {UiPlacementReticle} from "../../../textures";
import {PlacementInput} from "../looksModel";

export function placementInput(text: string, input: { value: Vector } & PlacementInput, width = 96, height = 30) {
    const c = merge(new Container(), { selected: false });
    const b = button(text, () => {});

    let inputSelected = false;

    const g = new Graphics();
    const left = makeKeyRepeat(g, 'ArrowLeft');
    const right = makeKeyRepeat(g, 'ArrowRight');
    const up = makeKeyRepeat(g, 'ArrowUp');
    const down = makeKeyRepeat(g, 'ArrowDown');

    const reticle = Sprite.from(UiPlacementReticle);
    reticle.anchor.set(2/6, 2/6);

    const ss = 22;

    const minX = input.minX ?? -24;
    const minY = input.minY ?? -24;
    const maxX = input.maxX ?? 24;
    const maxY = input.maxY ?? 24;

    function reticleVectorComponent(min: number, max: number, v: number) {
        const len = max - min;
        if (len >= ss)
            return v + ss / 2;
        return ((v - min) / len) * ss;
    }

    g.withStep(() => {
        if (inputSelected) {
            if (Key.isDown('ArrowLeft') && Key.isDown('ArrowRight')) {
                left.reset();
                right.reset();
            }
            if (Key.isDown('ArrowUp') && Key.isDown('ArrowDown')) {
                up.reset();
                down.reset();
            }
            const v = input.value.vcpy();
            if (left.justWentDown)
                v.x -= 1;
            if (right.justWentDown)
                v.x += 1;
            if (up.justWentDown)
                v.y -= 1;
            if (down.justWentDown)
                v.y += 1;
            v.x = Math.max(minX, Math.min(maxX, v.x));
            v.y = Math.max(minY, Math.min(maxY, v.y));
            input.value = v;
        }

        g.clear()
            .beginFill(0x002C38);

        if (inputSelected)
            g.lineStyle(2, 0x00FF00, 1, 1);

        g.drawRect(0, 0, ss, ss);
        reticle.x = reticleVectorComponent(minX, maxX, input.value.x);
        reticle.y = reticleVectorComponent(minY, maxY, input.value.y);
    }).at((30 - ss) / 2, (30 - ss) / 2);
    g.addChild(reticle);

    c.withStep(() => {
        if (c.selected && Key.justWentDown("Space")) {
            inputSelected = !inputSelected;
            looksContext.page.navigation = !inputSelected;
        }

        b.selected = c.selected && !inputSelected;
    });

    c.addChild(b, g);

    return c;
}