import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {UnrealSnowmanArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {portalFluidConfig, teleportToTheRoomOfDoors} from "../gameObjects/portalFluid";
import {wait} from "../cutscene/wait";
import {player} from "../gameObjects/player";
import {lerp} from "../cutscene/lerp";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Snowman, Torch} from "../textures";
import {Container, Graphics, Sprite} from "pixi.js";
import {now} from "../utils/now";
import {lerp as lerpNumber} from "../utils/math/number";
import {merge} from "../utils/merge";
import {cutscene} from "../cutscene/cutscene";
import {show} from "../cutscene/dialog";
import {track} from "../igua/track";
import {sleep} from "../cutscene/sleep";
import {bigKeyPiece} from "../gameObjects/bigKey";
import {progress} from "../igua/data/progress";
import {desertBigKeyTextures} from "./desertTemple";
import {jukebox} from "../igua/jukebox";
import { Hemaboss1 } from "../musics";
import {FlameOff, FlameOn, SnowmanDie, SnowmanHurt, SnowmanLand} from "../sounds";
import {rng} from "../utils/rng";
import {confetti} from "../gameObjects/confetti";
import {ballons} from "../gameObjects/ballons";
import {range} from "../utils/range";

let holdingFlame = false;

export function UnrealSnowman() {
    const level = applyOgmoLevel(UnrealSnowmanArgs);
    scene.backgroundColor = 0xC3C2EF;
    scene.terrainColor = 0xC43E4E;
    portalFluidConfig.gotoLevelName = "DesertTemple";

    jukebox.stop().warm(Hemaboss1);

    holdingFlame = false;

    scene.gameObjectStage.withAsync(async () => {
        await wait(() => player.x >= 280);
        const moveCamera = lerp(scene.camera, 'x').to(256).over(1000);
        scene.camera.followPlayer = false;
        await Promise.all([ moveCamera, wait(() => player.y >= 128) ]);
        await sleep(500);
        jukebox.play(Hemaboss1);
        snowman(level.SnowmanSpawn.y, (level.Torch1.x + level.Torch2.x) / 2).at([0, -128].add(level.SnowmanSpawn));
    });

    const puzzleTorch = torch(true, true).at(level.TorchA);
    [level.Torch1, level.Torch2].map(x => torch().at(x));

    level.PuzzleWall.withStep(() => {
        level.PuzzleWall.moveTowards({ x: level.PuzzleWall.x, y: puzzleTorch.burning ? 0 : -level.PuzzleWall.height }, puzzleTorch.burning ? 8 : 2);
    });
}

const torchSubimages = subimageTextures(Torch, 5);

const torch = track((burning = false, showHint = false) => {
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
            if (sprite.burning)
                FlameOn.play();
            else
                FlameOff.play();
        }
        if (showHint) {
            cutscene.play(async () => await show('Picked up the flame.'));
            showHint = false;
        }
    });
    return scene.gameObjectStage.addChild(sprite);
});

const snowmanSubimages = subimageTextures(Snowman, 3);

const dust = () => {
    let life = 1;
    const baseWidth = 16;
    const baseHeight = 16;
    const lifeDelta = 0.01 + rng() * 0.01;
    let vspeed = -0.2 - rng() * 0.5;
    const graphics = new Graphics()
        .withStep(() => {
            life -= lifeDelta;
            graphics.y += vspeed;
            if (life <= 0)
                return graphics.destroy();
            graphics
                .clear()
                .beginFill(0xffffff, life * 0.5)
                .drawEllipse(0, 0, baseWidth, baseHeight * 2 * (1 - life));
        });
    return scene.gameObjectStage.addChild(graphics);
}

const snowman = (groundY, retreatX) => {
    let pedometer = 0;
    const sprite = merge(Sprite.from(snowmanSubimages[0]), { hspeed: 0 });
    const foot1 = Sprite.from(snowmanSubimages[1]);
    const foot2 = Sprite.from(snowmanSubimages[2]);
    const mask = new Graphics().drawRect(1, 9, 19, 28);
    let arriveVspeed = 0;
    let hspeed = 0;
    let phase = 0;
    let health = 100;
    let xx = 0;
    let retreat = 0;

    const damage = (amount) => {
        const previousHealth = health;
        health -= amount;
        if (Math.floor(previousHealth / 2) !== Math.floor(health / 2))
            SnowmanHurt.play();
        dust().at(container);
        if (health < 0)
        {
            confetti().at(container).show();
            SnowmanDie.play();
            let ky = 0;
            const key = bigKeyPiece(progress.flags.desert.bigKey, desertBigKeyTextures[2], "piece3")
                .at(retreatX - 40, 0)
                .withStep(() => {
                    if (ky < 120)
                        ky++;
                    key.y = ky + Math.sin(now.s * 2) * 2;
                });
            ballons({ target: key, state: range(3), offset: [39, 9], string: 18 });
            key.onCollect = teleportToTheRoomOfDoors;
            scene.gameObjectStage.addChild(key);
            jukebox.currentSong?.fade(1, 0, 1000);
            container.destroy();
        }
    };

    const step = () => {
       pedometer++;
       foot1.y = Math.round(Math.sin(pedometer * 0.2));
        foot2.y = Math.round(Math.sin(pedometer * 0.2 - 3));
        sprite.y = Math.round(Math.sin(pedometer * 0.2 - 5));

        const previousContainerY = container.y;
        if (container.y >= groundY) {
            arriveVspeed = 0;
            if (phase === 0) {
                xx = container.x;
                phase = 1;
            }
        }
        else
            container.y += (arriveVspeed += 0.5);
        container.y = Math.round(Math.min(container.y, groundY));

        if (previousContainerY < groundY && container.y === groundY)
            SnowmanLand.play();

        if (phase < 1)
            return;

        const litTorch = torch.instances.filter(x => x.burning)[0];
        retreat += litTorch ? 1 : -1;
        retreat = Math.max(0, Math.min(120, retreat));
        if (litTorch && container.collides(litTorch))
            damage(0.625);
        if (container.destroyed)
            return;
        const notNearLitTorch = litTorch && Math.abs(player.x - litTorch.x) > 64;
        const isRetreating = !(retreat < 100 || notNearLitTorch);
        const targetX = isRetreating ? retreatX : player.x;

        let targetHspeed = container.x > targetX ? -1.5 : 1.5;
        if (isRetreating && Math.abs(container.x - targetX) < 8) {
            targetHspeed = 0;
            if (Math.abs(hspeed) < 1) {
                pedometer++;
                if (container.y >= groundY) {
                    container.y = groundY - 1;
                    arriveVspeed = -7;
                }
            }
        }
        hspeed = lerpNumber(hspeed, targetHspeed, 0.15);
        container.x = Math.round(xx += hspeed);

        if (hspeed !== 0) {
            const scale = lerpNumber(0.25, 1, health / 100);
            container.scale.x = scale * Math.sign(hspeed);
            container.scale.y = scale;
        }

        if (mask.collides(player))
            player.damage(25);
    };
    sprite.withAsync(async () => {
        await sleep(500);
        sprite.withStep(step);
    });
    const container = new Container();
    container.addChild(foot1, foot2, sprite, mask);
    container.pivot.set(11, 42);
    return scene.gameObjectStage.addChild(container);
}
