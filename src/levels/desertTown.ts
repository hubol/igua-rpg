import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertTownArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {Country, Oracle} from "../musics";
import {game} from "../igua/game";
import {Sprite} from "pixi.js";
import {CrateWooden} from "../textures";
import {isOnScreen} from "../igua/isOnScreen";
import { CratePickup, CratePlace } from "../sounds";

export function DesertTown()
{
    jukebox.play(Country).warm(Oracle);
    const level = applyOgmoLevel(DesertTownArgs);
    game.backgroundColor = 0xF0F0B0;
    game.terrainColor = 0xE0D060;

    level.RightHouse.tint = 0xE08060;
    level.LeftHouse.tint = 0xA0C0C0;
    level.RightHouseDoor.locked = true;

    const crates = [ level.Crate0, level.Crate1, level.Crate2, level.Crate3, level.Crate4, level.Crate5, level.Crate6, level.Crate7, level.Crate8, level.Crate9 ];

    let lastStackedCrate: Sprite | null;
    function stackCrate()
    {
        const nextCrate = Sprite.from(CrateWooden).at(
            lastStackedCrate
                ? { x: lastStackedCrate.x + Math.round(-6 + Math.random() * 12), y: lastStackedCrate.y - lastStackedCrate.height }
                : level.DropCrateAnchor);
        game.backgroundGameObjectStage.addChild(nextCrate);
        lastStackedCrate = nextCrate;
        if (isOnScreen(level.DropCrateAnchor))
            CratePlace.play();
    }

    function pickupCrate()
    {
        const crate = crates.shift();
        if (!crate)
            return false;

        if (isOnScreen(level.PickupCratesRegion))
            CratePickup.play();
        crate.destroy();
        return true;
    }

    let tiredOfWorking = false;

    level.Stacker.cutscene = async p => {
        if (tiredOfWorking)
            await p.show("I think I'm done working for today.");
        else
            await p.show("It's my job to take the crates and stack them.");
    };
    level.Stacker.engine.walkSpeed = 1;
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