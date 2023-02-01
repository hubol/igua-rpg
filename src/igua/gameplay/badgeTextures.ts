import {BadgeId} from "./badges";
import {subimageTextures} from "../../utils/pixi/simpleSpritesheet";
import {UiBadges} from "../../textures";

const rawBadgeTextures = subimageTextures(UiBadges, { width: 20 });

const noBadgeTexture = rawBadgeTextures[4];

const badgeTextureIndices: Partial<Record<BadgeId, number>> = {
    Shield: 0,
    Redirect: 1,
    Dexterous: 2,
    Cigarette: 3,
}

export function getBadgeTexture(id: BadgeId) {
    return rawBadgeTextures[badgeTextureIndices[id] ?? -1] ?? noBadgeTexture;
}