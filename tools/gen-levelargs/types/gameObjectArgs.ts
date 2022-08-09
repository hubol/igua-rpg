export type GameObjectArgs = GameObjectArgsBase & Record<string, any>;

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
    nodes: { x: number, y: number }[];
}
