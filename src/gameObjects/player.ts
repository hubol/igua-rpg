import {iguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {
    BurnedPlayer,
    CharacterHurt, CharacterHurtDefense, EffectPoison
} from "../sounds";
import {playerCharacterHasControl, PlayerCharacterInput as playerKey} from "../igua/logic/playerCharacterInput";
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
import {derivedStats} from "../igua/gameplay/derivedStats";
import {lava} from "./lava";
import {damageStatusConsts} from "../igua/gameplay/damageStatusConsts";
import {PlayerBurningEffect} from "./playerBurningEffect";
import {castPlayerSpell} from "./playerSpell";

export function playerPuppetArgs() {
    return makeIguanaPuppetArgsFromLooks(progress.looks);
}

export function playerPuppet() {
    const puppet = iguanaPuppet(playerPuppetArgs());

    const defaultCollides = puppet.collides;
    const precise = puppet.find(x => x.ext.precise);
    puppet.ext.preferMyCollides = true;

    puppet.collides = (...args) => {
        return defaultCollides.apply(puppet, args) && precise.some(x => x.collides(...args));
    };

    return puppet;
}

export type Player = ReturnType<typeof createPlayer>;
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
            effect(effect: 'poison') {
                if (player.isDead)
                    return;
                if (player.invulnerableFrameCount > 0)
                    return false;

                switch (effect) {
                    case "poison":
                        EffectPoison.play();
                        progress.status.poison += 1;
                        break;
                }

                player.invulnerableFrameCount = 60;
                return true;
            },
            damage(health: number)
            {
                health *= 1 + progress.newGamePlus;

                if (player.isDead)
                    return;
                if (player.invulnerableFrameCount > 0)
                    return false;

                if (player.isDucking)
                {
                    CharacterHurtDefense.play();
                    const preventDeath = progress.health > 1;
                    progress.health -= Math.max(1, Math.floor(health * 0.8));
                    if (preventDeath)
                        progress.health = Math.max(progress.health, 1);
                    player.invulnerableFrameCount = 90;
                }
                else
                {
                    CharacterHurt.play();
                    progress.health -= health;
                    player.invulnerableFrameCount = 60;
                }

                conditionallyGotoDeathScreen();

                if (player.isDead)
                    return;
                return true;
            },
            get strength() {
                return derivedStats.attackPower;
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
            return;
        }

        if (playerKey.justWentDown("InventoryMenuToggle"))
            showUseMenu();
        if (playerKey.justWentDown("PauseMenuToggle"))
            showQuitMenu();

        if (playerCharacterHasControl() && progress.health > 5 && progress.status.poison > 0)
            player.drain(Math.min(progress.health - 5, 0.01 * Math.pow(progress.status.poison, 2)));

        if (!engine.isOnGround) {
            ballonLifeTick = (ballonLifeTick + 1) % 60;
            if (playerCharacterHasControl() && ballonLifeTick === 0) {
                for (let i = 0; i < progress.status.ballons.length; i++)
                    progress.status.ballons[i] -= 1 / 59.5;
            }
        }

        const baseSpeed = !progress.status.poison ? 2.5 : 3.25;
        player.engine.walkSpeed = baseSpeed + Math.max(0, 0.5 * (progress.status.poison - 1));
        player.engine.gravity = Math.max(0.02, 0.15 - Math.min(1, progress.status.ballons.length) * 0.01 - Math.max(0, progress.status.ballons.length - 1) * 0.00625);

        player.isDucking = (playerKey.isDown("Duck") && engine.coyote > 0) || player.mods.has(Sleepy);

        if (!player.isDucking)
        {
            const isKnockedBack = Math.abs(player.engine.knockback.x) > 0.05;
            const deltaHspeed = isKnockedBack ? 0.01 : 0.5;
            if (playerKey.isDown("MoveRight"))
                player.hspeed += deltaHspeed;
            if (playerKey.isDown("MoveLeft"))
                player.hspeed -= deltaHspeed;
            if ((playerKey.isUp("MoveRight") && playerKey.isUp("MoveLeft")) || isKnockedBack)
                player.hspeed *= 0.8;
        }

        if (player.collides(lava.instances))
            progress.status.burn += damageStatusConsts.burnStatusBuildUp;
        else
            progress.status.burn = Math.max(0, progress.status.burn - damageStatusConsts.burnStatusRecover);

        if (progress.status.burn > 0)
            PlayerBurningEffect.value;

        if (progress.status.burn >= damageStatusConsts.burnStatusResistance) {
            player.vspeed = -1.33;
            player.engine.knockback.x = (0.67 + Math.random() * 1.1) * -Math.sign(player.hspeed);
            player.invulnerableFrameCount = 20;
            BurnedPlayer.play();
            player.drain(damageStatusConsts.burnStatusDrain);
            progress.status.burn = 0;
        }

        // TODO need a charging animation probably!
        if (playerKey.justWentDown('CastSpell'))
            castPlayerSpell();

        if (scene.source === UnrealFlight)
        {
            if (playerKey.isDown("Jump"))
                player.vspeed -= 0.3;
            return;
        }

        if (playerKey.justWentDown("Jump"))
            bufferedJump = 5;
        if (engine.coyote > 0 && bufferedJump)
        {
            engine.coyote = 0;
            player.vspeed = -3;
            engine.isOnGround = false;
        }

        if (bufferedJump > 0)
            bufferedJump--;

        if (player.vspeed !== 0 && playerKey.isDown("Jump"))
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

    if (progress.status.ballons.length !== displayState.length)
        displayState = [];
    ballons({ target: player, state: progress.status.ballons, offset, string: 24, ticker: game.hudStage.ticker, displayState });

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
