import {Texture} from "pixi.js";
import {
    BitterMedicinePotion,
    ClawPowderPotion,
    CommonPoisonPotion, CrowbarPotion,
    SpicedNectarPotion,
    SweetBerryPotion,
    WonderBallonPotion
} from "../../textures";
import {progress} from "../data/progress";
import {Badge, Badges} from "../gameplay/badges";
import {getBadgeTexture} from "../gameplay/badgeTextures";

type Cost = [cost: number, deltaCost: number];

function makePotion(name: string, description: string, texture: Texture, cost: Cost) {
    return {name, description, texture, cost};
}

function makeBadgePotion(badge: Badge) {
    return makePotion(badge.name, badge.description, getBadgeTexture(badge.id), [999, 0])
}

export function getCost(type: PotionType) {
    return potions[type].cost[0] + potions[type].cost[1] * (progress.shopPurchases[type] ?? 0);
}

export const potions = {
    ClawPowder: makePotion("Claw Powder", "Increases damage output.", ClawPowderPotion, [80, 12]),
    SpicedNectar: makePotion("Spiced Nectar", "Increases maximum health.", SpicedNectarPotion, [67, 10]),
    SweetBerry: makePotion("Sweet Berry", "Restores some health.", SweetBerryPotion, [12, 1]),
    WonderBallon: makePotion("Wonder Ballon", "Lowers gravity temporarily.", WonderBallonPotion, [5, 1]),
    CommonPoison: makePotion("Common Poison", "Gradually lowers health, but increases running speed.", CommonPoisonPotion, [10, 0]),
    BitterMedicine: makePotion("Bitter Medicine", "Cures poison.", BitterMedicinePotion, [40, 2]),

    RemovingDevice: makePotion("Removing Device", "Removes equipped item.", CrowbarPotion, [999, 0]),
    Shield: makeBadgePotion(Badges.Shield),
    Dexterous: makeBadgePotion(Badges.Dexterous),
    Redirect: makeBadgePotion(Badges.Redirect),
    Cigarette: makeBadgePotion(Badges.Cigarette),
}

export type PotionType = keyof typeof potions;
