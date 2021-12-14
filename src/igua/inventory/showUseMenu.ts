import {EscapeTickerAndExecute} from "../../utils/asshatTicker";
import {scene} from "../scene";
import {game} from "../game";
import {Container, Graphics, Sprite} from "pixi.js";
import {Key} from "../../utils/browser/key";
import {merge} from "../../utils/merge";
import {cyclic} from "../../utils/math/number";
import {inventory} from "./inventory";
import {SelectOption} from "../../sounds";
import {PotionType} from "./potions";
import {consumePotion} from "./consumePotion";
import {range} from "../../utils/range";

export function showUseMenu() {
    throw new EscapeTickerAndExecute(useImpl);
}

function controller(row: number, slots: number) {
    scene.ticker.doNextUpdate = false;
    let destroyOnNextStep = false;
    const c = merge(new Container(), { index: 0, row, slots, type: undefined as PotionType | undefined }).withStep(() => {
        if (destroyOnNextStep) {
            scene.ticker.doNextUpdate = true;
            return c.destroy();
        }
        if (Key.justWentDown("KeyU"))
            return destroyOnNextStep = true;
        const left = Math.floor(c.index / row) * row;
        const right = Math.min(left + row, slots);
        const previousIndex = c.index;
        if (Key.justWentDown("ArrowRight")) {
            c.index = cyclic(c.index + 1, left, right);
        }
        else if (Key.justWentDown("ArrowLeft")) {
            c.index = cyclic(c.index - 1, left, right);
        }
        else if (Key.justWentDown("ArrowUp")) {
            c.index = cyclic(c.index + (right - left), 0, slots);
        }
        else if (Key.justWentDown("ArrowDown")) {
            c.index = cyclic(c.index + (right - left), 0, slots);
        }
        c.type = inventory.get(c.index);
        if (previousIndex !== c.index)
            SelectOption.play();
        else if (c.type && Key.justWentDown("Space"))
            consumePotion(c.index);

    });

    return c;
}

type Controller = ReturnType<typeof controller>;

function gui(c: Controller, margin = 2, size = 24) {
    const items = range(c.slots).map(() => new Sprite());
    const gfx = new Graphics().withStep(() => {
        gfx.clear()
        for (let i = 0; i < c.slots; i++) {
            const nx = i % c.row;
            const ny = Math.floor(i / c.row);
            const x = nx * (size + margin);
            const y = ny * (size + margin);
            gfx.beginFill(i === c.index ? 0x00ff00 : 0x005870);
            gfx.drawRect(x, y, size, size);
            const item = items[i];
            const potion = inventory.potion(i);
            item.visible = !!potion;
            if (potion) {
                item.texture = potion.texture;
                item.anchor.set(0.5, 0.5);
                item.at(x + size / 2, y + size / 2);
            }
        }
    });
    gfx.addChild(...items);
    gfx.at((256 - c.row * (size + margin)) / 2, 40);
    return gfx;
}

function useImpl() {
    const row = 6;
    const slots = inventory.slotsCount;
    const c = controller(row, slots);
    c.addChild(gui(c));
    game.hudStage.addChild(c);
}
