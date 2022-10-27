import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {DassmannArm, DassmannHead, DassmannTorso} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {Blinking} from "../pixins/blinking";
import {Graphics, Sprite} from "pixi.js";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {approachLinear, nlerp} from "../utils/math/number";
import {now} from "../utils/now";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";

export function dassmann() {
    const head = mkHead();
    const body = mkBody().at(9, 19);

    const c = container(head, body)
        .withStep(() => {
            head.look = Math.sin(now.s * Math.PI);
            head.face = Math.sin(now.s * Math.PI + 1);
            body.face = head.face;

            head.antennal = Math.sin(now.s * Math.PI * 1.5) * 0.3;
            head.antennar = Math.sin(now.s * Math.PI * 1.5 + 2) * 0.3;

            head.agape = now.s % 4 < 2 ? 1 : 0;
        });

    [body.arml, body.armr].forEach((x, i) => x.withAsync(async () => {
        const speed = 1.25;
        await sleep(i * 100 / speed);
        while (true) {
            await x.raise().over(500 / speed);
            await sleep(250 / speed);
            await x.down().over(500 / speed);
            await sleep(250 / speed);
        }
    }))

    return c;
}

enum ArmTx {
    Down,
    Rest,
    Tpose,
    Raise
}

function mkBody() {
    const arml = mkArm().at(3, -13);
    arml.scale.x = -1;
    const armr = mkArm().at(4, -13);

    const c = merge(container(), { arml, armr, face: 0 });
    Sprite.from(DassmannTorso).show(c);
    Sprite.from(headTxs[HeadTx.Shield]).at(-9, -19).show(c);
    c.addChild(arml, armr);

    c.withStep(() => {
        arml.pivot.x = c.face < -0.5 ? 1 : 0;
        armr.pivot.x = c.face > 0.5 ? 1 : 0;
    });

    return c;
}

function mkArm() {
    function raise() {
        return lerp(s, 'pose').to(ArmTx.Raise);
    }

    function rest() {
        return lerp(s, 'pose').to(ArmTx.Rest);
    }

    function down() {
        return lerp(s, 'pose').to(ArmTx.Down);
    }

    const s = merge(Sprite.from(armTxs[ArmTx.Rest]), { pose: ArmTx.Rest, raise, rest, down })
        .withStep(() => s.texture = armTxs[Math.min(ArmTx.Raise, Math.max(ArmTx.Down, Math.round(s.pose)))]);

    return s;
}

function mkHead() {
    let agapeReal = 0;

    const c = merge(container(), {
            look: 0,
            face: 0,
            agape: 0,
            antennar: 0,
            antennal: 0,
        })
        .withPixin(Blinking());

    Sprite.from(headTxs[HeadTx.Noggin]).show(c);

    const face = container().show(c);

    const mouth = Sprite.from(headTxs[HeadTx.Mouth]).show(face);

    const eyes = container().show(face).filter(alphaMaskFilter(Sprite.from(headTxs[HeadTx.Eyes]).show(face)));
    Sprite.from(headTxs[HeadTx.Eyes]).show(eyes);
    const pupils = Sprite.from(headTxs[HeadTx.Pupils]).show(eyes);
    const eyelids = new Graphics().beginFill(0xF0B020).drawRect(6, 7 - 8, 13, 8).show(eyes);

    const antennar = mkAntenna().at(17, 4).show(face);
    const antennal = mkAntenna().at(9, 4).show(face);
    antennal.scale.x = -1;

    c.withStep(() => {
        pupils.x = approachLinear(pupils.x, Math.sign(c.look), 0.1);
        agapeReal = approachLinear(agapeReal, c.agape, 0.25);
        const index = Math.round(nlerp(HeadTx.Mouth, HeadTx.MouthOpen2, agapeReal));
        mouth.texture =  headTxs[index];
        face.x = approachLinear(face.x, Math.sign(c.face), 0.1);
        eyelids.y = c.blink * 8;

        antennal.factor = c.antennal;
        antennar.factor = c.antennar;
    })

    return c;
}

function mkAntenna() {
    const len = 11;
    const g = merge(new Graphics(), { factor: -0.2 });
    return g.withStep(() => {
        g.clear().lineStyle(1, 0x0D1C7C);
        const root = Math.round((1 - Math.abs(g.factor)) * len);
        let angled = len - root;
        g.lineTo(0, -root);
        if (angled > 0) {
            g.lineTo(angled, -root + angled * Math.sign(g.factor));
        }
    });
}

const armTxs = subimageTextures(DassmannArm, { width: 16 });
const headTxs = subimageTextures(DassmannHead, { width: 26 });

enum HeadTx {
    Noggin = 0,
    Mouth,
    MouthOpen0,
    MouthOpen1,
    MouthOpen2,
    Eyes,
    Pupils,
    Shield
}