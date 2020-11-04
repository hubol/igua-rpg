import * as PIXI from "pixi.js";
import {isPlayerInteractingWith} from "../../igua/logic/isPlayerInteractingWith";
import {PropertiesOf} from "../propertiesOf";
import {CollectGeneric} from "../../sounds";
import {player} from "../../gameObjects/player";

declare global {
    namespace PIXI {
        export interface DisplayObject {
            withInteraction(interaction: () => void): this;
            asCollectible<T>(object: T, key: keyof PropertiesOf<T, boolean>);
        }
    }
}

PIXI.DisplayObject.prototype.asCollectible = function (object, key)
{
    return this.withStep(() => {
        if (!object[key] && this.collides(player))
        {
            (object as any)[key] = true;
            CollectGeneric.play();
        }
        if (object[key])
           this.destroy();
    });
}

PIXI.DisplayObject.prototype.withInteraction = function(interaction)
{
    return this.withStep(() => {
        if (isPlayerInteractingWith(this))
            interaction();
    })
}

export default 0;