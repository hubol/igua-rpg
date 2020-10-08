export const Key =
    {
        isDown(key: KeyCode)
        {
            return !!(key in currentKeysState && (currentKeysState[key] & 0b010));
        },
        isUp(key: KeyCode)
        {
            return !this.isDown(key);
        },
        justWentDown(key: KeyCode)
        {
            return !!(key in currentKeysState && (currentKeysState[key] & 0b100));
        },
        justWentUp(key: KeyCode)
        {
            return !!(key in currentKeysState && (currentKeysState[key] & 0b001));
        }
    };

export type KeyCode =
    "ArrowUp"
    | "ArrowRight"
    | "ArrowDown"
    | "ArrowLeft"
    | "Space"
    | string;

interface KeysState
{
    [index: string]: number;
}

let currentKeysState: KeysState = { };
let workingKeysState: KeysState = { };

function handleKeyDown(event: KeyboardEvent)
{
    workingKeysState[event.code] = workingKeysState[event.code] ?? 0;
    if ((workingKeysState[event.code] & 0b010) === 0b000)
        workingKeysState[event.code] |= 0b100;
    workingKeysState[event.code] |= 0b010;
}

function handleKeyUp(event: KeyboardEvent)
{
    workingKeysState[event.code] = ((workingKeysState[event.code] ?? 0) | 0b001) & 0b101;
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

    currentKeysState = { ...workingKeysState };

    const keys = Object.keys(workingKeysState);
    for (const key of keys)
        workingKeysState[key] &= 0b010;
}