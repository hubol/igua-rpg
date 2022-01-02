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
                gap: 0,
                pupils: {
                    color: 0x9957AF,
                    placement: [0, 0],
                    mirroredShape: false,
                    mirroredPlacement: true
                }
            },
            horn: {
                color: 0xCC2C42,
                placement: [0, 0]
            },
            mouth: {
                color: 0x9957AF,
                placement: [0, 0],
            },
        },
        body: {
            torso: {
                color: 0xCC70BB,
                placement: [0, 0]
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
            nailColor: 0x92B233,
            front: {
                flipV: false,
                flipH: false,
                nails: {
                    placement: [0, 0],
                }
            },
            hind: {
                flipV: false,
                flipH: false,
                nails: {
                    placement: [0, 0],
                }
            },
            gap: 0,
            backOffset: 0
        }

    }
}
