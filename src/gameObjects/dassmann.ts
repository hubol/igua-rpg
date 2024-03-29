import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {DassmannArm, DassmannBoot, DassmannHead, DassmannTorso} from "../textures";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {Blinking} from "../pixins/blinking";
import {Graphics, Sprite} from "pixi.js";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {approachLinear, nlerp} from "../utils/math/number";
import {lerp} from "../cutscene/lerp";
import {Undefined} from "../utils/types/undefined";
import {scene} from "../igua/scene";
import {getWorldCenter, getWorldPos} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {trackPosition} from "../igua/trackPosition";
import {Force} from "../utils/types/force";
import { DassStep } from "../sounds";

type AntennaExpression = 'idle' | 'shock' | 'flight' | 'off';
type FacingExpression = 'auto' | 'off';
type WalkingExpression = 'auto' | 'off';

const Walk = 0.0625;

export function dassmann() {
    const head = mkHead();
    const body = mkBody().at(9, 19);
    const puppet = container(head, body);
    puppet.at(-12, -33);

    const antennaExpressions: Record<AntennaExpression, () => void> = {
        idle: () => {
            head.antennal = Math.sin(scene.s * Math.PI * 1.5) * 0.3;
            head.antennar = Math.sin(scene.s * Math.PI * 1.5 + 2) * 0.3;
        },
        shock: () => {
            head.antennal = (((Math.sin(Math.round(scene.s * Math.PI * 6)) + 1) * 8) % 2 - 1) * 0.6;
            head.antennar = -head.antennal;
        },
        flight: () => {
            head.antennal = approachLinear(head.antennal, 0.4, 0.1);
            head.antennar = approachLinear(head.antennar, 0.4, 0.1);
        },
        off: () => {},
    }

    const facingExpressions: Record<FacingExpression, () => void> = {
        auto: () => {
            const off = player.x - getWorldPos(c).x;
            const sign = Math.sign(off);
            const len = Math.abs(off);
            body.face = len < 40 ? 0 : sign;
            head.face = len > 80 ? sign : 0;
            head.look = len > 16 ? sign : 0;

            if (Math.abs(diff.x) > 0.3) {
                body.face = Math.sign(diff.x);
                head.face = body.face;
            }
        },
        off: () => {},
    }

    const walkingExpressions: Record<WalkingExpression, () => void> = {
        auto: () => {
            if (Math.abs(diff.x) > 0.3) {
                body.pedometer += nlerp(1, 2, (Math.abs(diff.x) - 1) / 6);
                puppet.pivot.y = (body.bootl.pivot.y > 1.625 || body.bootr.pivot.y > 1.625) ? 1 : 0;
            }
            else {
                body.pedometer = 0;
                puppet.pivot.y = 0;
            }
        },
        off: () => {}
    }

    const hurtboxes = [
        new Graphics().beginFill(0).drawRect(-7, -28, 15, 12).hide(),
        new Graphics().beginFill(0).drawRect(-2, -16, 5, 16).hide()
    ];

    const c = merge(container(puppet), { head, arml: body.arml, armr: body.armr, body, hurtboxes, expression: {
            antenna: <AntennaExpression>'idle',
            facing: <FacingExpression>'auto',
            walking: <WalkingExpression>'auto',
        },
        friction: 0,
        speakerbox: new Graphics().beginFill(0xff0000).drawRect(-3, -33, 8, 16).hide()})
        .withGravityAndWallResist([0, -8], 8, 0.3)
        .withStep(() => {
            antennaExpressions[c.expression.antenna]();
            facingExpressions[c.expression.facing]();
            walkingExpressions[c.expression.walking]();
            if (c.isOnGround)
                c.speed.x = approachLinear(c.speed.x, 0, c.friction);
        });

    c.addChild(...hurtboxes, c.speakerbox);

    const { diff } = trackPosition(c);

    return c;
}

export enum ArmTx {
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

    const c = merge(container(), { arml, armr, bootl, bootr, face: 0, pedometer: 0, feetFace: Undefined<number>(), playFootsteps: false, bootPivotYOffset: 0 });
    Sprite.from(DassmannTorso).show(c);
    c.addChild(bootl, bootr);
    Sprite.from(headTxs[HeadTx.Shield]).at(-9, -19).show(c);
    c.addChild(arml, armr);

    let bootlpy = Force<number>();
    let bootrpy = Force<number>();

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
        bootl.pivot.y = -f * (Math.sin(c.pedometer * Math.PI * Walk) - 1) + c.bootPivotYOffset;
        bootr.pivot.y = -f * (Math.sin(c.pedometer * Math.PI * Walk + Math.PI * 0.5) - 1) + c.bootPivotYOffset;
        arml.pivot.y = -f * (Math.sin(c.pedometer * Math.PI * Walk + Math.PI * 1) - 1) / 2;
        armr.pivot.y = -f * (Math.sin(c.pedometer * Math.PI * Walk + Math.PI * 1.5) - 1) / 2;

        if (bootlpy !== undefined && c.playFootsteps && (c.parent.parent as any).isOnGround) {
            if ((bootlpy > .5 && bootl.pivot.y <= .5) || (bootrpy > .5 && bootr.pivot.y <= .5))
                DassStep.play();
        }

        bootlpy = bootl.pivot.y;
        bootrpy = bootr.pivot.y;
    });

    return c;
}

const fistPositions = [
    [2, 21],
    [7, 19],
    [10, 12],
    [9, 3],
];

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

    const g = new Graphics().beginFill(0).drawRect(0, 0, 5, 5).hide();

    const s = merge(Sprite.from(armTxs[ArmTx.Rest]), { pose: ArmTx.Rest, raise, rest, down, get fistWorldPos() { return getWorldCenter(g); } })
        .withStep(() => {
            const index = Math.min(ArmTx.Raise, Math.max(ArmTx.Down, Math.round(s.pose)));
            s.texture = armTxs[index];
            g.at(fistPositions[index]);
        });

    g.show(s);

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
            wiggle: 0,
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

        c.pivot.x = Math.sin(scene.s * Math.PI * 10) * c.wiggle;

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