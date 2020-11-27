import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealMimicArgs} from "../levelArgs";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {scene} from "../igua/scene";
import { filters } from "pixi.js";

export function UnrealMimic()
{
    portalFluidConfig.gotoLevelName = "DesertTemple";
    const level = applyOgmoLevel(UnrealMimicArgs);

    scene.backgroundColor = 0xF0C050;
    scene.terrainColor = 0xF05050;

    const colorMatrixFilter = new filters.ColorMatrixFilter();
    colorMatrixFilter.matrix = [0, 0, 0, 0, 0.25, 0, 0, 0, 0.25, 0, 0, 0, 0, .875, 0, 0, 0, 0, 1, 0];
    level.Mimic.filters = [colorMatrixFilter];
    level.Mimic.x -= 0.1; // TODO this is very messed up
}