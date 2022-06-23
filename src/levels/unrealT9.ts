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
import {wait} from "../cutscene/wait";
import {sleep} from "../cutscene/sleep";

export function UnrealT9() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(UnrealT9Args);
    const receiver = letterReceiver().show();
    keyboard({ push: receiver.push }).at(level.PlaceKeys).show(scene.terrainStage);
    const c = checker(receiver).show();
    c.y = 100;
}

function bigText(width: number, separation: number, workTextColor = 0xffffff, workHighlightColor = 0) {
    const highlightp = 4;
    const highlight = new Graphics().withStep(() => {
        highlight.clear()
            .beginFill(0xffffff)
            .drawRect(-highlightp - 2, -highlightp + 2, width + (highlightp + 2) * 2, 9 + highlightp * 2 );
    })
        .hide();
    const c = merge(container(), { text: '', color: 0x000000, highlight, work: false });
    const tc = container().withStep(() => {
        tc.removeAllChildren();
        let x = 0;
        for (let i = 0; i < c.text.length; i++) {
            const tcc = container();
            const t = IguaText.Large();
            (t.anchor as any).set(0.5, 0);
            t.tint = c.color;
            if (i === c.text.length - 1 && c.work) {
                t.tint = workTextColor;
                new Graphics().beginFill(workHighlightColor).drawRect(-5, 0, 10, 12).show(tcc);
            }
            t.text = c.text[i].toUpperCase();
            tcc.at(x, 0);
            t.show(tcc);
            tc.addChild(tcc);
            x += separation;
        }
    });
    c.addChild(highlight, tc);
    return c;
}

function checker(receiver: LetterReceiver, target = 'iguarpg', width = 200, lineSeparation = 32) {
    const separation = Math.floor(width / (target.length - 1));
    const targetText = bigText(width, separation);
    targetText.text = target;

    const typedText = bigText(width, separation)
        .withStep(() => {
            typedText.text = `${receiver.text}${receiver.letter ?? ''}`;
            typedText.work = receiver.confirmUnit > 0;
        }).at(0, lineSeparation);

    return container(targetText, typedText).at(Math.floor((256 - width) / 2), 100).withAsync(async () => {
        while (true) {
            await wait(() => receiver.text.length >= target.length);
            receiver.receivePushes = false;
            await sleep(500);
            if (receiver.text === target)
                break;
            receiver.text = '';
            receiver.reset();
            receiver.receivePushes = true;
        }
    });
}

function letterReceiver() {
    const confirmAfterFrames = 40;
    let framesUntilConfirm = -1;
    let lastPushIndex = Undefined<number>();
    let pushesOnThis = 0;

    function confirm() {
        if (c.letter)
            c.text += c.letter;
        reset();
    }

    function reset() {
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
        reset,
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

type LetterReceiver = ReturnType<typeof letterReceiver>;
type PushLetter = LetterReceiver['push'];

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