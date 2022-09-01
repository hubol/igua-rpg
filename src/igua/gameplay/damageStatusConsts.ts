import {progress} from "../data/progress";

export const damageStatusConsts = {
    burnStatusDrain: 20,
    get burnStatusBuildUp() {
        return progress.flags.volcano.bigKey.reward ? 1 : 8;
    },
    get burnStatusRecover() {
        return progress.flags.volcano.bigKey.reward ? 2 : 1;
    },
    get burnStatusResistance() {
        return 400;
    }
}