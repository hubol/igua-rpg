import { Sprite } from "pixi.js";
import {BlueValuable, OrangeValuable} from "../textures";
import {game} from "../game";
import {progress} from "../progress";

type ValuableType = "ValuableBlue" | "ValuableOrange";

export function valuable(x, y, uid, type: ValuableType)
{
    const sprite = Sprite.from(getTexture(type));
    sprite.position.set(x, y);
    sprite.anchor.set(0.5, 1);

    return sprite.withStep(() => {
        if (game.player.collides(sprite))
        {
            progress.gotLevelValuable.add(uid);
            progress.valuables += getValue(type);
            sprite.destroy();
        }
    });
}

function getTexture(type: ValuableType)
{
    switch (type) {
        case "ValuableBlue":
            return BlueValuable;
        case "ValuableOrange":
            return OrangeValuable;
    }
}

function getValue(type: ValuableType)
{
    switch (type)
    {
        case "ValuableBlue":
            return 15;
        case "ValuableOrange":
            return 5;

    }
}