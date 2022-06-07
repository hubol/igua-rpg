// https://github.com/tvalentius/pseudo-random/blob/master/index.js
export function makePseudo(seed) {
    let _seed = Math.round(seed) % 2147483647;
    if (_seed) _seed += 2147483646;

    function int() {
        return _seed = _seed * 16807 % 2147483647;
    }

    function unit() {
        return (int() - 1) / 2147483646;
    }

    function polar() {
        return unit() * 2 - 1;
    }

    function bool() {
        return unit() > 0.5;
    }

    function choose<T>(...args: T[]) {
        return args[int() % args.length];
    }

    function color() {
        return int() % 0xFFFFFF;
    }

    return {
        unit,
        polar,
        int,
        bool,
        choose,
        color
    }
}

export type Pseudo = ReturnType<typeof makePseudo>;
