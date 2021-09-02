import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealSnowmanArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {wait} from "../cutscene/wait";
import {player} from "../gameObjects/player";
import {lerp} from "../cutscene/lerp";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Snowman, Torch} from "../textures";
import {Container, Graphics, Sprite} from "pixi.js";
import {now} from "../utils/now";
import {merge} from "../utils/merge";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";

let holdingFlame = false;

export function UnrealSnowman() {
    const level = applyOgmoLevel(UnrealSnowmanArgs);
    scene.backgroundColor = 0xC3C2EF;
    scene.terrainColor = 0xC43E4E;
    portalFluidConfig.gotoLevelName = "DesertTemple";

    holdingFlame = false;

    scene.gameObjectStage.withAsync(async () => {
        await wait(() => player.x >= 280);
        scene.camera.followPlayer = false;
        await lerp(scene.camera, 'x').to(256).over(1000);
    })

    const puzzleTorch = torch(true, true).at(level.TorchA);
    [level.Torch1, level.Torch2, level.Torch3].map(x => torch().at(x));

    level.PuzzleWall.withStep(() => {
        level.PuzzleWall.moveTowards({ x: level.PuzzleWall.x, y: puzzleTorch.burning ? 0 : -level.PuzzleWall.height }, puzzleTorch.burning ? 8 : 2);
    });

    snowman().at(level.SnowmanSpawn);
}

const torchSubimages = subimageTextures(Torch, 5);

const torch = (burning = false, showHint = false) => {
    const sprite = merge(Sprite.from(torchSubimages[0]), { burning });
    sprite.anchor.set(0.5, 1);
    sprite.withStep(() => {
        const index = sprite.burning ? (Math.floor(now.s * 6) % 4 + 1) : 0;
        sprite.texture = torchSubimages[index];
    });
    sprite.withInteraction(() => {
        if (sprite.burning !== holdingFlame) {
            sprite.burning = holdingFlame;
            holdingFlame = !sprite.burning;
        }
        if (showHint) {
            cutscene.play(async () => await show('Picked up the flame.'));
            showHint = false;
        }
    });
    return scene.gameObjectStage.addChild(sprite);
}

const snowmanSubimages = subimageTextures(Snowman, 3);

const snowman = () => {
    let pedometer = 0;
    const sprite = merge(Sprite.from(snowmanSubimages[0]), { hspeed: 0 });
    const foot1 = Sprite.from(snowmanSubimages[1]);
    const foot2 = Sprite.from(snowmanSubimages[2]);
    const mask = new Graphics().drawRect(1, 9, 19, 28);
    sprite.withStep(() => {
       pedometer++;
       foot1.y = Math.round(Math.sin(pedometer * 0.2));
        foot2.y = Math.round(Math.sin(pedometer * 0.2 - 3));
        sprite.y = Math.round(Math.sin(pedometer * 0.2 - 5));
        if (container.x > player.x) {
            container.scale.x = -1;
            container.x -= 1;
        }
        else if (container.x < player.x) {
            container.scale.x = 1;
            container.x += 1;
        }
        if (mask.collides(player))
            player.damage(10);
    });
    const container = new Container();
    container.addChild(foot1, foot2, sprite, mask);
    container.pivot.set(11, 42);
    return scene.gameObjectStage.addChild(container);
}
