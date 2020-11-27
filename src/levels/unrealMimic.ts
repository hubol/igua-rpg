import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealMimicArgs} from "../levelArgs";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {scene} from "../igua/scene";

export function UnrealMimic()
{
    portalFluidConfig.gotoLevelName = "DesertTemple";
    const level = applyOgmoLevel(UnrealMimicArgs);

    scene.backgroundColor = 0xF0C050;
    scene.terrainColor = 0xF05050;
}