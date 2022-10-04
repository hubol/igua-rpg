import {container} from "../utils/pixi/container";
import {game} from "./game";
import {DisplayObject} from "pixi.js";

export function forceRenderable(d: DisplayObject) {
    // Beware! Deranged hack. Pixi artificially sets renderable to false of mask objects. So I have to reset it every frame ^_^
    return container().withTicker(game.hudStage.ticker).withStep(() => d.renderable = true).show();
}