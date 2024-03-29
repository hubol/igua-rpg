import {Graphics, SCALE_MODES, SimpleMesh, Sprite, WRAP_MODES} from "pixi.js";
import {distance, dot, normalize, perpendicular, Vector, vnew} from "../utils/math/vector";
import {CapitalUpblock, GiantsUpblock, JunglePlank, JunglePlankEnd, LeftPipeEnd, Pipe, RightPipeEnd} from "../textures";
import {scene} from "../igua/scene";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {merge} from "../utils/object/merge";


const walls: Wall[] = [];

[CapitalUpblock, GiantsUpblock].forEach(x => x.baseTexture.wrapMode = WRAP_MODES.REPEAT);

const pipeTextures = {
    get main() {
        switch (scene.pipeStage.style) {
            case 1:
                return JunglePlank;
            case 2:
                return CapitalUpblock;
            case 3:
                return GiantsUpblock;
        }
        return Pipe;
    },
    get right() {
        switch (scene.pipeStage.style) {
            case 1:
                return JunglePlankEnd;
        }
        return RightPipeEnd;
    },
    get left() {
        switch (scene.pipeStage.style) {
            case 1:
                return JunglePlankEnd;
        }
        return LeftPipeEnd;
    }
}

export const resolveBlock = resolveGameObject("Block", e => {
    const d = scene.terrainStage.addChild(block(e.x, e.y, e.x + e.width, e.y + e.height));
    if (e.visible === false)
        d.hide();
    return d;
});

export const resolveSlopeRight = resolveGameObject("SlopeRight", e => {
    const s = e.flippedY
        ? slope(e.x, e.y, e.x + e.width, e.y + e.height, false)
        : slope(e.x, e.y + e.height, e.x + e.width, e.y, true);
    return scene.terrainStage.addChild(s);
});

export const resolveSlopeLeft = resolveGameObject("SlopeLeft", e => {
    const s = e.flippedY
        ? slope(e.x, e.y + e.height, e.x + e.width, e.y, false)
        : slope(e.x, e.y, e.x + e.width, e.y + e.height, true);
    return scene.terrainStage.addChild(s);
});

export const resolvePipeRight = resolveGameObject("PipeRight", e =>
    scene.pipeStage.addChild(pipe(e.x, e.y + e.height, e.x + e.width, e.y)));

export const resolvePipeLeft = resolveGameObject("PipeLeft", e =>
    scene.pipeStage.addChild(pipe(e.x, e.y, e.x + e.width, e.y + e.height)));

export const resolvePipeHorizontal = resolveGameObject("PipeHorizontal", e => {
    const pipeChild = pipe(e.x, e.y, e.x + e.width, e.y);
    if ((e as any).visible === false)
        pipeChild.visible = false;
    return scene.pipeStage.addChild(pipeChild);
});

export const resolvePipeRightEnd = resolveGameObject("PipeRightEnd", e => {
    const sprite = Sprite.from(pipeTextures.right);
    sprite.x = e.x;
    sprite.y = e.y;
    return scene.pipeStage.addChild(sprite);
});

export const resolvePipeLeftEnd = resolveGameObject("PipeLeftEnd", e => {
    const sprite = Sprite.from(pipeTextures.left);
    sprite.anchor.set(1, 0);
    sprite.x = e.x;
    sprite.y = e.y;
    return scene.pipeStage.addChild(sprite);
});

function empty(result: PushResult) {
    delete result.hitWall;
    delete result.hitCeiling;
    delete result.hitGround;
    delete result.isOnGround;
    delete result.solidNormal;
}

const isOnGroundResult: PushResult = {};
export function isOnGround(xy: Pushable, radius: number) {
    empty(isOnGroundResult);
    pushImpl(xy, radius, isOnGroundResult, false, true);
    return !!isOnGroundResult.isOnGround;
}

const pushResult: PushResult = {};
export function push(xy: Pushable, radius: number) {
    empty(pushResult);
    return pushImpl(xy, radius, pushResult);
}

const isTouchingSolidResult: PushResult = {};
export function isTouchingSolid(xy: Pushable, radius: number) {
    empty(isTouchingSolidResult);
    pushImpl(xy, radius, isTouchingSolidResult, false, true);
    return !!isTouchingSolidResult.hitWall || !!isTouchingSolidResult.hitWall || !!isTouchingSolidResult.hitCeiling;
}

const getTouchedSolidNormalResult: PushResult = {};
const getTouchedSolidNormalV = vnew();
export function getTouchedSolidNormal(xy: Pushable, radius: number) {
    empty(getTouchedSolidNormalResult);
    pushImpl(xy, radius, getTouchedSolidNormalResult, false, true);
    if (getTouchedSolidNormalResult.solidNormal)
        return getTouchedSolidNormalV.at(getTouchedSolidNormalResult.solidNormal);
}

function pushImpl(xy: Pushable, radius: number, result: PushResult, correctPosition = true, stopIfOnGround = false) {
    for (let i = 0; i < walls.length; i++) {
        const s = walls[i];
        if (s.active === false)
            continue;
        const offset = {x: xy.x - s.x, y: xy.y - s.y};
        const offsetDotNormal = dot(offset, s.normal);
        const offsetDotForward = dot(offset, s.forward);
        const alongForward = offsetDotForward > 0 && offsetDotForward < s.length;
        const absOffsetDotNormal = Math.abs(offsetDotNormal);

        const shouldCorrectPosition = !s.isPipe
            || (xy.vspeed === undefined || (xy.vspeed > 0 && offsetDotNormal >= 0) || (xy.vspeed === 0 && offsetDotNormal >= radius * .9))
            || (s.normal.x !== 0 && xy.hspeed !== undefined && (xy.hspeed !== 0 && Math.sign(s.normal.x) !== Math.sign(xy.hspeed)));
        const isGround = s.isGround && shouldCorrectPosition;

        if (alongForward && absOffsetDotNormal < radius + 0.1 && isGround) {
            result.isOnGround = true;
            result.solidNormal = s.normal;
            if (stopIfOnGround)
                break;
        }

        if (shouldCorrectPosition && absOffsetDotNormal < radius) {
            if (alongForward) {
                if (isGround)
                    result.hitGround = true;
                if (s.isCeiling)
                    result.hitCeiling = true;
                if (s.isWall)
                    result.hitWall = true;
                result.solidNormal = s.normal;

                if (correctPosition) {
                    xy.x = s.x + s.forward.x * offsetDotForward + s.normal.x * radius;
                    xy.y = s.y + s.forward.y * offsetDotForward + s.normal.y * radius;
                }
            }
        }
    }

    return result;
}

const temp = { xmin: 0, xmax: 0, ymin: 0, ymax: 0, width: 0, height: 0 };

function computeBox(x0: number, y0: number, x1: number, y1: number) {
    temp.xmin = Math.min(x0, x1);
    temp.xmax = Math.max(x0, x1);
    temp.ymin = Math.min(y0, y1);
    temp.ymax = Math.max(y0, y1);

    temp.width = temp.xmax - temp.xmin;
    temp.height = temp.ymax - temp.ymin;

    return temp;
}

export function block(x0: number, y0: number, x1: number, y1: number)
{
    const { width, xmax, xmin, ymin, ymax, height } = computeBox(x0, y0, x1, y1);

    const graphics = new Graphics();
    graphics.tint = scene.terrainColor;
    graphics.beginFill(0xffffff);
    graphics.drawRect(xmin, ymin, width, height);
    graphics.endFill();
    graphics.ext.isBlock = true;

    const leftWall = { x: xmin, y: ymin, forward: { x: 0, y: 1 }, normal: { x: -1, y: 0 }, length: height, isWall: true };
    const rightWall = { x: xmax, y: ymin, forward: { x: 0, y: 1 }, normal: { x: 1, y: 0 }, length: height, isWall: true};
    const topWall = { x: xmin, y: ymin, forward: { x: 1, y: 0 }, normal: { x: 0, y: -1 }, length: width, isGround: true};
    const bottomWall = { x: xmin, y: ymax, forward: { x: 1, y: 0 }, normal: { x: 0, y: 1 }, length: width, isCeiling: true};

    graphics.on('added', () => walls.push(leftWall, rightWall, topWall, bottomWall));
    graphics.on('removed', () => walls.removeFirst(leftWall, rightWall, topWall, bottomWall));
    const recreateBlock = () => {
        const bounds = graphics.geometry.bounds;
        const newBox = computeBox(bounds.minX + graphics.x, bounds.minY + graphics.y, bounds.maxX + graphics.x, bounds.maxY + graphics.y);
        leftWall.x = newBox.xmin;
        leftWall.y = newBox.ymin;
        leftWall.length = newBox.height;
        rightWall.x = newBox.xmax;
        rightWall.y = newBox.ymin;
        rightWall.length = newBox.height;
        topWall.x = newBox.xmin;
        topWall.y = newBox.ymin;
        topWall.length = newBox.width;
        bottomWall.x = newBox.xmin;
        bottomWall.y = newBox.ymax;
        bottomWall.length = newBox.width;
    }
    graphics.transform.onPositionChanged(recreateBlock);
    graphics.transform.onScaleChanged(recreateBlock);

    return graphics;
}

export function slope(x0: number, y0: number, x1: number, y1: number, isGround: boolean)
{
    const { forward, length, normal } = getSlopeWallProperties(x0, y0, x1, y1, isGround);

    const graphics = new Graphics();
    graphics.tint = scene.terrainColor;
    graphics.beginFill(0xffffff);
    graphics.moveTo(x0, y0);

    if ((isGround && y0 > y1) || (!isGround && y0 < y1))
        graphics.lineTo(x1, y0);
    else
        graphics.lineTo(x0, y1);

    graphics.lineTo(x1, y1);

    graphics.closePath();
    graphics.endFill();

    const slopeWall = { x: x0, y: y0, forward, normal, length, isGround, isCeiling: !isGround };
    const bottomWall = isGround
        ? { x: Math.min(x0, x1), y: Math.max(y0, y1), forward: { x: 1, y: 0 }, normal: { x: 0, y: 1 }, length: Math.abs(x0 - x1), isCeiling: true}
        : { x: Math.min(x0, x1), y: Math.min(y0, y1), forward: { x: 1, y: 0 }, normal: { x: 0, y: -1 }, length: Math.abs(x0 - x1), isGround: true};

    const sideWallX = ((isGround && y0 < y1) || (!isGround && y0 > y1)) ? x0 : x1;
    const hasRightSideWall = sideWallX === Math.max(x0, x1);
    const sideWall = { x: sideWallX, y: Math.min(y0, y1), forward: { x: 0, y: 1 }, normal: { x: hasRightSideWall ? 1 : -1, y: 0 }, length: Math.abs(y0 - y1), isWall: true};

    graphics.on('added', () => walls.push(slopeWall, bottomWall, sideWall));
    graphics.on('removed', () => walls.removeFirst(slopeWall, bottomWall, sideWall));

    return graphics;
}

export function pipe(x0: number, y0: number, x1: number, y1: number)
{
    const { forward, length, normal } = getSlopeWallProperties(x0, y0, x1, y1, true);
    const texture = pipeTextures.main;
    const height = texture === Pipe ? 16 : texture.height;
    const uvx = texture.baseTexture.wrapMode === WRAP_MODES.REPEAT ? length / texture.width : 0;

    if (uvx === 0)
        texture.baseTexture.scaleMode = SCALE_MODES.LINEAR;

    let dy = 0;
    if (texture === GiantsUpblock)
        dy = -2;

    const simpleMesh = new SimpleMesh(
        texture,
        new Float32Array([ x0, y0 + dy, x1, y1 + dy, x1, y1 + height + dy, x0, y0 + height + dy]),
        new Float32Array([ 0, 0, uvx, 0, uvx, 1, 0, 1]),
        new Uint16Array([ 0, 1, 3, 1, 2, 3 ]));

    const slopeWall = { x: x0, y: y0, forward, normal, length, isGround: true, isPipe: true, active: true };

    simpleMesh.on('added', () => walls.push(slopeWall));
    simpleMesh.on('removed', () => walls.removeFirst(slopeWall));

    return merge(simpleMesh, { get active() { return slopeWall.active; }, set active(value) { slopeWall.active = value; } });
}

function getSlopeWallProperties(x0: number, y0: number, x1: number, y1: number, isGround: boolean)
{
    return {
        forward: getSlopeForward(x0, y0, x1, y1),
        normal: getSlopeNormal(x0, y0, x1, y1, isGround),
        length: distance({x: x0, y: y0}, {x: x1, y: y1}),
    };
}

function getSlopeForward(x0, y0, x1, y1)
{
    return normalize({ x: x1 - x0, y: y1 - y0 });
}

function getSlopeNormal(x0, y0, x1, y1, isGround: boolean)
{
    const vector = y0 < y1
        ? { x: x1 - x0, y: y1 - y0 }
        : { x: x0 - x1, y: y0 - y1 };
    const perpendicularVector = perpendicular(vector);
    if ((isGround && perpendicularVector.y > 0) || (!isGround && perpendicularVector.y < 0))
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
    solidNormal?: Vector;
}

export interface Pushable
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
    active?: boolean;
}
