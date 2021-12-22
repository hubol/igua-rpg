import {getInitialFlags} from "./flags";
import {PotionType} from "../inventory/potions";

export function getInitialProgress()
{
    return {
        version: 1,
        health: 100,
        maxHealth: 100,
        valuables: 100,
        level: 1,
        poisonLevel: 0,
        ballons: [] as number[],
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
