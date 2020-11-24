import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {Graphics} from "pixi.js";
import {player} from "./player";
import {playerCharacterHasControl} from "../igua/logic/playerCharacterKey";
import {cutscene} from "../cutscene/cutscene";
import {level} from "../igua/level/level";
import {scene} from "../igua/scene";
import { Teleported } from "../sounds";
import {jukebox} from "../igua/jukebox";
import {game} from "../igua/game";
import {filters} from "pixi.js";

export const portalFluidConfig = {
    gotoLevelName: "Unknown"
};

export const resolvePortalFluid = resolveGameObject("PortalFluid", e => {
    return scene.gameObjectStage.addChild(portalFluid(e).at(e));
});

function portalFluid({ width, height }: { width: number, height: number })
{
    const graphics = new Graphics();

    return graphics
        .beginFill(0x20A090)
        .drawRect(0, 0, width, height)
        .withStep(() => {
            if (playerCharacterHasControl() && graphics.collides(player))
            {
                jukebox.stop();
                Teleported.play();
                scene.ticker.doNextUpdate = false;

                cutscene.play(async p => {
                    await p.show("You have been teleported to the room of doors.");
                    const blurFilter = new filters.BlurFilter(0, 6, 1, 9);
                    game.sceneStage.filters = [blurFilter];
                    await p.lerp(blurFilter, "blur").to(24).over(1_000);
                    game.sceneStage.filters = [];
                    level.goto(portalFluidConfig.gotoLevelName);
                });
            }
        });
}