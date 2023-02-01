import {EscapeTickerAndExecute} from "../../utils/asshatTicker";
import {scene} from "../scene";
import {game} from "../game";
import {Container, Graphics, Sprite, Texture} from "pixi.js";
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
import { Input } from "../io/input";
import {desertKeys} from "../../levels/desertTemple";
import {jungleKeys} from "../../levels/jungleTemple";
import {volcanoKeys} from "../../levels/volcanoTemple";
import {capitalKeys} from "../../levels/capitalTemple";
import {vnew} from "../../utils/math/vector";
import {subimageTextures} from "../../utils/pixi/simpleSpritesheet";
import {BigKeyTracker, BlessingsTracker, CommonPoisonPotion, UiBadgeLabel} from "../../textures";
import {SceneLocal} from "../sceneLocal";
import {getBadgeTexture} from "../gameplay/badgeTextures";
import {derivedStats} from "../gameplay/derivedStats";
import {Badges} from "../gameplay/badges";
import {getMessageBoxY} from "../../cutscene/dialog";

export function showUseMenu() {
    throw new EscapeTickerAndExecute(useImpl);
}

let defaultSelection = 0;

export const UseMenuState = new SceneLocal(() => ({ open: false }), `UseMenuState`);

function controller(row: number, slots: number) {
    UseMenuState.value.open = true;
    scene.ticker.doNextUpdate = false;
    let destroyOnNextStep = false;
    const c = merge(new Container(), { selection: defaultSelection, row, slots, type: undefined as PotionType | undefined }).withStep(() => {
        if (destroyOnNextStep) {
            UseMenuState.value.open = false;
            scene.ticker.doNextUpdate = true;
            InventoryClose.play();
            return c.destroy();
        }
        if (Input.justWentDown("InventoryMenuToggle") || Input.justWentDown("MenuEscape"))
            return destroyOnNextStep = true;
        const left = Math.floor(c.selection / row) * row;
        const right = Math.min(left + row, slots);

        const previousSelection = c.selection;
        if (Input.justWentDown("SelectRight")) {
            c.selection = cyclic(c.selection + 1, left, right);
        }
        else if (Input.justWentDown("SelectLeft")) {
            c.selection = cyclic(c.selection - 1, left, right);
        }
        else if (Input.justWentDown("SelectUp")) {
            c.selection = cyclic(c.selection + (right - left), 0, slots);
        }
        else if (Input.justWentDown("SelectDown")) {
            c.selection = cyclic(c.selection + (right - left), 0, slots);
        }
        defaultSelection = c.selection;
        c.type = inventory.get(c.selection);
        if (previousSelection !== c.selection)
            SelectOption.play();
        else if (c.type && Input.justWentDown("Confirm"))
            consumePotion(c.selection);

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
            gfx.beginFill(i === c.selection ? 0x00ff00 : 0x005870);
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

function levelText(text: () => string, visible = () => true) {
    const level = IguaText.Large("", { tint: 0x00ff00 })
        .withStep(() => {
            level.visible = visible();
            level.text = text();
        });
    level.anchor.at(1, 1);

    return level;
}

function useImpl() {
    const row = 6;
    const slots = inventory.slotsCount;
    const c = controller(row, slots);

    InventoryOpen.play();

    c.addChild(
        gui(c),
        newExcessItems().at(207, 117),
        keyItems().at(2, 254),
        equippedBadge());

    const { levels } = progress;

    const showAbbreviated = () => !!(levels.intelligence || levels.vigor || levels.humor);

    c.addChild(
        levelText(() => `Claw ${showAbbreviated() ? '' : 'Level '}${levels.strength}`).at(255, 256),
        levelText(() => `Heart ${levels.vigor}`, () => !!levels.vigor || !!levels.intelligence || !!levels.humor).at(255, 247),
        levelText(() => `Brain ${levels.intelligence}`, () => !!levels.intelligence || !!levels.humor).at(255, 238),
        levelText(() => `Lung ${levels.humor}`, () => !!levels.humor).at(255, 228),
    )

    const clawLevel = IguaText.Large("", { tint: 0x00ff00 })
        .withStep(() => clawLevel.text = `Claw Level ${progress.levels.strength}`)
        .at(255, 256);
    clawLevel.anchor.set(1, 1);

    game.hudStage.addChild(c);
    game.hudStage.ticker.update();
}

const regionKeys = [ desertKeys, jungleKeys, volcanoKeys, capitalKeys ];

function keyItems() {
    const c = container();
    const pen = vnew();

    const sprite = (t: Texture) => {
        const s = Sprite.from(t).at(pen).show(c);
        s.anchor.y = 1;
        return s;
    };

    for (let i = 0; i < regionKeys.length; i++) {
        const region = regionKeys[i];
        pen.x = 0;

        const prevChildren = c.children.length;
        const keys = region.keys;

        if (!region.doneSearching) {
            for (let j = 0; j < keys.length; j++) {
                const key = keys[j];
                const piece = region.bigKey[`piece${j + 1}`];
                if (piece)
                    sprite(bigKeyTrackerTextures[j]).tinted(bigKeyColors[i]);
                else if (key)
                    sprite(region.texture);
                pen.x += region.texture.width;
            }
        }

        if (region.reward)
            sprite(blessingTextures[i]);

        if (c.children.length !== prevChildren)
            pen.y -= region.texture.height;
    }
    return c;
}

const bigKeyColors = [0xD03020, 0xE2CE36, 0x38B038, 0x3028E0];

const bigKeyTrackerTextures = subimageTextures(BigKeyTracker, 3);
const blessingTextures = subimageTextures(BlessingsTracker, 4);

function equippedBadge() {
    const c = container()
        .withStep(() => {
            c.y = getMessageBoxY() + 10;
            c.visible = derivedStats.badge !== Badges.None;
            if (!c.visible)
                return;

            s.texture = getBadgeTexture(progress.equipment.badge);
            // s2.texture = s.texture;
        });

    // new Graphics().lineStyle(1, 0x005870).drawRect(-3, -3 - 7, 27, 26 + 7).show(c);
    // const s = Sprite.from(getBadgeTexture('None')).show(c);

    new Graphics().lineStyle(1, 0x00ff00).drawRect(-3, -3 - 7, 27, 26 + 7 - 4).show(c);
    // new Graphics().lineStyle(1, 0x005870).drawRect(-3, -3 - 7, 27, 26 + 7 - 4).show(c);
    const s = Sprite.from(getBadgeTexture('None')).at(0, -2).show(c);

    // new Graphics().beginFill().drawRect(s.x, s.y, s.width, s.height).show(c);
    // const s2 = Sprite.from(s.texture).at(1, 1).show(c, s.index);
    // s2.opaqueTint = 0x005870;
    Sprite.from(UiBadgeLabel).at(-2, -8).show(c);

    c.at(6, 0);

    return c;
}