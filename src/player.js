import {Key} from "./utils/key";
import {Sprite, Container} from "pixi.js";
import {push} from "./walls";
import {approachLinear, lerp} from "./utils/math";
import {subimageTextures} from "./utils/simpleSpritesheet";
import {
    CharacterBody, CharacterCrest,
    CharacterFootBackLeft,
    CharacterFootBackRight,
    CharacterFootFrontLeft, CharacterFootFrontRight,
    CharacterHead
} from "./textures";
import {game} from "./game";

export function player()
{
    const bodySprite = Sprite.from(CharacterBody);
    bodySprite.y = 5;
    const backLeftFoot = Sprite.from(CharacterFootBackLeft);
    const backRightFoot = Sprite.from(CharacterFootBackRight);
    const frontLeftFoot = Sprite.from(CharacterFootFrontLeft);
    const frontRightFoot = Sprite.from(CharacterFootFrontRight);

    const crest = Sprite.from(CharacterCrest);
    crest.pivot.set(3, 5);

    const headTextures = subimageTextures(CharacterHead, 4);
    const head = new Container();
    head.pivot.set(-15, -5);

    const headSprite = Sprite.from(headTextures[0]);
    headSprite.isClosingEyes = false;
    headSprite.closedEyesUnit = 0;
    headSprite.ticksUntilBlink = 60;

    head.addChild(crest, headSprite);

    const body = new Container();
    body.addChild(bodySprite, head);

    const player = new Container();
    player.addChild(backLeftFoot, frontLeftFoot, body, backRightFoot, frontRightFoot);
    player.pivot.set(11, 17);

    player.x = 80;
    player.y = 80;
    player.isOnGround = false;
    player.hspeed = 0;
    player.vspeed = 0;
    player.coyote = 0;
    player.trip = 0;
    player.duckUnit = 0;

    const step = () => {
        const isDucking = Key.isDown("ArrowDown") && player.coyote > 0;

        if (headSprite.ticksUntilBlink-- <= 0)
        {
            headSprite.ticksUntilBlink = 120 + Math.random() * 120;
            headSprite.isClosingEyes = true;
        }

        headSprite.closedEyesUnit = approachLinear(headSprite.closedEyesUnit, headSprite.isClosingEyes ? 1.3 : 0, 0.3);
        if (headSprite.closedEyesUnit > 1.2)
            headSprite.isClosingEyes = false;
        headSprite.texture = headTextures[Math.min(3, Math.round(headSprite.closedEyesUnit * 3))];

        if (isDucking)
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

        player.trip += player.hspeed;

        if (player.vspeed !== 0 && barelyWalking)
            player.trip += 0.5;

        body.position.set(0, 0);
        backLeftFoot.position.set(0, 0);
        backRightFoot.position.set(0, 0);
        frontLeftFoot.position.set(0, 0);
        frontRightFoot.position.set(0, 0);

        if (!barelyWalking || player.vspeed !== 0)
        {
            const t = player.trip * 0.1;
            body.position.y = Math.round(Math.sin(t + 2));
            backLeftFoot.position.y = Math.round(Math.abs(Math.sin(t + 1)) * -2);
            backRightFoot.position.y = Math.round(Math.abs(Math.sin(t)) * -2);
            frontLeftFoot.position.y = Math.round(Math.abs(Math.cos(t + 1)) * -2);
            frontRightFoot.position.y = Math.round(Math.abs(Math.cos(t)) * -2);
        }

        player.duckUnit = lerp(player.duckUnit, isDucking ? 1 : 0, 0.2);
        const duckUnit = Math.round(player.duckUnit * 3) / 3;

        if (duckUnit > 0.05)
        {
            body.position.y = Math.round(duckUnit * 4);
            backLeftFoot.position.x -= Math.round(duckUnit);
            backRightFoot.position.x -= Math.round(Math.pow(duckUnit, 2));
            frontLeftFoot.position.x += Math.round(Math.pow(duckUnit, 2));
            frontRightFoot.position.x += Math.round(duckUnit);
        }

        crest.x = Math.round(duckUnit * 2);
        crest.y = Math.round(duckUnit * -1);
        head.y = Math.round(duckUnit * 2);

        if (player.hspeed < 0)
            player.scale.x = -1;
        else if (player.hspeed > 0)
            player.scale.x = 1;

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

    player.on('added', () => game.ticker.add(step));
    player.on('removed', () => game.ticker.remove(step));

    return player;
}