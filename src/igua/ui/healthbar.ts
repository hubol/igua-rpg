import {now} from "../../utils/now";
import {lerp} from "../../utils/math/number";

const states = new WeakMap<object, ReturnType<typeof newState>>();

function newState(value: number) {
    return { target: value, from: value, s: now.s };
}

const result = { life: 0, hurt: 0, heal: 0 };

export function healthbar(identity: object, value: number, max: number) {
    let state = states.get(identity);
    if (!state)
        states.set(identity, state = newState(max));

    if (value !== state.target) {
        if (Math.abs(value - state.target) > 0.01 * max) {
            state.s = now.s;
            state.from = state.target;
        }
        state.target = value;
    }

    const since = now.s - state.s;
    const f = Math.min(1, since * 4);
    const y = 1 - Math.pow(1 - f, 3);
    const lvalue = lerp(state.from, state.target, y);

    result.life = 0;
    result.hurt = 0;
    result.heal = 0;

    if (lvalue < state.target) {
        result.life = lvalue;
        result.heal = state.target;
    }
    else if (lvalue > state.target) {
        result.life = state.target;
        result.hurt = lvalue;
    }
    else {
        result.life = value;
    }

    return result;
}