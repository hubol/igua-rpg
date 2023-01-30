import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {GiantsSlotMachine, GiantsSlotMachineSymbols} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {Sprite} from "pixi.js";
import {rng} from "../utils/math/rng";
import {wait} from "../cutscene/wait";
import {sleep} from "../cutscene/sleep";
import {range} from "../utils/range";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {scene} from "../igua/scene";
import {cyclic} from "../utils/math/number";
import {animatedSprite} from "../igua/animatedSprite";
import {lerp} from "../cutscene/lerp";
import {spendValuables} from "../igua/logic/spendValuables";
import {progress} from "../igua/data/progress";
import {playValuableCollectSounds} from "../cutscene/giftValuables";

const slotMachineTxs = subimageTextures(GiantsSlotMachine, { width: 50 });
const symbolTxs = subimageTextures(GiantsSlotMachineSymbols, { width: 14 });

const txs = {
    arm: [slotMachineTxs[0], slotMachineTxs[1], slotMachineTxs[2]].reverse(),
    slotMachine: slotMachineTxs[3],
    overheadDisplay: slotMachineTxs[4],
    symbolDisplay: slotMachineTxs[5],
    play: slotMachineTxs[6],
    win: slotMachineTxs[7],
    damage: slotMachineTxs[8],
}

export function slotMachine() {
    const prng = new Prng();
    const p = puppet();

    const c = container(p)
        .withCutscene(async () => {
            if (!spendValuables(5))
                return;

            await lerp(p, 'armPull').to(1).over(250);
            await sleep(225);
            await lerp(p, 'armPull').to(0).over(175);

            p.overhead.screen = OverheadScreen.Playing;

            const prize = getPrize(prng);
            const reels: Reels = rng.choose(prize.reels);
            const makesSenseToTeaseSymbol = prize.prize > 5 || reels[0] === reels[1];
            await p.playReels(reels, makesSenseToTeaseSymbol && rng() > 0.33);

            const payout = Math.ceil(prize.prize * 5);

            if (payout) {
                await playValuableCollectSounds(payout);
                progress.valuables += payout;
                p.overhead.screen = OverheadScreen.Win;
            }
            else {
                p.overhead.screen = OverheadScreen.Play;
            }
        });

    return c;
}

function puppet() {
    const reels = symbolDisplay();
    const overhead = overheadDisplay();
    const c = merge(container(), { armPull: 0, overhead, damaged: false, playReels: reels.playReels });
    const arm = animatedSprite(txs.arm, 0);
    c.addChild(Sprite.from(txs.slotMachine), arm, reels, overhead);

    c.withStep(() => {
        arm.imageIndex = Math.max(0, Math.min(2, Math.floor(c.armPull * 2)));
    });

    return c;
}

function symbolDisplay() {
    const c = merge(container(), { playReels });

    const bg = Sprite.from(txs.symbolDisplay).tinted(0xE8E8F8).show(c);

    c.filter(alphaMaskFilter(Sprite.from(txs.symbolDisplay).show(c)));

    const reels = range(3).map(i => reel().at(8 + i * 14, 18).show(c));

    async function playReels(reelsTarget: Reels, teaseLastSymbol: boolean) {
        for (const reel of reels)
            reel.spin();
        await reels[0].stop(reelsTarget[0]);
        await sleep(500);
        await reels[1].stop(reelsTarget[1]);
        await sleep(500);
        await reels[2].stop(reelsTarget[2], !teaseLastSymbol);
    }

    return c;
}

enum OverheadScreen {
    Play,
    Playing,
    Win,
    Damaged
}

function overheadDisplay() {
    const c = merge(container(), { screen: OverheadScreen.Play });
    c.filter(alphaMaskFilter(Sprite.from(txs.overheadDisplay).show(c)));
    const play = playScreen();
    const win = winScreen();

    const screens = [ play, play, win, play ];
    for (const screen of screens) {
        if (!screen.parent)
            screen.show(c);
    }

    return c.withStep(() => {
        screens[c.screen].index = c.children.length - 1;
    });
}

function playScreen() {
    const bg = Sprite.from(txs.overheadDisplay).tinted(0xE0CD00);
    const fg = Sprite.from(txs.play).tinted(0xC64913);

    const c = container(bg, fg)
        .withAsync(async () => {
            while (true) {
                fg.visible = !fg.visible;
                await sleep(250);
            }
        });

    return c;
}

function winScreen() {
    const bg = Sprite.from(txs.overheadDisplay).tinted(0x44A755);
    const fg = Sprite.from(txs.win);

    const c = container(bg, fg)
        .withStep(() => {
            fg.x += 1;
            if (fg.x >= 32)
                fg.x = -32;
        });

    return c;
}

function reel() {
    let _spin = false;
    let _stopped = true;
    let _stopAt = <Symbol>rng.int(Symbol.Double + 1);

    const c = merge(container(), { spin, stop });
    for (let i = -1; i < symbolTxs.length + 1; i++)
        Sprite.from(symbolTxs[cyclic(i, 0, symbolTxs.length)]).at(0, i * -16).show(c);

    function getTargetPivotY() {
        return c.children[_stopAt + 1].y;
    }

    c.pivot.y = getTargetPivotY();

    function spin() {
        _spin = true;
        _stopped = false;
    }

    async function stop(at: Symbol, fast = true) {
        _stopAt = at;
        await waitToStopSpin(fast);
        _spin = false;
        await wait(() => _stopped);
    }

    async function waitToStopSpin(fast: boolean) {
        const tpy = getTargetPivotY();

        if (fast)
            return await wait(() => c.pivot.y > tpy && c.pivot.y < tpy + 4);

        await wait(() => c.pivot.y > tpy);
        await wait(() => c.pivot.y < tpy + 4);
        await sleep(rng.int(500));
    }


    return c.withStep(() => {
        const tpy = getTargetPivotY();
        if (_spin) {
            c.pivot.y -= 2;
        }
        else if (c.pivot.y !== tpy) {
            if (scene.ticks % 2 === 0)
                c.pivot.y -= 1;
        }
        else {
            _stopped = true;
        }

        const wrapDisplayObject = c.children[c.children.length - 2];

        while (c.pivot.y < wrapDisplayObject.y)
            c.pivot.y = (c.pivot.y - wrapDisplayObject.y) + c.children.firstOrDefault()!.y;
    });
}

function getPrize(prng: Prng) {
    const weight = prng.int(weightRangeMax);
    return prizes.find(x => weight >= x.min && weight < x.max)!;
}

const prizes = [
    prize(50, 0, [0, 1, 1], [1, 0, 0], [0, 1, 0], [1, 0, 1], [0, 0, 1], [1, 1, 0]),
    prize(14, 0.5, [0, 1, 2], [1, 0, 2], [1, 2, 0], [0, 2, 1], [2, 0, 1], [2, 1, 0]),
    prize(6, 3, [0, 0, 0]),
    prize(4, 5, [1, 1, 1]),
    prize(2, 7, [0, 0, 2], [0, 2, 0], [2, 0, 0]),
    prize(1.5, 8, [1, 1, 2], [1, 2, 1], [2, 1, 1]),
    prize(0.2, 10, [0, 2, 2], [2, 0, 2], [2, 2, 0]),
    prize(0.2, 15, [1, 2, 2], [2, 1, 2], [2, 2, 1]),
    prize(0.1, 19, [2, 2, 2]),
]

enum Symbol {
    QuestionMark,
    Heart,
    Double,
}

type Reels = [symbol0: Symbol, symbol1: Symbol, symbol2: Symbol];

function prize(weight: number, prize: number, reels: Reels, ...moreReels: Reels[]) {
    return { weight: Math.round(weight * 1000), prize, min: 0, max: 0, reels: [reels, ...moreReels] };
}

let weightRangeMax = 0;
for (const prize of prizes) {
    prize.min = weightRangeMax;
    weightRangeMax += prize.weight;
    prize.max = weightRangeMax;
}

class Prng {
    seed: number;

    constructor(seed = rng.int(10000)) {
        this.seed = Math.round(seed) % 2147483647;
    }

    int(max: number) {
        return (this.seed = this.seed * 16807 % 2147483647) % max;
    }
}