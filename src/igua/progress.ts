export function getInitialProgress()
{
    return {
        health: 20,
        maxHealth: 100,
        valuables: 0,
        gotLevelValuable: new Set<string>(),
        levelName: "Test",
        checkpointName: "none"
    };
}

export const progress = getInitialProgress();

export type Progress = typeof progress;

export function setProgress(p: Progress)
{
    Object.assign(progress, p);
}