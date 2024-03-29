import {jukebox} from "../igua/jukebox";
import {Country, DesertTown, Temple} from "../musics";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertFieldArgs} from "../levelArgs";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {createFollower, player} from "../gameObjects/player";
import {progress} from "../igua/data/progress";
import {sleep} from "../cutscene/sleep";
import {show, showAll} from "../cutscene/dialog";
import {ask} from "../cutscene/ask";
import {rng} from "../utils/math/rng";
import {tumbleweed} from "../gameObjects/tumbleweed";
import {HideBeforeGreatness} from "../pixins/destroyByGreatness";
import {npc} from "../gameObjects/npc";

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
    enrichLovers(level);

    return level;
}

function enrichLovers(level: DesertFieldLevel) {
    const lovers = [{ v: level.LoverFromJungle, style: 14}, { v: level.LoverFromDesert, style: 6}]
        .map(({ v, style }) => {
            const n = npc(v.x, v.y, style).withPixin(HideBeforeGreatness).show();
            n.engine.walkSpeed = 1.5;
            return n;
        });

    const [ loverFromJungle, loverFromDesert ] = lovers;

    async function speak(...messages: string[]) {
        lovers.forEach(x => x.engine.pauseWalkToCommands = true);
        await showAll(...messages);
        lovers.forEach(x => x.engine.pauseWalkToCommands = false);
    }

    loverFromJungle.withCutscene(async () => await speak(`If it weren't for you, we'd still be separated from each other.`));

    loverFromDesert.withCutscene(async () =>
        await speak(`I feel a lot better now that we are together again.`,
            `Thank you for getting rid of the invaders.`));

    async function pauseAndFlip() {
        await sleep(2000);
        loverFromDesert.scale.x *= -1;
        await sleep(300);
        loverFromJungle.scale.x *= -1;
        await sleep(500);
    }

    const dx = loverFromDesert.x - loverFromJungle.x;
    async function walkTogether(x: number) {
        const promise = loverFromJungle.walkTo(x);
        await loverFromDesert.walkTo(x + dx);
        await promise;
    }

    loverFromDesert.withAsync(async () => {
        const x1 = 200;
        const x2 = loverFromDesert.x + 400;

        while (true) {
            await walkTogether(x2);
            await pauseAndFlip();
            await walkTogether(x1);
            await pauseAndFlip();
        }
    })
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
