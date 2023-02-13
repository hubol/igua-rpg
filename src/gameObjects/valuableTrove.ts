import {container} from "../utils/pixi/container";
import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";
import {persistence} from "../igua/data/persistence";
import {valuable} from "./valuable";
import {SceneLocal} from "../igua/sceneLocal";

const trh = 15;
const tcw = 18;

export const ValuableTroveConfig = new SceneLocal(() => ({ dropAll15: false }), `ValuableTroveConfig`);

export function valuableTrove(...rows: number[][]) {
    const c = container()
        .withAsync(async () => {
            let right = true;
            for (let y = 0; y < rows.length; y++) {
                const row = rows[y];
                const xoff = Math.floor((row.length * tcw) / 2);
                for (let x = right ? 0 : row.length - 1; (right && x < row.length) || (!right && x >= 0); x += right ? 1 : -1) {
                    const value = ValuableTroveConfig.value.dropAll15 ? 15 : row[x];
                    numberToValuable(value).at(x * tcw - xoff, trh * y).show(c).delayCollectible();
                    await sleep(67);
                }
                right = !right;
            }
        });

    let max = 0;
    for (const row of rows)
        max = Math.max(row.length, max);

    c.pivot.set((max * tcw) / -2 + tcw, (rows.length * trh) / 2 - trh);
    return c;
}

function numberToValuable(n: number) {
    return valuable(0, 0, undefined, n <= 5 ? 'ValuableOrange' : 'ValuableBlue');
}

export async function keepSavingValuables() {
    while (true) {
        let amount = valuable.instances.length;
        await wait(() => {
            amount = Math.max(valuable.instances.length, amount);
            return valuable.instances.length < amount;
        });
        await persistence.save();
    }
}

export function trove65() {
    return valuableTrove([15, 15],
        [5],
        [15, 15]);
}

export function trove100() {
    return valuableTrove(
        [5],
        [15, 15, 15],
        [15, 15, 15],
        [5]
    )
}

export function trove120() {
    return valuableTrove(
        [15],
        [5, 5],
        [15, 5, 15],
        [15, 15, 15, 15]
    )
}

export function trove140() {
    return valuableTrove(
        [5],
        [15, 15, 15],
        [ 5, 15, 15, 5],
        [15, 15, 15],
        [5]
    )
}