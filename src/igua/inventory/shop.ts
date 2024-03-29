import {getCost, potions, PotionType} from "./potions";
import {Container, Graphics, Sprite} from "pixi.js";
import {game} from "../game";
import {merge} from "../../utils/object/merge";
import {BackpackIcon} from "../../textures";
import {iguanaHead} from "../puppet/iguanaPuppet";
import {playerPuppetArgs} from "../../gameObjects/player";
import {Purchase, PurchaseFail, PurchaseIntelligence, SelectOption} from "../../sounds";
import {cyclic} from "../../utils/math/number";
import {inventory} from "./inventory";
import {IguaText} from "../text";
import {Input} from "../io/input";
import {currencies, CurrencyType} from "./currencies";
import {progress} from "../data/progress";

type Purchases = PotionType[];

type GetCost = typeof getCost;

const getCostFn = getCost;

interface Payment {
    currency: CurrencyType;
    getCost: GetCost;
}

const defaultPayment: Payment = {
    currency: 'valuables',
    getCost: getCostFn,
}

export function shop({
        potions = <PotionType[]>['ClawPowder', 'SpicedNectar', 'SweetBerry', 'WonderBallon', 'CommonPoison', 'BitterMedicine'],
        payment = defaultPayment } = {}) {
    return new Promise<Purchases>(r => {
        shopImpl(r, potions, payment);
    });
}

function box() {
    const graphics = new Graphics()
        .lineStyle(3, 0x00FF00, 1, 0)
        .drawRect(0, 0, 134, 26)
    graphics.x = (256 - graphics.width);
    return graphics;
}

function shopImpl(resolve: (p: Purchases) => void, types: PotionType[], payment: Payment) {
    const currency = currencies[payment.currency];

    function makeButton(box: Container, type?: PotionType) {
        const container = merge(new Container(), { box, type });
        container.at(box).add(3, (box.height - 20) / 2);

        if (type) {
            const potion = potions[type];
            const potionSprite = Sprite.from(potion.texture);
            const name = IguaText.Large(potion.name).at(23, -2);
            const valuableIcon = Sprite.from(currency.iconTexture).at(23, 12);
            const price = IguaText.Large().at(34, 9)
                .withStep(() => {
                    const cost = payment.getCost(type);
                    price.text = cost.toString();
                    price.tint = !currency.canAfford(cost) ? 0xff0000 : 0xffffff;
                });
            const backpackIcon = Sprite.from(BackpackIcon).at(64, 12);
            const held = IguaText.Large().at(backpackIcon.x + 11, 9)
                .withStep(() => {
                    const count = inventory.count(type);
                    backpackIcon.visible = count > 0;
                    held.visible = backpackIcon.visible;

                    held.text = count.toString();
                    held.tint = inventory.isFull ? 0xff0000 : 0xffffff;
                });
            container.addChild(potionSprite, name, valuableIcon, price, backpackIcon, held);
        }
        else {
            const done = IguaText.Large('Done').at(77, -1);
            container.addChild(done);
        }

        return container;
    }

    function makeButtons(types: PotionType[]) {
        let y = 1;

        return [...types, undefined].map(x => {
            const o = box();
            o.y = y;
            y += o.height + 2;
            return makeButton(o, x);
        })
    }

    const purchases: Purchases = [];
    const c = new Container();
    game.hudStage.addChild(c);

    const buttons = makeButtons(types);

    const rect1 = [buttons[0].box.x, 0, 256, buttons[buttons.length - 2].box.y + buttons[buttons.length - 2].box.height + 3];
    const rect2 = [193, 0, 256, buttons[buttons.length - 1].box.y + buttons[buttons.length - 1].box.height - 4];
    const rects = [rect1, rect2];

    const graphics = new Graphics();
    graphics.beginFill(0x00FF00);
    for (let i = 0 ; i < 2; i++) {
        const j = i * 3;
        for (const rect of rects) {
            graphics.drawRect(rect[0] + j, rect[1] + j, rect[2] - rect[0] - j * 2, rect[3] - rect[1] - j * 2);
        }
        graphics.beginFill(0x005870);
    }

    c.addChild(graphics, ...buttons);

    let selectedIndex = -1;
    let error = 0;

    function doPurchaseFail() {
        error = 8;
        PurchaseFail.play();
    }

    function buyPotion() {
        const potion = types[selectedIndex];
        if (!potion) return;
        const cost = payment.getCost(potion);

        if (inventory.isFull || !currency.spend(cost))
            return doPurchaseFail();

        (payment.currency === 'intelligence' ? PurchaseIntelligence : Purchase).play();
        if (payment.currency === 'valuables')
            progress.shopPurchases[potion] = (progress.shopPurchases[potion] ?? 0) + 1;
        inventory.push(potion);
        purchases.push(potion);
    }

    const tipGfxWidth = 122;

    const tip = new Container();
    const tipGfx = new Graphics();
    const tipText = IguaText.Large('', { maxWidth: tipGfxWidth - 10 }).at(5, 2);

    tip.addChild(tipGfx, tipText);
    tip.withStep(() => {
       const type = types[selectedIndex];
       tip.visible = !!type;
       if (!tip.visible)
           return;
       tipText.text = potions[type].description;

       const tipGfxHeight = Math.max(54, tipText.textHeight + 5);

       tipGfx.clear()
           .lineStyle(3, 0x00FF00, 1, 0)
           .beginFill(0x005870)
           .drawRect(0, 0, tipGfxWidth, tipGfxHeight);

        tip.y = Math.max(64, Math.min(192, rect1[3] - rect1[1] - tipGfx.height));
    });

    const inventoryFull = IguaText.Large('Your inventory is full.')
        .withStep(() => inventoryFull.visible = inventory.isFull);
    inventoryFull.at(2, rect1[3] - rect1[1]);
    inventoryFull.tint = 0xff0000;

    c.addChild(tip, inventoryFull);

    if (payment.currency === 'intelligence') {
        const intelligenceLevel = IguaText.Large('').at(255, 256)
            .withStep(() => intelligenceLevel.text = `Brain Level ${progress.levels.intelligence}`)
            .show(c);
        intelligenceLevel.tint = 0x00ff00;
        // @ts-ignore
        intelligenceLevel.anchor.set(1, 1);
    }

    function complete() {
        resolve(purchases);
        c.destroy();
    }

    const cursor = iguanaHead(playerPuppetArgs()).withStep(() => {
        const nothingSelected = selectedIndex === -1;
        const previousSelectedIndex = selectedIndex;

        if (Input.justWentDown("SelectUp"))
        {
            if (nothingSelected)
                selectedIndex = buttons.length - 1;
            else
                selectedIndex--;
        }
        else if (Input.justWentDown("SelectDown"))
        {
            if (nothingSelected)
                selectedIndex = 0;
            else
                selectedIndex++;
        }

        if (!nothingSelected) {
            selectedIndex = cyclic(selectedIndex, 0, buttons.length);
        }

        if (selectedIndex !== -1) {
            const button = buttons[selectedIndex];
            const box = button.box;
            cursor.at(box).add(box.width - 8, 10);
            const doneSelected = button.type === undefined;
            if (doneSelected)
                cursor.y -= 8;

            if (Input.justWentDown('Confirm')) {
                if (doneSelected) {
                    return complete();
                }
                else {
                    buyPotion();
                }
            }
        }

        if (Input.justWentDown("MenuEscape"))
            return complete();

        if (error > 0) {
            cursor.x += (error % 2 === 0 ? 1 : -1) * Math.ceil(error / 6);
            error--;
        }

        if (previousSelectedIndex !== selectedIndex)
            SelectOption.play();

        cursor.visible = selectedIndex !== -1;
    });

    cursor.scale.x = -1;

    c.addChild(cursor);
}
