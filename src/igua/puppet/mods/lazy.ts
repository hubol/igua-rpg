import {Container} from "pixi.js";
import {game} from "../../game";
import {distance} from "../../../utils/math/vector";
import {IguanaPuppetMod} from "../mods";

export const Lazy: IguanaPuppetMod = puppet => {
    return new Container().withStep(() => {
        puppet.isDucking = !(Math.sign(game.player.scale.x) !== Math.sign(puppet.scale.x)
            && ((puppet.scale.x > 0 && game.player.x >= puppet.x + 16) || (puppet.scale.x < 0 && game.player.x <= puppet.x - 16))
            && distance(game.player, puppet) < 128);
    });
}