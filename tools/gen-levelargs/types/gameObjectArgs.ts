import {AtLeast} from "../../../src/utils/types/atLeast";

export type GameObjectArgs = AtLeast<GameObjectArgsBase>;

interface GameObjectArgsBase
{
    type: string;
    uid: string;
    x: number;
    y: number;
    width: number;
    height: number;
    flippedX: boolean;
    flippedY: boolean;
}