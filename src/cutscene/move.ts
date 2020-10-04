import {CancellationToken} from "pissant";
import {Vector} from "../utils/vector";
import {tickerWait} from "../utils/tickerWait";
import {game} from "../igua/game";
import {lerpVector} from "../utils/math";

export function move(vector: Vector, ct?: CancellationToken)
{
    return new Move(vector, ct);
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
    private readonly _vector: Vector;
    private readonly _cancellationToken?: CancellationToken;

    constructor(vector: Vector, cancellationToken?: CancellationToken)
    {
        this._vector = vector;
        this._cancellationToken = cancellationToken;
    }

    by(speed: Vector): MoveTime;
    by(x: number, y: number): MoveTime;
    by()
    {
        const speed = getVector(arguments);

        return moveOver(async ms => {
            let ticksUntilResolve = (ms / 1000) * game.applicationTicker.maxFPS;

            return await tickerWait(() => {
                    this._vector.x += speed.x;
                    this._vector.y += speed.y;
                    return --ticksUntilResolve <= 0;
                },
                this._cancellationToken);
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

            return await tickerWait(() => {
                    currentTick++;
                    const currentMs = (currentTick * 1000) / game.applicationTicker.maxFPS;
                    const factor = Math.min(currentMs / ms, 1);

                    this._vector.x = start.x;
                    this._vector.y = start.y;
                    lerpVector(this._vector, dest, factor);

                    return factor >= 1;
                },
                this._cancellationToken);
        });
    }
}

function getVector(vectorArgs: IArguments): Vector
{
    if (vectorArgs.length === 2)
        return { x: vectorArgs[0], y: vectorArgs[1] };
    return vectorArgs[0];
}