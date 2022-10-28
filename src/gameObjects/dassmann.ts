import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {DassmannArm, DassmannBoot, DassmannHead, DassmannTorso} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {Blinking} from "../pixins/blinking";
import {Graphics, Sprite} from "pixi.js";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {approachLinear, nlerp} from "../utils/math/number";
import {now} from "../utils/now";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {Undefined} from "../utils/types/undefined";

export function dassmann() {
    const head = mkHead();
    const body = mkBody().at(9, 19);
    const puppet = container(head, body);
    puppet.at(-12, -33);

    const c = container(puppet)
        .withStep(() => {
            // head.look = Math.sin(now.s * Math.PI);
            // head.face = Math.sin(now.s * Math.PI * 0.5 + 1);

            // body.feetFace = -1;

            head.antennal = Math.sin(now.s * Math.PI * 1.5) * 0.3;
            head.antennar = Math.sin(now.s * Math.PI * 1.5 + 2) * 0.3;

            head.agape = now.s % 4 < 2 ? 1 : 0;
            // body.pedometer += 1;
        })
        .withAsync(async () => {
            while (true) {
                head.look = -1;
                head.face = -1;
                body.face = head.face;
                await sleep(2000);
                head.look = 1;
                head.face = 1;
                body.face = head.face;
                await sleep(2000);
            }
        });

    [body.arml, body.armr].forEach((x, i) => x.withAsync(async () => {
        x.pose = ArmTx.Rest;
        // const speed = 1.25;
        // await sleep(i * 100 / speed);
        // while (true) {
        //     await x.raise().over(500 / speed);
        //     await sleep(250 / speed);
        //     await x.down().over(500 / speed);
        //     await sleep(250 / speed);
        // }
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
    const arml = mkArm().at(3, -12);
    arml.scale.x = -1;
    const armr = mkArm().at(4, -12);

    const bootl = mkBoot(-1).at(0, 9);
    const bootr = mkBoot().at(4, 9);

    let face = 0;

    const c = merge(container(), { arml, armr, face: 0, pedometer: 0, feetFace: Undefined<number>() });
    Sprite.from(DassmannTorso).show(c);
    c.addChild(bootl, bootr);
    Sprite.from(headTxs[HeadTx.Shield]).at(-9, -19).show(c);
    c.addChild(arml, armr);

    c.withStep(() => {
        face = approachLinear(face, c.face, 0.1);

        if (face < -0.5)
            arml.pivot.x = 1;
        if (face >= 0)
            arml.pivot.x = 0;

        if (face > 0.5)
            armr.pivot.x = 1;
        if (face <= 0)
            armr.pivot.x = 0;

        bootl.face = c.feetFace === 1 ? 1 : -1;
        bootr.face = c.feetFace === -1 ? -1 : 1;

        const f = c.pedometer > 0 ? 1 : 0;
        bootl.pivot.y = -f * (Math.sin(c.pedometer * Math.PI * 0.1) - 1);
        bootr.pivot.y = -f * (Math.sin(c.pedometer * Math.PI * 0.1 + Math.PI * 0.5) - 1);
        arml.pivot.y = -f * (Math.sin(c.pedometer * Math.PI * 0.1 + Math.PI * 1) - 1) / 2;
        armr.pivot.y = -f * (Math.sin(c.pedometer * Math.PI * 0.1 + Math.PI * 1.5) - 1) / 2;
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

function mkBoot(face = 1) {
    const s = merge(Sprite.from(DassmannBoot), { face })
        .withStep(() => {
            if (s.face > 0) {
                s.pivot.x = 0;
                s.scale.x = 1;
            }
            else if (s.face < 0) {
                s.pivot.x = 3;
                s.scale.x = -1;
            }
        });

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