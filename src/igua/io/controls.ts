import {Action} from "./input";
import {StandardMapping} from "./standardMapping";
import {Vector} from "../../utils/math/vector";

type ControlsBase<T> = {
    [index in Action]: T;
};

type KeyboardControls = ControlsBase<string>;

export const defaultKeyboardControls: KeyboardControls = {
    Confirm: "Space",
    Duck: "ArrowDown",
    Interact: "ArrowUp",
    InventoryMenuToggle: "KeyU",
    Jump: "Space",
    CastSpell: "KeyQ",
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

function axisUnit(indices: number[], unit: Vector) {
    return { indices, unit, kind: 'axisUnit' as const };
}

type ButtonControl = ReturnType<typeof button>;
type AxisControl = ReturnType<typeof axis>;
type AxisUnitControl = ReturnType<typeof axisUnit>;
type GamepadControl = ButtonControl | AxisControl | AxisUnitControl;

type GamepadControls = ControlsBase<GamepadControl[]>;

const defaultGamepadControls: GamepadControls = {
    CastSpell: [ button(StandardMapping.Button.BUTTON_TOP), button(StandardMapping.Button.BUMPER_RIGHT) ],
    Confirm: [ button(StandardMapping.Button.BUTTON_BOTTOM) ],
    Duck: [ button(StandardMapping.Button.D_PAD_BOTTOM), button(StandardMapping.Button.BUMPER_LEFT) ],
    Interact: [ button(StandardMapping.Button.D_PAD_UP) ],
    InventoryMenuToggle: [ button(StandardMapping.Button.BUTTON_CONTROL_RIGHT) ],
    Jump: [ button(StandardMapping.Button.BUTTON_BOTTOM) ],
    MenuEscape: [ button(StandardMapping.Button.BUTTON_RIGHT) ],
    MoveLeft: [ button(StandardMapping.Button.D_PAD_LEFT), axis(StandardMapping.Axis.JOYSTICK_LEFT_HORIZONTAL, -1), axis(StandardMapping.Axis.JOYSTICK_RIGHT_HORIZONTAL, -1) ],
    MoveRight: [ button(StandardMapping.Button.D_PAD_RIGHT), axis(StandardMapping.Axis.JOYSTICK_LEFT_HORIZONTAL, 1), axis(StandardMapping.Axis.JOYSTICK_RIGHT_HORIZONTAL, 1) ],
    PauseMenuToggle: [ button(StandardMapping.Button.BUTTON_CONTROL_LEFT) ],
    SelectDown: [ button(StandardMapping.Button.D_PAD_BOTTOM), axisUnit(StandardMapping.Axis.JOYSTICK_LEFT, [0, 1]), axisUnit(StandardMapping.Axis.JOYSTICK_RIGHT, [0, 1]) ],
    SelectLeft: [ button(StandardMapping.Button.D_PAD_LEFT), axisUnit(StandardMapping.Axis.JOYSTICK_LEFT, [-1, 0]), axisUnit(StandardMapping.Axis.JOYSTICK_RIGHT, [-1, 0]) ],
    SelectRight: [ button(StandardMapping.Button.D_PAD_RIGHT), axisUnit(StandardMapping.Axis.JOYSTICK_LEFT, [1, 0]), axisUnit(StandardMapping.Axis.JOYSTICK_RIGHT, [1, 0]) ],
    SelectUp: [ button(StandardMapping.Button.D_PAD_UP), axisUnit(StandardMapping.Axis.JOYSTICK_LEFT, [0, -1]), axisUnit(StandardMapping.Axis.JOYSTICK_RIGHT, [0, -1]) ]
}

export const defaultGamepad = {
    controls: defaultGamepadControls,
    config: {
        stickDeadZone: 0.1
    }
}