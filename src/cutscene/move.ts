import {lerp, Vector, vnew} from "../utils/math/vector";
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
            let ticksUntilResolve = (ms / 1000) * game.maxFps;

            return await wait(() => {
                    this._vector.x += speed.x;
                    this._vector.y += speed.y;
                    return --ticksUntilResolve <= 0;
                });
        });
    }

    off(offset: Vector): MoveTime;
    off(x: number, y: number): MoveTime;
    off()
    {
        const offset = getVector(arguments);
        const traveled = vnew();
        const next = vnew();

        const sx = Math.sign(offset.x);
        const sy = Math.sign(offset.y);

        return moveOver(async ms => {
            let currentTick = 0;

            return await wait(() => {
                currentTick++;
                const currentMs = (currentTick * 1000) / game.maxFps;
                const factor = Math.min(currentMs / ms, 1);
                next.at(offset).scale(factor);
                if (Math.abs(next.x - traveled.x) >= 1) {
                    this._vector.x += sx;
                    traveled.x += sx;
                }
                if (Math.abs(next.y - traveled.y) >= 1) {
                    this._vector.y += sy;
                    traveled.y += sy;
                }

                if (factor >= 1) {
                    this._vector.x += offset.x - traveled.x;
                    this._vector.y += offset.y - traveled.y;
                    return true;
                }

                return false;
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
                    const currentMs = (currentTick * 1000) / game.maxFps;
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
