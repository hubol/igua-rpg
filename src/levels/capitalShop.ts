import {scene} from "../igua/scene";
import {CapitalShopArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {mirror} from "../gameObjects/mirror";
import {roundWindow} from "../gameObjects/roundWindow";
import {decalsOf} from "../gameObjects/decal";
import {CapitalArc, GroundSpeckles} from "../textures";

export function CapitalShop() {
    scene.backgroundColor = 0x90A8D8;
    scene.terrainColor = 0xC84010;
    const level = applyOgmoLevel(CapitalShopArgs);

    const { Window } = level;
    mirror(Window.width, Window.height).at(Window).behind();
    roundWindow(Window.width, Window.height, 2).at(Window).tinted(scene.backgroundColor).behind();

    decalsOf(CapitalArc).forEach(x => x.tinted(scene.terrainColor));
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0xF0B020));
}