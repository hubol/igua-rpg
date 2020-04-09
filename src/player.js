import {Key} from "./utils/key";
import {Sprite, Container} from "pixi.js";
import {app} from "./index";
import {push} from "./walls";
import {lerp} from "./utils/math";

export function player()
{
    const body = Sprite.from(require("./images/character/igua body.png"));
    const backLeftFoot = Sprite.from(require("./images/character/foot back left.png"));
    const backRightFoot = Sprite.from(require("./images/character/foot back right.png"));
    const frontLeftFoot = Sprite.from(require("./images/character/foot front left.png"));
    const frontRightFoot = Sprite.from(require("./images/character/foot front right.png"));
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

        if (player.duckUnit > 0.05)
        {
            body.position.y = Math.round(player.duckUnit * 4);
            backLeftFoot.position.x -= Math.round(player.duckUnit);
            backRightFoot.position.x -= Math.round(Math.pow(player.duckUnit, 2));
            frontLeftFoot.position.x += Math.round(Math.pow(player.duckUnit, 2));
            frontRightFoot.position.x += Math.round(player.duckUnit);
        }

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

    player.on('added', () => app.ticker.add(step));
    player.on('removed', () => app.ticker.remove(step));

    return player;
}