import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealMimicArgs} from "../levelArgs";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {scene} from "../igua/scene";
import { filters } from "pixi.js";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {desertBigKeyTextures} from "./desertTemple";
import {jukebox} from "../igua/jukebox";
import {Mimic} from "../musics";

export function UnrealMimic()
{
    jukebox.play(Mimic);
    portalFluidConfig.gotoLevelName = "DesertTemple";
    const level = applyOgmoLevel(UnrealMimicArgs);

    scene.backgroundColor = 0xF0C050;
    scene.terrainColor = 0xF05050;

    const colorMatrixFilter = new filters.ColorMatrixFilter();
    colorMatrixFilter.matrix = [0, 0, 0, 0, 0.25, 0, 0, 0, 0.25, 0, 0, 0, 0, .875, 0, 0, 0, 0, 1, 0];
    level.Mimic.filters = [colorMatrixFilter];

    scene.backgroundGameObjectStage.addChild(
        bigKeyPiece(progress.flags.desert.bigKey, desertBigKeyTextures[1], "piece2")
            .at(level.BigKeyPiece)
    );

    function defeatMimic()
    {
        level.PlayerFloorBlock.destroy();
        scene.gameObjectStage.withAsync(async p => {
            await Promise.all([
                p.lerp(level.Mimic.scale, "x").to(0).over(1000),
                p.lerp(level.Mimic.scale, "y").to(0).over(1000),
                p.lerp(level.Mimic, "angle").to(720).over(1000)
                ]);
        });
    }

    setTimeout(defeatMimic, 2000);
}