import {jukebox} from "../jukebox";
import {Temple} from "../../musics";
import {show} from "../../cutscene/dialog";
import {BigKeyCollected} from "../../sounds";
import {sparkles} from "../../gameObjects/sparkle";
import {sleep} from "../../cutscene/sleep";
import {bigKeyMeter} from "../../gameObjects/bigKey";
import {DisplayObject, Texture} from "pixi.js";

export function makeTempleLevelUtil(...quests: [unlocked: boolean, completed: boolean, displayObjects: DisplayObject[]][]) {
    quests.forEach(([ unlocked, completed, displayObjects ]) => makeUnrealDoor(unlocked, completed, displayObjects));

    function makeBigKeyMeter(textures: Texture[]) {
        return bigKeyMeter(...textures.map((t, i) => [t, quests[i]?.[1] ?? false]) as any);
    }

    return {
        playMusic,
        makeBigKeyMeter,
        signCutscene,
        allCompletedCutscene,
        get allCompleted() {
            return quests.every(([_, c]) => c);
        }
    }
}

function playMusic() {
    return jukebox.play(Temple);
}

async function allCompletedCutscene(bigKey: DisplayObject) {
    BigKeyCollected.play();
    jukebox.currentSong?.pause();
    sparkles(bigKey.x + 25, bigKey.y + 14, 10, 32, 100);
    await sleep(1000);
    await show("You gathered all the pieces of the big key.");
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
