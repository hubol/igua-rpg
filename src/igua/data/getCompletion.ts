import {Progress} from "./progress";
import {RegionKeys} from "../gameplay/regionKeys";
import {desertKeys} from "../../levels/desertTemple";
import {jungleKeys} from "../../levels/jungleTemple";
import {volcanoKeys} from "../../levels/volcanoTemple";
import {capitalKeys} from "../../levels/capitalTemple";

type ProgressBigKey = { reward: boolean; piece1: boolean; piece2: boolean; piece3: boolean; };

export function getCompletion(progress: Progress) {
    let numbers = 0;
    function n(b: boolean) {
        numbers++;
        return b ? 1 : 0;
    }

    function k(srcKeys: RegionKeys) {
        const keys = srcKeys.clone(progress);
        return n(keys.key1) + n(keys.key2) + n(keys.key3);
    }

    function b(big: ProgressBigKey) {
        return n(big.piece1) + n(big.piece2) + n(big.piece3) + n(big.reward);
    }

    const { desert, jungle, volcano } = progress.flags;
    const { bigKey: desertBigKey, costumeMirror } = desert;
    const { bigKey: jungleBigKey } = jungle;
    const { bigKey: volcanoBigKey } = volcano;
    return (
        k(desertKeys) +
        b(desertBigKey) +
        n(desert.unlockedTemple) +
        n(desert.defeatedOversizedAngel) + n(costumeMirror.shardCollected) + n(costumeMirror.repaired) +

        k(jungleKeys) +
        b(jungleBigKey) +
        n(jungle.defeatedUnorthodoxAngel) +

        k(volcanoKeys) +
        b(volcanoBigKey) +
        n(volcano.defeatedVileAngel) +

        k(capitalKeys)) / numbers;
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