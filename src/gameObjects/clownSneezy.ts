import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {ClownSneezy} from "../textures";
import {merge} from "../utils/merge";
import {Graphics, Sprite} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {rng} from "../utils/rng";
import {ClownSneeze, ClownSniffle} from "../sounds";
import {Howl} from "howler";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {Vector, vnew} from "../utils/math/vector";
import {getPlayerCenterWorld} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {push} from "./walls";

const textures = subimageTextures(ClownSneezy, { width: 24 });

export function clownSneezy() {
    const head = makeHead();
    const g = new Graphics().beginFill().drawRect(0, 0, 1, 1);

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
        const storedSneezeDp = getPlayerCenterWorld().add(c, -1).normalize();
        head.facePlayer = false;
        await sniffle(1);
        head.shaking = false;
        head.hat.bounce();
        head.face.subimage = 3;
        ClownSneeze.play();
        sneezeDp.at(storedSneezeDp).scale(-1);
        deadlySneeze(storedSneezeDp.scale(6)).at(c).show();
        await sleep(500);
        head.face.subimage = 0;
        head.facePlayer = true;
    }

    const sneezeDp = vnew();

    const c = container(head, g)
        .withStep(() => {
            c.add(sneezeDp);
            push(c, 16);
            sneezeDp.vlength -= 0.05;
        })
        .withAsync(async () => {
            while (true) {
                await sleep(500 + rng.int(1500));
                if (isOnScreen(c))
                    await sneeze();
            }
        });

    return c;
}

function deadlySneeze(dp: Vector, radius = 16) {
    const e = radius * 0.7;
    const m = new Graphics().beginFill().drawRect(-e / 2, -e / 2, e, e);
    m.visible = false;
    let life = 60 * 5;
    const b = new Graphics().beginFill(0xffffff).drawCircle(0, 0, radius)
        .withStep(() => {
            b.parent.add(dp);
            if (life-- <= 0)
                return b.parent.destroy();
            if (m.collides(player))
                player.damage(25);
        });
    return container(b, m);
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