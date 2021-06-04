import {lerp, Vector} from "../utils/math/vector";
import {wait} from "./wait";
import {game} from "../igua/game";

export function move(vector: Vector)
{
    return new Move(vector);
}

function moveOver(doMove: (ms: number) => Promise<any>)
{
    return {
        async over(ms: number)
        {
            return await doMove(ms) as void;
        }
    }
}

type MoveTime = ReturnType<typeof moveOver>;

class Move
{
    constructor(private readonly _vector: Vector) { }

    by(speed: Vector): MoveTime;
    by(x: number, y: number): MoveTime;
    by()
    {
        const speed = getVector(arguments);

        return moveOver(async ms => {
            let ticksUntilResolve = (ms / 1000) * game.applicationTicker.maxFPS;

            return await wait(() => {
                    this._vector.x += speed.x;
                    this._vector.y += speed.y;
                    return --ticksUntilResolve <= 0;
                });
        });
    }

    to(dest: Vector): MoveTime;
    to(x: number, y: number): MoveTime;
    to()
    {
        const dest = getVector(arguments);

        return moveOver(async ms => {
            let currentTick = 0;
            const start = { x: this._vector.x, y : this._vector.y };

            return await wait(() => {
                    currentTick++;
                    const currentMs = (currentTick * 1000) / game.applicationTicker.maxFPS;
                    const factor = Math.min(currentMs / ms, 1);

                    this._vector.x = start.x;
                    this._vector.y = start.y;
                    lerp(this._vector, dest, factor);

                    return factor >= 1;
                });
        });
    }
}

function getVector(vectorArgs: IArguments): Vector
{
    if (vectorArgs.length === 2)
        return { x: vectorArgs[0], y: vectorArgs[1] };
    return vectorArgs[0];
}
