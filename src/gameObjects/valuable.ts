import { Sprite } from "pixi.js";
import {BlueValuable, OrangeValuable} from "../textures";
import {game} from "../igua/game";
import {progress} from "../igua/progress";
import {smallPop} from "./smallPop";
import {CollectValuable, CollectValuableSmall} from "../sounds";

type ValuableType = "ValuableBlue" | "ValuableOrange";

export function valuable(x, y, uid, type: ValuableType)
{
    const sprite = Sprite.from(getTexture(type));
    sprite.position.set(x, y);
    sprite.anchor.set(0.5, 1);

    return sprite.withStep(() => {
        if (game.player.collides(sprite))
        {
            const particle = smallPop(12);
            particle.position.set(sprite.x, sprite.y - 7);

            progress.gotLevelValuable.add(uid);
            progress.valuables += getValue(type);
            const sound = getSound(type);
            sound.volume(0.5);
            sound.play();
            sprite.destroy();
        }
    });
}

function getSound(type: ValuableType)
{
    switch (type) {
        case "ValuableBlue":
            return CollectValuable;
        case "ValuableOrange":
            return CollectValuableSmall;
    }
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