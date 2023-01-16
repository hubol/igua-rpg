import {Sprite} from "pixi.js";
import {MessageBox} from "../textures";
import {scene} from "../igua/scene";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {GameObjectArgs} from "../../tools/gen-levelargs/types/gameObjectArgs";
import {track} from "../igua/track";

function regionImpl(args: GameObjectArgs) {
    const sprite = Sprite.from(MessageBox).at(args);
    sprite.width = args.width;
    sprite.height = args.height;
    sprite.visible = false;
    return scene.gameObjectStage.addChild(sprite);
}

export const region = track(regionImpl);

export const arenaRegion = track(regionImpl);

export const resolveRegion = resolveGameObject("Region", region);

export const resolveArenaRegion = resolveGameObject("ArenaRegion", arenaRegion);