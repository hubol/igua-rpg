import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealFlightArgs} from "../levelArgs";
import {Sprite} from "pixi.js";
import {CloudLong} from "../textures";
import {add} from "../utils/math/vector";
import {jukebox} from "../igua/jukebox";
import { Fly } from "../musics";

export function UnrealFlight()
{
    jukebox.play(Fly);
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
            if (sprite.x + sprite.width < scene.camera.x)
            {
                sprite.x = scene.camera.x + scene.camera.width;
                sprite.y = scene.camera.y + scene.camera.height * Math.random();
            }
        })
        .at(add({ x: scene.camera.width * Math.random(), y: scene.camera.height * Math.random() }, scene.camera));
    if (Math.random() > 0.5)
        sprite.scale.y *= -1;
    scene.backgroundGameObjectStage.addChild(sprite);
}