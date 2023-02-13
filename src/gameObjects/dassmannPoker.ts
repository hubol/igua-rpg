import {Graphics, Sprite} from "pixi.js";
import {DassmannArrow} from "../textures";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {ToRad, vdeg} from "../utils/math/angles";
import {merge} from "../utils/object/merge";
import {distFromPlayer} from "../igua/logic/getOffsetFromPlayer";
import {sleep} from "../cutscene/sleep";
import {whiten} from "../utils/pixi/whiten";
import {lerp} from "../cutscene/lerp";
import {wait} from "../cutscene/wait";
import {getPlayerCenterWorld} from "../igua/gameplay/getCenter";
import {scene} from "../igua/scene";
import {DassPokeAppear, DassPokeLaunch, DassPokeReady} from "../sounds";
import {approachLinear, nlerp} from "../utils/math/number";
import {findDamageSource} from "../utils/extensions/pixiIguaExtensions";

const distance = 50;

export function dassmannPoker(damage: number) {
    const speed = 4;
    const launchAfterMs = 250;

    function p(angle: number) {
        const p = poker(angle, damage)
            .withStep(() => {
                if (findDamageSource(c)?.destroyed)
                    p.destroy();
            })
            .damageSource(findDamageSource(c))
            .withAsync(async () => {
                DassPokeAppear.play();
                await wait(() => p.hostile);
                await sleep(launchAfterMs);
                DassPokeReady.play();
                p.speed = speed;
            });

        p.show();
    }

    const c = container()
        .withStep(() => {
            if (findDamageSource(c)?.destroyed)
                c.destroy();
        })
        .withAsync(async () => {
            const ring = warningRing().ahead(0);
            c.on('removed', () => ring.die());

            await sleep(1000);
            while (true) {
                p(0)
                await sleep(500);
                p(45)
                await sleep(2000);
                p(90);
                await sleep(2000);
            }
        });

    return c;
}

function warningRing() {
    let dying = false;
    let scale = 0;

    function die() {
        dying = true;
    }

    const g = merge(new Graphics(), { die })
        .withStep(() => {
            g.clear();
            g.lineStyle(2, 0xF0B020);
            for (let i = 0; i < 360; i += 8) {
                const len = nlerp(
                    distance * Math.max(0, Math.min(1, scale * (Math.sin(i * ToRad * 8) + 1))),
                    distance,
                    scale);
                let v = vdeg(i);
                g.moveTo(v.x * len, v.y * len);
                v = vdeg(i + 2);
                g.lineTo(v.x * len, v.y * len);
            }

            g.angle = scene.s * 8;
            g.at(getPlayerCenterWorld());
            scale = approachLinear(scale, dying ? 0 : 1, 1 / 30);
            if (dying && scale < 0.05)
                g.destroy();
        });
    ;
    return g;
}

function poker(angle: number, damage: number) {
    let ready = false;

    const unit = vdeg(angle);
    const c = merge(container(), { hostile: false, speed: 0 });
    c.angle = angle;
    const s = Sprite.from(DassmannArrow).show(c);
    s.anchor.set(0.5, 0.5);
    const mask = new Graphics().beginFill(0xff0000).drawRect(12 - 9, 8 - 9, 3, 3).hide().show(c);

    const w = whiten(s);
    w.factor = 1;
    s.scale.set(0, 0);

    c.at(playerPos(angle, distance));

    c.withStep(() => {
        if (!c.hostile)
            c.moveTowards(playerPos(angle, distance), 2);
        const speed = c.speed * (ready ? 1 : 0);
        if (c.speed > 0 && c.hostile) {
            if (ready) {
                s.scale.set(1, 1);
            }
            else {
                s.scale.x += 0.02;
                ready = s.scale.x >= 1.2;
                if (ready)
                    DassPokeLaunch.play();
            }
        }

        s.scale.y = s.scale.x;

        if (c.hostile && mask.collides(player))
            c.damagePlayer(damage);

        c.add(unit, speed);
        if (speed > 0 && distFromPlayer(c) > 360)
            c.destroy();
    })
        .withAsync(async () => {
            await Promise.all([
                lerp(s.scale, 'x').to(1).over(300),
                lerp(w, 'factor').to(0).over(250),
            ]);
            c.hostile = true;
        });

    return c;
}

function playerPos(angleDeg: number, distance: number) {
    const v = vdeg(angleDeg).scale(-distance).add(getPlayerCenterWorld());
    v.x = Math.max(16, Math.min(v.x, scene.width - 16));
    v.y = Math.max(16, Math.min(v.y, scene.height - 16));
    return v;
}