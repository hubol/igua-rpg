import {Sprite, Container} from "pixi.js";
import {
    CharacterBody, CharacterCrest, CharacterFoot,
    CharacterHead, CharacterMouthV, CharacterPupils, CharacterWhites
} from "../textures";
import {iguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {iguanaEyes} from "../igua/puppet/eyes";
import {
    CharacterHurt, CharacterHurtDefense
} from "../sounds";
import {playerCharacterKey as playerKey} from "../igua/logic/playerCharacterKey";
import {merge} from "../utils/merge";
import {progress} from "../igua/data/progress";
import {gotoDeathScreen} from "../igua/gotoDeathScreen";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {level} from "../igua/level/level";
import {UnrealFlight} from "../levels/unrealFlight";
import {scene} from "../igua/scene";
import {followerNpc} from "./followerNpc";
import {npc} from "./npc";

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
            follower: getFollower(),
            invulnerableFrameCount: 0,
            isDead: false,
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
                    CharacterHurtDefense.play();
                    progress.health -= health * 0.8;
                    player.invulnerableFrameCount = 30;
                }
                else
                {
                    CharacterHurt.play();
                    progress.health -= health;
                    player.invulnerableFrameCount = 60;
                }

                if (progress.health <= 0)
                    gotoDeathScreen();
            }
        });

    const engine = player.engine;

    const step = () => {
        if (player.invulnerableFrameCount <= 0)
            player.visible = true;
        else
        {
            player.invulnerableFrameCount--;
            player.visible = !player.visible;
        }

        if (player.isDead)
        {
            player.canBlink = false;
            player.isClosingEyes = true;
            player.isDucking = true;
            player.hspeed = 0;
            player.vspeed = 0;
            engine.on = false;
            return;
        }

        player.isDucking = (playerKey.isDown("ArrowDown") && engine.coyote > 0) || player.mods.has(Sleepy);

        if (!player.isDucking)
        {
            if (playerKey.isDown("ArrowRight"))
                player.hspeed += 0.5;
            if (playerKey.isDown("ArrowLeft"))
                player.hspeed -= 0.5;
            if (playerKey.isUp("ArrowRight") && playerKey.isUp("ArrowLeft"))
                player.hspeed *= 0.8;
        }

        if (level.current === UnrealFlight)
        {
            if (playerKey.isDown("Space"))
                player.vspeed -= 0.3;
            return;
        }

        if (engine.coyote > 0 && playerKey.justWentDown("Space"))
        {
            engine.coyote = 0;
            player.vspeed = -3;
            engine.isOnGround = false;
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
    };

    player
        .withStep(step)
        .withStep(() => engine.step());

    return player;
}

function getFollower()
{
    if (progress.flags.diguaIsFollowing)
        return scene.playerStage.addChild(followerNpc(npc(0, 0, 4)));
}