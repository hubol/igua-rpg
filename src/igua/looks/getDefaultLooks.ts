import {Looks} from "./looksModel";

export function getDefaultLooks(): Looks {
    return {
        head: {
            color: 0,
            placement: [0, 0],
            crest: {
                color: 0,
                placement: [0, 0],
                flipV: false,
                flipH: false,
            },
            eyes: {
                placement: [0, 0],
                gap: 0,
                pupils: {
                    color: 0,
                    placement: [0, 0],
                    mirroredShape: false,
                    mirroredPlacement: true
                }
            },
            horn: {
                color: 0,
                placement: [0, 0]
            },
            mouth: {
                color: 0,
                placement: [0, 0],
            },
        },
        body: {
            torso: {
                color: 0,
                placement: [0, 0]
            },
            tail: {
                color: 0,
                placement: [0, 0],
                club: {
                    color: 0,
                    placement: [0, 0],
                }
            }
        },
        feet: {
            front: {
                color: 0,
                flipV: false,
                flipH: false,
                nails: {
                    color: 0,
                    placement: [0, 0],
                }
            },
            hind: {
                color: 0,
                flipV: false,
                flipH: false,
                nails: {
                    color: 0,
                    placement: [0, 0],
                }
            },
            gap: 0,
            backOffset: 0
        }

    }
}
