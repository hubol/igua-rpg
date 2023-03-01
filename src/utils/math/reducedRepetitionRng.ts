import {rng} from "./rng";

export function reducedRepetitionRng(exclusiveMax: number, maxRepetitions: number) {
    const history: number[] = [];

    function next() {
        const v = rng.int(exclusiveMax);
        if (v !== history.last)
            history.length = 0;

        history.push(v);

        if (history.length > maxRepetitions) {
            history.length = 0;
            history.push((v + 1) % exclusiveMax);
        }

        return history.last;
    }

    return {
        next,
    }
}