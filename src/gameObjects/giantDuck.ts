import {DuckGiant, MessageBox} from "../textures";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {wait} from "../cutscene/wait";
import {player} from "./player";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {container} from "../utils/pixi/container";
import {sleep} from "../cutscene/sleep";
import {merge} from "../utils/merge";
import {now} from "../utils/now";
import {BeepTiny, ChangeLooks, CharacterHitCeiling, ConsumeBallon, DuckQuack, SparkleAppear} from "../sounds";
import {scene} from "../igua/scene";
import {IguaText} from "../igua/text";
import {spawnAndRotate} from "./spawnAndRotate";
import {animatedSprite} from "../igua/animatedSprite";
import {sparkleTextures} from "./sparkle";
import {bouncePlayerCircleConditionally} from "../igua/bouncePlayer";
import {empBlast} from "./empBlast";
import {progress} from "../igua/data/progress";
import {ballons} from "./ballons";
import {distance} from "../utils/math/vector";
import {valuable} from "./valuable";
import {getPlayerCenter} from "../igua/gameplay/getCenter";

const [tailTexture, neutralTexture, agapeTexture] = subimageTextures(DuckGiant, 3);

export function giantDuck() {
    let agape = false;
    let excited = false;
    let jump = 0;

    const body = Sprite.from(neutralTexture).withStep(() => {
        body.texture = agape ? agapeTexture : neutralTexture;
    });
    const tail = Sprite.from(tailTexture).withStep(() => {
        if (excited)
            tail.angle = Math.round(Math.sin(now.s * Math.PI * 8)) * 15;
        else
            tail.angle = 0;
    });

    tail.anchor.set(9/54, 39/48);

    const tc = container(tail);
    tc.pivot.set(-9, -39);

    const mouth = Sprite.from(MessageBox).at(17, -26);
    mouth.scale.set(0.1);
    mouth.alpha = 0;

    const root = merge(container(), {
        defeated: false,
        aggressive: false,
        async quack() {
            jump = -2;
            agape = true;
            excited = true;
            DuckQuack.play();
            await sleep(500);
            agape = false;
            excited = false;
        },
        charge() {
            agape = true;
            excited = true;
        }
    });

    const c = container(tc, body)
        .withAsync(async () => {
            await wait(() => root.aggressive && Math.sign(player.x - root.x) === Math.sign(root.scale.x));
            await root.quack();
            await sleep(500);
            const shield = createSparkleShield();
            await wait(() => shield.fullySpawned);
            await root.quack();
            root.charge();
            const r = reticle(mouth);
            await sleep(3000);
            const b = empBlast(96, 4, 0, 1000).withStep(() => b.at(player)).show();
            await wait(() => b.wentHostile);
            r.destroy();
            player.damage(progress.health);
            if (player.isDead)
                return;
            root.defeated = true;
            agape = false;
            excited = false;
            shield.destroy();
            ConsumeBallon.play();
            ballons({ target: root, offset: [0, -24], state: [1, 1, 1], string: 32 });
            await sleep(2000);
            excited = true;
            let vsp = -0.5;
            const lastDropV = root.vcpy().add(32, 32);
            let dropCount = 0;
            root.withStep(() => {
                root.x -= 0.5;
                root.y += vsp;
                vsp -= 0.005;
                if (dropCount < 5 && distance(root, lastDropV) > 24) {
                    valuable(Math.round(root.x), Math.round(root.y), undefined, 'ValuableBlue').behind();
                    lastDropV.at(root);
                    dropCount++;
                }
            });
        })
        .withAsync(async () => {
            while (true) {
                if (excited) {
                    c.x -= 1;
                    await sleep(100);
                    c.x += 1;
                }
                await sleep(100);
            }
        })
        .withStep(() => {
            if (jump !== 0) {
                c.pivot.y -= Math.trunc(jump);
                if (c.pivot.y <= 48) {
                    c.pivot.y = 48;
                    jump = 0;
                }
                else
                    jump += 0.32;
            }
        });

    c.pivot.set(27, 48);

    function createSparkleShield() {
        const shield = spawnAndRotate(() => {
            SparkleAppear.play();
            return animatedSprite(sparkleTextures, 1 / 12).centerAnchor();
        }, 8, 45, Math.PI / 96, 125)
            .withStep(() => {
                shield.at(root).add(0, -16);
                if (bouncePlayerCircleConditionally(shield, shield.radius)) {
                    CharacterHitCeiling.volume(1);
                    CharacterHitCeiling.play();
                }
            }).show();

        return shield;
    }

    root.addChild(c, mouth);

    return root;
}

function reticle(source: DisplayObject) {
    const color = 0xff0000;
    let introprog = 0;
    const g = new Graphics().withStep(() => {
        const sbounds = source.worldTransform;
        const sx = sbounds.tx;
        const sy = sbounds.ty;
        const d = getPlayerCenter();

        const diff = d.vcpy().add([sx, sy], -1);
        const length = diff.vlength;
        diff.normalize().scale(length - 26);

        g.clear().lineStyle(1, color, 1, 1);
        dashedLine(g, sx, sy, sx + diff.x, sy + diff.y, introprog < 1 ? 0 : now.s * 32);

        g.drawCircle(d.x, d.y, 22);

        t.at(d.x + 30, d.y - 11);
    });
    let tprog = 0;
    let lastTextLength = 0;
    const t = IguaText.Large('').withStep(() => {
        if (tprog < 1 && introprog >= 1)
            tprog += 0.05;
        const text = `Guard:
${player.isDucking ? 20 : 0}%`;
        const newLength = Math.floor(text.length * tprog);
        if (newLength !== lastTextLength) {
            ChangeLooks.play();
        }
        t.text = text.substring(0, newLength);
        lastTextLength = newLength;
    });
    t.tint = color;
    let lastVisible = false;
    const c = container(g, t).ahead().withStep(() => {
        c.at(scene.camera);
        if (introprog < 1) {
            introprog += 0.0175;
            c.visible = Math.floor(introprog * 8) % 2 === 0;
        }
        else
            c.visible = true;

        if (c.visible && !lastVisible)
            BeepTiny.play();
        lastVisible = c.visible;
    });
    return c;
}

function dashedLine(g: Graphics, x1: number, y1: number, x2: number, y2: number, seed: number, dash = 4) {
    const v = [x2, y2].add(-x1, -y1);
    const n = v.vcpy().normalize();
    const length = v.vlength;
    const bi = seed % length;
    let di = 0;
    while (di < length) {
        const i = (bi + di) % length;
        const ei = Math.min(i + dash, length);
        const s = n.vcpy().scale(i);
        const d = n.vcpy().scale(ei);
        g.moveTo(x1 + s.x, y1 + s.y).lineTo(x1 + d.x, y1 + d.y);
        di += dash * 2;
    }
}