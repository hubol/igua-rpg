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
import {PromiseLibrary} from "../cutscene/promiseLibrary";
import {player} from "../gameObjects/player";
import {now} from "../utils/now";

function applyUnrealMimicLevel()
{
    return applyOgmoLevel(UnrealMimicArgs);
}

type UnrealMimicLevel = ReturnType<typeof applyUnrealMimicLevel>;

export function UnrealMimic()
{
    jukebox.play(Mimic);
    portalFluidConfig.gotoLevelName = "DesertTemple";
    const level = applyUnrealMimicLevel();

    scene.backgroundColor = 0xF0C050;
    scene.terrainColor = 0xF05050;

    scene.backgroundGameObjectStage.addChild(
        bigKeyPiece(progress.flags.desert.bigKey, desertBigKeyTextures[1], "piece2")
            .at(level.BigKeyPiece)
    );

    const mimic = enrichMimic(level);

    scene.gameObjectStage.withAsync(async p => {
        await mimic.moveLeft(p);
        await mimic.jump(p);
        await mimic.moveLeft(p);
        await mimic.duck(p);
        await mimic.duck(p);
        await mimic.moveRight(p);
        await mimic.jump(p);
        await mimic.moveRight(p);
        mimic.defeat();
    });

    scene.gameObjectStage.withAsync(async p => {
        const { moveLeft, duck, jump, moveRight } = waitForPlayerMotion(p);
        const moves = [ moveLeft, duck, jump, moveRight, duck, jump, moveLeft, moveLeft ];
        for (const move of moves) {
            await move();
            console.log(now.ms / 1000);
        }
    })
}

function waitForPlayerMotion(p: PromiseLibrary)
{
    async function duck()
    {
        const startDuckUnit = player.duckUnit;
        await p.wait(() => player.duckUnit === 0 || player.duckUnit < startDuckUnit);
        await p.waitHold(() => player.duckUnit >= 0.5, 4);
        return "Duck";
    }

    async function moveLeft()
    {
        await p.wait(() => Math.abs(player.hspeed) < 1);
        await p.waitHold(() => player.hspeed < 0, 8);
        return "Left";
    }

    async function moveRight()
    {
        await p.wait(() => Math.abs(player.hspeed) < 1);
        await p.waitHold(() => player.hspeed > 0, 8);
        return "Right";
    }

    async function jump()
    {
        await p.wait(() => player.vspeed >= 0);
        await p.waitHold(() => player.vspeed < 0, 8);
        return "Jump";
    }

    return {
        duck,
        moveLeft,
        moveRight,
        jump
    };
}

function enrichMimic(level: UnrealMimicLevel)
{
    const colorMatrixFilter = new filters.ColorMatrixFilter();
    colorMatrixFilter.matrix = [0, 0, 0, 0, 0.25, 0, 0, 0, 0.25, 0, 0, 0, 0, .875, 0, 0, 0, 0, 1, 0];
    level.Mimic.filters = [colorMatrixFilter];
    level.Mimic.canBlink = false;

    return {
        async moveLeft(p: PromiseLibrary)
        {
            await level.Mimic.walkTo(level.Mimic.x - 24);
            await p.sleep(300);
        },
        async moveRight(p: PromiseLibrary)
        {
            await level.Mimic.walkTo(level.Mimic.x + 24);
            await p.sleep(300);
        },
        async duck(p: PromiseLibrary)
        {
            level.Mimic.isDucking = true;
            await p.sleep(600);
            level.Mimic.isDucking = false;
            await p.sleep(400);
        },
        async jump(p: PromiseLibrary)
        {
            level.Mimic.vspeed = -3;
            await p.wait(() => level.Mimic.vspeed > 0);
            await p.wait(() => level.Mimic.vspeed === 0);
            await p.sleep(200);
        },
        defeat()
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
    };
}
