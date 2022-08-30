import Gamepads from 'gamepads';
import {systemMessage} from "./systemMessage";
import {Undefined} from "../../utils/types/undefined";
import {defaultGamepad, defaultKeyboardControls} from "./controls";
import {Key} from "../../utils/browser/key";
import {Force} from "../../utils/types/force";

const actions = ['MoveLeft', 'MoveRight', 'Duck', 'Jump', 'Interact',
    'InventoryMenuToggle', 'PauseMenuToggle', 'MenuEscape',
    'SelectRight', 'SelectDown', 'SelectLeft', 'SelectUp', 'Confirm'] as const;

export type Action = typeof actions[number];

export const Input = {
    isDown(a: Action) {
        return currentState[a];
    },
    justWentDown(a: Action) {
        return !previousState[a] && currentState[a];
    },
    isUp(a: Action) {
        return !currentState[a];
    },
    justWentUp(a: Action) {
        return previousState[a] && !currentState[a];
    },
}

type State = {
    [index in Action]: boolean;
};

function state(): State {
    const s = Force(<State>{});
    for (const key of actions) {
        s[key] = false;
    }

    return s;
}

const previousState = state();
const currentState = state();
const workingState = state();

enum Mode {
    None,
    Keyboard,
    Gamepad
}

const message = {
    [Mode.Keyboard]: `Using keyboard controls`,
    [Mode.Gamepad]: `Using gamepad controls`,
}

let mode = Mode.None;

function setMode(nextMode: Mode) {
    if (mode !== nextMode && mode !== Mode.None)
        systemMessage(message[nextMode]);
    mode = nextMode;
}

export function startInput() {
    document.addEventListener("keydown", () => setMode(Mode.Keyboard));
    Gamepads.start();
    Gamepads.addEventListener('connect', e => {
        if (mode === Mode.None)
            setMode(Mode.Gamepad);
        e.gamepad.addEventListener('buttonpress', () => setMode(Mode.Gamepad));
    });
}

export function advanceInput() {
    Object.assign(previousState, currentState);
    Object.assign(currentState, workingState);
    applyInput();
}

function applyInput() {
    if (mode === Mode.Gamepad) {
        const gamepad = tryGetGamepad();
        if (gamepad)
            applyGamepadToInput(gamepad);
        else
            setMode(Mode.Keyboard);
    }
    if (mode === Mode.Keyboard) {
        applyKeyboardToInput();
    }
}

function applyGamepadToInput(g: Gamepad) {
    Object.entries(defaultGamepad.controls).forEach(([action, controls]) => {
        let down = false;
        for (const c of controls) {
            if (c.kind === 'button')
                down ||= g.buttons[c.index].pressed;
            else
                down ||= Math.sign(g.axes[c.index]) === c.sign && Math.abs(g.axes[c.index]) > defaultGamepad.config.stickDeadZone;
        }
        workingState[action] = down;
    })
}

function applyKeyboardToInput() {
    for (const c in defaultKeyboardControls) {
        workingState[c] = Key.isDown(defaultKeyboardControls[c]);
    }
}

export function tryGetGamepad() {
    const gamepads = navigator.getGamepads();
    let gamepad = Undefined<Gamepad>();
    let maxTimestamp = -1;

    for (const g of gamepads) {
        if (!!g && g.timestamp > maxTimestamp) {
            maxTimestamp = g.timestamp;
            gamepad = g;
        }
    }

    return gamepad;
}