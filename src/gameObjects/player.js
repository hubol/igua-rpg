import {Key} from "../utils/key";
import {Sprite, Container} from "pixi.js";
import {push} from "./walls";
import {
    CharacterBody, CharacterCrest, CharacterFoot,
    CharacterHead, CharacterMouthV, CharacterPupils, CharacterWhites
} from "../textures";
import {game} from "../igua/game";
import {iguanaPuppet} from "../igua/iguanaPuppet";
import {iguanaEyes} from "../igua/iguanaEyes";

function playerPuppet()
{
    const body = Sprite.from(CharacterBody);
    body.tint = 0xCC70BB;

    const backLeftFoot = Sprite.from(CharacterFoot);
    backLeftFoot.tint = 0xC7D7D7;
    const frontLeftFoot = Sprite.from(CharacterFoot);
    frontLeftFoot.tint = 0xC7D7D7;

    const backRightFoot = Sprite.from(CharacterFoot);
    const frontRightFoot = Sprite.from(CharacterFoot);

    const crest = Sprite.from(CharacterCrest);
    crest.tint = 0xCC2C42;

    const head = new Container();
    const headSprite = Sprite.from(CharacterHead);
    headSprite.tint = 0xCCAE0A;
    const mouthSprite = Sprite.from(CharacterMouthV);
    mouthSprite.pivot.set(-10, -11);
    mouthSprite.tint = 0x9957AF;
    head.addChild(headSprite, mouthSprite);
    head.cacheAsBitmap = true;

    const pupils = Sprite.from(CharacterPupils);
    pupils.tint = 0x9957AF;
    pupils.pivot.set(-2, -3);

    const eyes = iguanaEyes({ eyelidColor: 0xB29400, pupils, eyeShape: Sprite.from(CharacterWhites) });

    return iguanaPuppet({
        backRightFoot,
        frontLeftFoot,
        backLeftFoot,
        body,
        crest,
        head,
        eyes,
        frontRightFoot
    });
}

export function player()
{
    const player = playerPuppet();

    player.isOnGround = false;
    player.coyote = 0;

    const physicsStep = () => {
        player.isDucking = Key.isDown("ArrowDown") && player.coyote > 0;

        if (player.isDucking)
        {
            player.hspeed *= 0.9;
        }
        else
        {
            if (Key.isDown("ArrowRight"))
                player.hspeed += 0.5;
            if (Key.isDown("ArrowLeft"))
                player.hspeed -= 0.5;
            if (Key.isUp("ArrowRight") && Key.isUp("ArrowLeft"))
                player.hspeed *= 0.8;
        }

        player.hspeed = Math.min(2.5, Math.abs(player.hspeed)) * Math.sign(player.hspeed);

        const barelyWalking = Math.abs(player.hspeed) < 0.1;
        if (barelyWalking)
            player.hspeed = 0;

        if (player.coyote > 0 && Key.justWentDown("ArrowUp"))
        {
            player.coyote = 0;
            player.vspeed = -3;
            player.isOnGround = false;
        }
        if (player.vspeed !== 0 && Key.isDown("ArrowUp"))
        {
            if (player.vspeed < 0)
                player.vspeed -= 0.09;
            else if (player.vspeed < 2)
                player.vspeed -= 0.04;
            else if (player.vspeed < 6)
                player.vspeed -= 0.02;
        }

        if (!player.isOnGround)
            player.vspeed += 0.15;

        let hsp = player.hspeed;
        let vsp = player.vspeed;

        const radius = 8;
        const maxMotion = Math.sqrt(radius);

        while (Math.abs(hsp) > 0 || Math.abs(vsp) > 0)
        {
            player.x += Math.min(maxMotion, Math.abs(hsp)) * Math.sign(hsp);
            player.y += Math.min(maxMotion, Math.abs(vsp)) * Math.sign(vsp);

            if (player.x < 20)
            {
                player.x = 20;
                hsp = 0;
                player.hspeed = 0;
            }
            else if (player.x > game.level.width - 20)
            {
                player.x = game.level.width - 20;
                hsp = 0;
                player.hspeed = 0;
            }

            if (player.y < 0)
            {
                player.y = 0;
                vsp = Math.abs(vsp);
                player.vspeed = Math.abs(player.vspeed);
            }
            else if (player.y > game.level.height)
            {
                player.y = game.level.height;
                vsp = -Math.abs(vsp);
                player.vspeed = -Math.abs(player.vspeed);
            }

            hsp = Math.abs(hsp) < maxMotion ? 0 : ((Math.abs(hsp) - maxMotion) * Math.sign(hsp));
            vsp = Math.abs(vsp) < maxMotion ? 0 : ((Math.abs(vsp) - maxMotion) * Math.sign(vsp));

            const result = push(player, radius);
            player.isOnGround = result.isOnGround;

            if (result.hitCeiling)
                player.vspeed = 0;
            if (result.hitGround)
            {
                player.vspeed = 0;
                player.isOnGround = true;
            }

            if (result.hitWall)
            {
                player.hspeed = 0;
                hsp = 0;
            }

            if (player.isOnGround)
                player.coyote = 25;
        }

        if (player.isOnGround)
            player.coyote = 25;
        else
            player.coyote--;
    };

    player.withStep(physicsStep);

    return player;
}