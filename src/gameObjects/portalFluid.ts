import {Container, Graphics} from "pixi.js";
import {player} from "./player";
import {playerCharacterHasControl} from "../igua/logic/playerCharacterInput";
import {cutscene} from "../cutscene/cutscene";
import {level} from "../igua/level/level";
import {scene} from "../igua/scene";
import { Teleported } from "../sounds";
import {jukebox} from "../igua/jukebox";
import {game} from "../igua/game";
import {filters} from "pixi.js";
import {now} from "../utils/now";
import {Rectangle} from "../utils/math/rectangle";
import {SceneLocal} from "../igua/sceneLocal";
import {BevelFilter} from "pixi-filters";
import {show} from "../cutscene/dialog";
import {lerp} from "../cutscene/lerp";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {consumeFirefly} from "./firefly";

export const portalFluidConfig = {
    gotoLevelName: "Unknown"
};

export const resolvePortalFluid = resolveGameObject("PortalFluid", e => {
    return scene.gameObjectStage.addChild(portalFluid(e).at(e));
});

const fluidFill = new SceneLocal(s => {
    const graphics = new Graphics()
        .beginFill(0x20A090)
        .drawRect(0, 0, s.width, s.height);

    graphics.filters = [new BevelFilter({ thickness: 1, rotation: 45, lightColor: 0x28C9B3, shadowColor: 0x0E7F70, lightAlpha: 1, shadowAlpha: 1 })];

    return s.gameObjectStage.addChild(graphics);
});

const fluidMask = new SceneLocal(s => {
    const container = s.gameObjectStage.addChild(new Container());
    fluidFill.value.mask = container;
    return container;
});

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

    fluidMask.value.addChild(wiggle);

    graphics
        .beginFill(0x20A090)
        .drawRect(0, 0, width, height)
        .withStep(() => {
            if (playerCharacterHasControl() && graphics.collides(player) && playerIsWeakToPortalFluid())
                teleportToTheRoomOfDoors();
        });

    if (width > 16 && height > 16)
        graphics.hitbox = [4 / width, 4 / height, (width - 8) / width, (height - 8) / height];

    return graphics;
}

export function playerIsWeakToPortalFluid() {
    if (player.invulnerableFrameCount > 0)
        return false;
    return !consumeFirefly();
}

export function teleportToTheRoomOfDoors() {
    jukebox.stop();
    Teleported.play();
    scene.ticker.doNextUpdate = false;

    cutscene.play(async () => {
        await show("You have been teleported to the room of doors.");
        const blurFilter = new filters.BlurFilter(0, 6, 1, 9);
        game.sceneStage.filters = [blurFilter];
        await lerp(blurFilter, "blur").to(24).over(1_000);
        game.sceneStage.filters = [];
        level.goto(portalFluidConfig.gotoLevelName);
    });
}

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
