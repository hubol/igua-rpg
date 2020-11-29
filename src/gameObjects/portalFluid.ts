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
import {now} from "../utils/now";
import {Rectangle} from "../utils/math/rectangle";

export const portalFluidConfig = {
    gotoLevelName: "Unknown"
};

export const resolvePortalFluid = resolveGameObject("PortalFluid", e => {
    return scene.gameObjectStage.addChild(portalFluid(e).at(e));
});

function drawFluid(g: Graphics, { x, y, width, height }: Rectangle)
{
    const horizontalVertexCount = Math.max(2, Math.round(width / 8));
    const verticalVertexCount = Math.max(2, Math.round(height / 8));

    const ms = now.ms * 0.001;

    g.moveTo(x, y);
    for (let i = 0; i < horizontalVertexCount; i++)
    {
        const xx = x + (i / horizontalVertexCount) * width;
        g.lineTo(xx, y - Math.abs(Math.sin(xx * 4 + ms)) * 2.75);
    }
    g.lineTo(x + width, y);
    for (let i = 0; i < verticalVertexCount; i++)
    {
        const yy = y + (i / verticalVertexCount) * height;
        g.lineTo(x + width + Math.abs(Math.cos(yy * 3 + ms * 1.3)) * 2.75, yy);
    }
    g.lineTo(x + width, y + height);
    for (let i = horizontalVertexCount; i > 0; i--)
    {
        const xx = x + (i / horizontalVertexCount) * width;
        g.lineTo(xx, y + height + Math.abs(Math.cos(-xx * 4.5 + ms * 1.2)) * 2.75);
    }
    g.lineTo(x, y + height);
    for (let i = verticalVertexCount; i > 0; i--)
    {
        const yy = y + (i / verticalVertexCount) * height;
        g.lineTo(x - Math.abs(Math.sin(-yy * 4.2 + ms * 1.1)) * 2.75, yy);
    }
}

function portalFluid({ width, height }: { width: number, height: number })
{
    const graphics = new Graphics();
    graphics.visible = false;

    const wiggle = new Graphics()
        .withStep(() => {
            wiggle
                .clear()
                .beginFill(0x20A090);

            drawFluid(wiggle, { x: graphics.x, y: graphics.y, width, height });
        });

    scene.gameObjectStage.addChild(wiggle);

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