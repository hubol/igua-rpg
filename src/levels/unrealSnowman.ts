import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealSnowmanArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {wait} from "../cutscene/wait";
import {player} from "../gameObjects/player";
import {lerp} from "../cutscene/lerp";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Torch} from "../textures";
import {Sprite} from "pixi.js";
import {now} from "../utils/now";
import {merge} from "../utils/merge";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";

let holdingFlame = false;

export function UnrealSnowman() {
    const level = applyOgmoLevel(UnrealSnowmanArgs);
    scene.backgroundColor = 0xF0C050;
    scene.terrainColor = 0xF05050;
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
