import {resolveGameObject} from "../igua/level/resolveGameObject";
import {distance, moveTowards, Vector, vnew} from "../utils/math/vector";
import {container} from "../utils/pixi/container";
import {Dithered} from "../pixins/dithered";
import {makePseudo, Pseudo} from "../utils/math/makePseudo";
import {approachLinear, nlerp} from "../utils/math/number";
import {range} from "../utils/range";
import {Graphics} from "pixi.js";
import {merge} from "../utils/object/merge";
import {scene} from "../igua/scene";
import {progress} from "../igua/data/progress";

export const resolveSodaStink = resolveGameObject('SodaStink', (e) => sodaStink([ e.vcpy(), ...e.nodes ]));

function sodaStink(points: Vector[]) {
    const seed = Number(`10${points[0].x}${points[1].y}3${points[0].y}${points[1].x}`);
    const prng = makePseudo(seed);

    const back = makeStinkLayer(prng, 0x9F74E0).withPixin(Dithered({ dither: 0.6 }));
    const front = makeStinkLayer(prng, 0xAA96DD);
    const main = container(back, front);

    if (!progress.flags.global.somethingGreatHappened)
        return main;

    const currentPoint = vnew().at(points[0]);
    let nextIndex = 1;
    let radiusFactor = 0;
    let distanceTraveled = 0;

    function drawBlob(layer: StinkLayer, radius: number) {
        const graphics = layer.pick();
        graphics.drawCircle(
            Math.round(currentPoint.x + prng.unit() * Math.max((radius / 4), 1)),
            Math.round(currentPoint.y + prng.unit() * Math.max((radius / 4), 1)),
            radius);
    }

    while (nextIndex < points.length) {
        const nextPoint = points[nextIndex];
        while (distance(currentPoint, nextPoint) > Math.max(2, radiusFactor / 2)) {
            moveTowards(currentPoint, nextPoint, Math.max(2, radiusFactor / 2));
            const targetRadiusFactor = Math.sin((nextIndex / points.length) * Math.PI) * nlerp(0.5, 1, (Math.sin(distanceTraveled / 60) + 1) / 2);
            radiusFactor = approachLinear(radiusFactor, targetRadiusFactor, 0.02);

            drawBlob(back, 20 * radiusFactor);
            drawBlob(front, 10 * radiusFactor);
        }
        nextIndex++;
    }

    return main;
}

function makeStinkLayer(pseudo: Pseudo, color = 0xffffff) {
    const graphics = range(6).map(() => new Graphics().beginFill(color));
    const length = graphics.length;
    function pick() {
        return graphics[pseudo.int() % length];
    }

    const animationPseudo = makePseudo(pseudo.int());

    for (const graphic of graphics) {
        const mx = animationPseudo.unit() * 2;
        const bx = animationPseudo.unit() * Math.PI * 2;
        const fx = 1 + animationPseudo.unit() * 2.5;

        const my = animationPseudo.unit() * 2;
        const by = animationPseudo.unit() * Math.PI * 2;
        const fy = 1 + animationPseudo.unit() * 2.5;

        graphic.withStep(() => {
            const time = scene.s;
            graphic.x = Math.round(Math.sin(mx * time + bx) * fx);
            graphic.y = Math.round(Math.sin(my * time + by) * fy);
        });
    }

    return merge(container(...graphics), { graphics, pick });
}

type StinkLayer = ReturnType<typeof makeStinkLayer>;