import {DisplayObject} from "pixi.js";

export function invisibleObject()
{
    const displayObject = new DisplayObject();
    (displayObject as any).render = () => {};
    return displayObject;
}