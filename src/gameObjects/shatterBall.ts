import {bouncePlayerCircleConditionally} from "../igua/bouncePlayer";
import {Container, Graphics} from "pixi.js";
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
import {sparkleOnce} from "./sparkleSmall";
import {BounceBall, ClownExplode, CrackBall} from "../sounds";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/merge";

type Crack = { path: [start: Vector, ...tail: Vector[]], deps: Crack[], isChild?: boolean, color: number };

export function shatterBall(radius = 20) {
    const b = new Graphics().beginFill(0x0D1C7C).drawCircle(0, 0, radius).endFill();
    const stage = new Container();
    const g = new Graphics();

    const c = merge(container(b, stage, g), { stage, dead: false });

    const cracks: Crack[] = [];

    function render() {
        g.clear();
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
        ClownExplode.play();
        confetti(radius, radius * 2).show().at(c);
        await sleep(250);
        c.dead = true;
        b.destroy();
        g.destroy();
    }

    function crack() {
        if (dying)
            return;

        const dv = getPlayerCenter().add(getCenter(c), -1);
        dv.vlength = radius;
        const p = smallPop(12, scene.playerStage).at(dv.vcpy().add(c));
        p.life = 0.5;

        const crack = findNextCrack(dv.vcpy());
        p.tint = crack.color;
        advanceCrack(crack, dv);

        if (countTerminalCracks() >= 1)
            c.withAsync(die);

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

    let jiggle = 1;
    let p: Vector;
    const sp = vnew();

    function bounce() {
        jiggle = 0;
    }

    g.withStep(() => {
        if (jiggle < 1) {
            jiggle += 0.1;
            const f = Math.min(1, Math.sin(jiggle * Math.PI) * 1.25) * 0.05;
            c.scale.set(1 + Math.sin(now.s * Math.PI * 4 + 1) * f, 1 + Math.cos(now.s * Math.PI * 4 + 2) * f)
        }
        else {
            c.scale.set(1, 1);
        }

        if (!p)
            p = c.vcpy();
        p.add(sp);
        c.at(p).vround();
        sp.scale(0.99);
        // if (Math.abs(player.x - g.x) < radius * 2) {
        //     if (player.x < g.x)
        //         sp.x += 0.2;
        //     else
        //         sp.x -= 0.2;
        // }
        // sp.x += Math.sin(now.s * Math.PI) * 0.05;

        if (bouncePlayerCircleConditionally(c, radius, 2)) {
            CrackBall.play();
            bounce();
            crack();
            const minSpeed = sp.vlength * 1.1;
            sp.at(-player.engine.knockback.x, -player.vspeed).scale(1.5);
            if (sp.vlength < minSpeed)
                sp.normalize().scale(minSpeed);
        }

        const r = push(p, radius);
        if (r.hitWall || r.hitCeiling || r.hitGround) {
            BounceBall.play();
            bounce();
        }
        if (r.hitWall)
            sp.x *= -1;
        else if (r.hitCeiling || r.hitGround)
            sp.y *= -1;
    })
        .withAsync(async () => {
            while (true) {
                if (sp.vlength > 1)
                    sparkleOnce(c, scene.parallax1Stage);
                await sleep(50 + rng.int(25));
            }
        });

    return c;
}