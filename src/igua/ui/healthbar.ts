import {now} from "../../utils/now";
import {lerp} from "../../utils/math/number";

type State = ReturnType<typeof newState>;
const states = new WeakMap<object, State>();

function newState(value: number) {
    return { target: value, from: value, s: now.s };
}

const result = { life: 0, hurt: 0, heal: 0 };

function getLvalue(state: State) {
    const since = now.s - state.s;
    const f = Math.min(1, since * 4);
    const y = 1 - Math.pow(1 - f, 3);
    return lerp(state.from, state.target, y);
}

export function healthbar(identity: object, value: number, max: number, initial = max) {
    let state = states.get(identity);
    if (!state)
        states.set(identity, state = newState(initial));

    if (value !== state.target) {
        if (Math.abs(value - state.target) > 0.01 * max) {
            state.from = getLvalue(state);
            state.s = now.s;
        }
        state.target = value;
    }

    const lvalue = getLvalue(state);

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