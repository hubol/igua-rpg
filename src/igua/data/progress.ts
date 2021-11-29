import {getInitialFlags} from "./flags";

export function getInitialProgress()
{
    return {
        health: 100,
        maxHealth: 100,
        valuables: 0,
        level: 1,
        gotLevelValuable: new Set<string>(),
        clearedBoulder: new Set<string>(),
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
