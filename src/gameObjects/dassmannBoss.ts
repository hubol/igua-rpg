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
import {ClownHurt, DassBuildTower, SpiderUp} from "../sounds";
import {Invulnerable} from "../pixins/invulnerable";
import {bouncePlayerOffDisplayObject} from "../igua/bouncePlayer";
import {FreeSpace} from "../pixins/freeSpace";
import {approachLinear} from "../utils/math/number";

const consts = {
    damage: {
        poker: 50,
    },
    friction: 0.3,
}

export function dassmannBoss() {
    const d = dassmann()
        .withPixin(Invulnerable())
        .withPixin(FreeSpace({ offsets: [[0, -8]] }));
    d.friction = consts.friction;
    const { body, head, arml, armr } = d;
    body.playFootsteps = true;

    const health = clownHealth(1000);

    const attacks = attackRunner().show(d);

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
                await waitHold(() => !!self.tower && self.tower.destroyed, 60);
                await wait(() => d.isOnGround && hDistFromPlayer(d) > 64);
                self.tower = await buildOneTower();
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
        // TODO Impl
    }

    d.withAsync(doAs)
     .withStep(takeDamage)
     .withStep(doDamageAnimation);

    return d;
}