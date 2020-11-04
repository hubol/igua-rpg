import {Container} from "pixi.js";
import {distance} from "../../../utils/math/vector";
import {IguanaPuppetMod} from "../mods";
import {player} from "../../../gameObjects/player";

export const Lazy: IguanaPuppetMod = puppet => {
    return new Container().withStep(() => {
        puppet.isDucking = !(Math.sign(player.scale.x) !== Math.sign(puppet.scale.x)
            && ((puppet.scale.x > 0 && player.x >= puppet.x + 16) || (puppet.scale.x < 0 && player.x <= puppet.x - 16))
            && distance(player, puppet) < 128);
    });
}