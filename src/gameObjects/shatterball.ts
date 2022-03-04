import {bouncePlayerCircleConditionally} from "../igua/bouncePlayer";
import {Graphics} from "pixi.js";
import {distance, Vector, vnew} from "../utils/math/vector";
import {getCenter, getPlayerCenter} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {rng} from "../utils/rng";
import {confetti} from "./confetti";
import {sleep} from "../cutscene/sleep";
import {player} from "./player";
import {push} from "./walls";
import {now} from "../utils/now";
import {smallPop} from "./smallPop";
import {scene} from "../igua/scene";
import {colord} from "colord";

type Crack = { path: [start: Vector, ...tail: Vector[]], deps: Crack[], isChild?: boolean, color: number };

export function shatterball(radius = 20) {
    const g = new Graphics();

    const cracks: Crack[] = [];

    function render() {
        g.clear().beginFill(0xffffff).drawCircle(0, 0, radius).endFill();
        for (const { path: [ head, ...tail ], color } of cracks) {
            g.lineStyle(1, color).moveTo(head.x, head.y)
            for (const { x, y } of tail) {
                g.lineTo(x, y);
            }
        }
    }

    render();

    function findNextCrack(v: Vector) {
        if (cracks.length > 0) {
            for (const crack of cracks) {
                if (!crack.isChild && distance(v, crack.path[0]) < radius / 2) {
                    return crack;
                }
            }
        }

        return createCrack(v);
    }

    function createCrack(start: Vector, isChild?: boolean, color = colord(`hsl(${rng.int(361)}, 50%, 50%)`).toPixi()) {
        const crack: Crack = { path: [ start ], deps: [], color, isChild };
        cracks.push(crack);
        return crack;
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
        const p = smallPop(12, scene.playerStage).at(dv.vcpy().add(g));
        p.life = 0.5;

        const crack = findNextCrack(dv.vcpy());
        p.tint = crack.color;
        advanceCrack(crack, dv);

        if (countTerminalCracks() >= 1)
            g.withAsync(die);

        render();
    }

    function advanceCrack(crack: Crack, dv: Vector, branch = rng.bool) {
        // const horizontal = Math.abs(dv.vcpy().normalize().x) > 0.5;

        for (const dep of crack.deps) {
            // const dv2 = horizontal ? [dv.x, -dv.y] : [-dv.x, dv.y];
            // advanceCrack(dep, dv2);
        }

        if (branch) {
            const newCrack = createCrack(crack.path[crack.path.length - 1], true, crack.color);
            // if (rng() < 0.3)
            //     crack.deps.push(newCrack);
            advanceCrack(newCrack, dv, false);
        }

        advanceCrackPath(crack, dv);
    }

    function advanceCrackPath({ path }: Crack, dv: Vector) {
        const crackFactor = Math.min(radius / 2, progress.level + 1);
        const randomize = path.length > 1;
        const crackVector = dv.vcpy();
        if (randomize)
            crackVector.add(rng.polar * radius, rng.polar * radius);
        crackVector.normalize().scale(-crackFactor);
        const prev = path[path.length - 1];
        if (prev.vlength < radius * 0.98 || path.length < 2) {
            const tail = prev.vcpy().add(crackVector);
            if (tail.vlength >= radius)
                tail.vlength = radius;
            path.push(tail);
        }
    }

    function countTerminalCracks() {
        let count = 0;
        for (const { path } of cracks) {
            const first = path[0];
            const last = path[path.length - 1];
            if (last.vlength >= radius * 0.98 && distance(first, last) >= radius * 0.5)
                count++;
        }
        return count;
    }

    function findTails() {

    }

    let p: Vector;
    const sp = vnew();

    g.withStep(() => {
        if (!p)
            p = g.vcpy();
        p.add(sp);
        g.at(p).vround();
        sp.scale(0.99);
        // if (Math.abs(player.x - g.x) < radius * 2) {
        //     if (player.x < g.x)
        //         sp.x += 0.2;
        //     else
        //         sp.x -= 0.2;
        // }
        // sp.x += Math.sin(now.s * Math.PI) * 0.05;

        if (bouncePlayerCircleConditionally(g, radius, 2)) {
            crack();
            sp.at(-player.engine.knockback.x, -player.vspeed).scale(1.5);
        }

        const r = push(p, radius);
        if (r.hitWall)
            sp.x *= -1;
        else if (r.hitCeiling || r.hitGround)
            sp.y *= -1;
    });

    return g;
}