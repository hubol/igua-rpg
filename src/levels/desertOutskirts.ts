import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertOutskirtsArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {progress} from "../igua/data/progress";

function getDesertOutskirtsLevel()
{
    return applyOgmoLevel(DesertOutskirtsArgs);
}

type DesertOutskirtsLevel = ReturnType<typeof getDesertOutskirtsLevel>;

export function DesertOutskirts()
{
    const level = getDesertOutskirtsLevel();
    scene.backgroundColor = 0xF0F0B0;
    scene.terrainColor = 0xE0D060;

    enrichUnlockTemple(level);
}

function enrichUnlockTemple(level: DesertOutskirtsLevel)
{
    level.TempleUnlockBlob.withInteraction(() => {
        progress.flags.desert.unlockedTemple = true;
    });
}