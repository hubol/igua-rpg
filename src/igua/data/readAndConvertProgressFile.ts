import {localStorageEntry} from "../../utils/browser/localStorageEntry";
import {getInitialProgress, Progress} from "./progress";
import serializeJavascript from "serialize-javascript";
import {defaults} from "../../utils/object/defaults";
import {detailedDiff} from "deep-object-diff";

export async function readAndConvertProgressFile(file: string) {
    const progress: Progress = localStorageEntry<any>(file).read();
    if (!progress)
        return;
    const beforeText = serializeJavascript(progress);
    upgradeProgressVersion(progress);
    const convertedProgress = defaults(getInitialProgress(), progress);

    const afterText = serializeJavascript(convertedProgress);

    if (beforeText !== afterText) {
        console.log(`The save file (${file}) was modified to reflect a new version and/or defaults.`);
        const { added, updated, deleted } = detailedDiff(eval(`(${beforeText})`), eval(`(${afterText})`)) as any;
        logObject('Added', added, 'background-color: #ccffcc;');
        logObject('Updated', updated, 'background-color: #ccccff;');
        logObject('Deleted', deleted, 'background-color: #ffcccc;');
        localStorageEntry(file).write(progress);
    }

    return convertedProgress as Progress;
}

function logObject(title, object, color) {
    if (Object.keys(object).length === 0)
        return;
    console.log(`%c${title} ${JSON.stringify(object)}`, color);
}

function upgradeProgressVersion(progress: Progress & Record<string, any>) {
    switch (progress.version) {
        case undefined:
            progress.version = 1;
        case 1:
            progress.levels.vigor = Math.round((progress.maxHealth - 100) / 15);
            progress.levels.strength = progress.level;
            progress.levels.intelligence = progress.intelligenceLevel;

            progress.status.poison = progress.poisonLevel;
            progress.status.ballons = progress.ballons;

            progress.version = 2;
    }
}
