import {jukebox} from "../jukebox";
import {Temple} from "../../musics";
import {show} from "../../cutscene/dialog";
import {BigKeyCollected, CollectGeneric} from "../../sounds";
import {sparkles} from "../../gameObjects/sparkle";
import {sleep} from "../../cutscene/sleep";
import {bigKeyMeter} from "../../gameObjects/bigKey";
import {DisplayObject, Texture} from "pixi.js";
import {scene} from "../scene";
import {wait} from "../../cutscene/wait";
import {player} from "../../gameObjects/player";
import {cutscene} from "../../cutscene/cutscene";
import {persistence} from "../data/persistence";
import {PropertiesOf} from "../../utils/types/propertiesOf";
import {Vector} from "../../utils/math/vector";

export function makeTempleLevelUtil(
    ...quests: [unlocked: boolean, completed: boolean, displayObjects: DisplayObject[]][]) {
    quests.forEach(([ unlocked, completed, displayObjects ]) => makeUnrealDoor(unlocked, completed, displayObjects));

    function makeBigKeyMeter(textures: Texture[]) {
        return bigKeyMeter(...textures.map((t, i) => [t, quests[i]?.[1] ?? false]) as any);
    }

    const util = {
        playMusic,
        makeBigKeyMeter,
        signCutscene,
        get allCompleted() {
            return quests.every(([_, c]) => c);
        },
        tryGiveReward<T>(progress: T, progressRewardKey: keyof PropertiesOf<T, boolean>, bigKey: Vector, rewardTitle: string) {
            if (util.allCompleted && !progress[progressRewardKey])
                scene.gameObjectStage.withAsync(async () => {
                    await wait(() => player.x >= bigKey.x - 25 && !cutscene.isPlaying);
                    cutscene.play(async () => {
                        progress[progressRewardKey] = true as any;
                        BigKeyCollected.play();
                        jukebox.currentSong?.pause();
                        sparkles(bigKey.x + 25, bigKey.y + 14, 10, 32, 100);
                        await sleep(1000);
                        await show("You gathered all the pieces of the big key.");
                        CollectGeneric.play();
                        await show(`Received ${rewardTitle}.`);
                        await persistence.save();
                        jukebox.currentSong?.play();
                    });
                });
        }
    }

    return util;
}

function playMusic() {
    return jukebox.play(Temple);
}

async function signCutscene() {
    await show("Here you can find pieces of a big key if you move through the doors.");
    await show("You need keys to enter the doors leading to the pieces.");
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
