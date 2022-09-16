import {jukebox} from "../igua/jukebox";
import {Country, Witch} from "../musics";
import {scene, sceneStack} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertCostumerArgs} from "../levelArgs";
import {cutOutWindow} from "../igua/cutOutWindow";
import {decal} from "../gameObjects/decal";
import {CracksA, MirrorBroken} from "../textures";
import {mirror} from "../gameObjects/mirror";
import {show} from "../cutscene/dialog";
import {Lazy} from "../igua/puppet/mods/lazy";
import {Sprite} from "pixi.js";
import {progress} from "../igua/data/progress";
import {sparkly} from "../gameObjects/sparkleSmall";
import {ChooseYourLooksFromMirror} from "./chooseYourLooks";
import { MirrorShardUse } from "../sounds";

export function DesertCostumer()
{
    scene.backgroundColor = 0x8FACC1;
    scene.terrainColor = 0xC15B60;
    jukebox.play(Witch).warm(Country);
    const level = applyOgmoLevel(DesertCostumerArgs);
    decal.instances.filter(x => x.texture === CracksA).forEach(x => x.tint = 0x5D8799);

    const flags = progress.flags.desert.costumeMirror;
    let spoken = false;

    level.Costumer.cutscene = async () => {
        if (flags.repaired) {
            await show('Thank you for repairing my mirror. You can use its powers.');
            return;
        }
        else if (flags.shardCollected) {
            await show(`It looks like you have the item to fix my magic mirror.`);
            return;
        }
        if (!spoken) {
            await show('Hello, I am a witch.');
            await show('My magic mirror was broken when the angels arrived.');
        }
        await show('If you repair my mirror, you can use its powers.');
        spoken = true;
    }

    level.Costumer.mods.add(Lazy);

    cutOutWindow(0xF0F0B0, level.Window1, level.Window2, level.Window3);

    const m = mirror(level.MirrorRegion.width, level.MirrorRegion.height).at(level.MirrorRegion).behind()
        .withCutscene(async () => {
            if (flags.repaired) {
                progress.checkpointName = 'MirrorCheckpoint';
                sceneStack.push(ChooseYourLooksFromMirror);
            }
            else if (flags.shardCollected) {
                MirrorShardUse.play();
                flags.repaired = true;
                await show("Used giant mirror shard.")
            }
            else
                await show("It seems to be broken.");
        })
        .withStep(() => {
            if (flags.repaired)
                sparkly(m);
        });
    const broken = Sprite.from(MirrorBroken).at(m).behind().withStep(() => broken.visible = !flags.repaired);
}