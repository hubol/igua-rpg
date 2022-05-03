import {Progress} from "./progress";

export function getCompletion(progress: Progress) {
    let numbers = 0;
    function n(b: boolean) {
        numbers++;
        return b ? 1 : 0;
    }

    const { desert, jungle } = progress.flags;
    const { key: dk, bigKey: dbk, costumeMirror } = desert;
    const { key: jk, bigKey: jbk } = jungle;
    return (
        n(dk.fromDiggingInTown) + n(dk.fromInn) + n(dk.fromTopOfCrateStack) +
        n(dbk.piece1) + n(dbk.piece2) + n(dbk.piece3) + n(dbk.reward) +
        n(desert.unlockedTemple) +
        n(desert.defeatedOversizedAngel) + n(costumeMirror.shardCollected) + n(costumeMirror.repaired) +
        n(jk.fromBiguaRepair) + n(jk.fromSpider) + n(jk.fromSickIguana) +
        n(jbk.piece1) + n(jbk.piece2) + n(jbk.piece3) + n(jbk.reward)) / numbers;
}

/*
function getDemoCompletion(progress: Progress) {
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
 */