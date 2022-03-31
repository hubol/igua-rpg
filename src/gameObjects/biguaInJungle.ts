import {bigua} from "./bigua";
import {rectangleDistance} from "../utils/math/rectangleDistance";
import {player} from "./player";
import {show} from "../cutscene/dialog";

export function biguaInJungle() {
    const b = bigua()
        .withCutscene(async () => {
            await show('Hello. I am Bigua. I came from the sky fortress when the invaders arrived.');
            await show('I have a special ability that allows me to increase the size of certain items.');
            await show('If you find something you need bigger, bring it to me.');
        })
        .withStep(() => {
            if (b.isDucking)
                b.isDucking = rectangleDistance(b, player) > 32;
            else
                b.isDucking = rectangleDistance(b, player) > 48;
        });
    return b;
}