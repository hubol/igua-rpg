import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleSickIguanaArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {jukebox} from "../igua/jukebox";
import {TickingTime} from "../musics";
import {cutOutWindow} from "../igua/cutOutWindow";
import {show} from "../cutscene/dialog";
import {getCost, potions} from "../igua/inventory/potions";
import {Sickly} from "../igua/puppet/mods/sickly";
import {CollectValuable} from "../sounds";
import {progress} from "../igua/data/progress";
import {ask} from "../cutscene/ask";

export function JungleSickIguana() {
    jukebox.play(TickingTime);
    scene.backgroundColor = 0x79962E;
    scene.terrainColor = 0x152619;
    const level = applyOgmoLevel(JungleSickIguanaArgs);
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0x412977);

    cutOutWindow(0x97D8D8, level.Window);

    const { sickIguana } = progress.flags.jungle;

    level.NpcIguana.cutscene = async () => {
        if (!sickIguana.requestedHelp) {
            await show(`I'm sick.`);
            if (await ask(`Can you bring me some ${potions.BitterMedicine.name}? I can give you valuables for it.`)) {
                CollectValuable.play();
                const cost = getCost('BitterMedicine');
                progress.valuables += cost;
                await show(`Received ${cost} valuables.`);
                await show(`That should cover it. Please bring the potion as soon as possible.`);
                sickIguana.requestedHelp = true;
            }
        }
    };
    level.NpcIguana.mods.add(Sickly);
}