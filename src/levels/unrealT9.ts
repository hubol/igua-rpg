import {scene} from "../igua/scene";
import {UnrealT9Args} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {GlowingDiamond, KeyboardT9} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {container} from "../utils/pixi/container";
import {Container, DisplayObject, Graphics, Sprite} from "pixi.js";
import {trimFrame} from "../utils/pixi/trimFrame";
import {Undefined} from "../utils/types/undefined";
import {player} from "../gameObjects/player";
import {Force} from "../utils/types/force";
import {distance} from "../utils/math/vector";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {merge} from "../utils/object/merge";
import {IguaText} from "../igua/text";
import {wait} from "../cutscene/wait";
import {sleep} from "../cutscene/sleep";
import {BallonPop, CheckerLooksGood, KeyboardType} from "../sounds";
import {npc} from "../gameObjects/npc";
import {approachLinear} from "../utils/math/number";
import {jukebox} from "../igua/jukebox";
import {UnrealT9Music} from "../musics";
import {decalsOf} from "../gameObjects/decal";
import {confetti} from "../gameObjects/confetti";
import {lerp} from "../cutscene/lerp";
import {bigKeyPiece, makeFlyIn} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {teleportToTheRoomOfDoors} from "../gameObjects/portalFluid";
import {volcanoBigKeyTextures} from "./volcanoTemple";
import {Input} from "../igua/io/input";

export function UnrealT9() {
    scene.backgroundColor = 0xEAE179;
    scene.terrainColor = 0xD55038;
    jukebox.play(UnrealT9Music);
    const level = applyOgmoLevel(UnrealT9Args);
    const receiver = letterReceiver().show();
    const kb = keyboard({ push: receiver.push }).at(level.PlaceKeys).show(scene.terrainStage);
    const c = checker(receiver).show();
    c.withAsync(async () => {
        await wait(() => c.won);
        await lerp(kb, 'x').to(256).over(500);
    });
    let typed = false;
    const h = hint().at([6, 0].add(level.Hint)).ahead()
        .withAsync(async () => {
           await sleep(12_000);
           if (!typed)
               h.targetAlpha = 1;
        })
        .withStep(() => {
            if (!!receiver.letter) {
                typed = true;
                h.targetAlpha = 0;
            }
        });
    h.scale.x = -1;

    decalsOf(GlowingDiamond).forEach(x => x.tinted(0xF8F8C0));

    c.y = 100;
}

function hint() {
    const n = merge(npc(0, 0, 15), { targetAlpha: 0 })
        .withStep(() => {
            n.ext.opaqueAlpha = approachLinear(n.ext.opaqueAlpha, n.targetAlpha * 0.75, 0.025);
            n.opaqueTint = 0x59771B;
        })
        .withAsync(async () => {
            while (true) {
                n.isDucking = !n.isDucking;
                await sleep(300);
            }
        });

    n.canBlink = false;

    return n;
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
    let state = Undefined<any>();
    const tc = container().withStep(() => {
        {
            const { text, color, work } = c;
            const nextState = { text, color, work };
            if (JSON.stringify(nextState) === JSON.stringify(state))
                return;
            state = nextState;
        }
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

    const typedText = bigText(width, separation, 0xffffff, 0x21297A)
        .withStep(() => {
            typedText.text = `${receiver.text}${receiver.letter ?? ''}`.substring(0, target.length);
            typedText.work = receiver.confirmUnit > 0;
        }).at(0, lineSeparation);

    targetText.color = 0x21297A;
    typedText.color = 0x21297A;

    const highlights = [targetText.highlight, typedText.highlight];

    const c = merge(container(targetText, typedText), { won: false }).at(Math.floor((256 - width) / 2), 100).withAsync(async () => {
        while (true) {
            await wait(() => receiver.text.length >= target.length);
            receiver.reset();
            receiver.receivePushes = false;

            highlights.forEach(x => x.visible = true);

            if (receiver.text !== target) {
                highlights.forEach(x => x.tint = 0xD55038);
                player.damage(1);
                await sleep(250);
            }
            else {
                CheckerLooksGood.play();
                highlights.forEach(x => x.tint = 0x8FD85B);
            }

            await sleep(500);
            if (receiver.text === target)
                break;
            receiver.text = '';
            receiver.receivePushes = true;
            highlights.forEach(x => x.visible = false);
        }
        c.won = true;
        const top = explodeBigText(targetText);
        await sleep(62);
        await explodeBigText(typedText);
        await top;
        await lerp(targetText.highlight, 'alpha').to(0).over(250);
        await lerp(typedText.highlight, 'alpha').to(0).over(250);
        createReward();
    });

    return c;
}

function createReward() {
    const key = makeFlyIn(bigKeyPiece(progress.flags.volcano.bigKey, volcanoBigKeyTextures[1], "piece2"))
        .at(128, -20)
        .show();
    key.onCollect = teleportToTheRoomOfDoors;
}

async function explodeBigText(b: ReturnType<typeof bigText>) {
    while (true) {
        const letter = (b.children[1] as Container).children[0];
        if (!letter)
            break;
        BallonPop.play();
        confetti().at(getWorldCenter(letter)).ahead();
        letter.destroy();
        await sleep(125);
    }
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
                back.tint = 0x21297A;
                if (selected === keyc) {
                    back.tint = 0x4E6DC4;
                }
            });
        x += width + gap;
    }

    const mask = new Graphics().beginFill(0xff0000).drawRect(0, -8, c.width, c.height).hide();

    c.withStep(() => {
        mask.at(c);
        if (!player.collides(mask))
            return selected = undefined;
        selected = getClosestToPlayer(c.children);
        if (Input.justWentDown('SelectDown')) {
            KeyboardType.play();
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