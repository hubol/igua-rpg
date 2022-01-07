import {Vector} from "../../utils/math/vector";

const p = 'placement' as const;
const placement = (minX?: number, minY?: number, maxX?: number, maxY?: number) =>
    ({ minX, minY, maxX, maxY, kind: p });

const v = 'value' as const;
const value = (min?: number, max?: number) => ({ min, max, kind: v });

export type ChoiceInput<T> = { options: ReadonlyArray<T>, kind: 'choice' };
const choice = <T> (options: ReadonlyArray<T>): ChoiceInput<T> => ({ options, kind: 'choice' });

const color = { kind: 'color' } as const;
const bool = { kind: 'boolean' } as const;

export type PlacementInput = ReturnType<typeof placement>;
export type ValueInput = ReturnType<typeof value>;
export type ColorInput = typeof color;
export type BoolInput = typeof bool;

export type LooksInput = ChoiceInput<unknown> | PlacementInput | ValueInput | ColorInput | BoolInput;

const foot = {
    // color,
    // shape: choice(footShapes),
    flipV: bool,
    claws: {
        // color,
        // shape: choice(nailShapes),
        placement: value(),
    }
}

const inputModel = {
    head: {
        placement: placement(-5, -8, 5, 2),
        color,
        crest: {
            color,
            placement: placement(),
            // shape: choice(crestShapes),
            flipH: bool,
            flipV: bool,
        },
        eyes: {
            placement: placement(-7, -6, 3, 5),
            gap: value(),
            // shape: choice(eyeShapes),
            pupils: {
                placement: placement(-7, -7, 5, 5),
                // shape: choice(pupilShapes),
                color,
                mirrored: bool,
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
            placement: placement(-8, -5, 4, 4),
            flipV: bool,
            // shape: choice(mouthShapes),
        },
    },
    body: {
        placement: placement(-4, -4, 4, 4),
        torso: {
            color,
            flipV: bool,
            // shape: choice(torsoShapes),
        },
        tail: {
            color,
            placement: placement(-8, -7, 4, 5),
            // shape: choice(tailShapes),
            club: {
                color,
                placement: placement(),
                // shape: choice(clubShapes),
            }
        }
    },
    feet: {
        color,
        clawColor: color,
        front: foot,
        hind: foot,
        gap: value(-3, 8),
        backOffset: value(0, 7),
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
