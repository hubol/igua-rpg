import {Action} from "./input";
import {StandardMapping} from "./standardMapping";

type ControlsBase<T> = {
    [index in Action]: T;
};

type KeyboardControls = ControlsBase<string>;

export const defaultKeyboardControls: KeyboardControls = {
    Confirm: "Space",
    Duck: "ArrowDown",
    Interact: "ArrowUp",
    InventoryMenuToggle: "U",
    Jump: "Space",
    MenuEscape: "Escape",
    MoveLeft: "ArrowLeft",
    MoveRight: "ArrowRight",
    PauseMenuToggle: "Escape",
    SelectDown: "ArrowDown",
    SelectLeft: "ArrowLeft",
    SelectRight: "ArrowRight",
    SelectUp: "ArrowUp"
}

function button(index: number) {
    return { index, kind: 'button' as const };
}
function axis(index: number, sign: 1 | -1) {
    return { index, sign, kind: 'axis' as const };
}

type ButtonControl = ReturnType<typeof button>;
type AxisControl = ReturnType<typeof axis>;
type GamepadControl = ButtonControl | AxisControl;

type GamepadControls = ControlsBase<GamepadControl[]>;

const defaultGamepadControls: GamepadControls = {
    Confirm: [ button(StandardMapping.Button.BUTTON_BOTTOM) ],
    Duck: [ button(StandardMapping.Button.D_PAD_BOTTOM), button(StandardMapping.Button.BUMPER_LEFT), button(StandardMapping.Button.BUMPER_RIGHT) ],
    Interact: [ button(StandardMapping.Button.BUTTON_TOP), button(StandardMapping.Button.D_PAD_UP) ],
    InventoryMenuToggle: [ button(StandardMapping.Button.BUTTON_CONTROL_RIGHT) ],
    Jump: [ button(StandardMapping.Button.BUTTON_BOTTOM) ],
    MenuEscape: [ button(StandardMapping.Button.BUTTON_RIGHT) ],
    MoveLeft: [ button(StandardMapping.Button.D_PAD_LEFT), axis(StandardMapping.Axis.JOYSTICK_LEFT_HORIZONTAL, -1), axis(StandardMapping.Axis.JOYSTICK_RIGHT_HORIZONTAL, -1) ],
    MoveRight: [ button(StandardMapping.Button.D_PAD_RIGHT), axis(StandardMapping.Axis.JOYSTICK_LEFT_HORIZONTAL, 1), axis(StandardMapping.Axis.JOYSTICK_RIGHT_HORIZONTAL, 1) ],
    PauseMenuToggle: [ button(StandardMapping.Button.BUTTON_CONTROL_LEFT) ],
    SelectDown: [ button(StandardMapping.Button.D_PAD_BOTTOM), axis(StandardMapping.Axis.JOYSTICK_LEFT_VERTICAL, 1), axis(StandardMapping.Axis.JOYSTICK_RIGHT_VERTICAL, 1) ],
    SelectLeft: [ button(StandardMapping.Button.D_PAD_LEFT), axis(StandardMapping.Axis.JOYSTICK_LEFT_HORIZONTAL, -1), axis(StandardMapping.Axis.JOYSTICK_RIGHT_HORIZONTAL, -1) ],
    SelectRight: [ button(StandardMapping.Button.D_PAD_RIGHT), axis(StandardMapping.Axis.JOYSTICK_LEFT_HORIZONTAL, 1), axis(StandardMapping.Axis.JOYSTICK_RIGHT_HORIZONTAL, 1) ],
    SelectUp: [ button(StandardMapping.Button.D_PAD_UP), axis(StandardMapping.Axis.JOYSTICK_LEFT_VERTICAL, -1), axis(StandardMapping.Axis.JOYSTICK_RIGHT_VERTICAL, -1) ]
}

export const defaultGamepad = {
    controls: defaultGamepadControls,
    config: {
        stickDeadZone: 0.1
    }
}