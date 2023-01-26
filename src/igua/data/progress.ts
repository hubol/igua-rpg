import {getInitialFlags} from "./flags";
import {PotionType} from "../inventory/potions";
import {getDefaultLooks} from "../looks/getDefaultLooks";
import {BadgeId} from "../gameplay/badges";

export function getInitialProgress()
{
    return {
        version: 2,
        health: 100,
        valuables: 100,
        looks: getDefaultLooks(),
        equipment: {
            badge: 'None' as BadgeId,
        },
        status: {
            poison: 0,
            ballons: [] as number[],
            burn: 0,
            combo: 0,
            comboTimer: 0,
            successfulDuckTimer: 0,
        },
        levels: {
            strength: 1,
            intelligence: 0,
            vigor: 0,
            humor: 0,
        },
        inventory: [] as (PotionType | undefined)[],
        shopPurchases: {} as Record<PotionType, number | undefined>,
        levelName: "ChooseYourLooksBeginning",
        checkpointName: "none",
        newGamePlus: 0,
        flags: getInitialFlags(),
    };
}

export let progress = getInitialProgress();

export type Progress = typeof progress;

export function setProgress(p: Progress)
{
    progress = p;
}
