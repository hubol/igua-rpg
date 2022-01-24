import {jukebox} from "../igua/jukebox";
import {Country, DesertTown, Temple} from "../musics";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertCostumerArgs} from "../levelArgs";
import {cutOutWindow} from "../igua/cutOutWindow";
import {decal} from "../gameObjects/decal";
import {CracksA} from "../textures";
import {mirror} from "../gameObjects/mirror";
import {show} from "../cutscene/dialog";
import {Lazy} from "../igua/puppet/mods/lazy";

export function DesertCostumer()
{
    scene.backgroundColor = 0x8FACC1;
    scene.terrainColor = 0xC15B60;
    jukebox.play(DesertTown).warm(Temple, Country);
    const level = applyOgmoLevel(DesertCostumerArgs);
    decal.instances.filter(x => x.texture === CracksA).forEach(x => x.tint = 0x5D8799);

    level.Costumer.cutscene = async () => {
        await show('Hello, I am a witch.');
        await show('My magic mirror was broken when the angels arrived.');
        await show('If you can repair my mirror, I will give you something good.');
        // await show('Using my power, you can change your looks.');
    }

    level.Costumer.mods.add(Lazy);

    cutOutWindow(0xF0F0B0, level.Window1, level.Window2, level.Window3);

    mirror(level.MirrorRegion.width, level.MirrorRegion.height).at(level.MirrorRegion).behind();
}