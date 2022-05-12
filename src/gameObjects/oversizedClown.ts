import {ClownSpikeBall, OversizedAngel} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Container, Sprite} from "pixi.js";
import {now} from "../utils/now";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {approachLinear} from "../utils/math/number";
import {scene} from "../igua/scene";
import {bouncePlayer} from "../igua/bouncePlayer";
import {range} from "../utils/range";
import {ballons} from "./ballons";
import {sleep} from "../cutscene/sleep";
import {empBlast} from "./empBlast";
import {wait} from "../cutscene/wait";
import {ClownExplode, ClownHurt} from "../sounds";
import {confetti} from "./confetti";
import {merge} from "../utils/object/merge";
import {electricBolt} from "./electricBolt";
import {excitement} from "./excitement";
import {track} from "../igua/track";
import {rng} from "../utils/math/rng";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {clownHealth} from "./utils/clownUtils";
import {newGravity} from "./utils/newGravity";
import {trove65} from "./valuableTrove";

const [headTexture, faceTexture, hairTexture, leftBrowTexture, rightBrowTexture, sleepyFaceTexture] =
    subimageTextures(OversizedAngel, { width: 66 });

function mace(angleOffset: number) {
    const s = merge(Sprite.from(ClownSpikeBall), { active: false, angleOffset })
        .withStep(() => {
            if (s.active) {
                s.alpha = 1;
                if (player.collides(s))
                    player.damage(20);
            }
            else
                s.alpha = 0.25;
        });
    s.anchor.set(0.5, 0.5);
    return s;
}

function oversizedClownImpl() {
    const faceState = { anger: 0, excited: 0 };

    const health = clownHealth(300);

    const head = Sprite.from(headTexture);

    head.hitbox = [0.2, 0.2, 0.8, 1];
    const hair = Sprite.from(hairTexture);
    const electricContainer = container();
    const c = merge(container(head, hair, face(faceState), electricContainer), { aggressive: false });
    const speed = [0, 0];

    const ballonsState = range(5).map(() => 1);

    let initialY: number;

    function nothing() { }

    let fallCount = 0;

    const gravity = newGravity(c, speed, [33, 25], 26);

    function fall() {
        const r = gravity(0.3);
        if (r.isOnGround)
            c.withAsync(startLanded);
    }

    function landed() {

    }

    async function doEmpBlast() {
        const unit = health.unit;
        let hints = 3;
        if (unit < .33)
            hints = 1;
        else if (unit < .67)
            hints = 2;
        const emp = empBlast(128, hints, 50, 800).at([33, 25].add(c)).show();
        await wait(() => emp.destroyed);
    }

    async function startLanded() {
        setBehavior(landed);
        await doEmpBlast();
        await sleep(250);
        restartHostile();
    }

    function restartHostile() {
        for (let i = 0; i < 5; i++)
            ballonsState.push(1);
        setBehavior(hostile);
    }

    async function startFalling() {
        faceState.excited = 1;
        setBehavior(nothing);
        await sleep(1000);
        faceState.excited = 0;
        setBehavior(fall);
        speed.x = (player.x - (c.x + 33)) / 12;
        speed.x = Math.sign(speed.x) * Math.min(3, Math.abs(speed.x));
        speed.y = -3;
    }

    function hostile() {
        if (initialY === undefined)
            initialY = c.y;
        if (health.unit < 0.33)
            faceState.anger = 1 - health.unit;

        const ballonIndex = ballonsState.findIndex(x => x === 1);
        const hasBallons = ballonIndex >= 0;

        if (player.collides(head) && invulnerable <= 0) {
            c.aggressive = true;
            ClownHurt.play();
            invulnerable = 15;
            health.damage();
            bouncePlayer([33, 25].add(c));
            speed.x += player.hspeed;
            speed.x -= player.engine.knockback.x;
            speed.y -= player.vspeed * 0.3;
            ballonsState[ballonIndex] = 0;

            const justLostAllBallons = ballonsState.findIndex(x => x === 1) === -1;

            if (justLostAllBallons) {
                c.withAsync(startFalling);
                return;
            }
        }

        if (c.y > initialY && hasBallons)
            speed.y -= 0.4;
        if (c.y < initialY - 32)
            speed.y += 0.4;
        if (hasBallons)
            speed.y += Math.sin(now.s) * 0.02;
        gravity(0);
        speed.scale(0.9);
    }

    function makeMaces() {
        return range(8).map(x => c.addChild(mace(x * .19 * 2)));
    }

    function setBehavior(fn: () => void) {
        speed.x = 0;
        speed.y = 0;
        if (fn === fall)
            fallCount++;
        if (fn !== hostile)
            abortElectricBolts();
        behavior = fn;
    }
    let behavior = hostile;

    let invulnerable = 0;

    let maceAngle = 0;
    const maces: ReturnType<typeof mace>[] = [];

    function controlMaces() {
        const shouldHaveMaces = behavior === hostile && c.aggressive;
        if (shouldHaveMaces) {
            if (maces.length === 0) {
                maceAngle = 0;
                const newMaces = makeMaces();
                maces.push(...newMaces);
                c.withAsync(async () => {
                    await sleep(1000);
                    newMaces.forEach(x => x.active = true);
                })
            }
            const radius = 90;
            maces.forEach(x => {
                const a = maceAngle + x.angleOffset;
                x.at(33, 25).add([Math.cos(a), -Math.sin(a)].scale(radius));
            });
            const isEvenFallCount = fallCount % 2 === 0;
            maceAngle += isEvenFallCount ? -.02 : .02;
        }
        else if (maces.length > 0) {
            maces.forEach(x => x.destroy());
            maces.length = 0;
        }
    }

    c.withStep(controlMaces);

    function showExcitement() {
        let sleepy;
        let lastAggressive;
        return () => {
            if (c.aggressive && c.aggressive !== lastAggressive && lastAggressive !== undefined) {
                if (sleepy) {
                    sleepy.destroy();
                    sleepy = undefined;
                }
                excitement().at([48, 4].add(c)).ahead().withStep(() => {
                    c.x += rng.polar;
                    c.y += rng.polar;
                });
            }
            if (!c.aggressive && lastAggressive !== c.aggressive && sleepy === undefined) {
                sleepy = Sleepy(c as any);
                c.addChild(sleepy);
            }
            lastAggressive = c.aggressive;
        }
    }

    c.withStep(showExcitement());

    c.withStep(() => {
        if (health.isDead) {
            abortElectricBolts();
            ClownExplode.play();
            const v = [33, 25].add(c);
            confetti(32, 64).at(v).ahead();
            trove65().at([15, 16].add(v)).show();
            c.destroy();
            return;
        }
        if (invulnerable > 0) {
            invulnerable--;
            c.visible = !c.visible;
        }
        else
            c.visible = true;
        behavior();
    });

    c.on('added', () => {
        electricBoltContainer = scene.gameObjectStage.addChild(container());
    });

    function shootElectricBolt() {
        if (behavior !== hostile)
            return;
        electricContainer.addChild(electricBolt(electricBoltContainer).at(33, 25));
    }

    function abortElectricBolts() {
        electricBoltContainer.removeAllChildren();
        electricContainer.removeAllChildren();
    }

    c.withAsync(async () => {
        await wait(() => c.aggressive);
        while (true) {
            await sleep(2_000);
            await wait(() => Math.abs(player.x - (c.x + 33)) < 100);
            shootElectricBolt();
        }
    })

    ballons({ target: c, state: ballonsState, string: 32, offset: [33, 11] });
    let electricBoltContainer: Container;

    return c;
}

function face(state: { anger: number, excited: number }) {
    const f = Sprite.from(faceTexture);
    const ll = Sprite.from(leftBrowTexture);
    ll.anchor.set(32/66, 14/51);
    const l = container(ll);
    const rr = Sprite.from(rightBrowTexture);
    rr.anchor.set(49/66, 14/51);
    const r = container(rr);

    l.withStep(() => {
        l.pivot.x = -32;
        l.pivot.y = -14 + Math.sin(now.s * Math.PI * 2.3 * (1 + state.excited) + 2) * (1 + state.excited);
        ll.angle = state.anger * 30 + Math.cos(now.s * Math.PI * 3.3 - 2) * 10 * state.anger;
    });
    r.withStep(() => {
        r.pivot.x = -49;
        r.pivot.y = -14 + Math.sin(now.s * Math.PI * 2.1 * (1 + state.excited) + 5) * (1 + state.excited);
        rr.angle = state.anger * -30 + Math.cos(now.s * Math.PI * 2.9 - 4) * 10 * state.anger;
    });

    const c = container(f, l, r)
    c.withStep(() => {
        c.pivot.y = Math.sin(now.s * Math.PI * 2 * (1 + state.excited)) * (1 + state.excited);
    });
    c.pivot.x = 41;
    c.scale.x = 1;
    let facing = 0;
    let once = false;
    const c2 = container(c).withStep(() => {
        const aggressive = (c2.parent as any).aggressive as boolean;
        f.texture = aggressive ? faceTexture : sleepyFaceTexture;
        // @ts-ignore
        if (once && !aggressive)
            return;
        once = true;

        const b = f.getBounds();
        const x = b.x + b.width / 2 + scene.camera.x;
        const facingUnbounded = (player.x - x) / 60;
        const facingTarget = (Math.min(1, Math.abs(facingUnbounded)) * Math.sign(facingUnbounded) + 1) / 2;
        facing = approachLinear(facing, facingTarget, 0.05);
        const pivotXNext = 20 * (1 - facing) - c.pivot.x;
        if (Math.abs(c2.pivot.x - pivotXNext) > 2)
            c2.pivot.x = pivotXNext;
        c.scale.x = facing > 0.5 ? 1 : -1;
    });
    return c2;
}

export const oversizedClown = track(oversizedClownImpl);
