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

const damage = {
    poker: 40,
}

export function dassmannBoss() {
    const d = dassmann();
    const { body, head, arml, armr } = d;

    const health = clownHealth(1000);

    const attacks = attackRunner().show(d);

    function getPlayerFacingArms() {
        return [player.x < d.x ? arml : armr, player.x < d.x ? armr : arml];
    }

    function spawnTowerBetweenDassmannAndPlayer() {
        return dassmannTower().at(Math.round((d.x + player.x) / 2), d.y).show();
    }

    const buildTower = attack({ tower: Undefined<DisplayObject>() })
        .withAsyncOnce(async self => {
            const [ armf, armr ] = getPlayerFacingArms();
            armf.raise().over(250);
            armr.down().over(250);

            await wait(() => d.isOnGround);
            self.tower = spawnTowerBetweenDassmannAndPlayer();

            const poker = dassmannPoker(damage.poker).damageSource(d).show();
            self.on('removed', () => !poker.destroyed && poker.destroy());

            await health.tookDamage();
        })
        .withAsync(async self => {
            while (true) {
                await waitHold(() => !!self.tower && self.tower.destroyed, 60);
                await wait(() => d.isOnGround && hDistFromPlayer(d) > 64);
                const [ armf, armr ] = getPlayerFacingArms();
                armf.pose = ArmTx.Rest;
                armf.raise().over(250);
                armr.down().over(250);
                self.tower = spawnTowerBetweenDassmannAndPlayer();
            }
        });

    async function doAs() {
        await sleep(1000);
        while (true) {
            await attacks.run(buildTower());
            await sleep(30);
        }
    }

    d.withAsync(doAs);

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