export type KeyCode =
    "ArrowUp"
    | "ArrowRight"
    | "ArrowDown"
    | "ArrowLeft"
    | "Space"
    | "KeyU"
    | "Escape"
    | string;

interface KeysState
{
    [index: string]: boolean;
}

export const Key = {
    isDown(key: KeyCode) {
        return key in currentKeysState && currentKeysState[key];
    },
    isUp(key: KeyCode) {
        return !this.isDown(key);
    },
    justWentDown(key: KeyCode) {
        return previouslyUp(key) && this.isDown(key);
    },
    justWentUp(key: KeyCode) {
        return previouslyDown(key) && this.isUp(key);
    }
};

function previouslyDown(key: KeyCode) {
    return key in previousKeysState && previousKeysState[key];
}

function previouslyUp(key: KeyCode) {
    return !previouslyDown(key);
}

let previousKeysState: KeysState = {};
let currentKeysState: KeysState = {};
const workingKeysState: KeysState = {};

function handleKeyDown(event) {
    workingKeysState[event.code] = true;
}

function handleKeyUp(event) {
    workingKeysState[event.code] = false;
}

let startedKeyListener = false;

export function startKeyListener() {
    if (startedKeyListener)
        return console.error("Cannot start key listener twice!");
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keypress", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    startedKeyListener = true;
}

export function advanceKeyListener() {
    if (!startedKeyListener)
        return console.error("Key listener must be started to advance!");
    const p = previousKeysState;
    for (const key in p)
        delete p[key];

    previousKeysState = currentKeysState;
    currentKeysState = Object.assign(p, workingKeysState);
}