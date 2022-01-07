import {merge} from "./merge";

export const rng = merge(() => Math.random(),
    {
        get bool() {
            return Math.random() > 0.5;
        },
        int(maxExclusive: number) {
            return Math.floor(Math.random() * maxExclusive);
        },
        get color() {
            return rng.int(0xFFFFFF + 1);
        },
        choose<T>(array: Array<T>) {
            return array[rng.int(array.length)];
        },
        get polar() {
            return Math.random() * 2 - 1;
        },
        get polarHalf() {
            return Math.random() - 1/2;
        }
});
