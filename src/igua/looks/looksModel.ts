import {Vector} from "../../utils/math/vector";
import {
    crestShapes,
    eyeShapes,
    footShapes,
    hornShapes,
    mouthShapes,
    nailShapes,
    pupilShapes, tailShapes,
    torsoShapes
} from "./shapes";

const p = 'placement' as const;
const placement = (minX?: number, minY?: number, maxX?: number, maxY?: number) =>
    ({ minX, minY, maxX, maxY, kind: p });

const v = 'value' as const;
const value = (min?: number, max?: number) => ({ min, max, kind: v });

type ChoiceInput<T> = { options: ReadonlyArray<T>, kind: 'choice' };
const choice = <T> (options: ReadonlyArray<T>): ChoiceInput<T> => ({ options, kind: 'choice' });

const color = { kind: 'color' } as const;
const bool = { kind: 'boolean' } as const;

type PlacementInput = ReturnType<typeof placement>;
type ValueInput = ReturnType<typeof value>;
type ColorInput = typeof color;
type BoolInput = typeof bool;

export type LooksInput = ChoiceInput<unknown> | PlacementInput | ValueInput | ColorInput | BoolInput;

const foot = {
    color,
    // shape: choice(footShapes),
    flipH: bool,
    flipV: bool,
    nails: {
        color,
        // shape: choice(nailShapes),
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
            // shape: choice(crestShapes),
            flipH: bool,
            flipV: bool,
        },
        eyes: {
            placement: placement(),
            gap: value(),
            // shape: choice(eyeShapes),
            pupils: {
                placement: placement(),
                // shape: choice(pupilShapes),
                color,
                mirroredPlacement: bool,
                mirroredShape: bool,
            },
            // lids: {
            //     up: value(),
            //     down: value(),
            // }
        },
        horn: {
            color,
            placement: placement(),
            // shape: choice(hornShapes),
        },
        mouth: {
            color,
            placement: placement(),
            // shape: choice(mouthShapes),
        },
    },
    body: {
        torso: {
            color,
            placement: placement(),
            // shape: choice(torsoShapes),
        },
        tail: {
            color,
            placement: placement(),
            // shape: choice(tailShapes),
            club: {
                color,
                placement: placement(),
                // shape: choice(clubShapes),
            }
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

export type LooksInputModel = typeof inputModel;
export type Looks = Map<typeof inputModel>;

export function getLooksInputModel(): LooksInputModel {
    return JSON.parse(JSON.stringify(inputModel));
}
