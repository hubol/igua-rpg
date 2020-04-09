export const Key =
{
    isDown(key: KeyCode)
    {
        return key in currentKeysState && currentKeysState[key];
    },
    isUp(key: KeyCode)
    {
        return !this.isDown(key);
    },
    justWentDown(key: KeyCode)
    {
        return previouslyUp(key) && this.isDown(key);
    },
    justWentUp(key: KeyCode)
    {
        return previouslyDown(key) && this.isUp(key);
    }
};

function previouslyDown(key: KeyCode)
{
    return key in previousKeysState && previousKeysState[key];
}

function previouslyUp(key: KeyCode)
{
    return !previouslyDown(key);
}

type KeyCode =
    "ArrowUp"
    | "ArrowRight"
    | "ArrowDown"
    | "ArrowLeft"
    | "Space"
    | string;

interface KeysState
{
    [index: string]: boolean;
}

let previousKeysState: KeysState = { };
let currentKeysState: KeysState = { };
let workingKeysState: KeysState = { };

function handleKeyDown(event: KeyboardEvent)
{
    workingKeysState[event.code] = true;
}

function handleKeyUp(event: KeyboardEvent)
{
    workingKeysState[event.code] = false;
}

let startedKeyListener = false;

export function startKeyListener()
{
    if (startedKeyListener)
        throw new Error("Cannot start key listener twice!");

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keypress", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    startedKeyListener = true;
}

export function advanceKeyListener()
{
    if (!startedKeyListener)
        throw new Error("Key listener must be started to advance!");

    previousKeysState = currentKeysState;
    currentKeysState = { ...workingKeysState };
}