import {Looks} from "./looksModel";

export function getDefaultLooks(): Looks {
    return {
        head: {
            color: 0xCCAE0A,
            placement: [0, 0],
            crest: {
                shape: 0,
                color: 0xCC2C42,
                placement: [0, 0],
                flipV: false,
                flipH: false,
            },
            eyes: {
                placement: [0, 0],
                gap: 1,
                pupils: {
                    shape: 0,
                    color: 0x9957AF,
                    placement: [0, 0],
                    mirrored: true,
                }
            },
            horn: {
                shape: -1,
                color: 0xCC2C42,
                placement: [0, 0]
            },
            mouth: {
                shape: 0,
                color: 0x9957AF,
                placement: [0, 0],
                flipV: false,
            },
        },
        body: {
            placement: [0, 0],
            torso: {
                shape: 0,
                color: 0xCC70BB,
                flipV: false,
            },
            tail: {
                shape: 0,
                color: 0xCC70BB,
                placement: [0, 0],
                club: {
                    shape: -1,
                    color: 0x0C4CCC,
                    placement: [0, 0],
                }
            }
        },
        feet: {
            color: 0x0C4CCC,
            clawColor: 0x92B233,
            front: {
                shape: 0,
                flipV: false,
                claws: {
                    shape: 0,
                    placement: 2,
                }
            },
            hind: {
                shape: 0,
                flipV: false,
                claws: {
                    shape: 0,
                    placement: 2,
                }
            },
            gap: 2,
            backOffset: 3
        }

    }
}
