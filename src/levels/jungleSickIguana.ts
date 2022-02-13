import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleSickIguanaArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {jukebox} from "../igua/jukebox";
import {TickingTime} from "../musics";
import {cutOutWindow} from "../igua/cutOutWindow";
import {show} from "../cutscene/dialog";
import {potions} from "../igua/inventory/potions";
import {Sickly} from "../igua/puppet/mods/sickly";

export function JungleSickIguana() {
    jukebox.play(TickingTime);
    scene.backgroundColor = 0x79962E;
    const level = applyOgmoLevel(JungleSickIguanaArgs);
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0x412977);

    cutOutWindow(0x97D8D8, level.Window);

    level.NpcIguana.cutscene = async () => {
        await show(`I'm sick.`);
        await show(`Can you bring me some ${potions.BitterMedicine.name}?`);
    };
    level.NpcIguana.mods.add(Sickly);
}