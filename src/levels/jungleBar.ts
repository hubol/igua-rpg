import {scene} from "../igua/scene";
import {FunTimes} from "../musics";
import {jukebox} from "../igua/jukebox";
import {JungleBarArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {shop} from "../igua/inventory/shop";
import {show, showAll} from "../cutscene/dialog";
import {decalsOf} from "../gameObjects/decal";
import {GroundSpeckles, JunglePlank} from "../textures";
import {mirror} from "../gameObjects/mirror";
import {cigarette} from "../gameObjects/cigarette";
import {rayToPlayerIntersectsWall} from "../igua/logic/rayIntersectsWall";
import {DestroyAfterGreatness, DestroyBeforeGreatness} from "../pixins/destroyByGreatness";

export function JungleBar() {
    jukebox.play(FunTimes);
    scene.backgroundColor = 0xB9DBA6;
    scene.terrainColor = 0x6D9D64;
    const level = applyOgmoLevel(JungleBarArgs);

    cigarette().at(14, -14).show(level.Patron);
    level.Patron.withPixin(DestroyAfterGreatness).cutscene = async () => {
        await show(`My man lives in the desert, but I haven't been able to see him since all of the angels showed up.`);
    }

    decalsOf(JunglePlank).forEach(x => x.hueShift = 210);
    decalsOf(GroundSpeckles).forEach(x => x.tint = 0xA7ADCC);
    mirror(level.BigMirror.width, level.BigMirror.height, 0x8CC468, 0xB6E168).at(level.BigMirror).behind();
    level.Barkeeper.cutscene = async () => {
        const purchases = await shop();
        if (purchases.length > 0)
            await show("Thank you. Come again!");
        else
            await show("Come back later!");
    }

    level.Barkeeper.withStep(() => level.Barkeeper.isDucking = rayToPlayerIntersectsWall(level.Barkeeper));
    level.Barkeeper.duckImmediately();

    level.HealedPatron.withPixin(DestroyBeforeGreatness).withCutscene(() => showAll(
        `I was sick for a while before you came along! I thought I would never feel better.`,
        `Thank you for getting the medicine for me.`));
    level.OutcastPatron.withPixin(DestroyBeforeGreatness).withCutscene(() => showAll(
        `So the invaders are gone, and without the help of the great weapon.`,
        `Maybe I'll move back into town now that the oracles are subdued.`
    ));

    level.DrinkBefore.withPixin(DestroyAfterGreatness);
    [level.DrinkAfter1, level.DrinkAfter2].forEach(x => x.withPixin(DestroyBeforeGreatness));
}