import {progress} from "./progress";
import {getInitialFlags} from "./flags";

export function migrateProgressToNewGamePlus() {
    const previousFlags = progress.flags;
    progress.flags = getInitialFlags();

    progress.flags.desert.costumeMirror = previousFlags.desert.costumeMirror;

    progress.levelName = 'DesertTown';
    progress.checkpointName = 'none';
    progress.newGamePlus += 1;
}