import {Vector} from "../math/vector";
import * as PIXI from "pixi.js";
import {areRectanglesOverlapping, normalizeRectangle, rectangle as createRectangle} from "../math/rectangle";
import {Hitbox} from "../types/hitbox";
import {getOpaquePixelsBounds} from "../pixi/getOpaquePixelsBounds";
import {DisplayObject} from "pixi.js";

declare global {
    namespace PIXI {
        export interface DisplayObject {
            hitbox: Hitbox;
            collides(displayObjects: DisplayObject | DisplayObject[], offset?: Vector): boolean;
            moveUntilCollides(speed: Vector, displayObjects: DisplayObject | DisplayObject[]);
            rectangle: Rectangle;
        }

        export interface Sprite {
            trimHitbox(): this;
        }
    }
}

PIXI.Sprite.prototype.trimHitbox = function () {
    const bounds = getOpaquePixelsBounds(this.texture);
    if (bounds)
        this.hitbox = [
            bounds[0] / this.texture.width,
            bounds[1] / this.texture.height,
            bounds[2] / this.texture.width,
            bounds[3] / this.texture.height];
    return this;
}

Object.defineProperty(PIXI.DisplayObject.prototype, "rectangle", {
    get: function rectangle() {
        if (!this.anchor)
            return normalizeRectangle(createRectangle(this));
        return normalizeRectangle({ x: this.x - this.width * this.anchor.x, y: this.y - this.height * this.anchor.y, width: this.width, height: this.height });
    }
});

PIXI.DisplayObject.prototype.moveUntilCollides = function (speed, otherContainerOrContainers)
{
    return moveUntilCollides(this, speed, otherContainerOrContainers);
}

PIXI.DisplayObject.prototype.collides = function(others, offset)
{
    // Hack for DisplayObjects with different collides implementation (e.g. player) to be preferred
    if (others instanceof DisplayObject && others.hasExt && others.ext.preferMyCollides)
        return others.collides(this, offset);
    return collides(this, others, offset);
}

function moveUntilCollides(container, speed, otherContainerOrContainers)
{
    const signX = Math.sign(speed.x);
    const signY = Math.sign(speed.y);

    while (Math.abs(speed.x) >= 1 || Math.abs(speed.y) >= 1)
    {
        if (Math.abs(speed.x) >= 1)
        {
            if (container.collides(otherContainerOrContainers, { x: signX, y: 0 }))
            {
                speed.x = 0;
            }
            else
            {
                container.x += signX;
                speed.x -= signX;
            }
        }
        if (Math.abs(speed.y) >= 1)
        {
            if (container.collides(otherContainerOrContainers, { x: 0, y: signY }))
            {
                speed.y = 0;
            }
            else
            {
                container.y += signY;
                speed.y -= signY;
            }
        }
    }
}

function getHitboxRectangle(displayObject, rectangle) {
    displayObject.getBounds(false, rectangle);
    if (displayObject.hitbox) {
        rectangle.x += displayObject.hitbox[0] * rectangle.width;
        rectangle.y += displayObject.hitbox[1] * rectangle.height;
        rectangle.width -= (displayObject.hitbox[0] + (1 - displayObject.hitbox[2])) * rectangle.width;
        rectangle.height -= (displayObject.hitbox[1] + (1 - displayObject.hitbox[3])) * rectangle.height;
    }
    return rectangle;
}

const hitboxRectangle1 = new PIXI.Rectangle();
const hitboxRectangle2 = new PIXI.Rectangle();

function collides(srcObject, otherObjectOrObjects, offset)
{
    if (srcObject.destroyed)
        return false;

    const srcHitboxRectangle = getHitboxRectangle(srcObject, hitboxRectangle1);
    if (offset)
    {
        srcHitboxRectangle.x += offset.x;
        srcHitboxRectangle.y += offset.y;
    }

    return collidesImpl(srcHitboxRectangle, otherObjectOrObjects);
}

function collidesImpl(srcHitboxRectangle, otherObjectOrObjects)
{
    if (Array.isArray(otherObjectOrObjects))
    {
        for (let i = 0; i < otherObjectOrObjects.length; i++)
        {
            if (collidesImpl(srcHitboxRectangle, otherObjectOrObjects[i]))
                return true;
        }

        return false;
    }

    if (otherObjectOrObjects.destroyed)
        return false;

    const otherHitboxRectangle = getHitboxRectangle(otherObjectOrObjects, hitboxRectangle2);
    return areRectanglesOverlapping(srcHitboxRectangle, otherHitboxRectangle);
}

export default 0;
