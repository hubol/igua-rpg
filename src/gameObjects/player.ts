import {Sprite, Container} from "pixi.js";
import {push} from "./walls";
import {
    CharacterBody, CharacterCrest, CharacterFoot,
    CharacterHead, CharacterMouthV, CharacterPupils, CharacterWhites
} from "../textures";
import {game} from "../igua/game";
import {iguanaPuppet} from "../igua/iguanaPuppet";
import {iguanaEyes} from "../igua/iguanaEyes";
import {
    CharacterHitCeiling,
    CharacterLandOnGround,
    CharacterStep,
    CharacterStep2,
    CharacterStep3,
    CharacterStep4
} from "../sounds";
import {playerCharacterKey as playerKey} from "../igua/playerCharacterKey";
import {merge} from "../utils/merge";
import {progress} from "../igua/progress";

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
    const player = merge(playerPuppet(),
        {
            isOnGround: false,
            coyote: 0,
            invulnerableFrameCount: 0,
            damage(health: number)
            {
                if (player.invulnerableFrameCount > 0)
                {
                    // TODO SFX
                    player.invulnerableFrameCount -= 5;
                    return;
                }

                if (player.isDucking)
                {
                    progress.health -= health * 0.8;
                    player.invulnerableFrameCount = 30;
                }
                else
                {
                    progress.health -= health;
                    player.invulnerableFrameCount = 60;
                }

                if (progress.health <= 0)
                {
                    // TODO DIE
                }
                // TODO SFX
            }
        });

    let pedometer = 0;

    const physicsStep = () => {
        if (player.invulnerableFrameCount <= 0)
            player.visible = true;
        else
        {
            player.invulnerableFrameCount--;
            player.visible = !player.visible;
        }

        player.isDucking = playerKey.isDown("ArrowDown") && player.coyote > 0;

        if (player.isDucking)
        {
            player.hspeed *= 0.9;
        }
        else
        {
            if (playerKey.isDown("ArrowRight"))
                player.hspeed += 0.5;
            if (playerKey.isDown("ArrowLeft"))
                player.hspeed -= 0.5;
            if (playerKey.isUp("ArrowRight") && playerKey.isUp("ArrowLeft"))
                player.hspeed *= 0.8;
        }

        player.hspeed = Math.min(2.5, Math.abs(player.hspeed)) * Math.sign(player.hspeed);

        const barelyWalking = Math.abs(player.hspeed) < 0.1;
        if (barelyWalking)
        {
            player.hspeed = 0;
            pedometer = 0;
        }

        if (player.coyote > 0 && playerKey.justWentDown("Space"))
        {
            player.coyote = 0;
            player.vspeed = -3;
            player.isOnGround = false;
        }
        if (player.vspeed !== 0 && playerKey.isDown("Space"))
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

        const vspeedBeforePush = player.vspeed;

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
            player.isOnGround = !!result.isOnGround;

            if (result.hitCeiling && player.vspeed !== 0)
            {
                CharacterHitCeiling.volume(0.33 + Math.min(0.67, vspeedBeforePush * -0.06));
                CharacterHitCeiling.play();
                player.vspeed = 0;
            }
            if (result.hitGround)
            {
                if (player.coyote < 5)
                {
                    CharacterLandOnGround.volume(0.33 + Math.min(0.67, vspeedBeforePush * 0.06));
                    CharacterLandOnGround.play();
                }
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

        const lastPedometer = pedometer;

        if (player.isOnGround || player.coyote > 15)
            pedometer += Math.abs(player.hspeed);

        if (pedometer > 24 && lastPedometer <= 24)
        {
            CharacterStep.volume(.4);
            CharacterStep.play();
        }
        else if (pedometer > 44 && lastPedometer <= 44)
        {
            CharacterStep2.volume(.4);
            CharacterStep2.play();
        }
        else if (pedometer > 62 && lastPedometer <= 62)
        {
            CharacterStep3.volume(.4);
            CharacterStep3.play();
        }
        else if (pedometer > 82 && lastPedometer <= 82)
        {
            CharacterStep4.volume(.4);
            CharacterStep4.play();
            pedometer = 0;
        }
    };

    player.withStep(physicsStep);

    return player;
}