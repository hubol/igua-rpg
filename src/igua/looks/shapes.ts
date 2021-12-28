import * as textures from "../../textures";

type Shape = keyof typeof textures;
const t = <T extends Shape>(x: T) => x;

export const crestShapes = [t('CharacterCrest'), t('NpcCurvedCrest2'), t('NpcHornedCrest'), t('NpcCurvedCrest')] as const;
export const eyeShapes = [t('CharacterWhites')] as const;
export const pupilShapes = [t('CharacterPupils'), t('NpcPupilsWeird')] as const;
export const mouthShapes = [t('CharacterPupils'), t('NpcPupilsWeird')] as const;
export const hornShapes = [t('CharacterPupils'), t('NpcPupilsWeird')] as const;
export const torsoShapes = [t('CharacterPupils'), t('NpcPupilsWeird')] as const;
export const tailShapes = [t('CharacterPupils'), t('NpcPupilsWeird')] as const;
export const footShapes = [t('CharacterPupils'), t('NpcPupilsWeird')] as const;
export const nailShapes = [t('CharacterPupils'), t('NpcPupilsWeird')] as const;
