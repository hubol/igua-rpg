import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {GiantsSlotMachine, GiantsSlotMachineCable, GiantsSlotMachineNoise, GiantsSlotMachineSymbols, OrangeValuable} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
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
import {CTuning} from "./cTuning";
import {
    ClownExplode,
    ClownHurt,
    MirrorShardUse,
    SlotMachineArm,
    SlotMachineReelStop,
    SlotMachineTone,
    UnorthodoxSparkBegin
} from "../sounds";
import {Undefined} from "../utils/types/undefined";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";
import {Input} from "../igua/io/input";
import {player} from "./player";
import {poisonBombExplosion} from "./poisonBomb";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {confetti} from "./confetti";

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
    goodLuck: slotMachineTxs[9],
}

export function slotMachine() {
    const prng = new Prng();
    const p = puppet();

    async function startGameSession() {
        if (p.damaged) {
            cutscene.play(() => show(`It is irreparably broken.`));
            return;
        }

        if (!spendValuables(5))
            return;

        progress.flags.giants.casinoProfit -= 5;
        const prize = getPrize(prng);

        wait(() => p.armPull > 0.3).then(() => SlotMachineArm.play());
        p.playDepositBet();
        await sleep(100);
        await lerp(p, 'armPull').to(1).over(250);
        await sleep(225);
        lerp(p, 'armPull').to(0).over(175);

        await sleep(60);

        p.overhead.screen = OverheadScreen.Playing;

        const reels: Reels = rng.choose(prize.reels);
        const makesSenseToTeaseSymbol = prize.prize > 5 || reels[0] === reels[1];
        await p.playReels(reels, makesSenseToTeaseSymbol && rng() > 0.33);

        const payout = Math.ceil(prize.prize * 5);

        if (payout) {
            p.overhead.screen = OverheadScreen.Win;

            MirrorShardUse.play();
            await sleep(250);

            await playValuableCollectSounds(payout);
            progress.valuables += payout;
            progress.flags.giants.casinoProfit += payout;
        }
        else {
            p.overhead.screen = OverheadScreen.Play;
        }

        if (progress.flags.giants.casinoProfit >= 150)
            await die();
    }

    async function die() {
        await sleep(125);
        p.overhead.screen = OverheadScreen.Damaged;
        await sleep(125);
        UnorthodoxSparkBegin.play();
        await sleep(500);
        poisonBombExplosion().at(getWorldCenter(hitbox)).show();
        progress.flags.giants.slotMachineDamaged = true;
    }

    let gameSession = Undefined<DisplayObject>();

    const hitbox = new Graphics().beginFill(0xff0000).drawRect(8, 31, 41, 25).hide()
        .withInteraction(() => {
            if (gameSession)
                return;

            const newGameSession = container()
                .withAsync(async () => {
                    await startGameSession();
                    newGameSession.destroy();
                    gameSession = undefined;
                })
                .show(c);

            gameSession = newGameSession;
        });

    const c = container(breaker(prng), p, hitbox)
        .withStep(() => p.damaged = progress.flags.giants.slotMachineDamaged)
        .withStep(() => {
            if (Input.justWentDown('MoveLeft') || Input.justWentDown('MoveRight'))
                prng.int(1);
        });

    return c;
}

function breaker(prng: Prng) {
    let life = 200;
    let attacks = 0;
    let vibrate = 0;
    const inside = container().hide()
        .withStep(() => {
            if (vibrate > 0) {
                vibrate -= 0.04;
                c.pivot.x = (vibrate * 4) % 1 < 0.5 ? 1 : 0;
            }
            else
                c.pivot.set(0);
        })
        .withInteraction(() => {
            if (inside.visible)
                return;

            attacks += 1;
            life -= player.doClawAttack();
            inside.visible = life <= 0 && attacks >= 2;
            (inside.visible ? ClownExplode : ClownHurt).play();
            if (inside.visible) {
                confetti().at(getWorldCenter(inside)).ahead();
            }
            vibrate = 1;
        });
    new Graphics().beginFill(0x7A2703).drawRect(59, 21, 10, 24).show(inside);
    const c2 = container(Sprite.from(GiantsSlotMachineCable), inside)
    c2.pivot.set(-49, 76);
    const c = container(c2);

    const simulatedPrng = new Prng();

    const rngReadout = new Graphics()
        .withStep(() => {
            rngReadout.clear();
            simulatedPrng.seed = prng.seed;
            for (let i = 0; i < 6; i++) {
                const prize = getPrize(simulatedPrng);
                rngReadout.beginFill(prize.prize > 0 ? 0x1080b0 : 0xb01000).drawRect(63, 42 - i * 4, 2, 2);
            }
        })
        .show(inside);

    return c;
}

function puppet() {
    const reels = symbolDisplay();
    const overhead = overheadDisplay();
    const c = merge(container(), { armPull: 0, overhead, damaged: false, playReels: reels.playReels, playDepositBet });
    const arm = animatedSprite(txs.arm, 0);
    const damage = Sprite.from(txs.damage);
    c.addChild(Sprite.from(txs.slotMachine), arm, reels, overhead, damage);

    c.withStep(() => {
        arm.imageIndex = Math.max(0, Math.min(2, Math.floor(c.armPull * 2)));
        damage.visible = c.damaged;
        reels.damaged = c.damaged;
        if (c.damaged)
            overhead.screen = OverheadScreen.Damaged;
    });

    function playDepositBet() {
        depositBet().show(c);
    }

    return c;
}

function depositBet() {
    const s = Sprite.from(OrangeValuable).at(39, 28).centerAnchor();
    s.scale.set(0.8);
    const mask = new Graphics().beginFill(0).drawRect(8, 24, 41, 16);

    const c = container(s, mask)
        .withAsync(async () => {
            await lerp(s.pivot, 'y').to(-19).over(200);
            c.destroy();
        });
    c.mask = mask;

    return c;
}

function symbolDisplay() {
    const c = merge(container(), { playReels, damaged: false });

    Sprite.from(txs.symbolDisplay).tinted(0xE8E8F8).show(c);

    c.filter(alphaMaskFilter(Sprite.from(txs.symbolDisplay).show(c)));

    const reels = range(3).map(i => reel().at(8 + i * 14, 18).show(c));

    const damaged = damagedScreen()
        .at(8, 18)
        .withStep(() => damaged.visible = c.damaged)
        .show(c);

    async function playReels(reelsTarget: Reels, teaseLastSymbol: boolean) {
        const arp = startArpeggio();

        for (const reel of reels)
            reel.spin();
        await reels[0].stop(reelsTarget[0]);
        await sleep(500);
        await reels[1].stop(reelsTarget[1]);
        await sleep(500);
        await reels[2].stop(reelsTarget[2], !teaseLastSymbol);

        arp.destroy();
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
    const playing = playingScreen();
    const win = winScreen();
    const damaged = damagedScreen().at(10, 2);

    const screens = [ play, playing, win, damaged ];
    for (const screen of screens) {
        if (!screen.parent)
            screen.show(c);
    }

    return c.withStep(() => {
        screens[c.screen].index = c.children.length - 1;
    });
}

function playingScreen() {
    const bg = Sprite.from(txs.overheadDisplay).tinted(0xB0CDB0);
    const g1 = new Graphics().beginFill(0xf00000).drawCircle(16, 4, 5);
    const g2 = new Graphics().beginFill(0xe0d000).drawRect(23, 4, 8, 8);
    const g3 = new Graphics().beginFill(0x0000f0).drawPolygon([40, 2, 46, 9, 34, 9] );
    const goodLuck = Sprite.from(txs.goodLuck).tinted(0);

    return container(bg, g1, g2, g3, goodLuck)
        .withStep(() => {
            g1.pivot.at(Math.sin(scene.s * Math.PI * 2) * 2, Math.cos(scene.s * Math.PI * 1.9 - 1) * 2);
            g2.pivot.at(Math.sin(scene.s * Math.PI * 2.2 + 2) * 2, Math.cos(scene.s * Math.PI * 2 + 1) * 2);
            g3.pivot.at(Math.sin(scene.s * Math.PI * 1.8 - 1) * 2, Math.cos(scene.s * Math.PI * 2.3 - 2) * 2);
            goodLuck.x += 1;
            if (goodLuck.x > 47)
                goodLuck.x = -47;
        });
}

function playScreen() {
    const bg = Sprite.from(txs.overheadDisplay).tinted(0xD0D020);
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

function damagedScreen() {
    const s = Sprite.from(GiantsSlotMachineNoise)
        .withAsync(async () => {
             while (true) {
                 if (rng.bool) {
                     s.scale.y *= -1;
                     s.pivot.y = s.scale.y === -1 ? 12 : 0;
                 }
                 s.pivot.x = rng.int(80);
                 await sleep(66);
             }
        });

    return s;
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
        else if (!_stopped) {
            SlotMachineReelStop.play();
            _stopped = true;
        }

        const wrapDisplayObject = c.children[c.children.length - 2];

        while (c.pivot.y < wrapDisplayObject.y)
            c.pivot.y = (c.pivot.y - wrapDisplayObject.y) + c.children.firstOrDefault()!.y;
    });
}

function startArpeggio() {
    const arp = [ CTuning.C, CTuning.E, CTuning.F, CTuning.G, CTuning.C * 2, CTuning.E * 2, CTuning.G * 2, CTuning.F * 2 ]
        .map(x => x * 2);

    let index = 0;

    function play() {
        const id = SlotMachineTone.play();
        SlotMachineTone.rate(arp[(index++) % arp.length], id);
    }

    return container()
        .withAsync(async () => {
            while (true) {
                play();
                await sleep(125);
            }
        })
        .show();
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