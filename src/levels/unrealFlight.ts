import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealFlightArgs} from "../levelArgs";
import {Sprite} from "pixi.js";
import {CloudLong} from "../textures";
import {jukebox} from "../igua/jukebox";
import { Fly } from "../musics";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {desertBigKeyTextures} from "./desertTemple";
import {rng} from "../utils/math/rng";
import {firefly} from "../gameObjects/firefly";
import {player} from "../gameObjects/player";
import {cameraLock} from "../gameObjects/cameraLock";

export function UnrealFlight()
{
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;

    portalFluidConfig.gotoLevelName = "DesertTemple";
    jukebox.play(Fly);
    const level = applyOgmoLevel(UnrealFlightArgs);

    scene.backgroundGameObjectStage.addChild(
        bigKeyPiece(progress.flags.desert.bigKey, desertBigKeyTextures[0], "piece1")
            .at(level.BigKeyPiece)
    );

    for (let i = 0; i < 32; i++)
        cloud();

    firefly().at(level.FireflySpawn).show();

    cameraLock({ minY: level.CameraUnlockRegion.y },
        () => level.CameraUnlockRegion.collides(player) || player.x > 512);
}

function cloud()
{
    const speed = 0.5 + rng() * 2.5;
    const sprite = Sprite.from(CloudLong)
        .withStep(() => {
            sprite.x -= speed;
            if (sprite.x + sprite.width < scene.camera.x)
            {
                sprite.x = scene.camera.x + scene.camera.width;
                sprite.y = scene.camera.y + scene.camera.height * rng();
            }
        })
        .at({ x: scene.camera.width * rng(), y: scene.camera.height * rng() }.add(scene.camera));
    if (rng.bool)
        sprite.scale.y *= -1;
    scene.backgroundGameObjectStage.addChildAt(sprite, 0);
}
