import {localStorageEntry} from "../../utils/browser/localStorageEntry";
import {getInitialProgress, Progress} from "./progress";
import serializeJavascript from "serialize-javascript";
import {defaults} from "../../utils/defaults";
import {detailedDiff} from "deep-object-diff";
import {ChooseYourLooks} from "../../levels/chooseYourLooks";
import {Looks} from "../looks/looksModel";
import {sceneStack} from "../scene";

export async function readAndConvertProgressFile(file: string) {
    const progress: Progress = localStorageEntry<any>(file).read();
    if (!progress)
        return;
    const beforeText = serializeJavascript(progress);
    const hasLooks = !!progress.looks;
    upgradeProgressVersion(progress);
    const convertedProgress = defaults(getInitialProgress(), progress);
    // TODO this can be safely removed at a later date
    if (!hasLooks)
        await chooseYourLooks(progress);

    const afterText = serializeJavascript(convertedProgress);

    if (beforeText !== afterText) {
        console.log(`The save file was modified to reflect a new version and/or defaults.`);
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

function upgradeProgressVersion(progress: Partial<Progress>) {
    switch (progress.version) {
        case undefined:
            progress.version = 1;
    }
}

function chooseYourLooks(progress: Progress) {
    return new Promise<void>(r => {
        function save(looks: Looks) {
            progress.looks = looks;
            r();
        }
        sceneStack.push(() => ChooseYourLooks({ save }), { isLevel: false });
    });
}
