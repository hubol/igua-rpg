import {jukebox} from "../igua/jukebox";
import {Country, Oracle} from "../musics";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertFieldArgs} from "../levelArgs";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {createFollower, player} from "../gameObjects/player";
import {progress} from "../igua/data/progress";

function getDesertFieldLevel()
{
    return applyOgmoLevel(DesertFieldArgs);
}

type DesertFieldLevel = ReturnType<typeof getDesertFieldLevel>;

export function DesertField()
{
    jukebox.play(Country).warm(Oracle);
    const level = getDesertFieldLevel();
    scene.backgroundColor = 0xF0F0B0;
    scene.terrainColor = 0xE0D060;

    level.TempleDoor.locked = !progress.flags.desert.unlockedTemple;

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

    level.Digua.cutscene = async p => {
        level.Digua.mods.remove(Sleepy);
        await p.sleep(1000);
        if (rejectedOnce)
        {
            await p.show("Oh. It's you again.");
        }
        else
        {
            await p.show("Oh. I guess I fell asleep here when I realized it was unsafe to cross the desert.");
            await p.show("I'm Digua. My talent is digging things out of the ground.");
        }

        if (!await p.ask("Can I follow you around for a bit?"))
        {
            rejectedOnce = true;
            await p.show("Ok. I'll be here if you change your mind.")
            level.Digua.mods.add(Sleepy);
            return;
        }

        level.Digua.isDucking = false;
        await p.sleep(500);
        await p.show("Awesome! Let's go on an adventure!");

        progress.flags.desert.diguaIsFollowing = true;
        player.follower = createFollower();
        level.Digua.destroy();
    };
}