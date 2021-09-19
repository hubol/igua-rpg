import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { DesertTempleArgs } from "../levelArgs";
import {scene} from "../igua/scene";
import {progress} from "../igua/data/progress";
import {jukebox} from "../igua/jukebox";
import {Fly, Mimic, Temple} from "../musics";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey1} from "../textures";
import {bigKeyMeter} from "../gameObjects/bigKey";
import {show} from "../cutscene/dialog";
import {sparkles} from "../gameObjects/sparkle";
import {player} from "../gameObjects/player";
import {wait} from "../cutscene/wait";
import {cutscene} from "../cutscene/cutscene";
import {BigKeyCollected, CollectGeneric} from "../sounds";
import {sleep} from "../cutscene/sleep";

export function DesertTemple()
{
    jukebox.play(Temple).warm(Fly, Mimic);
    const level = applyOgmoLevel(DesertTempleArgs);
    scene.backgroundColor = 0xCEA5A5;
    scene.terrainColor = 0x283741;
    [level.CracksA, level.CracksA_1].forEach(x => x.tint = 0xA66B6B);
    level.GlowingCircle.tint = 0xF0F0B0;

    makeUnrealDoor(progress.flags.desert.key.fromCrateStacker, progress.flags.desert.bigKey.piece1, [level.Key1, level.Door1]);
    makeUnrealDoor(progress.flags.desert.key.fromInn, progress.flags.desert.bigKey.piece2, [level.Key2, level.Door2]);
    makeUnrealDoor(progress.flags.desert.key.fromDiggingInTown, progress.flags.desert.bigKey.piece3, [level.Key3, level.Door3]);

    level.Sign.cutscene = async () => {
        await show("Here you can find pieces of a big key if you move through the doors.");
        await show("You need keys to enter the doors leading to the pieces.");
    };

    scene.backgroundGameObjectStage.addChild(desertBigKeyMeter().at(level.BigKey));

    if (progress.flags.desert.bigKey.piece1
        && progress.flags.desert.bigKey.piece2
        && progress.flags.desert.bigKey.piece3
        && !progress.flags.desert.bigKey.reward)
        scene.gameObjectStage.withAsync(async () => {
            await wait(() => player.x >= level.BigKey.x - 25 && !cutscene.isPlaying);
            cutscene.play(async () => {
                progress.flags.desert.bigKey.reward = true;
                BigKeyCollected.play();
                jukebox.currentSong?.pause();
                sparkles(level.BigKey.x + 25, level.BigKey.y + 14, 10, 32, 100);
                await sleep(1000);
                await show("You gathered all the pieces of the big key.");
                CollectGeneric.play();
                await show("Received Blessing of Earth.");
                jukebox.currentSong?.play();
            });
        });
}

export const desertBigKeyTextures = subimageTextures(BigKey1, 3);

export function desertBigKeyMeter()
{
    const bigKey1Textures = desertBigKeyTextures;
    return bigKeyMeter(
        [ bigKey1Textures[0], progress.flags.desert.bigKey.piece1 ],
        [ bigKey1Textures[1], progress.flags.desert.bigKey.piece2 ],
        [ bigKey1Textures[2], progress.flags.desert.bigKey.piece3 ],);
}

function makeUnrealDoor(unlocked: boolean, completed: boolean, displayObjects: any[])
{
    displayObjects.forEach(x => {
        if ((!unlocked || completed) && "locked" in x)
            x.locked = true;
        else if (!unlocked && "tint" in x)
            x.tint = 0;
    })
}
