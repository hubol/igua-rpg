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
import {lerp} from "../cutscene/lerp";
import {wait} from "../cutscene/wait";
import {waitHold} from "../cutscene/waitHold";
import {sleep} from "../cutscene/sleep";
import {MimicCorrect} from "../sounds";
import {rng} from "../utils/rng";
import {confetti} from "../gameObjects/confetti";

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
        await sleep(1000);
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
}

const playerMotion = {
    async duck() {
        const startDuckUnit = player.duckUnit;
        await wait(() => player.duckUnit === 0 || player.duckUnit < startDuckUnit);
        await waitHold(() => player.duckUnit >= 0.1, 4);
        await waitHold(() => player.duckUnit < 0.1, 4);
        return "Duck";
    },
    async moveLeft() {
        await wait(() => Math.abs(player.hspeed) < 1);
        await waitHold(() => player.hspeed < 0, 8);
        return "Left";
    },
    async moveRight() {
        await wait(() => Math.abs(player.hspeed) < 1);
        await waitHold(() => player.hspeed > 0, 8);
        return "Right";
    },
    async jump() {
        await wait(() => player.vspeed >= 0);
        await waitHold(() => player.vspeed < 0, 8);
        await wait(() => player.vspeed > 0);
        await wait(() => player.vspeed === 0);
        return "Jump";
    }
}

function enrichMimic(level: UnrealMimicLevel)
{
    const colorMatrixFilter = new filters.ColorMatrixFilter();
    colorMatrixFilter.matrix = [0, 0, 0, 0, 0.25, 0, 0, 0, 0.25, 0, 0, 0, 0, .875, 0, 0, 0, 0, 1, 0];
    level.Mimic.filters = [colorMatrixFilter];
    level.Mimic.canBlink = false;

    const correct = () => {
        colorMatrixFilter.matrix = [0, 0, 0, 0, rng(), 0, 0, 0, rng(), 0, 0, 0, 0, rng(), 0, 0, 0, 0, 1, 0];
        MimicCorrect.play();
    }

    return {
        async moveLeft()
        {
            const p = playerMotion.moveLeft();
            await level.Mimic.walkTo(level.Mimic.x - 24);
            await p;
            correct();
            await sleep(66);
        },
        async moveRight()
        {
            const p = playerMotion.moveRight();
            await level.Mimic.walkTo(level.Mimic.x + 24);
            await p;
            correct();
            await sleep(66);
        },
        async duck()
        {
            const p = playerMotion.duck();
            level.Mimic.isDucking = true;
            await sleep(600);
            level.Mimic.isDucking = false;
            await sleep(100);
            await p;
            correct();
            await sleep(66);
        },
        async jump()
        {
            const p = playerMotion.jump();
            level.Mimic.isDucking = true;
            await sleep(100);
            level.Mimic.isDucking = false;
            level.Mimic.vspeed = -3;
            await wait(() => level.Mimic.vspeed > 0);
            await wait(() => level.Mimic.vspeed === 0);
            await p;
            correct();
            await sleep(66);
        },
        defeat()
        {
            level.PlayerFloorBlock.destroy();
            confetti().at(level.Mimic).show();
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
