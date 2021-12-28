import { mapObject } from "../../utils/mapObject";
import {Vector} from "../../utils/math/vector";

const p = 'placement' as const;
const placement = (minX?: number, minY?: number, maxX?: number, maxY?: number) =>
    ({ minX, minY, maxX, maxY, kind: p });

const v = 'value' as const;
const value = (min?: number, max?: number) => ({ min, max, kind: v });

type ChoiceInput<T> = { options: T[], kind: 'choice' };
const choice = <T> (options: T[]): ChoiceInput<T> => ({ options, kind: 'choice' });

const color = { kind: 'color' } as const;
const bool = { kind: 'boolean' } as const;

type PlacementInput = ReturnType<typeof placement>;
type ValueInput = ReturnType<typeof value>;
type ColorInput = typeof color;
type BoolInput = typeof bool;

type Input = ChoiceInput<unknown> | PlacementInput | ValueInput | ColorInput | BoolInput;

const foot = {
    color,
    shape: choice([]),
    flipH: bool,
    flipV: bool,
    nails: {
        color,
        shape: choice([]),
        placement: placement(),
    }
}

const inputModel = {
    head: {
        placement: placement(),
        color,
        crest: {
            color,
            placement: placement(),
            shape: choice([]),
            flipH: bool,
            flipV: bool,
        },
        eyes: {
            placement: placement(),
            gap: value(),
            shape: choice([]),
            pupils: {
                placement: placement(),
                shape: choice([]),
                color,
                mirroredPlacement: bool,
                mirroredShape: bool,
            },
            lids: {
                up: value(),
                down: value(),
            }
        },
        mouth: {
            color,
            placement: placement(),
            shape: choice([]),
        },
        horn: {
            color,
            placement: placement(),
            shape: choice([]),
        }
    },
    body: {
        torso: {
            color,
            placement: placement(),
            shape: choice([]),
        },
        tail: {
            color,
            placement: placement(),
            shape: choice([]),
        }
    },
    feet: {
        front: foot,
        hind: foot,
        gap: value(),
        backOffset: value(),
    }
}

// Thank you https://github.com/jquense/yup/blob/94cfd11b3f23e10f731efac05c5525829d10ded1/src/index.ts#L40
type Map<T> = {
    [k in keyof T]: T[k] extends PlacementInput
        ? Vector
        : T[k] extends BoolInput
        ? boolean
        : T[k] extends ValueInput | ColorInput
        ? number
        : T[k] extends ChoiceInput<infer E>
        ? E
        : T[k] extends Record<string, unknown>
        ? Map<T[k]>
        : never;
};

type StyleInput = typeof inputModel;
type StyleOutput = Map<typeof inputModel>;

export function getStyleInput(): StyleInput {
    return JSON.parse(JSON.stringify(inputModel));
}

export function toStyleOutput(input: StyleInput): StyleOutput {
    return deepMap(input, (x: Input) => {
        switch (x.kind) {
            case "color":
                return 0xCCAE0A;
            case "choice":
                return "fix-me";
            case "placement":
                return [0, 0];
            case "value":
                return 0;
            case "boolean":
                return false;
        }
    })
}

function deepMap(obj, fn) {
    const deepMapper = val => !("kind" in val) ? deepMap(val, fn) : fn(val);
    if (!("kind" in obj)) return mapObject(obj, deepMapper);
    return obj;
}
