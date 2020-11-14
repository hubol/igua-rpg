import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { DesertTempleArgs } from "../levelArgs";
import {scene} from "../igua/scene";
import {progress} from "../igua/data/progress";

export function DesertTemple()
{
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