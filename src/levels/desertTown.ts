import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertTownArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {Country, Oracle} from "../musics";
import {game} from "../igua/game";
import {Sprite} from "pixi.js";
import {CrateWooden} from "../textures";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {CollectGeneric, CratePickup, CratePlace, Dig} from "../sounds";
import {progress} from "../igua/data/progress";
import {npc} from "../gameObjects/npc";
import {add, vector} from "../utils/math/vector";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {scene} from "../igua/scene";
import {player} from "../gameObjects/player";

function getDesertTownLevel()
{
    return applyOgmoLevel(DesertTownArgs);
}

type DesertTownLevel = ReturnType<typeof getDesertTownLevel>;

export function DesertTown()
{
    jukebox.play(Country).warm(Oracle);
    const level = getDesertTownLevel();
    scene.backgroundColor = 0xF0F0B0;
    scene.terrainColor = 0xE0D060;

    level.BarBuilding.tint = 0xA0C0C0;
    level.InnBuilding.tint = 0xE08060;
    level.RightHouse.tint = 0xE08060;
    level.LeftHouse.tint = 0xA0C0C0;
    level.RightHouseDoor.locked = true;
    level.BarDoor.locked = true;

    if (!progress.flags.desert.heardIntroduction)
    {
        addIntroduction(level);
        progress.flags.desert.heardIntroduction = true;
    }

    enhanceCrateStacker(level);
    enhanceDigSpot(level);
}

function addIntroduction(level: DesertTownLevel)
{
    const lizard = scene.gameObjectStage.addChild(npc(level.LeftHouseDoor.x - 32, level.LeftHouseDoor.y + 32, 2));
    lizard.engine.walkSpeed = 2;
    game.cutscenePlayer.playCutscene(async p => {
        scene.camera.followPlayer = false;

        await p.sleep(1_000);
        await lizard.walkTo(level.LeftHouseDoor.x + 32);
        await p.sleep(1_000);
        await p.move(scene.camera).to(Math.round((lizard.x + player.x) / 2) - 128, lizard.y - 128).over(1_000);
        await p.sleep(1_000);
        await p.show("A great evil has entered the world.");
        await p.show("You are the one who must stop the evil.");
        await p.show("You can walk with left and right arrows and jump with space bar.");
        await p.show("In the town there is an oracle if you need advice. Good luck.");
        await lizard.walkTo(level.LeftHouseDoor.x - 128);
        lizard.destroy();

        scene.camera.followPlayer = true;
    });
}

function enhanceCrateStacker(level: DesertTownLevel)
{
    const crates = [ level.Crate0, level.Crate1, level.Crate2, level.Crate3, level.Crate4, level.Crate5, level.Crate6, level.Crate7, level.Crate8, level.Crate9 ];
    let cratesLeftToStack = crates.length;

    let lastStackedCrate: Sprite | null;
    function stackCrate(playSound = true)
    {
        cratesLeftToStack--;
        if (cratesLeftToStack <= 0)
            progress.flags.desert.stackedAllCrates = true;

        const nextCrate = Sprite.from(CrateWooden).at(
            lastStackedCrate
                ? { x: lastStackedCrate.x + Math.round(-6 + Math.random() * 12), y: lastStackedCrate.y - lastStackedCrate.height }
                : level.DropCrateAnchor);
        scene.backgroundGameObjectStage.addChild(nextCrate);
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

        level.Stacker.at(add({x: 96, y: -32}, level.DropCrateAnchor));
        level.Stacker.duckImmediately();
        level.Stacker.closeEyesImmediately();
        level.Stacker.mods.add(Sleepy);
    }

    let tiredOfWorking = progress.flags.desert.stackedAllCrates;

    level.Stacker.cutscene = async p => {
        level.Stacker.mods.remove(Sleepy);
        if (progress.flags.desert.stackedAllCrates && !progress.flags.desert.thankedByCrateStacker)
        {
            await p.show("Thank you for your help.");
            await p.show("All I have to show my appreciation is this old key.");
            CollectGeneric.play();
            await p.show("Received the key.");
            progress.flags.desert.thankedByCrateStacker = true;
        }
        else if (tiredOfWorking)
            await p.show("I think I'm done working for today.");
        else
            await p.show("It's my job to take the crates and stack them.");
    };
    level.Stacker.engine.walkSpeed = 1;

    if (!tiredOfWorking)
    {
        level.Stacker.withAsync(async p => {
            await p.wait(() => isOnScreen(level.Stacker));
            while (crates.length > 2)
            {
                await level.Stacker.walkTo(crates[0].x);
                await p.sleep(500);
                if (!pickupCrate())
                    continue;

                await p.sleep(500);
                await level.Stacker.walkTo(level.DropCrateAnchor.x + 32);
                await p.sleep(500);
                stackCrate();
                await p.sleep(500);
            }

            await level.Stacker.walkTo(level.DropCrateAnchor.x + 96);
            level.Stacker.isDucking = true;
            tiredOfWorking = true;
        });
    }

    let playerHasCrate = false;

    level.PickupCratesRegion.withInteraction(() => {
        if (crates.length < 1)
            return;

        game.cutscenePlayer.playCutscene(async p => {
            if (playerHasCrate)
                await p.show("You are already carrying a crate.");
            else if (pickupCrate())
            {
                playerHasCrate = true;
                await p.show("Picked up a crate.");
            }
        });
    });

    level.DropCrateRegion.withInteraction(() => {
        if (!playerHasCrate)
            return;

        playerHasCrate = false;
        stackCrate();
        game.cutscenePlayer.playCutscene(async p => {
            await p.show("You placed the crate.");
        });
    });
}

function enhanceDigSpot(level: DesertTownLevel)
{
    level.DigKey.asCollectible(progress.flags.desert, "collectedDigKey");

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

        game.cutscenePlayer.playCutscene(async p => {
            scene.camera.followPlayer = false;
            follower.hspeed = 0;
            follower.isFollowing = false;

            await Promise.all([
                p.show("Hey! I think there is something I can dig here!"),
                p.move(scene.camera).to(level.DigKey.x - 128, scene.camera.y).over(1_000),
                player.walkTo(v.x - 24).then(() => player.scale.x = 1) ]);

            for (const block of blocks) {
                const next = add({ x: 8, y: -8 }, block.getLocalBounds());
                follower.scale.x = Math.sign(next.x - follower.x);
                follower.at(next);
                await p.sleep(250);
                follower.isDucking = true;
                await p.sleep(250);
                Dig.play();
                block.destroy();
                follower.duckUnit = 0;
                follower.isDucking = false;
            }

            progress.flags.desert.dugInDesertTown = true;
            follower.at(player.x + b.width + 64, player.y);

            await p.sleep(500);
            await p.show("Looks like something pretty nice! You should have it!");
            await p.show("I'm going to the bar now.");

            await follower.walkTo(scene.camera.x + 300);
            follower.destroy();

            progress.flags.desert.diguaIsFollowing = false;
            progress.flags.desert.diguaIsInBar = true;

            scene.camera.followPlayer = true;
        });

        level.StartDigging.destroy();
    })
}