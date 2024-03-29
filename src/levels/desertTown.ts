import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertTownArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {Bluehouse, Country, DesertTown as DesertField, Shop, Witch, NewDesertOracle} from "../musics";
import {Sprite} from "pixi.js";
import {CrateWooden} from "../textures";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {CollectGeneric, CratePickup, CratePlace, Dig} from "../sounds";
import {progress} from "../igua/data/progress";
import {npc} from "../gameObjects/npc";
import {vector} from "../utils/math/vector";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {scene} from "../igua/scene";
import {player} from "../gameObjects/player";
import {resolvePipeHorizontal} from "../gameObjects/walls";
import {cutscene} from "../cutscene/cutscene";
import {sleep} from "../cutscene/sleep";
import {move} from "../cutscene/move";
import {show} from "../cutscene/dialog";
import {wait} from "../cutscene/wait";
import {rng} from "../utils/math/rng";
import {inventory} from "../igua/inventory/inventory";
import {persistence} from "../igua/data/persistence";
import {tumbleweed} from "../gameObjects/tumbleweed";
import {moveCameraToPlayerTarget} from "../igua/camera";
import {DestroyAfterGreatness} from "../pixins/destroyByGreatness";

function getDesertTownLevel()
{
    return applyOgmoLevel(DesertTownArgs);
}

type DesertTownLevel = ReturnType<typeof getDesertTownLevel>;

export function DesertTown()
{
    scene.backgroundColor = 0xF0F0B0;
    scene.terrainColor = 0xE0D060;
    jukebox.play(Country).warm(NewDesertOracle, Bluehouse, Shop, DesertField, Witch);
    const level = getDesertTownLevel();

    level.BarBuilding.tint = 0xA0C0C0;
    level.InnBuilding.tint = 0xE08060;
    level.RightHouse.tint = 0xE08060;
    level.LeftHouse.tint = 0xA0C0C0;

    if (!progress.flags.desert.heardIntroduction)
    {
        addIntroduction(level);
        progress.flags.desert.heardIntroduction = true;
    }

    enhanceCrateStacker(level);
    enhanceDigSpot(level);

    [level.Tumbleweed1, level.Tumbleweed2].forEach(x => rng.bool && tumbleweed().at(x).show());

    preventGettingStuckInBoulders();

    if (progress.checkpointName.toLowerCase().includes('top'))
        player.vspeed = -2;

    level.LeftHouseDoor.locked = progress.flags.final.doorOpened;
}

function preventGettingStuckInBoulders() {
    if (progress.flags.desert.bigKey.reward)
        return;

    if (player.x < 128)
        player.x += 40;
}

function addIntroduction(level: DesertTownLevel)
{
    const lizard = npc(level.LeftHouseDoor.x - 32, level.LeftHouseDoor.y + 32, 2).show();
    lizard.engine.walkSpeed = 2;
    cutscene.play(async () => {
        scene.camera.followPlayer = false;

        await sleep(1_000);
        await lizard.walkTo(level.LeftHouseDoor.x + 32);
        await sleep(1_000);
        await move(scene.camera).to(Math.round((lizard.x + player.x) / 2) - 128, lizard.y - 128).over(1_000);
        await sleep(1_000);
        await show("A great evil has entered the world.");
        await show("You are the one who must stop the evil.");
        await show("You can walk with left and right arrows and jump with space bar.");
        await show("To interact with an object or another iguana, press up arrow.");
        await show("To duck, press down arrow.");
        await show("You have a supply of potions and medicine. To use something or just check your supply, press U.");
        await show("You can save by resting at an inn.");
        await show("In the town there is an oracle if you need advice. Good luck.");
        await lizard.walkTo(level.LeftHouseDoor.x - 128);
        await moveCameraToPlayerTarget(5);

        lizard.destroy();
        await persistence.save();

        scene.camera.followPlayer = true;
    });
}

function enhanceCrateStacker(level: DesertTownLevel)
{
    const crates = [ level.Crate0, level.Crate1, level.Crate2, level.Crate3, level.Crate4, level.Crate5, level.Crate6, level.Crate7, level.Crate8, level.Crate9 ];

    crates.forEach(x => {
        const pipe = resolvePipeHorizontal({ ...x.vcpy().add(-3, 0), width: x.width + 6, visible: false } as any);
        x.on('removed', () => pipe.destroy());
    })

    let cratesLeftToStack = crates.length;

    let lastStackedCrate: Sprite | null;
    function stackCrate(playSound = true)
    {
        cratesLeftToStack--;
        if (cratesLeftToStack <= 0)
            progress.flags.desert.stackedAllCrates = true;

        const nextCrate = Sprite.from(CrateWooden).at(
            lastStackedCrate
                ? { x: lastStackedCrate.x + Math.round(rng.polar * 6), y: lastStackedCrate.y - lastStackedCrate.height }
                : level.DropCrateAnchor).behind();
        nextCrate.withInteraction(stackCrateByPlayer);
        resolvePipeHorizontal({ ...vector(nextCrate), width: nextCrate.width, visible: false } as any);
        lastStackedCrate = nextCrate;
        if (playSound && isOnScreen(level.DropCrateAnchor))
            CratePlace.play();
    }

    function pickupCrate(playSound = true)
    {
        const crate = crates.shift();
        if (!crate)
            return false;

        if (playSound && isOnScreen(level.PickupCratesRegion))
            CratePickup.play();
        crate.destroy();
        return true;
    }

    if (progress.flags.desert.stackedAllCrates)
    {
        while (pickupCrate(false))
            stackCrate(false);

        level.Stacker.at({x: 96, y: -32}.add(level.DropCrateAnchor));
        level.Stacker.duckImmediately();
        level.Stacker.closeEyesImmediately();
        level.Stacker.mods.add(Sleepy);
    }

    level.CrateStackKey.y += 28 - player.height;
    level.CrateStackKey.asCollectible(progress.flags.desert.key, "fromTopOfCrateStack");

    let tiredOfWorking = progress.flags.desert.stackedAllCrates;

    level.Stacker.withPixin(DestroyAfterGreatness).cutscene = async () => {
        level.Stacker.mods.remove(Sleepy);
        if (progress.flags.desert.stackedAllCrates)
        {
            if (!progress.flags.desert.crateStacker.receivedBallon) {
                await show("Thank you for your help.");
                await show("All I have to show my appreciation is this ballon.");
                CollectGeneric.play();
                await show("Received WonderBallon.");
                inventory.push('WonderBallon');
                progress.flags.desert.crateStacker.receivedBallon = true;
            }
            else {
                await show("I hope the ballon I gave you was useful.");
                await show("Before the invaders came, we used ballons all the time.");
                await show("Once, someone I knew told me of a city in the sky.");
                await show("But I don't think ballons alone could get you there.");
            }
        }
        else if (tiredOfWorking)
            await show("I think I'm done working for today.");
        else
            await show("It's my job to take the crates and stack them.");
    };
    level.Stacker.engine.walkSpeed = 1;

    if (!tiredOfWorking)
    {
        level.Stacker.withAsync(async () => {
            await wait(() => isOnScreen(level.Stacker));
            while (crates.length > 2)
            {
                await level.Stacker.walkTo(crates[0].x);
                await sleep(500);
                if (!pickupCrate())
                    continue;

                await sleep(500);
                await level.Stacker.walkTo(level.DropCrateAnchor.x + 32);
                await sleep(500);
                stackCrate();
                await sleep(500);
            }

            await level.Stacker.walkTo(level.DropCrateAnchor.x + 96);
            level.Stacker.isDucking = true;
            tiredOfWorking = true;
        });
    }

    let playerHasCrate = false;

    const crateInteraction = () => {
        if (crates.length < 1)
            return;

        cutscene.play(async () => {
            if (playerHasCrate)
                await show("You are already carrying a crate.");
            else if (pickupCrate())
            {
                playerHasCrate = true;
                await show("Picked up a crate.");
            }
        });
    };

    crates.forEach(x => x.withInteraction(crateInteraction));

    function stackCrateByPlayer() {
        if (!playerHasCrate)
            return;

        playerHasCrate = false;
        stackCrate();
        cutscene.play(async () => {
            await show("You placed the crate.");
        });
    }

    level.DropCrateRegion.withInteraction(stackCrateByPlayer);
}

function enhanceDigSpot(level: DesertTownLevel)
{
    level.DigKey.asCollectible(progress.flags.desert.key, "fromDiggingInTown");

    const blocks = [ level.Dig2, level.Dig3, level.Dig4, level.Dig5, level.Dig6, level.Dig6_1 ];
    if (progress.flags.desert.dugInDesertTown)
    {
        blocks.forEach(x => x.destroy());
        return;
    }

    level.StartDigging.withStep(() => {
        const follower = player.follower;

        if (!progress.flags.desert.diguaIsFollowing || !follower || !follower.collides(level.StartDigging))
            return;

        const b = level.StartDigging.getBounds();
        const v = vector(level.StartDigging);

        cutscene.play(async () => {
            scene.camera.followPlayer = false;
            follower.hspeed = 0;
            follower.isFollowing = false;

            await Promise.all([
                show("Hey! I think there is something I can dig here!"),
                move(scene.camera).to(level.DigKey.x - 128, scene.camera.y).over(1_000),
                player.walkTo(v.x - 24).then(() => player.scale.x = 1) ]);

            for (const block of blocks) {
                const next = { x: 8, y: -8 }.add(block.getLocalBounds());
                follower.scale.x = Math.sign(next.x - follower.x);
                follower.at(next);
                await sleep(250);
                follower.isDucking = true;
                await sleep(250);
                Dig.play();
                block.destroy();
                follower.duckUnit = 0;
                follower.isDucking = false;
            }

            progress.flags.desert.dugInDesertTown = true;
            follower.at(player.x + b.width + 64, player.y);

            await sleep(500);
            await show("Looks like something pretty nice! You should have it!");
            await show("I'm going to the bar now.");

            await follower.walkTo(scene.camera.x + 300);
            follower.destroy();

            progress.flags.desert.diguaIsFollowing = false;
            progress.flags.desert.diguaIsInBar = true;

            await moveCameraToPlayerTarget(5);

            scene.camera.followPlayer = true;
        });

        level.StartDigging.destroy();
    })
}
