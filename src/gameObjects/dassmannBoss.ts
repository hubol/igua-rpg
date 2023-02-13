import {ArmTx, dassmann} from "./dassmann";
import {dassmannTower} from "./dassmannTower";
import {dassmannPoker} from "./dassmannPoker";
import {attack, attackRunner} from "./attacks";
import {player} from "./player";
import {sleep} from "../cutscene/sleep";
import {clownHealth} from "./utils/clownUtils";
import {wait} from "../cutscene/wait";
import {Undefined} from "../utils/types/undefined";
import {DisplayObject} from "pixi.js";
import {waitHold} from "../cutscene/waitHold";
import {hDistFromPlayer} from "../igua/logic/getOffsetFromPlayer";
import {
    BookInformationHalt,
    ClownHurt,
    DassBombLand,
    DassBuildTower,
    DassMoveUp,
    SpiderUp
} from "../sounds";
import {Invulnerable} from "../pixins/invulnerable";
import {bouncePlayerOffDisplayObject} from "../igua/bouncePlayer";
import {FreeSpace} from "../pixins/freeSpace";
import {approachLinear} from "../utils/math/number";
import {merge} from "../utils/object/merge";
import {container} from "../utils/pixi/container";
import {WeakToSpells} from "../pixins/weakToSpells";
import {arenaRegion} from "./region";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {move} from "../cutscene/move";
import {sparkleTell} from "./sparkleTell";
import {poisonBomb} from "./poisonBomb";
import {rng} from "../utils/math/rng";
import {getDassmannParticleColor} from "../levels/capitalStorehouse";

const consts = {
    damage: {
        poker: 50,
    },
    friction: 0.3,
}

export function dassmannBoss() {
    const d = merge(dassmann(), { isDead: false })
        .withPixin(Invulnerable())
        .withPixin(FreeSpace({ offsets: [[0, -8]] }));

    const gravity = d.gravity;

    d.friction = consts.friction;
    const { body, head, arml, armr } = d;
    type Arm = typeof arml;
    body.playFootsteps = true;

    const health = clownHealth(1000);

    d.withPixin(WeakToSpells({ spellsHurtbox: d.hurtboxes, clownHealth: health }));

    const attackRunnerContainer = container().withAsync(doAs).show(d);
    const attacks = attackRunner().show(attackRunnerContainer);

    function getPlayerFacingArms() {
        return [player.x < d.x ? arml : armr, player.x < d.x ? armr : arml];
    }

    function spawnTowerBetweenDassmannAndPlayer() {
        return dassmannTower().at(Math.round((d.x + player.x) / 2), d.y).show();
    }

    async function buildOneTower() {
        const [ armf, armr ] = getPlayerFacingArms();

        armf.pose = ArmTx.Rest;
        armr.pose = ArmTx.Tpose;
        DassBuildTower.play();
        armf.raise().over(250);
        armr.raise().over(250).then(() => armr.down().over(250));
        await sleep(125);
        await wait(() => d.isOnGround);
        const tower = spawnTowerBetweenDassmannAndPlayer();
        d.speed.y = -1.75;
        head.agape = 1;
        sleep(500).then(() => head.agape = 0);
        return tower;
    }

    const buildTower = attack({ tower: Undefined<DisplayObject>() })
        .withAsyncOnce(async self => {
            self.tower = await buildOneTower();

            const poker = dassmannPoker(consts.damage.poker).damageSource(d).show();
            self.on('removed', () => !poker.destroyed && poker.destroy());

            await health.tookDamage();
            arml.pose = ArmTx.Rest;
            armr.pose = ArmTx.Rest;
        })
        .withAsync(async self => {
            while (true) {
                await waitHold(() => !!self.tower && self.tower.destroyed, health.unit > 0.7 ? 70 : 60);
                await wait(() => d.isOnGround && hDistFromPlayer(d) > 64);
                self.tower = await buildOneTower();
            }
        })
        .withAsync(async () => {
            while (true) {
                await waitHold(() => !d.isOnGround, 120);
                d.speed.x = d.freeSpaceOnLeft() > d.freeSpaceOnRight() ? -1.5 : 1.5;
            }
        });

    async function throwPoisonBomb(arm: Arm) {
        let thrown = false;
        // @ts-ignore
        BookInformationHalt.rate(1).play();
        const b = poisonBomb()
            .damageSource(d)
            .withStep(() => {
                if (health.isDead)
                    return b.destroy();
                if (!thrown)
                    b.at(arm.fistWorldPos);
            })
            .withAsync(async () => {
                await wait(() => b.isOnGround);
                DassBombLand.play();
                b.lit = true;
            });
        b.show();
        b.gravity = 0;
        arm.pose = ArmTx.Rest;
        await arm.raise().over(200);
        thrown = true;
        const offset = (player.x - d.x) + player.hspeed + rng.polar * 8;
        const hspeed = offset * 0.05;
        b.gravity = 0.2;
        b.speed.at(hspeed, -2);
    }

    const teleportAndThrowPoisonBombs = attack({ moving: false, gravityOn: true })
        .withAsyncOnce(async (self) => {
            arml.pose = ArmTx.Rest;
            armr.pose = ArmTx.Rest;
            arml.raise().over(500);
            await armr.raise().over(500);

            await sleep(200);

            SpiderUp.play();
            d.speed.y = -4;

            armr.rest().over(200);
            arml.rest().over(200);
            await wait(() => d.speed.y > -0.5);

            DassMoveUp.play();

            self.gravityOn = false;
            self.moving = true;
            const target = getWorldCenter(arenaRegion.instances[0]).add(0, 4);
            await move(d).to(target).over(750);
            self.moving = false;

            await sleep(300);
            await throwPoisonBomb(armr);
            await throwPoisonBomb(arml);
            await throwPoisonBomb(armr);
            await throwPoisonBomb(armr);
            await sleep(1500);
            self.gravityOn = true;
            await sleep(500);
        })
        .withAsync(async (self) => {
            while (true) {
                await wait(() => self.moving);
                sparkleTell(false).tinted(getDassmannParticleColor()).at(d).show();
                await sleep(100);
            }
        })
        .withStep((self) => {
            d.gravity = self.gravityOn ? gravity : 0;
            if (!self.gravityOn) {
                d.speed.x = approachLinear(d.speed.x, 0, 0.2);
                d.speed.y = approachLinear(d.speed.y, 0, 0.2);
            }
        });

    const flee = attack({ hspeed: 0, canJump: false })
        .withAsyncOnce(async (self) => {
            self.hspeed = 3.3 * (d.freeSpaceOnLeft() > d.freeSpaceOnRight() ? -1 : 1);
            d.friction = 0;
            const fn = self.hspeed < 0 ? d.freeSpaceOnLeft : d.freeSpaceOnRight;
            await Promise.all([
                wait(() => fn() < 64 || hDistFromPlayer(d) > 128).then(() => self.hspeed = 0),
                sleep(250)
            ]);
        })
        .withAsync(async () => {
            arml.pose = ArmTx.Rest;
            while (true) {
                await arml.raise().over(250);
                await sleep(125);
                await arml.rest().over(250);
                await sleep(125);
            }
        })
        .withAsync(async () => {
            armr.pose = ArmTx.Raise;
            while (true) {
                await armr.rest().over(250);
                await sleep(125);
                await armr.raise().over(250);
                await sleep(125);
            }
        })
        .withAsync(async self => {
            while (true) {
                await waitHold(() => !self.canJump, 30);
                self.canJump = true;
            }
        })
        .withStep(self => {
            d.speed.x = approachLinear(d.speed.x, self.hspeed, 0.2);
            if (self.canJump && d.isOnGround && hDistFromPlayer(d) < 48) {
                SpiderUp.play();
                self.canJump = false;
                d.speed.y = -4.3;
            }
        })
        .withCleanup(() => {
            d.friction = consts.friction;
        });

    async function doAs() {
        await sleep(250);
        while (true) {
            await attacks.run(buildTower());
            await sleep(1000);
            await attacks.run(flee());
            await attacks.run(buildTower());
            await attacks.run(teleportAndThrowPoisonBombs());
            await attacks.run(flee());
        }
    }

    let framesSinceInvulnerable = 1000;

    function takeDamage() {
        if (d.invulnerable > 0) {
            framesSinceInvulnerable = 0;
            head.agape = 1;
            if (d.invulnerable === 1)
                head.agape = 0;
            return;
        }

        framesSinceInvulnerable++;

        if (!health.isDead && player.collides(d.hurtboxes)) {
            d.invulnerable = 15;
            bouncePlayerOffDisplayObject(d);
            d.speed.x -= player.engine.knockback.x;
            d.speed.y = player.vspeed * -1;
            ClownHurt.play();
            if (health.damage()) {
                onDeath();
            }
        }
    }

    function doDamageAnimation() {
        if (framesSinceInvulnerable < 25) {
            d.expression.antenna = 'shock';
            head.wiggle = 1;
            return;
        }

        d.expression.antenna = 'idle';
        head.wiggle = 0;
    }

    function onDeath() {
        d.isDead = true;
        attackRunnerContainer.destroy();
        // TODO Impl
    }

    d
     .withStep(takeDamage)
     .withStep(doDamageAnimation);

    return d;
}