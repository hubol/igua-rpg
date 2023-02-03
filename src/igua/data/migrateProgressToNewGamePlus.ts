import {progress} from "./progress";
import {getInitialFlags} from "./flags";

export function migrateProgressToNewGamePlus() {
    progress.flags = getInitialFlags();
    progress.newGamePlus += 1;
}