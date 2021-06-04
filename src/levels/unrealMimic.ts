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
import {player} from "../gameObjects/player";
import {now} from "../utils/now";
import {lerp} from "../cutscene/lerp";
import {wait} from "../cutscene/wait";
import {waitHold} from "../cutscene/waitHold";
import {sleep} from "../cutscene/sleep";

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

    scene.gameObjectStage.withAsync(async () => {
        await mimic.moveLeft();
        await mimic.jump();
        await mimic.moveLeft();
        await mimic.duck();
        await mimic.duck();
        await mimic.moveRight();
        await mimic.jump();
        await mimic.moveRight();
        mimic.defeat();
    });

    scene.gameObjectStage.withAsync(async () => {
        const { moveLeft, duck, jump, moveRight } = waitForPlayerMotion();
        const moves = [ moveLeft, duck, jump, moveRight, duck, jump, moveLeft, moveLeft ];
        for (const move of moves) {
            await move();
            console.log(now.ms / 1000);
        }
    })
}

function waitForPlayerMotion()
{
    async function duck()
    {
        const startDuckUnit = player.duckUnit;
        await wait(() => player.duckUnit === 0 || player.duckUnit < startDuckUnit);
        await waitHold(() => player.duckUnit >= 0.5, 4);
        return "Duck";
    }

    async function moveLeft()
    {
        await wait(() => Math.abs(player.hspeed) < 1);
        await waitHold(() => player.hspeed < 0, 8);
        return "Left";
    }

    async function moveRight()
    {
        await wait(() => Math.abs(player.hspeed) < 1);
        await waitHold(() => player.hspeed > 0, 8);
        return "Right";
    }

    async function jump()
    {
        await wait(() => player.vspeed >= 0);
        await waitHold(() => player.vspeed < 0, 8);
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
        async moveLeft()
        {
            await level.Mimic.walkTo(level.Mimic.x - 24);
            await sleep(300);
        },
        async moveRight()
        {
            await level.Mimic.walkTo(level.Mimic.x + 24);
            await sleep(300);
        },
        async duck()
        {
            level.Mimic.isDucking = true;
            await sleep(600);
            level.Mimic.isDucking = false;
            await sleep(400);
        },
        async jump()
        {
            level.Mimic.vspeed = -3;
            await wait(() => level.Mimic.vspeed > 0);
            await wait(() => level.Mimic.vspeed === 0);
            await sleep(200);
        },
        defeat()
        {
            level.PlayerFloorBlock.destroy();
            scene.gameObjectStage.withAsync(async () => {
                await Promise.all([
                    lerp(level.Mimic.scale, "x").to(0).over(1000),
                    lerp(level.Mimic.scale, "y").to(0).over(1000),
                    lerp(level.Mimic, "angle").to(720).over(1000)
                ]);
            });
        }
    };
}
