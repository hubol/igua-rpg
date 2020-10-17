import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealFlightArgs} from "../levelArgs";
import {Sprite} from "pixi.js";
import {CloudLong} from "../textures";
import {add} from "../utils/math/vector";
import {game} from "../igua/game";

export function UnrealFlight()
{
    const level = applyOgmoLevel(UnrealFlightArgs);

    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;

    for (let i = 0; i < 32; i++)
        cloud();
}

function cloud()
{
    const speed = 0.5 + Math.random() * 2.5;
    const sprite = Sprite.from(CloudLong)
        .withStep(() => {
            sprite.x -= speed;
            if (sprite.x + sprite.width < game.camera.x)
            {
                sprite.x = game.camera.x + game.camera.width;
                sprite.y = game.camera.y + game.camera.height * Math.random();
            }
        })
        .at(add({ x: game.camera.width * Math.random(), y: game.camera.height * Math.random() }, game.camera));
    if (Math.random() > 0.5)
        sprite.scale.y *= -1;
    scene.backgroundGameObjectStage.addChild(sprite);
}