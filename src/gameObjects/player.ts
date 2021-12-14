import {Sprite, Container} from "pixi.js";
import {
    CharacterBody, CharacterCrest, CharacterFoot,
    CharacterHead, CharacterMouthV, CharacterPupils, CharacterWhites
} from "../textures";
import {iguanaPuppet, IguanaPuppetArgs} from "../igua/puppet/iguanaPuppet";
import {iguanaEyes} from "../igua/puppet/eyes";
import {
    CharacterHurt, CharacterHurtDefense
} from "../sounds";
import {playerCharacterHasControl, playerCharacterKey as playerKey} from "../igua/logic/playerCharacterKey";
import {merge} from "../utils/merge";
import {progress} from "../igua/data/progress";
import {gotoDeathScreen} from "../igua/gotoDeathScreen";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {level} from "../igua/level/level";
import {UnrealFlight} from "../levels/unrealFlight";
import {scene} from "../igua/scene";
import {followerNpc} from "./followerNpc";
import {npc} from "./npc";
import {showUseMenu} from "../igua/inventory/showUseMenu";

export function playerPuppetArgs() {
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

    const pupils = Sprite.from(CharacterPupils);
    pupils.tint = 0x9957AF;
    pupils.pivot.set(-2, -3);

    const eyes = iguanaEyes({ eyelidColor: 0xB29400, pupils, eyeShape: Sprite.from(CharacterWhites) });

    return <IguanaPuppetArgs>{
        backRightFoot,
        frontLeftFoot,
        backLeftFoot,
        body,
        crest,
        head,
        eyes,
        frontRightFoot
    };
}

function playerPuppet() {
    return iguanaPuppet(playerPuppetArgs());
}

export let player: ReturnType<typeof createPlayer>;

export function recreatePlayer()
{
    if (player?.destroy)
        player.destroy({children: true});

    player = createPlayer();
    scene.playerStage.addChild(player);
}

function conditionallyGotoDeathScreen() {
    if (progress.health <= 0)
        gotoDeathScreen();
}

function createPlayer()
{
    const player = merge(playerPuppet(),
        {
            follower: createFollower(),
            invulnerableFrameCount: 0,
            isDead: false,
            drain(health: number) {
                progress.health -= health;
                conditionallyGotoDeathScreen();
            },
            damage(health: number)
            {
                if (player.invulnerableFrameCount > 0)
                {
                    // TODO SFX
                    player.invulnerableFrameCount -= 1;
                    return false;
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

                conditionallyGotoDeathScreen();

                return true;
            },
            get strength() {
                return 1 + (progress.level - 1) * 0.6;
            }
        });

    const engine = player.engine;

    let bufferedJump = 0;

    const step = () => {
        if (playerKey.justWentDown("KeyU"))
            showUseMenu();

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

        if (playerCharacterHasControl() && progress.health > 5 && progress.poisonLevel > 0)
            player.drain(Math.min(progress.health - 5, 0.01 * Math.pow(progress.poisonLevel, 2)));

        player.engine.walkSpeed = 2.5 + 0.5 * progress.poisonLevel;

        player.isDucking = (playerKey.isDown("ArrowDown") && engine.coyote > 0) || player.mods.has(Sleepy);

        if (!player.isDucking)
        {
            const isKnockedBack = Math.abs(player.engine.knockback.x) > 0.05;
            const deltaHspeed = isKnockedBack ? 0.01 : 0.5;
            if (playerKey.isDown("ArrowRight"))
                player.hspeed += deltaHspeed;
            if (playerKey.isDown("ArrowLeft"))
                player.hspeed -= deltaHspeed;
            if ((playerKey.isUp("ArrowRight") && playerKey.isUp("ArrowLeft")) || isKnockedBack)
                player.hspeed *= 0.8;
        }

        if (level.current === UnrealFlight)
        {
            if (playerKey.isDown("Space"))
                player.vspeed -= 0.3;
            return;
        }

        if (playerKey.justWentDown("Space"))
            bufferedJump = 5;
        if (engine.coyote > 0 && bufferedJump)
        {
            engine.coyote = 0;
            player.vspeed = -3;
            engine.isOnGround = false;
        }

        if (bufferedJump > 0)
            bufferedJump--;

        if (player.vspeed !== 0 && playerKey.isDown("Space"))
        {
            if (player.vspeed < 0)
                player.vspeed -= 0.09;
            else if (player.vspeed < 2)
                player.vspeed -= 0.04;
            else if (player.vspeed < 6)
                player.vspeed -= 0.02;
        }
        player.vspeed = Math.max(-4, player.vspeed);
    };

    player
        .withStep(step)
        .withStep(() => engine.step());

    return player;
}

export function createFollower()
{
    if (progress.flags.desert.diguaIsFollowing)
        {
            const npcGameObject = followerNpc(npc(0, 0, 4));
            scene.playerStage.addChild(npcGameObject);
            return npcGameObject;
        }
}
