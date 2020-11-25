import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { DesertTempleArgs } from "../levelArgs";
import {scene} from "../igua/scene";
import {progress} from "../igua/data/progress";
import {jukebox} from "../igua/jukebox";
import { Temple } from "../musics";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey1} from "../textures";
import {bigKeyMeter} from "../gameObjects/bigKeyMeter";

export function DesertTemple()
{
    jukebox.play(Temple);
    const level = applyOgmoLevel(DesertTempleArgs);
    scene.backgroundColor = 0xCEA5A5;
    scene.terrainColor = 0x283741;
    [level.CracksA, level.CracksA_1].forEach(x => x.tint = 0xA66B6B);
    level.GlowingCircle.tint = 0xF0F0B0;

    makeUnrealDoor(progress.flags.desert.thankedByCrateStacker, [level.Key1, level.Door1]);
    makeUnrealDoor(progress.flags.desert.collectedInnKey, [level.Key2, level.Door2]);
    makeUnrealDoor(progress.flags.desert.collectedDigKey, [level.Key3, level.Door3]);

    level.Sign.cutscene = async p => {
        await p.show("Here you can find pieces of a big key if you move through the doors.");
        await p.show("You need keys to enter the doors leading to the pieces.");
    };

    scene.backgroundGameObjectStage.addChild(makeDesertBigKeyMeter().at(level.BigKey));
}

export function makeDesertBigKeyMeter()
{
    const bigKey1Textures = subimageTextures(BigKey1, 3);
    return bigKeyMeter(
        [ bigKey1Textures[0], progress.flags.desert.bigKey.piece1 ],
        [ bigKey1Textures[1], progress.flags.desert.bigKey.piece2 ],
        [ bigKey1Textures[2], progress.flags.desert.bigKey.piece3 ],);
}

function makeUnrealDoor(unlocked: boolean, displayObjects: any[])
{
    if (unlocked)
        return;

    displayObjects.forEach(x => {
        if ("locked" in x)
            x.locked = true;
        else if ("tint" in x)
            x.tint = 0;
    })
}