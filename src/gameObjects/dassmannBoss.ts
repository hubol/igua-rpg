import {dassmann} from "./dassmann";
import {waitHold} from "../cutscene/waitHold";
import {dassmannTower} from "./dassmannTower";
import {rng} from "../utils/math/rng";
import {dassmannPoker} from "./dassmannPoker";

const damage = {
    poker: 40,
}

export function dassmannBoss() {
    const d = dassmann();
    const { body, head, arml, armr } = d;

    d.withAsync(async () => {
        while (true) {
            d.speed.x = 1;
            await waitHold(() => d.speed.x === 0, 30);
            // dassmannTower().at(rng() * 256, d.y).show();
            d.speed.x = -1;
            await waitHold(() => d.speed.x === 0, 30);
            // dassmannTower().at(rng() * 256, d.y).show();
        }
    });

    dassmannPoker(damage.poker).damageSource(d).show();

    return d;
}