import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleSickIguanaArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles, KeyYellow} from "../textures";
import {jukebox} from "../igua/jukebox";
import {TickingTime} from "../musics";
import {cutOutWindow} from "../igua/cutOutWindow";
import {show} from "../cutscene/dialog";
import {getCost, potions} from "../igua/inventory/potions";
import {Sickly} from "../igua/puppet/mods/sickly";
import {ClownExplode, ConsumeMedicine} from "../sounds";
import {progress} from "../igua/data/progress";
import {ask} from "../cutscene/ask";
import {inventory} from "../igua/inventory/inventory";
import {sleep} from "../cutscene/sleep";
import {Sprite} from "pixi.js";
import {confetti} from "../gameObjects/confetti";
import {giftValuables} from "../cutscene/giftValuables";

export function JungleSickIguana() {
    jukebox.play(TickingTime);
    scene.backgroundColor = 0x79962E;
    scene.terrainColor = 0x152619;
    const level = applyOgmoLevel(JungleSickIguanaArgs);
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0x412977);

    cutOutWindow(0x97D8D8, level.Window);

    const { sickIguana } = progress.flags.jungle;

    function createJungleKey() {
        Sprite.from(KeyYellow).at([-9, -17].add(level.SecretVase)).show().asCollectible(progress.flags.jungle.key, 'fromSickIguana');
    }

    level.NpcIguana.cutscene = async () => {
        if (!sickIguana.requestedHelp) {
            await show(`I'm sick.`);
            if (await ask(`Can you bring me some ${potions.BitterMedicine.name}? I can give you valuables for it.`)) {
                const cost = getCost('BitterMedicine');
                await giftValuables(cost);
                await show(`That should cover it. Please bring the potion as soon as possible.`);
                sickIguana.requestedHelp = true;
            }
        }
        else if (sickIguana.healed) {
            await show('You are always welcome in my home.');
        }
        else {
            const medicineIndex = inventory.find('BitterMedicine');
            if (medicineIndex > -1) {
                sickIguana.healed = true;
                await show(`Oh, you have the medicine.`);
                inventory.remove(medicineIndex);
                await sleep(250);
                ConsumeMedicine.play();
                await sleep(500);
                level.NpcIguana.mods.remove(Sickly);
                await sleep(250);
                await show(`I am healed!`);
                await sleep(100);
                level.NpcIguana.canWalkWhileCutsceneIsPlaying = true;
                level.NpcIguana.vspeed = -2;
                await sleep(150);
                createJungleKey();
                ClownExplode.play();
                confetti().at([0, -5].add(level.SecretVase)).show();
                level.SecretVase.destroy();
                await sleep(250);
                await show(`You can have that old key as a reward. You are always welcome in my home.`);
            }
            else {
                await show(`Please bring the ${potions.BitterMedicine.name} as soon as possible.`);
            }
        }
    };
    if (!sickIguana.healed)
        level.NpcIguana.mods.add(Sickly);
    else {
        createJungleKey();
        level.SecretVase.destroy();
    }
}