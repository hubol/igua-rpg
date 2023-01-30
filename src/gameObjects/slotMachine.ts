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

const slotMachineTxs = subimageTextures(GiantsSlotMachine, { width: 50 });
const symbolTxs = subimageTextures(GiantsSlotMachineSymbols, { width: 14 });

const txs = {
    arm: [slotMachineTxs[0], slotMachineTxs[1], slotMachineTxs[2]],
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
        .withAsync(async () => {
            while (true) {
                const prize = getPrize(prng);
                const reels: Reels = rng.choose(prize.reels);
                const makesSenseToTeaseSymbol = prize.prize > 5 || reels[0] === reels[1];
                await p.playReels(reels, makesSenseToTeaseSymbol && rng() > 0.33);
                await sleep(1000);
            }
        });

    return c;
}

function puppet() {
    const reels = symbolDisplay();
    const c = merge(container(), { armPull: 0, winMessage: false, damaged: false, playReels: reels.playReels });
    c.addChild(Sprite.from(txs.slotMachine), reels);

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
        const tpy = getTargetPivotY();

        if (fast) {
            await wait(() => c.pivot.y > tpy && c.pivot.y < tpy + 4);
            _spin = false;
        }
        else {
            await wait(() => c.pivot.y > tpy);
            await wait(() => c.pivot.y < tpy);
            await sleep(rng.int(500));
            _spin = false;
        }
        await wait(() => _stopped);
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