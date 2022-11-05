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
import {ClownHurt, DassBuildTower} from "../sounds";
import {Invulnerable} from "../pixins/invulnerable";
import {bouncePlayer} from "../igua/bouncePlayer";

const damage = {
    poker: 40,
}

export function dassmannBoss() {
    const d = dassmann()
        .withPixin(Invulnerable());
    const { body, head, arml, armr } = d;

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

            const poker = dassmannPoker(damage.poker).damageSource(d).show();
            self.on('removed', () => !poker.destroyed && poker.destroy());

            await health.tookDamage();
        })
        .withAsync(async self => {
            while (true) {
                await waitHold(() => !!self.tower && self.tower.destroyed, 60);
                await wait(() => d.isOnGround && hDistFromPlayer(d) > 64);
                self.tower = await buildOneTower();
            }
        });

    async function doAs() {
        await sleep(1000);
        while (true) {
            await attacks.run(buildTower());
            await sleep(2000);
        }
    }

    function takeDamage() {
        if (d.invulnerable > 0) {
            d.expression.antenna = 'shock';
            head.wiggle = 1;
            head.agape = 1;
            if (d.invulnerable === 1)
                head.agape = 0;
            return;
        }

        d.expression.antenna = 'idle';
        head.wiggle = 0;

        if (!health.isDead && player.collides(d.hurtboxes)) {
            d.invulnerable = 15;
            bouncePlayer(d);
            ClownHurt.play();
            if (health.damage()) {
                onDeath();
            }
        }
    }

    function onDeath() {
        // TODO Impl
    }

       d.withAsync(doAs)
        .withStep(takeDamage);

    // d.withAsync(async () => {
    //     while (true) {
    //         d.speed.x = 1;
    //         await waitHold(() => d.speed.x === 0, 30);
    //         // dassmannTower().at(rng() * 256, d.y).show();
    //         d.speed.x = -1;
    //         await waitHold(() => d.speed.x === 0, 30);
    //         // dassmannTower().at(rng() * 256, d.y).show();
    //     }
    // });

    return d;
}