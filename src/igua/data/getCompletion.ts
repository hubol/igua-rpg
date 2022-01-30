import {Progress} from "./progress";

export function getDemoCompletion(progress: Progress) {
    let numbers = 0;
    function number(b: boolean) {
        numbers++;
        return b ? 1 : 0;
    }

    const { desert } = progress.flags;
    const { key, bigKey, costumeMirror } = desert;
    return (
        number(key.fromDiggingInTown) + number(key.fromInn) + number(key.fromTopOfCrateStack) +
        number(bigKey.piece1) + number(bigKey.piece2) + number(bigKey.piece3) + number(bigKey.reward) +
        number(desert.unlockedTemple) +
        number(desert.defeatedOversizedAngel) + number(costumeMirror.shardCollected) + number(costumeMirror.repaired)) / numbers;
}