import {Sprite} from "pixi.js";

export function flipH(sprite: Sprite, flip: boolean = true) {
    return flipXY(sprite, 'x', flip);
}

export function flipV(sprite: Sprite, flip: boolean = true) {
    return flipXY(sprite, 'y', flip);
}

function flipXY(sprite: Sprite, key: 'x' | 'y', flip: boolean = true) {
    if (flip) {
        const ogBounds = sprite.getBounds(false).vcpy();
        sprite.scale[key] *= -1;
        const bounds = sprite.getBounds(false).vcpy();
        sprite.pivot.add(bounds.add(ogBounds, -1), -1);
    }

    return sprite;
}