import {scene} from "../igua/scene";
import {FunTimes} from "../musics";
import {jukebox} from "../igua/jukebox";
import {JungleBarArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {shop} from "../igua/inventory/shop";
import {show} from "../cutscene/dialog";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles} from "../textures";
import {mirror} from "../gameObjects/mirror";

export function JungleBar() {
    jukebox.play(FunTimes);
    scene.backgroundColor = 0xBDA2CA;
    scene.terrainColor = 0x8972AD;
    const level = applyOgmoLevel(JungleBarArgs);
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0x8972AD);
    mirror(level.BigMirror.width, level.BigMirror.height, 0xB7B7E2, 0xD2D2EC).at(level.BigMirror).behind();
    level.Barkeeper.cutscene = async () => {
        const purchases = await shop('ClawPowder', 'SpicedNectar', 'SweetBerry', 'WonderBallon', 'CommonPoison', 'BitterMedicine');
        if (purchases.length > 0)
            await show("Thank you. Come again!");
        else
            await show("Come back later!");
    }
}