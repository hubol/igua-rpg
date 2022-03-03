import {bouncePlayerCircleConditionally} from "../igua/bouncePlayer";
import {Graphics} from "pixi.js";
import {distance, Vector} from "../utils/math/vector";
import {getCenter, getPlayerCenter} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {rng} from "../utils/rng";
import {confetti} from "./confetti";
import {sleep} from "../cutscene/sleep";

type Crack = [start: Vector, ...tail: Vector[]];

export function shatterball(radius = 20) {
    const g = new Graphics();

    const cracks: Crack[] = [];

    function render() {
        g.clear().beginFill(0xffffff).drawCircle(0, 0, radius).endFill().lineStyle(1, 0);
        for (const [ head, ...tail ] of cracks) {
            g.moveTo(head.x, head.y);
            for (const { x, y } of tail) {
                g.lineTo(x, y);
            }
        }
    }

    render();

    function findNextCrackIndex(v: Vector) {
        if (cracks.length > 0) {
            for (let i = 0; i < cracks.length; i++) {
                if (distance(v, cracks[i][0]) < radius / 2) {
                    return i;
                }
            }
        }

        cracks.push([ v ]);
        return cracks.length - 1;
    }

    let dying = false;

    async function die() {
        dying = true;
        confetti().show().at(g);
        await sleep(250);
        g.destroy();
    }

    function crack() {
        if (dying)
            return;

        const dv = getPlayerCenter().add(getCenter(g), -1);
        dv.vlength = radius;

        const i = findNextCrackIndex(dv.vcpy());
        const crack = cracks[i];
        const crackFactor = Math.min(radius / 2, progress.level + 2);
        const crackVector = dv.vcpy()
            .add(rng.polar * radius / 4, rng.polar * radius / 4)
            .normalize().scale(-crackFactor);
        const tail = crack[crack.length - 1].vcpy().add(crackVector);
        if (tail.vlength >= radius) {
            tail.vlength = radius;
            g.withAsync(die);
        }
        crack.push(tail);

        render();
    }

    g.withStep(() => {
        if (bouncePlayerCircleConditionally(g, radius)) {
            crack();
        }
    });

    return g;
}