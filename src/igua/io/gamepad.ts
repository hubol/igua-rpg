import Gamepads from 'gamepads';
import { showDevMessage } from '../dev/showDevMessage';
import {IguaText} from "../text";
import {scene} from "../scene";
import {game} from "../game";
import {BLEND_MODES} from "pixi.js";
import {sleep} from "../../cutscene/sleep";
import {lerp} from "../../cutscene/lerp";

export function startGamepadListener() {
    Gamepads.start();

    Gamepads.addEventListener('connect', e => {
        message('Gamepad connected', 0xffffff);

        e.gamepad.addEventListener('buttonpress', e => dispatch('keydown', getKeyCode(e.index)));
        e.gamepad.addEventListener('buttonrelease', e => dispatch('keyup', getKeyCode(e.index)));
        // e.gamepad.addEventListener('joystickmove', e => showDevMessage(e), [0, 1]);
    });

    Gamepads.addEventListener('disconnect', e => {
        message('Gamepad disconnected', 0xff0000);
    });
}

function message(text: string, tint: number) {
    const t = IguaText.Large(text, { tint })
        .at(2, 242)
        .show(game.hudStage)
        .withAsync(async () => {
            await sleep(1_000);
            await lerp(t, 'alpha').to(0).over(2_000);
            t.destroy();
        });
}

function dispatch(event: 'keyup' | 'keydown', code?: string) {
    document.dispatchEvent(new KeyboardEvent(event, { code }));
}

function getKeyCode(index: number) {
    switch (index) {
        case 0:
            return "Space";
        case 4:
        case 5:
            return "ArrowDown";
        case 8:
            return "Escape";
        case 9:
            return "KeyU";
        case 12:
            return "ArrowUp";
        case 13:
            return "ArrowDown";
        case 14:
            return "ArrowLeft";
        case 15:
            return "ArrowRight";
    }
}