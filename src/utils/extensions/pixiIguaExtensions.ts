import * as PIXI from "pixi.js";
import {isPlayerInteractingWith} from "../../igua/logic/isPlayerInteractingWith";
import {PropertiesOf} from "../types/propertiesOf";
import {CollectGeneric} from "../../sounds";
import {player} from "../../gameObjects/player";
import {scene} from "../../igua/scene";
import {cutscene, Cutscene} from "../../cutscene/cutscene";

declare global {
    namespace PIXI {
        export interface DisplayObject {
            ahead(): this;
            show(): this;
            behind(): this;
            withInteraction(interaction: () => void): this;
            withCutscene(cutscene: Cutscene): this;
            asCollectible<T>(object: T, key: keyof PropertiesOf<T, boolean>, action?: () => void);
            liveFor(frames: number): this;
        }
    }
}

PIXI.DisplayObject.prototype.show = function () {
    return scene.gameObjectStage.addChild(this);
}

PIXI.DisplayObject.prototype.liveFor = function (frames) {
    return this.withStep(() => {
        if (frames-- <= 0)
            this.destroy();
    });
}

PIXI.DisplayObject.prototype.behind = function () {
    return scene.backgroundGameObjectStage.addChild(this);
}

PIXI.DisplayObject.prototype.ahead = function () {
    return scene.playerStage.addChild(this);
}

PIXI.DisplayObject.prototype.asCollectible = function (object, key, action)
{
    return this.withStep(() => {
        if (!object[key] && this.collides(player))
        {
            (object as any)[key] = true;
            CollectGeneric.play();
            if (action)
                action();
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

PIXI.DisplayObject.prototype.withCutscene = function (scene) {
    return this.withInteraction(() => cutscene.play(scene));
}

export default 0;
