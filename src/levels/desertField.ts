import {jukebox} from "../igua/jukebox";
import {Country, DesertTown, Temple} from "../musics";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertFieldArgs} from "../levelArgs";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {createFollower, player} from "../gameObjects/player";
import {progress} from "../igua/data/progress";
import {sleep} from "../cutscene/sleep";
import {show} from "../cutscene/dialog";
import {ask} from "../cutscene/ask";
import {rng} from "../utils/math/rng";
import {tumbleweed} from "../gameObjects/tumbleweed";

function getDesertFieldLevel()
{
    return applyOgmoLevel(DesertFieldArgs);
}

type DesertFieldLevel = ReturnType<typeof getDesertFieldLevel>;

export function DesertField()
{
    scene.backgroundColor = 0xF0F0B0;
    scene.terrainColor = 0xE0D060;
    jukebox.play(DesertTown).warm(Temple, Country);
    const level = getDesertFieldLevel();

    level.TempleDoor.locked = !progress.flags.desert.unlockedTemple;
    [level.Tumbleweed1, level.Tumbleweed2].forEach(x => rng.bool && tumbleweed().at(x).show());

    enrichDigua(level);

    return level;
}

function enrichDigua(level: DesertFieldLevel)
{
    if (progress.flags.desert.diguaIsInBar || progress.flags.desert.diguaIsFollowing)
    {
        level.Digua.destroy();
        return;
    }

    level.Digua.mods.add(Sleepy);
    level.Digua.duckImmediately();
    level.Digua.closeEyesImmediately();

    let rejectedOnce = false;

    level.Digua.cutscene = async () => {
        level.Digua.mods.remove(Sleepy);
        await sleep(1000);
        if (rejectedOnce)
        {
            await show("Oh. It's you again.");
        }
        else
        {
            await show("Oh. I guess I fell asleep here when I realized it was unsafe to cross the desert.");
            await show("I'm Digua. My talent is digging things out of the ground.");
        }

        if (!await ask("Can I follow you around for a bit?"))
        {
            rejectedOnce = true;
            await show("Ok. I'll be here if you change your mind.")
            level.Digua.mods.add(Sleepy);
            return;
        }

        level.Digua.isDucking = false;
        await sleep(500);
        await show("Awesome! Let's go on an adventure!");

        progress.flags.desert.diguaIsFollowing = true;
        player.follower = createFollower();
        level.Digua.destroy();
    };
}
