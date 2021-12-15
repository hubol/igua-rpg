import {getInitialFlags} from "./flags";
import {PotionType} from "../inventory/potions";

export function getInitialProgress()
{
    return {
        health: 100,
        maxHealth: 100,
        valuables: 100,
        level: 1,
        poisonLevel: 0,
        inventory: [] as (PotionType | undefined)[],
        shopPurchases: {} as Record<PotionType, number | undefined>,
        levelName: "DesertTown",
        checkpointName: "none",
        flags: getInitialFlags(),
    };
}

export let progress = getInitialProgress();

export type Progress = typeof progress;

export function setProgress(p: Progress)
{
    progress = p;
}
