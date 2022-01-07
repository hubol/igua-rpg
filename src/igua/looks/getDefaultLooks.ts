import {Looks} from "./looksModel";

export function getDefaultLooks(): Looks {
    return {
        head: {
            color: 0xCCAE0A,
            placement: [0, 0],
            crest: {
                color: 0xCC2C42,
                placement: [0, 0],
                flipV: false,
                flipH: false,
            },
            eyes: {
                placement: [0, 0],
                gap: 1,
                pupils: {
                    color: 0x9957AF,
                    placement: [0, 0],
                    mirrored: true,
                }
            },
            horn: {
                color: 0xCC2C42,
                placement: [0, 0]
            },
            mouth: {
                color: 0x9957AF,
                placement: [0, 0],
                flipV: false,
            },
        },
        body: {
            placement: [0, 0],
            torso: {
                color: 0xCC70BB,
                flipV: false,
            },
            tail: {
                color: 0xCC70BB,
                placement: [0, 0],
                club: {
                    color: 0x0C4CCC,
                    placement: [0, 0],
                }
            }
        },
        feet: {
            color: 0x0C4CCC,
            clawColor: 0x92B233,
            front: {
                flipV: false,
                claws: {
                    placement: 2,
                }
            },
            hind: {
                flipV: false,
                claws: {
                    placement: 2,
                }
            },
            gap: 2,
            backOffset: 3
        }

    }
}
