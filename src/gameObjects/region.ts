import {Sprite} from "pixi.js";
import {MessageBox} from "../textures";
import {scene} from "../igua/scene";
import {resolveGameObject} from "../igua/level/resolveGameObject";

export const resolveRegion = resolveGameObject("Region", args => {
    const sprite = Sprite.from(MessageBox).at(args);
    sprite.width = args.width;
    sprite.height = args.height;
    sprite.visible = false;
    return scene.gameObjectStage.addChild(sprite);
});
