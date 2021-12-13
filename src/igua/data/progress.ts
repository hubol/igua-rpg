import {getInitialFlags} from "./flags";
import {PotionType} from "../inventory/potions";

export function getInitialProgress()
{
    return {
        health: 100,
        maxHealth: 100,
        valuables: 0,
        level: 1,
        gotLevelValuable: new Set<string>(),
        clearedBoulder: new Set<string>(),
        shopPurchases: {} as Record<PotionType, number | undefined>,
        inventory: [] as (PotionType | undefined)[],
        flags: getInitialFlags(),
        levelName: "DesertTown",
        checkpointName: "none"
    };
}

export let progress = getInitialProgress();

export type Progress = typeof progress;

export function setProgress(p: Progress)
{
    progress = p;
}
