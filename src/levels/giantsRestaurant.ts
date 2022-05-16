import {scene} from "../igua/scene";
import {jukebox} from "../igua/jukebox";
import {GiantsNimbusMusic} from "../musics";
import {GiantsRestaurantArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {shrunkenSalad} from "../gameObjects/shrunkenSalad";

export function GiantsRestaurant() {
    scene.terrainColor = 0x98C0E0;
    scene.backgroundColor = 0xF8E8E8;
    jukebox.warm(GiantsNimbusMusic);
    const level = applyOgmoLevel(GiantsRestaurantArgs);
    shrunkenSalad().at(level.Salad).show();
}