import {jukebox} from "../igua/jukebox";
import {Country, Witch} from "../musics";
import {scene, sceneStack} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertCostumerArgs} from "../levelArgs";
import {cutOutWindow} from "../igua/cutOutWindow";
import {decal} from "../gameObjects/decal";
import {CracksA, MirrorBroken} from "../textures";
import {mirror} from "../gameObjects/mirror";
import {show, showAll} from "../cutscene/dialog";
import {Lazy} from "../igua/puppet/mods/lazy";
import {DisplayObject, Sprite} from "pixi.js";
import {progress} from "../igua/data/progress";
import {sparkly} from "../gameObjects/sparkleSmall";
import {ChooseYourLooksFromMirror} from "./chooseYourLooks";
import { MirrorShardUse } from "../sounds";
import {player} from "../gameObjects/player";
import {sleep} from "../cutscene/sleep";
import {intelligenceShop} from "../igua/inventory/intelligenceShop";
import {wait} from "../cutscene/wait";
import {PotionType} from "../igua/inventory/potions";

export function DesertCostumer()
{
    scene.backgroundColor = 0x8FACC1;
    scene.terrainColor = 0xC15B60;
    jukebox.play(Witch).warm(Country);
    const level = applyOgmoLevel(DesertCostumerArgs);
    decal.instances.filter(x => x.texture === CracksA).forEach(x => x.tint = 0x5D8799);

    const flags = progress.flags.desert.costumeMirror;
    let spoken = false;

    level.Costumer.engine.walkSpeed = 2;

    level.Costumer.cutscene = async () => {
        if (flags.repaired) {
            const potions: PotionType[] = [ 'RemovingDevice', 'Shield', 'Dexterous', 'Redirect', ...<PotionType[]>(progress.levels.humor > 0 ? ['Cigarette'] : []), 'ClawPowder', 'SpicedNectar' ];
            await intelligenceShop(potions);
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

    const m = mirror(level.MirrorRegion.width, level.MirrorRegion.height).at(level.MirrorRegion).behind();
    const mask = m.mask as DisplayObject;
    mask
        .withCutscene(async () => {
            if (flags.repaired) {
                progress.checkpointName = 'MirrorCheckpoint';
                sceneStack.push(ChooseYourLooksFromMirror);
            }
            else if (flags.shardCollected) {
                MirrorShardUse.play();
                flags.repaired = true;

                const costumerX = level.Costumer.x;
                level.Costumer.mods.remove(Lazy);
                level.Costumer.isDucking = false;
                level.Costumer.vspeed = -2;
                const excited = wait(() => level.Costumer.engine.isOnGround && level.Costumer.vspeed === 0)
                    .then(() => level.Costumer.scale.x = 1)
                    .then(() => sleep(120))
                    .then(() => level.Costumer.walkTo(player.x - 46));

                await show("Used giant mirror shard.");
                player.scale.x = -1;

                await excited;
                await sleep(750);
                await show("Thank you for repairing my mirror. You can use its powers.");
                level.Costumer.scale.x = -1;
                await sleep(250);
                await level.Costumer.walkTo(level.Costumer.x - 16);
                await sleep(250);
                await show(`Oh.`);
                level.Costumer.scale.x = 1;
                await sleep(500);
                await showAll(
                    "Since I am a witch, I have access to special potions that might be useful in your task.",
                    `I will trade you special potions for ancient knowledge.`,
                    `You can find ancient knowledge throughout the world in old books and from intelligent iguanas.`,
                    `Come talk with me to see my special potions.`);
                level.Costumer.walkTo(costumerX).then(() => level.Costumer.mods.add(Lazy));
            }
            else
                await show("It seems to be broken.");
        })
        .withStep(() => {
            if (flags.repaired)
                sparkly(mask);
        });
    mask.ext.sparkleDestination = scene.backgroundGameObjectStage;
    const broken = Sprite.from(MirrorBroken).at(m).behind().withStep(() => broken.visible = !flags.repaired);
}