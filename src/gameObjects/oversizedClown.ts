import {OversizedAngel} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {Sprite} from "pixi.js";
import {now} from "../utils/now";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {approachLinear} from "../utils/math/number";
import {scene} from "../igua/scene";
import {bouncePlayer} from "../igua/bouncePlayer";
import {range} from "../utils/range";
import {ballons} from "./ballons";
import {push} from "./walls";
import {sleep} from "../cutscene/sleep";
import {empBlast} from "./empBlast";
import {wait} from "../cutscene/wait";
import {ClownHurt} from "../sounds";

const [headTexture, faceTexture, hairTexture, leftBrowTexture, rightBrowTexture] =
    subimageTextures(OversizedAngel, { width: 66 });

export function oversizedClown() {
    const faceState = { anger: 0, excited: 0 };

    const fullHealth = 30;
    let health = fullHealth;

    const head = Sprite.from(headTexture);

    head.hitbox = [0.2, 0.2, 0.8, 1];
    const hair = Sprite.from(hairTexture);
    const c = container(head, hair, face(faceState));
    const speed = [0, 0];

    const ballonsState = range(5).map(() => 1);

    let initialY: number;

    function nothing() { }

    function fall() {
        speed.y += 0.3;
        c.add(speed);
        const pushable = [33, 25].add(c);
        const r = push(pushable, 26);
        c.add(pushable.add(c, -1).add(-33, -25));
        if (r.isOnGround)
            c.withAsync(startLanded);
    }

    function landed() {

    }

    async function doEmpBlast() {
        const unit = health / fullHealth;
        let hints = 3;
        if (unit < .33)
            hints = 1;
        else if (unit < .67)
            hints = 2;
        const emp = empBlast(128, hints, 34, 1000).at([33, 25].add(c)).show();
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
        if (health < fullHealth * 0.33)
            faceState.anger = 1 - (health / fullHealth);

        const ballonIndex = ballonsState.findIndex(x => x === 1);
        const hasBallons = ballonIndex >= 0;

        if (player.collides(head) && invulnerable <= 0) {
            ClownHurt.play();
            invulnerable = 15;
            health -= player.strength;
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
        c.add(speed);
        speed.scale(0.9);
    }

    function setBehavior(fn: () => void) {
        speed.x = 0;
        speed.y = 0;
        behavior = fn;
    }
    let behavior = hostile;

    let invulnerable = 0;

    c.withStep(() => {
        if (invulnerable > 0) {
            invulnerable--;
            c.visible = invulnerable % 2 === 0;
        }
        else
            c.visible = true;
        behavior();
    });

    ballons({ target: c, state: ballonsState, string: 32, offset: [33, 11] });

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
    let facing = 1;
    const c2 = container(c).withStep(() => {
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
