import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {ClownPropellerProjectile, ClownSneezy} from "../textures";
import {merge} from "../utils/object/merge";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/math/rng";
import {ClownHurt, ClownSneeze, ClownSniffle, SneezyPropellerBlast, SneezyPropellerWindUp} from "../sounds";
import {distance, Vector, vnew} from "../utils/math/vector";
import {getPlayerCenterWorld} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {isTouchingSolid, push} from "./walls";
import {cyclic} from "../utils/math/number";
import {confetti} from "./confetti";
import {bouncePlayer} from "../igua/bouncePlayer";
import {clownDrop, clownHealth, dieClown} from "./utils/clownUtils";
import {lerp} from "../cutscene/lerp";
import {wait} from "../cutscene/wait";
import {rectangleDistance} from "../utils/math/rectangleDistance";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {rayToPlayerIntersectsWall} from "../igua/logic/rayIntersectsWall";
import {trackPosition} from "../igua/trackPosition";
import {hat} from "./hat";
import {WeakToSpells} from "../pixins/weakToSpells";

const textures = subimageTextures(ClownSneezy, { width: 24 });
const propellerProjectileTextures = subimageTextures(ClownPropellerProjectile, { width: 8 });

export const resolveClownSneezy = resolveGameObject("ClownSneezy", (e) => clownSneezy().at(e));

const consts = {
    damage: {
        propellerProjectile: 20,
        deadlySneeze: 25
    },
}

export function clownSneezy({ fullHealth = 95 } = { }) {
    const head = makeHead();
    const propeller = makePropeller(head);
    const g = new Graphics().beginFill().drawRect(-10, -17, 19, 17);
    g.visible = false;

    const health = clownHealth(fullHealth);
    const drop = clownDrop(0.8, 0.5, 0.1);

    let invulnerable = 0;
    let spawnPropellerProjectiles = false;
    let spawnPropellerUnit = 0;
    let slowlyMoveTowardsPlayer = false;

    async function sniffle(index = 0) {
        head.face.subimage = 1 + index;
        ClownSniffle.play();
        await sleep(333);
        head.face.subimage = 0;
        await sleep(333);
    }

    async function sneeze() {
        head.facePlayer = true;
        await sniffle();
        head.shaking = true;
        await sniffle(1);
        head.shaking = false;
        head.hat.bounce();
        head.face.subimage = 3;
        ClownSneeze.play();
        const storedSneezeDp = getPlayerCenterWorld().add(c, -1).normalize();
        head.facePlayer = false;
        knockbackSpeed.at(storedSneezeDp).scale(-1);
        confetti(8, 8).at(c).show();
        deadlySneeze(storedSneezeDp.scale(6)).at(c).show();
        await sleep(500);
        head.face.subimage = 0;
        head.facePlayer = true;
    }

    let windUp = -1;

    async function charge() {
        head.face.subimage = 11;
        windUp = SneezyPropellerWindUp.play();
        const previousHealth = health.health;
        const accel = lerp(propeller, 'speed').to(3).over(1000);
        const startSpawn = sleep(500).then(() => { spawnPropellerUnit = 0; spawnPropellerProjectiles = true; });
        slowlyMoveTowardsPlayer = true;
        head.facePlayer = true;
        await Promise.all([ accel, startSpawn ]);
        await Promise.race([ sleep(3000), wait(() => health.health < previousHealth) ]);
        await lerp(propeller, 'speed').to(1).over(500);
        head.face.subimage = 0;
        head.facePlayer = false;
        slowlyMoveTowardsPlayer = false;
        spawnPropellerProjectiles = false;
    }

    const knockbackSpeed = vnew();

    const start = vnew();
    let startIsSet = false;

    let idle = true;
    let idleDirection = 1;

    function startIdle() {
        idle = true;
        idleDirection = (c.x < start.x || (c.x === start.x && rng.bool)) ? 1 : -1;
    }

    let movesHistory = 0;
    let previousHealth = health.health;

    function die() {
        const drop1 = drop(c.vsPlayerHitCount) ? 5 : 0;
        const drop2 = drop(c.vsPlayerHitCount) ? 5 : 0;
        dieClown(c, drop1 + drop2);
    }

    const c = container(propeller, head, g)
        .withStep(() => {
            if (!startIsSet) {
                start.at(c);
                startIsSet = true;
            }
            if (invulnerable <= 0 && g.collides(player)) {
                bouncePlayer([0, -9].add(c));
                if (health.damage())
                    return die();
                invulnerable = 30;
                ClownHurt.play();
                knockbackSpeed.at(-player.engine.knockback.x, -player.vspeed);
                if (knockbackSpeed.y < -.5)
                    head.hat.bounce();
            }
            if (slowlyMoveTowardsPlayer) {
                const d = distance(c, player);
                const f = Math.min(1, d * .0075);
                if (c.x < player.x - 24)
                    c.x += f;
                if (c.x > player.x - 23)
                    c.x -= f;
                if (c.y > player.y - 4)
                    c.y -= f;
                if (c.y < player.y - 16)
                    c.y += f;
            }
            c.add(knockbackSpeed);
            knockbackSpeed.vlength -= 0.05;
            c.visible = invulnerable ? !c.visible : true;
            if (invulnerable > 0)
                invulnerable--;
        })
        .withStep(() => {
            if (!idle)
                return;

            c.x += idleDirection;
            const touchedSolid = isTouchingSolid(c, 16) && !isTouchingSolid(c.vcpy().add(-idleDirection * 12, 0), 16);
            if ((idleDirection < 0 && c.x < start.x - 64)
                || (idleDirection > 0 && c.x > start.x + 64)
                || touchedSolid)
                idleDirection *= -1;

            if (touchedSolid)
                start.at(c);

            head.scale.x = idleDirection;
        })
        .withStep(() => {
            // @ts-ignore
            c.vspeed = position.diff.y;
            push(c, 16);

            if (!spawnPropellerProjectiles)
                return;
            const previous = spawnPropellerUnit;
            spawnPropellerUnit += Math.abs(propeller.speed);
            const denom = 6;
            const current = Math.floor(spawnPropellerUnit / denom);
            if (Math.floor(previous / denom) === current)
                return;
            const xscale = current % 2 == 0 ? 1 : -1;
            showPropellerProjectile(xscale);
        })
        .withAsync(async () => {
            while (true) {
                const tookDamage = health.health !== previousHealth;
                if (!tookDamage && (rectangleDistance(player, c) > 128 || rayToPlayerIntersectsWall(c))) {
                    await sleep(100 + rng.int(200));
                    continue;
                }
                const doSneeze = rng() < (player.y < c.y - 32 ? 0.8 : 0.3);
                if ((doSneeze || movesHistory === -1) && movesHistory !== 2) {
                    await Promise.race([
                        wait(() => rectangleDistance(player, c) < 64).then(() => wait(() => !rayToPlayerIntersectsWall(c))),
                        health.tookDamage().then(() => sleep(200))
                    ]);
                    idle = false;
                    await sneeze();
                    await sleep(200 + rng.int(200));
                    movesHistory = Math.max(1, movesHistory + 1);
                }
                else {
                    await Promise.race([
                        wait(() => rectangleDistance(player, c) < 32),
                        health.tookDamage().then(() => sleep(200))
                    ]);
                    idle = false;
                    await charge();
                    movesHistory = Math.min(-1, movesHistory - 1);
                }
                start.at(c);
                startIdle();
                previousHealth = health.health;
            }
        })
        .on('removed', () => SneezyPropellerWindUp.stop(windUp));

    c.withPixin(WeakToSpells({ spellsHurtbox: [g], clownHealth: health }));

    c.ext.isHatParent = true;

    const position = trackPosition(c);

    function deadlySneeze(dp: Vector, radius = 16) {
        const e = radius * 0.7;
        const m = new Graphics().beginFill().drawRect(-e / 2, -e / 2, e, e);
        m.visible = false;
        let life = 60 * 5;
        const b = new Graphics().beginFill(0xffffff).drawCircle(0, 0, radius)
            .withStep(() => {
                b.parent.add(dp);
                if (life-- <= 0 || c.destroyed)
                    return b.parent.destroy();
                if (m.collides(player))
                    c.damagePlayer(consts.damage.deadlySneeze);
            });
        return container(b, m);
    }

    function showPropellerProjectile(xscale = 1) {
        if (rectangleDistance(c, player) < 320)
            SneezyPropellerBlast.play();
        let noEffectLife = 6;
        let life = 15;
        const s = Sprite.from(propellerProjectileTextures[0])
            .withStep(() => {
                s.x += xscale * 4;
                if (c.destroyed || life-- <= 0)
                    return s.destroy();
                if (noEffectLife-- === 0) {
                    s.texture = propellerProjectileTextures[1];
                    s.withStep(() => {
                       if (s.collides(player) && c.damagePlayer(consts.damage.propellerProjectile))
                           player.engine.knockback.x = xscale * 3;
                    });
                }
            });
        s.scale.x = xscale;
        s.anchor.set(0, 0.5);
        s.at(c).add(0, 7);
        return s.show();
    }

    return c;
}

const propellerIndices = [5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5];

function makePropeller(head: DisplayObject) {
    let i = 0;
    const s = merge(Sprite.from(textures[5]), { speed: 1 })
        .withStep(() => {
            i += s.speed;
            const index = propellerIndices[cyclic(Math.round(i), 0, propellerIndices.length)];
            s.texture = textures[index];
            s.x = head.scale.x === 1 ? 0 : 1;
        });
    s.pivot.set(12, 22);
    return s;
}

function makeHead() {
    const h = hat(Sprite.from(textures[0]));
    const f = face();

    const c = merge(container(h, f), { hat: h, face: f, shaking: false, facePlayer: false })
        .withStep(() => {
            if (!c.facePlayer)
                return;
            if (c.parent.x > player.x)
                c.scale.x = -1;
            else
                c.scale.x = 1;
        })
        .withAsync(async () => {
            while (true) {
                await sleep(133);
                if (c.shaking)
                    c.x = 1;
                await sleep(133);
                c.x = 0;
            }
        });
    c.pivot.set(12, 22);
    return c;
}

function face() {
    const s = merge(Sprite.from(textures[1]), { subimage: 0 })
        .withStep(() => s.texture = textures[s.subimage + 1]);
    return s;
}