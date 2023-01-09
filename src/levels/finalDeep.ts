import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { FinalDeepArgs } from "../levelArgs";
import {applyFinalFilters} from "./finalClimb";
import {DisplayObject, Graphics} from "pixi.js";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {sparkly} from "../gameObjects/sparkleSmall";

export function FinalDeep() {
    scene.backgroundColor = 0x182840;
    scene.terrainColor = 0x4868a0;
    const level = applyOgmoLevel(FinalDeepArgs);

    applyFinalFilters();
    [level.Light1, level.Light2].map(lightColumn);
}

function lightColumn(d: DisplayObject) {
    const r = 4;
    const b = getWorldBounds(d);
    const g = new Graphics()
        .beginFill(0xf0f0ff, 0.2)
        .drawRect(r, 0, b.width - r * 2, b.height)
        .at(b)
        .behind();
    g.ext.sparkleAlpha = 0.25;
    g.ext.sparkleSleep = 375;

    sparkly(g);
}