import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {ClownSneezy} from "../textures";
import {merge} from "../utils/merge";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/rng";
import {ClownHurt, ClownSneeze, ClownSniffle} from "../sounds";
import {Howl} from "howler";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {Vector, vnew} from "../utils/math/vector";
import {getPlayerCenterWorld} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {push} from "./walls";
import {cyclic} from "../utils/math/number";
import {confetti} from "./confetti";
import {bouncePlayer} from "../igua/bouncePlayer";
import {dieClown} from "./utils/clownUtils";

const textures = subimageTextures(ClownSneezy, { width: 24 });

export function clownSneezy({ fullHealth = 7 } = { }) {
    const head = makeHead();
    const propeller = makePropeller(head);
    const g = new Graphics().beginFill().drawRect(-10, -17, 19, 17);
    g.visible = false;

    let health = fullHealth;
    let invulnerable = 0;
    let dropOdds = 0.8;

    function hurtPlayer(damage: number) {
        player.damage(damage);
        dropOdds = Math.max(dropOdds - 0.5, 0.1);
    }

    function play(howl: Howl) {
        if (!isOnScreen(c))
            return;
        howl.play();
    }

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

    const knockbackSpeed = vnew();

    const c = container(propeller, head, g)
        .withStep(() => {
            if (invulnerable <= 0 && g.collides(player)) {
                bouncePlayer([0, -9].add(c));
                health -= player.strength;
                if (health <= 0) {
                    const drop = rng() < dropOdds;
                    return dieClown(c, drop);
                }
                invulnerable = 30;
                ClownHurt.play();
                knockbackSpeed.at(-player.engine.knockback.x, -player.vspeed);
            }
            c.add(knockbackSpeed);
            push(c, 16);
            knockbackSpeed.vlength -= 0.05;
            c.visible = invulnerable ? !c.visible : true;
            if (invulnerable > 0)
                invulnerable--;
        })
        .withAsync(async () => {
            while (true) {
                await sleep(500 + rng.int(1500));
                if (isOnScreen(c))
                    await sneeze();
            }
        });

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
                    hurtPlayer(25);
            });
        return container(b, m);
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
    const h = hat();
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

function hat() {
    let y = 0;
    let vspeed = 0;

    function bounce() {
        vspeed = -2;
    }

    let lastParentY = undefined as any as number;

    const s = merge(Sprite.from(textures[0]), { bounce })
        .withStep(() => {
            const parentY = s.parent.parent.y;
            if (lastParentY) {
                const dy = parentY - lastParentY;
                if (dy > 0) {
                    y -= dy;
                }
            }
            lastParentY = parentY;
            y = Math.min(0, y + vspeed);
            if (y === 0)
                vspeed = 0;
            else
                vspeed = Math.min(vspeed + 0.3, y * -0.3);
            s.y = Math.round(y);
        });
    return s;
}