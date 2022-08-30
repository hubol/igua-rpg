import {EscapeTickerAndExecute} from "../../utils/asshatTicker";
import {scene} from "../scene";
import {game} from "../game";
import {Container, Graphics, Sprite} from "pixi.js";
import {merge} from "../../utils/object/merge";
import {cyclic} from "../../utils/math/number";
import {inventory} from "./inventory";
import {InventoryClose, InventoryOpen, SelectOption} from "../../sounds";
import {potions, PotionType} from "./potions";
import {consumePotion} from "./consumePotion";
import {range} from "../../utils/range";
import {IguaText} from "../text";
import {progress} from "../data/progress";
import {container} from "../../utils/pixi/container";
import {Input} from "../io/input";
import {wait} from "../../cutscene/wait";

export function showUseMenu() {
    throw new EscapeTickerAndExecute(useImpl);
}

let defaultIndex = 0;

function controller(row: number, slots: number) {
    scene.ticker.doNextUpdate = false;
    const c = merge(new Container(), { index: defaultIndex, row, slots, type: undefined as PotionType | undefined }).withStep(() => {
        const left = Math.floor(c.index / row) * row;
        const right = Math.min(left + row, slots);
        // TODO fix conflict with DisplayObject.index
        const previousIndex = c.index;
        if (Input.justWentDown("SelectRight")) {
            c.index = cyclic(c.index + 1, left, right);
        }
        else if (Input.justWentDown("SelectLeft")) {
            c.index = cyclic(c.index - 1, left, right);
        }
        else if (Input.justWentDown("SelectUp")) {
            c.index = cyclic(c.index + (right - left), 0, slots);
        }
        else if (Input.justWentDown("SelectDown")) {
            c.index = cyclic(c.index + (right - left), 0, slots);
        }
        defaultIndex = c.index;
        c.type = inventory.get(c.index);
        if (previousIndex !== c.index)
            SelectOption.play();
        else if (c.type && Input.justWentDown("Confirm"))
            consumePotion(c.index);

    })
        .withAsync(async () => {
            await wait(() => Input.isUp('InventoryMenuToggle'));
            await wait(() => Input.justWentDown('InventoryMenuToggle') || Input.justWentDown('MenuEscape'));
            scene.ticker.doNextUpdate = true;
            InventoryClose.play();
            c.destroy();
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

    const rowCount = Math.floor(c.slots / c.row);
    const height = rowCount * size + (rowCount - 1) * margin;
    const width = c.row * size + (c.row - 1) * margin;
    gfx.at((256 - width) / 2, 78);

    const tip = new Graphics().withStep(() => {
        tip.visible = !!c.type;
        if (!c.type)
            return;
        const potion = potions[c.type];
        name.text = potion.name;
        description.text = potion.description;
    })
        .beginFill(0x005870)
        .drawRect(0, 0, width, 48)
        .at(0, height + margin);

    const name = IguaText.Large().at(5, 2);
    const description = IguaText.Large('', { maxWidth: width - 10 }).at(name.x, 20);

    tip.addChild(name, description);

    gfx.addChild(...items, tip);

    return gfx;
}

function newExcessItems() {
    const gfx = new Graphics();
    const text = IguaText.Large("", { tint: 0xffffff }).at(2, -1);

    const c = container(gfx, text)
        .withStep(() => {
            if (inventory.usedSlotsCount <= inventory.slotsCount)
                return c.visible = false;
            text.text = inventory.usedSlotsCount > inventory.slotsCount ? `+${inventory.usedSlotsCount - inventory.slotsCount}` : '';
            gfx
                .clear()
                .beginFill(0x005870)
                .drawRect(0, 0, text.textWidth + 3, 11);
        });

    return c;
}

function useImpl() {
    const row = 6;
    const slots = inventory.slotsCount;
    const c = controller(row, slots);

    InventoryOpen.play();

    const clawLevel = IguaText.Large("", { tint: 0x00ff00 })
        .withStep(() => clawLevel.text = `Claw Level ${progress.levels.strength}`)
        .at(255, 256);
    clawLevel.anchor.set(1, 1);

    c.addChild(gui(c), clawLevel, newExcessItems().at(207, 117));

    game.hudStage.addChild(c);
    game.hudStage.ticker.update();
}
