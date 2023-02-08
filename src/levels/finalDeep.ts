import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { FinalDeepArgs } from "../levelArgs";
import {applyFinalFilters} from "./finalClimb";
import {DisplayObject, Graphics} from "pixi.js";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {sparkly} from "../gameObjects/sparkleSmall";
import {player} from "../gameObjects/player";
import {container} from "../utils/pixi/container";
import {makeShadowCastFilter, ShadowCastDirection} from "../gameObjects/lightRayCrude";
import {jukebox} from "../igua/jukebox";
import {EmoWizard, FinalTempleMusic} from "../musics";
import {decalsOf} from "../gameObjects/decal";
import {Boulder} from "../textures";

export function FinalDeep() {
    scene.backgroundColor = 0x182840;
    scene.terrainColor = 0x4868a0;
    const level = applyOgmoLevel(FinalDeepArgs);

    jukebox.play(EmoWizard).warm(FinalTempleMusic);

    applyFinalFilters(739.39);

    ShadowCastDirection.value.x = 0;
    container(...[level.Light1, level.Light2].map(lightColumn)).filter(makeShadowCastFilter()).ahead(player.index + 1);

    decalsOf(Boulder).forEach(x => x.opaqueTint = scene.terrainColor);

    if (player.y < 160)
        player.vspeed = -2;
}

function lightColumn(d: DisplayObject) {
    const r = 4;
    const b = getWorldBounds(d);
    const g = new Graphics()
        .beginFill(0xf0f0ff, 0.2)
        .drawRect(r, 0, b.width - r * 2, b.height)
        .at(b);
    g.ext.sparkleAlpha = 0.25;
    g.ext.sparkleSleep = 375;

    sparkly(g);
    return g;
}