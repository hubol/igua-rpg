import {dassmann} from "./dassmann";
import {waitHold} from "../cutscene/waitHold";

export function dassmannBoss() {
    const d = dassmann();
    const { body, head, arml, armr } = d;

    d.withAsync(async () => {
        while (true) {
            d.speed.x = 1;
            await waitHold(() => d.speed.x === 0, 30);
            d.speed.x = -1;
            await waitHold(() => d.speed.x === 0, 30);
        }
    })

    return d;
}