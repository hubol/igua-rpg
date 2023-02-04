import {progress} from "./progress";
import {getInitialFlags} from "./flags";

export function migrateProgressToNewGamePlus() {
    progress.flags = getInitialFlags();
    progress.levelName = 'DesertTown';
    progress.checkpointName = 'none';
    progress.newGamePlus += 1;
}