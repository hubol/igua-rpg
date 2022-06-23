import {scene} from "../igua/scene";
import {UnrealT9Args} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {KeyboardT9} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {container} from "../utils/pixi/container";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {trimFrame} from "../utils/pixi/trimFrame";
import {Undefined} from "../utils/types/undefined";
import {player} from "../gameObjects/player";
import {Force} from "../utils/types/force";
import {distance} from "../utils/math/vector";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {merge} from "../utils/object/merge";
import {Key} from "../utils/browser/key";
import {IguaText} from "../igua/text";

export function UnrealT9() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(UnrealT9Args);
    const receiver = letterReceiver().show();
    keyboard({ push: receiver.push }).at(level.PlaceKeys).show(scene.terrainStage);

    const t = IguaText.Large().at(64, 64)
        .withStep(() => t.text = (`${receiver.text}${receiver.letter ?? ''}`))
        .show();
}

function letterReceiver() {
    const confirmAfterFrames = 30;
    let framesUntilConfirm = -1;
    let lastPushIndex = Undefined<number>();
    let pushesOnThis = 0;

    function confirm() {
        if (c.letter)
            c.text += c.letter;
        framesUntilConfirm = -1;
        lastPushIndex = undefined;
        pushesOnThis = 0;
    }

    function push(i: number) {
        if (!c.receivePushes)
            return false;
        if (i !== lastPushIndex)
            confirm();
        framesUntilConfirm = confirmAfterFrames;
        lastPushIndex = i;
        pushesOnThis++;
        return true;
    }

    const c = merge(container(), {
        receivePushes: true,
        push,
        text: '',
        get letter() {
            if (lastPushIndex === undefined)
                return undefined;
            const letters = keyboardLetters[lastPushIndex];
            return letters[(pushesOnThis - 1) % letters.length];
        },
        get confirmUnit() {
            return framesUntilConfirm / confirmAfterFrames;
        }})
        .withStep(() => {
            if (framesUntilConfirm > -1)
                framesUntilConfirm--;
            if (framesUntilConfirm === 0)
                confirm();
        });

    return c;
}

type PushLetter = ReturnType<typeof letterReceiver>['push'];

const keyboardLetters = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['j', 'k', 'l'],
    ['m', 'n', 'o'],
    ['p', 'q', 'r', 's'],
    ['t', 'u', 'v'],
    ['w', 'x', 'y', 'z'],
];

const keys = subimageTextures(KeyboardT9, 8).map(trimFrame);

function keyboard({ gap = 10, width = 15, height = 36, push = Force<PushLetter>() }) {
    const c = container();
    let selected = Undefined<DisplayObject>();
    let x = 0;
    for (const t of keys) {
        const back = new Graphics().beginFill(0xffffff).drawRect(0, 0, width, height);
        const key = Sprite.from(t).at(Math.ceil(width / 2), 2);
        key.angle = 90;
        key.anchor.at(0, 0.5);
        const keyc = container(back, key).show(c).at(x, 0)
            .withStep(() => {
                back.tint = 0x303030;
                if (selected === keyc) {
                    back.tint = 0x808080;
                }
            });
        x += width + gap;
    }

    const mask = new Graphics().beginFill(0xff0000).drawRect(0, -8, c.width, c.height).hide();

    c.withStep(() => {
        if (!player.collides(mask))
            return selected = undefined;
        selected = getClosestToPlayer(c.children);
        if (Key.justWentDown('ArrowDown')) {
            const i = c.getChildIndex(selected);
            push(i);
        }
    })
        .withAsync(async () => {
            mask.show(c.parent).at(c);
        });

    return c;
}

function getClosestToPlayer(ds: DisplayObject[]) {
    let closest = Force<DisplayObject>();
    let closestDistance = Number.MAX_VALUE;
    for (const d of ds) {
        const dd = distance(getWorldCenter(d), player);
        if (dd > closestDistance)
            continue;
        closest = d;
        closestDistance = dd;
    }

    return closest;
}