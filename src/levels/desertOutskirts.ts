import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertOutskirtsArgs} from "../levelArgs";
import {scene, sceneStack} from "../igua/scene";
import {progress} from "../igua/data/progress";
import {DesertField} from "./desertField";
import {game} from "../igua/game";

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
        game.cutscenePlayer.playCutscene(async p => {
            sceneStack.push();
            const level = DesertField();
            scene.camera.x = 1296;
            const goalX = Math.round(level.TempleDoor.x - 128);
            const goalY = Math.round(level.TempleDoor.y - 128);
            scene.camera.y = goalY;
            await p.move(scene.camera).to(goalX, goalY).over(5_000);
            await p.sleep(500);
            // TODO sfx
            level.TempleDoor.locked = false;
            await p.sleep(500);
            sceneStack.pop();
            progress.flags.desert.unlockedTemple = true;
        })
    });
}