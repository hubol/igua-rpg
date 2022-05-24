import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {ArrowPoison, ClownWonderful, ClownWonderfulGhost, ClownWonderfulThrow} from "../textures";
import {BLEND_MODES, Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import { player } from "./player";
import {hat} from "./hat";
import {sleep} from "../cutscene/sleep";
import {merge} from "../utils/object/merge";
import {Force} from "../utils/types/force";
import {approachLinear, lerp as nlerp} from "../utils/math/number";
import {vnew} from "../utils/math/vector";
import {scene} from "../igua/scene";
import {arrowPoison} from "./arrowPoison";
import {getPlayerCenterWorld} from "../igua/gameplay/getCenter";
import {wait} from "../cutscene/wait";
import {clownDrop, clownHealth, dieClown} from "./utils/clownUtils";
import {bouncePlayerOffDisplayObject} from "../igua/bouncePlayer";
import {ClownHurt} from "../sounds";
import {newGravity} from "./utils/newGravity";
import {sparkleTell} from "./sparkleTell";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {rayToPlayer, rayToPlayerIntersectsWall} from "../igua/logic/rayIntersectsWall";
import {rng} from "../utils/math/rng";
import {resolveGameObject} from "../igua/level/resolveGameObject";

const textures = subimageTextures(ClownWonderful, { width: 30 });
const throwTxs = subimageTextures(ClownWonderfulThrow, 3);

enum Leg {
    Default,
    LeftPoint,
    RightPoint,
    LeftTilt,
    RightTilt
}

export const resolveClownWonderful = resolveGameObject('ClownWonderful', e => clownWonderful().at([0, 2].add(e)));

export function clownWonderful() {
    const health = clownHealth(200);
    const drop = clownDrop(0.9, 0.3, 0.1);

    const consts = {
        recoveryFrames: 15,
        ghostLifeFrames: 15,
        dash: {
            speed: 10,
            deltaSpeed: 0.5,
        },
        damage: {
            ghost: 40,
        }
    }

    const controls = {
        throw: {
            _on: false,
            _showHeight: false,
            _showArrowAtHeight: true,
            _phase: 0,
            height: 0,
            faceRight: true,
            start1() {
                this._on = true;
                this._showHeight = false;
                this._showArrowAtHeight = true;
                this._phase = 0;
            },
            lift2() {
                this._phase = 1;
            },
            peak3() {
                this._showHeight = true;
            },
            release4() {
                this._showArrowAtHeight = false;
            },
            recover5() {
                this._showHeight = false;
                this._phase = 2;
            },
            finish6() {
                this._on = false;
            }
        },
        legs: {
            subimage: 0
        }
    };

    const behaviors = {
        lookAtPlayer: true,
        facePlayer: true,
        throwFacePlayer: true,
        invulnerable: 0,
        dash: false,
    };

    let playerIsRight = Force<boolean>();

    function mkHead() {
        const bald = Sprite.from(textures[5]);
        const face = Sprite.from(textures[6]);
        face.anchor.x = 14 / face.width;

        let playerX = Force<number>();

        const eyes = Sprite.from(textures[7])
            .withStep(() => {
                if (playerX === undefined)
                    playerX = player.x;
                else
                    playerX = nlerp(playerX, player.x, 0.5);

                playerIsRight = playerX > c.x;

                if (behaviors.lookAtPlayer)
                    eyes.texture = textures[playerIsRight ? 7 : 8];
                if (behaviors.facePlayer)
                    face.scale.x = playerIsRight ? 1 : -1;
                if (behaviors.throwFacePlayer)
                    controls.throw.faceRight = playerIsRight;
                face.x = face.scale.x > 0 ? 14 : 13;
            });
        const myHat = hat(Sprite.from(textures[9]));
        const hair = Sprite.from(textures[10]);

        return merge(container(bald, face, eyes, myHat, hair), { hat: myHat });
    }

    function mkArm() {
        const s = Sprite.from(throwTxs[0])
            .withStep(() => {
                s.texture = throwTxs[controls.throw._phase];
                s.visible = !controls.throw._showHeight;
            });

        const c = container(s)
            .withStep(() => {
                c.visible = controls.throw._on;
                c.scale.x = controls.throw.faceRight ? -1 : 1;
                c.pivot.x = controls.throw.faceRight ? 24 : -3;
            });

        const hs = vnew();
        const hd = vnew();

        const h = Sprite.from(ArrowPoison).centerAnchor();
        h.scale.x = -1;
        const g = new Graphics()
            .withStep(() => {
                hs.at(14, 11);
                hd.at(10, 2 - controls.throw.height);

                g
                    .clear()
                    .lineStyle(2, 0xffffff)
                    .moveTo(hs.x, hs.y)
                    .lineTo(hd.x, hd.y)
                    .lineStyle()
                    .beginFill(0xffffff)
                    .drawCircle(hd.x, hd.y, 3);
                h.at(hd);
                h.visible = controls.throw._showArrowAtHeight;
            });

        const hc = container(g, h)
            .withStep(() => hc.visible = controls.throw._showHeight);

        c.addChild(hc);

        c.pivot.set(-3, -16);

        return merge(c, { get arrowPosition() { return [h.worldTransform.tx, h.worldTransform.ty].add(scene.camera) } });
    }

    function mkLegs() {
        const l = Sprite.from(textures[0])
            .withStep(() => l.texture = textures[controls.legs.subimage]);

        return l;
    }

    function computeTargetHeight() {
        return c.y - (getPlayerCenterWorld().y + player.vspeed) - 16;
    }

    async function throwArrowWip() {
        behaviors.lookAtPlayer = true;
        behaviors.facePlayer = true;
        behaviors.throwFacePlayer = true;
        controls.throw.start1();
        const withinRange = wait(() => computeTargetHeight() < 40 && computeTargetHeight() > -10);
        await sleep(500);
        await withinRange;
        behaviors.facePlayer = false;
        behaviors.throwFacePlayer = false;
        controls.throw.lift2();
        await sleep(150);
        controls.throw.height = Math.max(-2, Math.min(32, computeTargetHeight()));
        controls.throw.peak3();
        await sleep(100);
        controls.throw.release4();
        arrowPoison([controls.throw.faceRight ? 4 : -4, 0]).damageSource(c).at(arm.arrowPosition).show();
        await sleep(100);
        controls.throw.recover5();
        await sleep(250);
        controls.throw.finish6();
    }

    async function dashWip() {
        behaviors.lookAtPlayer = true;
        behaviors.facePlayer = true;
        await sleep(250);
        behaviors.facePlayer = false;
        behaviors.lookAtPlayer = false;
        const right = playerIsRight;
        controls.legs.subimage = right ? Leg.RightPoint : Leg.LeftPoint;
        const dx = right ? 1 : -1;
        const t = sparkleTell().at([dx * 16, -8].add(c)).show();
        head.hat.bounce();
        speed.y = -2;
        await wait(() => t.destroyed);
        behaviors.lookAtPlayer = true;
        speed.x = consts.dash.speed * dx;
        controls.legs.subimage = right ? Leg.RightTilt : Leg.LeftTilt;
        behaviors.dash = true;
        await wait(() => speed.x === 0);
        behaviors.dash = false;
        controls.legs.subimage = 0;
    }

    const head = mkHead();
    head.hitbox = [0.2, 0.2, 0.8, 0.8];
    const arm = mkArm();
    const c = container(mkLegs(), head, arm);

    const speed = vnew();
    const offset = [0, -10];
    const gravity = newGravity(c, speed, offset, 8);

    const offsetPosition = vnew();

    const moves: (() => Promise<unknown>)[] = [];
    resetMoves();

    function resetMoves() {
        moves.length = 0;
        moves.push(dashWip, dashWip, throwArrowWip, throwArrowWip);
    }

    function pickMove() {
        if (moves.length <= 0)
            resetMoves();
        const i = rng.int(moves.length);
        return moves.splice(i, 1)[0];
    }

    c.withStep(() => {
            if (behaviors.invulnerable > 0) {
                c.visible = !c.visible;
                behaviors.invulnerable--;
                return;
            }

            c.visible = true;
            if (canGetDamagedByPlayer()) {
                ClownHurt.play();
                behaviors.invulnerable = consts.recoveryFrames;
                bouncePlayerOffDisplayObject(head);
                if (health.damage())
                    dieClown(c, drop(c.vsPlayerHitCount), [0, -8]);
            }
        })
        .withAsync(async () => {
            while (true) {
                await sleep(250);
                await wait(() => isOnScreen(c));
                await wait(() => !rayToPlayerIntersectsWall(offsetPosition))
                const y = rayToPlayer(offsetPosition).normalize().y;
                if (y > 0.2)
                    await sleep(250);
                await pickMove()();
            }
        })
        .withStep(() => {
            const ph = speed.x;
            const r = gravity(0.4);
            if (behaviors.dash) {
                const g = ghost(consts.ghostLifeFrames, consts.damage.ghost).at([-14, -32].add(c));
                const i = c.parent.getChildIndex(c);
                c.parent.addChildAt(g, Math.max(0, i - 1));
                speed.x = approachLinear(speed.x, 0, consts.dash.deltaSpeed);
                if (r.hitWall && Math.abs(ph) > 1) {
                    speed.x = speed.y < 0 ? ph : Math.sign(ph) * Math.max(Math.abs(ph) * 0.75, 1);
                    speed.y = -3;
                }
            }
            c.x = Math.max(8, Math.min(scene.width - 8, c.x));
            offsetPosition.at(c).add(offset);
        });
    c.ext.isHatParent = true;
    c.pivot.set(14, 36);

    const topOfHead = new Graphics().beginFill(0).drawRect(7, -2, 13, 10).show(c).hide();
    const canGetDamagedByPlayer = () => head.collides(player) && (!behaviors.dash || topOfHead.collides(player));

    function ghost(life: number, damage: number) {
        const maxLife = life;
        let hostile = true;
        const s = Sprite.from(ClownWonderfulGhost)
            .withStep(() => {
                s.alpha = life / maxLife;
                if (life-- <= 0 || c.destroyed)
                    return s.destroy();
                if (!hostile || s.alpha < 0.25)
                    return;
                if (player.collides(s) && !canGetDamagedByPlayer()) {
                    hostile = false;
                    c.damagePlayer(damage);
                }
            });
        s.hitbox = [0.2, 0.2, 0.8, 0.8];
        s.blendMode = BLEND_MODES.ADD;
        return s;
    }

    return c;
}