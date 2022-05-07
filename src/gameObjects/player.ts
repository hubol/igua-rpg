import {iguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {
    CharacterHurt, CharacterHurtDefense
} from "../sounds";
import {playerCharacterHasControl, playerCharacterKey as playerKey} from "../igua/logic/playerCharacterKey";
import {merge} from "../utils/object/merge";
import {progress} from "../igua/data/progress";
import {gotoDeathScreen} from "../igua/gotoDeathScreen";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {UnrealFlight} from "../levels/unrealFlight";
import {scene} from "../igua/scene";
import {followerNpc} from "./followerNpc";
import {npc} from "./npc";
import {showUseMenu} from "../igua/inventory/showUseMenu";
import {ballons, DisplayState} from "./ballons";
import {game} from "../igua/game";
import {makeIguanaPuppetArgsFromLooks} from "../igua/looks/makeIguanaPuppetArgsFromLooks";
import {showQuitMenu} from "../igua/inventory/showQuitMenu";

export function playerPuppetArgs() {
    return makeIguanaPuppetArgsFromLooks(progress.looks);
}

function playerPuppet() {
    const puppet = iguanaPuppet(playerPuppetArgs());

    const defaultCollides = puppet.collides;
    const precise = puppet.find(x => x.ext.precise);
    puppet.ext.preferMyCollides = true;

    puppet.collides = (...args) => {
        return defaultCollides.apply(puppet, args) && precise.some(x => x.collides(...args));
    };

    return puppet;
}

type Player = ReturnType<typeof createPlayer>;
export let player: Player;

export function setPlayer(newPlayer: Player) {
    return player = newPlayer;
}

export function createStagedPlayer() {
    setPlayer(createPlayer()).ahead();
}

export function createStagedFakePlayer() {
    setPlayer(createPlayer(false)).at(-10000, -10000).ahead();
}

export function recreatePlayerInPlace() {
    const { x, y, scale } = player;
    player.destroy();
    createStagedPlayer();
    scene.ext.__player = player;
    player.x = x;
    player.y = y;
    player.scale.x = scale.x;
}

function conditionallyGotoDeathScreen() {
    if (progress.health <= 0)
        gotoDeathScreen();
}

function createPlayer(behavior = true)
{
    const player = merge(playerPuppet(),
        {
            follower: behavior && createFollower(),
            invulnerableFrameCount: 0,
            isDead: false,
            drain(health: number) {
                progress.health -= health;
                conditionallyGotoDeathScreen();
            },
            damage(health: number)
            {
                if (player.isDead)
                    return;
                if (player.invulnerableFrameCount > 0)
                    return false;

                if (player.isDucking)
                {
                    CharacterHurtDefense.play();
                    const preventDeath = progress.health > 1;
                    progress.health -= health * 0.8;
                    if (preventDeath)
                        progress.health = Math.max(progress.health, 1);
                }
                else
                {
                    CharacterHurt.play();
                    progress.health -= health;
                }
                player.invulnerableFrameCount = 60;

                conditionallyGotoDeathScreen();

                return true;
            },
            get strength() {
                return 10 + (progress.level - 1) * 5;
            }
        });

    if (!behavior)
        return player;

    const engine = player.engine;

    let bufferedJump = 0;
    let ballonLifeTick = 0;

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

        if (playerKey.justWentDown("KeyU"))
            showUseMenu();
        if (playerKey.justWentDown("Escape"))
            showQuitMenu();

        if (playerCharacterHasControl() && progress.health > 5 && progress.poisonLevel > 0)
            player.drain(Math.min(progress.health - 5, 0.01 * Math.pow(progress.poisonLevel, 2)));

        if (!engine.isOnGround) {
            ballonLifeTick = (ballonLifeTick + 1) % 60;
            if (playerCharacterHasControl() && ballonLifeTick === 0) {
                for (let i = 0; i < progress.ballons.length; i++)
                    progress.ballons[i] -= 1 / 59.5;
            }
        }

        const baseSpeed = !progress.poisonLevel ? 2.5 : 3.25;
        player.engine.walkSpeed = baseSpeed + Math.max(0, 0.5 * (progress.poisonLevel - 1));
        player.engine.gravity = Math.max(0.02, 0.15 - Math.min(1, progress.ballons.length) * 0.01 - Math.max(0, progress.ballons.length - 1) * 0.00625);

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

        if (scene.source === UnrealFlight)
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

    const offset = {
        x: 0,
        get y() {
            return -4 + player.duckUnit * 3;
        }
    }

    if (progress.ballons.length !== displayState.length)
        displayState = [];
    ballons({ target: player, state: progress.ballons, offset, string: 24, ticker: game.hudStage.ticker, displayState });

    return player;
}

let displayState: DisplayState = [];

export function createFollower()
{
    if (progress.flags.desert.diguaIsFollowing)
        {
            const npcGameObject = followerNpc(npc(0, 0, 4));
            scene.playerStage.addChild(npcGameObject);
            return npcGameObject;
        }
}
