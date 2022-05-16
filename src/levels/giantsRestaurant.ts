import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {GiantsNimbusMusic} from "../musics";
import {GiantsRestaurantArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {shrunkenSalad} from "../gameObjects/shrunkenSalad";
import {mirror} from "../gameObjects/mirror";
import {Graphics} from "pixi.js";
import {container} from "../utils/pixi/container";
import {decalsOf} from "../gameObjects/decal";
import {CloudLong} from "../textures";

export function GiantsRestaurant() {
    scene.terrainColor = 0x98C0E0;
    scene.backgroundColor = 0xF8E8E8;
    jukebox.warm(GiantsNimbusMusic);
    const level = applyOgmoLevel(GiantsRestaurantArgs);
    shrunkenSalad().at(level.Salad).show();
    const w = level.MirrorRegion.width;
    const h = level.MirrorRegion.height;
    const m = mirror(w, h, 0x98C0E0).at(level.MirrorRegion).behind();
    m.mask = new Graphics().beginFill(0).drawEllipse(w / 2, h / 2, w / 2, h / 2).show(m);
    decalsOf(CloudLong).forEach(x => x.tint = 0xF7CACA);
    level.OrnateCarpet.hueShift = 105;
    // m.mask = new Graphics().beginFill(0xffffff).drawRect(0, 0, w, h).show(m);
}