import {container} from "../utils/pixi/container";
import {Graphics, Sprite} from "pixi.js";
import {CapitalImpossiblePuzzle} from "../textures";
import {Vector} from "../utils/math/vector";
import {merge} from "../utils/object/merge";
import {move} from "../cutscene/move";
import {ImpossiblePuzzleNotch, ImpossiblePuzzleSolve} from "../sounds";
import {rng} from "../utils/math/rng";
import {PropertiesOf} from "../utils/types/propertiesOf";
import {progress} from "../igua/data/progress";
import {show} from "../cutscene/dialog";
import {player} from "./player";
import {sleep} from "../cutscene/sleep";
import {Vibratey} from "../igua/puppet/mods/vibratey";
import {jukebox} from "../igua/jukebox";

export function impossiblePuzzle<T>(flags: T, key: keyof PropertiesOf<T, boolean>) {
    const p = impossiblePuzzlePuppet();

    if (flags[key])
        p.solveInstantly();

    p.withCutscene(async () => {
        if (!progress.flags.capital.bigKey.reward) {
            return await show(`It's a puzzle, but it looks too chaotic to be solved.`);
        }
        if (flags[key]) {
            return await show(`The puzzle was already solved using the Blessing of Order.`);
        }

        jukebox.fadeOut(0.3, 500);
        const duck = container().withStep(() => player.isDucking = true).show(player);
        await sleep(500);
        const closeEyes = container().withStep(() => {
            player.canBlink = false;
            player.isClosingEyes = true;
        }).show(player);
        await sleep(500);
        player.mods.add(Vibratey);
        await sleep(500);
        await p.solve();
        jukebox.fadeIn(0.3, 500);
        duck.destroy();
        closeEyes.destroy();
        player.mods.remove(Vibratey);
        player.vspeed = -2;
        player.canBlink = true;
        await sleep(500);
        await show(`The puzzle was solved using the Blessing of Order.`);

        // @ts-ignore
        flags[key] = true;
    });

    return p;
}

function impossiblePuzzlePuppet() {
    const c = container();
    const notches: ReturnType<typeof notch>[] = [];

    function n(...args: Parameters<typeof notch>) {
        const nn = notch(...args).show(c);
        notches.push(nn);
        return nn;
    }

    function green(index: number, length = 2) {
        const g = new Graphics().beginFill(0x58C820).drawRect(0, 0, length, 1)
            .withStep(() => g.visible = notches[index].arrivedAtEnd && notches[index + 1].arrivedAtEnd)
            .show(c);
        return g;
    }

    new Graphics().beginFill(0x606068).drawRect(0, 0, 24, 19).show(c);
    n([7, 16], [2, 16], [2, 4]);
    n([8, 11], [8, 13], [5, 13], [5, 4]);
    n([11, 5], [11, 2], [8, 2], [8, 6]);
    n([14, 10], [14, 13], [11, 13], [11, 8]);
    n([14, 3], [14, 8]);
    n([17, 14], [17, 6]);
    Sprite.from(CapitalImpossiblePuzzle).show(c);
    green(0).at(3, 4);
    green(1).at(6, 6);
    green(2).at(9, 8);
    green(3).at(12, 10);
    green(4).at(15, 7);

    for (let i = 0; i < 5; i++)
        green(i, 1).at(20, 3 + i * 3);

    async function solve() {
        for (const notch of notches)
            await notch.animate();
        ImpossiblePuzzleSolve.play();
    }

    function solveInstantly() {
        for (const notch of notches)
            notch.jumpToEndPosition();
    }

    return merge(c, { solve, solveInstantly });
}

function notch(start: Vector, ...path: Vector[]) {
    const g = merge(new Graphics().beginFill(0xF88030).drawRect(0, 0, 3, 3).at(start),
        {
            animate,
            jumpToEndPosition,
            arrivedAtEnd: false,
        });

    async function animate() {
        for (const p of path)
            await move(g).to(p).over(125);
        g.arrivedAtEnd = true;
        // @ts-ignore
        ImpossiblePuzzleNotch.rate(1 + rng()).play();
    }

    function jumpToEndPosition() {
        g.at(path[path.length - 1]);
        g.arrivedAtEnd = true;
    }

    return g;
}