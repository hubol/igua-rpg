import {Graphics, SCALE_MODES, SimpleMesh} from "pixi.js";
import {distance, dot, normalize, perpendicular, Vector} from "../utils/vector";
import {Pipe} from "../textures";
import {game} from "../igua/game";
import {EntityCommon} from "../igua/level/createGameObjects";

const walls: Wall[] = [];

export function resolveBlock(e: EntityCommon)
{
    return game.terrainStage.addChild(block(e.x, e.y, e.x + e.width, e.y + e.height));
}

export function push(xy: Pushable, radius: number) {
    const result: PushResult = {};

    walls.forEach(s => {
        const offset = {x: xy.x - s.x, y: xy.y - s.y};
        const offsetDotNormal = dot(offset, s.normal);
        const offsetDotForward = dot(offset, s.forward);
        const alongForward = offsetDotForward > 0 && offsetDotForward < s.length;
        const absOffsetDotNormal = Math.abs(offsetDotNormal);

        const canCorrectPosition = !s.isPipe
            || (xy.vspeed === undefined || (xy.vspeed > 0 && offsetDotNormal >= 0) || (xy.vspeed === 0 && offsetDotNormal >= radius * .9))
            || (s.normal.x !== 0 && xy.hspeed !== undefined && (xy.hspeed !== 0 && Math.sign(s.normal.x) !== Math.sign(xy.hspeed)));
        const isGround = s.isGround && canCorrectPosition;

        if (alongForward && absOffsetDotNormal === radius && isGround) {
            result.isOnGround = true;
        }

        if (canCorrectPosition && absOffsetDotNormal < radius) {
            if (alongForward) {
                if (isGround)
                    result.hitGround = true;
                if (s.isCeiling)
                    result.hitCeiling = true;
                if (s.isWall)
                    result.hitWall = true;

                xy.x = s.x + s.forward.x * offsetDotForward + s.normal.x * radius;
                xy.y = s.y + s.forward.y * offsetDotForward + s.normal.y * radius;
            }
        }
    });

    return result;
}

export function block(x0: number, y0: number, x1: number, y1: number)
{
    const xmin = Math.min(x0, x1);
    const xmax = Math.max(x0, x1);
    const ymin = Math.min(y0, y1);
    const ymax = Math.max(y0, y1);

    const width = xmax - xmin;
    const height = ymax - ymin;

    const graphics = new Graphics();
    graphics.beginFill();
    graphics.drawRect(xmin, ymin, width, height);
    graphics.endFill();

    const leftWall = { x: xmin, y: ymin, forward: { x: 0, y: 1 }, normal: { x: -1, y: 0 }, length: height, isWall: true };
    const rightWall = { x: xmax, y: ymin, forward: { x: 0, y: 1 }, normal: { x: 1, y: 0 }, length: height, isWall: true};
    const topWall = { x: xmin, y: ymin, forward: { x: 1, y: 0 }, normal: { x: 0, y: -1 }, length: width, isGround: true};
    const bottomWall = { x: xmin, y: ymax, forward: { x: 1, y: 0 }, normal: { x: 0, y: 1 }, length: width, isCeiling: true};

    graphics.on('added', () => walls.push(leftWall, rightWall, topWall, bottomWall));
    graphics.on('removed', () => walls.remove(leftWall, rightWall, topWall, bottomWall));

    return graphics;
}

export function slope(x0: number, y0: number, x1: number, y1: number)
{
    const { forward, length, normal } = getSlopeWallProperties(x0, y0, x1, y1);

    const graphics = new Graphics();
    graphics.beginFill();
    graphics.moveTo(x0, y0);
    if (y0 > y1)
        graphics.lineTo(x1, y0);
    else
        graphics.lineTo(x0, y1);

    graphics.lineTo(x1, y1);
    graphics.closePath();
    graphics.endFill();

    const slopeWall = { x: x0, y: y0, forward, normal, length, isGround: true };
    const bottomWall = { x: Math.min(x0, x1), y: Math.max(y0, y1), forward: { x: 1, y: 0 }, normal: { x: 0, y: 1 }, length: Math.abs(x0 - x1), isCeiling: true};

    const sideWallX = y0 < y1 ? x0 : x1;
    const hasRightSideWall = sideWallX === Math.max(x0, x1);
    const sideWall = { x: sideWallX, y: Math.min(y0, y1), forward: { x: 0, y: 1 }, normal: { x: hasRightSideWall ? 1 : -1, y: 0 }, length: Math.abs(y0 - y1), isWall: true};

    graphics.on('added', () => walls.push(slopeWall, bottomWall, sideWall));
    graphics.on('removed', () => walls.remove(slopeWall, bottomWall, sideWall));

    return graphics;
}

export function pipe(x0: number, y0: number, x1: number, y1: number)
{
    const { forward, length, normal } = getSlopeWallProperties(x0, y0, x1, y1);

    Pipe.baseTexture.scaleMode = SCALE_MODES.LINEAR;

    const simpleMesh = new SimpleMesh(
        Pipe,
        new Float32Array([ x0, y0, x1, y1, x1, y1 + 16, x0, y0 + 16]),
        new Float32Array([ 0, 0, 0, 0, 0, 1, 0, 1]),
        new Uint16Array([ 0, 1, 3, 1, 2, 3 ]));

    const slopeWall = { x: x0, y: y0, forward, normal, length, isGround: true, isPipe: true };

    simpleMesh.on('added', () => walls.push(slopeWall));
    simpleMesh.on('removed', () => walls.remove(slopeWall));

    return simpleMesh;
}

function getSlopeWallProperties(x0: number, y0: number, x1: number, y1: number)
{
    return {
        forward: getSlopeForward(x0, y0, x1, y1),
        normal: getSlopeNormal(x0, y0, x1, y1),
        length: distance({x: x0, y: y0}, {x: x1, y: y1}),
    };
}

function getSlopeForward(x0, y0, x1, y1)
{
    return normalize({ x: x1 - x0, y: y1 - y0 });
}

function getSlopeNormal(x0, y0, x1, y1)
{
    const vector = y0 < y1
        ? { x: x1 - x0, y: y1 - y0 }
        : { x: x0 - x1, y: y0 - y1 };
    const perpendicularVector = perpendicular(vector);
    if (perpendicularVector.y > 0)
    {
        perpendicularVector.x *= -1;
        perpendicularVector.y *= -1;
    }
    return normalize(perpendicularVector);
}

interface PushResult
{
    isOnGround?: boolean;
    hitGround?: boolean;
    hitCeiling?: boolean;
    hitWall?: boolean;
}

interface Pushable
{
    x: number;
    y: number;
    hspeed?: number;
    vspeed?: number;
}

interface Wall
{
    x: number;
    y: number;
    forward: Vector;
    normal: Vector;
    length: number;
    isGround?: boolean;
    isCeiling?: boolean;
    isWall?: boolean;
    isPipe?: boolean;
}