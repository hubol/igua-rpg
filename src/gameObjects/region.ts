import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {game} from "../igua/game";
import {Sprite} from "pixi.js";
import {MessageBox} from "../textures";

export const resolveRegion = resolveGameObject("Region", args => {
    const sprite = Sprite.from(MessageBox).at(args);
    sprite.width = args.width;
    sprite.height = args.height;
    sprite.visible = false;
    return game.gameObjectStage.addChild(sprite);
});