import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleFromDesertArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {Graphics} from "pixi.js";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {resolveBlock} from "../gameObjects/walls";
import {spider} from "../gameObjects/spider";
import {jukebox} from "../igua/jukebox";
import {JungleMusic} from "../musics";

export function JungleFromDesert() {
    jukebox.play(JungleMusic);
    scene.backgroundColor = 0x97D8D8;
    scene.terrainColor = 0x79962E;
    const level = applyOgmoLevel(JungleFromDesertArgs);
    level.ToCave.tint = 0x2F4B5E;
    {
        const {x, y, width, height} = level.ToCaveBackground;
        const g = new Graphics().beginFill(0x877856).drawRect(x, y, width, height);
        scene.backgroundGameObjectStage.addChildAt(g, 0);
        resolveBlock({ x, y, width: 32, height: 8 } as any);
    }
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0x877856);
    if (level.SpiderValuable)
        spider(level.SpiderValuable, [-1, -160], { downUnit: 0.05 }).show();
}