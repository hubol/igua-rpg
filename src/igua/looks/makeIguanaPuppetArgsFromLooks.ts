import {Looks} from "./looksModel";
import {IguanaPuppetArgs} from "../puppet/iguanaPuppet";
import {Sprite} from "pixi.js";
import {
    clubShapes,
    footShapes,
    faceShapes,
    mouthShapes,
    nailsShapes,
    tailShapes,
    torsoShapes,
    crestShapes, eyeShapes, pupilShapes
} from "./shapes";
import {colord} from "colord";
import {toHexColorString} from "../../utils/toHexColorString";
import {container} from "../../utils/pixi/container";

export function makeIguanaPuppetArgsFromLooks(looks: Looks): IguanaPuppetArgs {
    const backLeftFoot = makeFoot(looks.feet, "hind", true);
    const backRightFoot = makeFoot(looks.feet, "hind", false);
    const frontLeftFoot = makeFoot(looks.feet, "front", true);
    const frontRightFoot = makeFoot(looks.feet, "front", false);
    const body = makeBody(looks.body);
    const { head, crest } = makeHead(looks.body, looks.head);

    return {
        body,
        crest,
        eyes: container(),
        head,
        backLeftFoot,
        backRightFoot,
        frontLeftFoot,
        frontRightFoot,
        fromLooks: true,
    };
}

function makeFootTint(color: number, back: boolean) {
    if (!back)
        return color;
    return colord(toHexColorString(color)).saturate(0.1).darken(0.225).toPixi();
}

type Feet = Looks['feet'];

function makeFoot(feet: Feet, key: 'hind' | 'front', back: boolean) {
    const foot = feet[key];
    const f = Sprite.from(footShapes[0]);
    if (foot.flipH)
        f.scale.x = -1;
    if (foot.flipV) {
        f.pivot.y -= f.height;
        f.scale.y = -1;
    }
    if (back)
        f.pivot.x -= feet.backOffset;
    const gap = (7 + feet.gap) / 2;
    f.pivot.x += key === 'front' ? -Math.ceil(gap) : Math.floor(gap);
    f.tint = makeFootTint(feet.color, back);
    const nails = Sprite.from(nailsShapes[0]);
    nails.tint = makeFootTint(feet.nailColor, back);
    nails.pivot.x -= foot.nails.placement;
    f.addChild(nails);
    return f;
}

type Body = Looks['body'];

function makeBody(body: Body) {
    const tail = Sprite.from(tailShapes[0]);
    tail.tint = body.tail.color;
    tail.pivot.set(5, 11).add(body.tail.placement, -1);
    const club = Sprite.from(clubShapes[0]);
    club.tint = body.tail.club.color;
    club.pivot.at(tail.pivot).add(-3, 8).add(body.tail.club.placement, -1);
    const torso = Sprite.from(torsoShapes[0]);
    torso.tint = body.torso.color;
    torso.pivot.set(-1, 5);
    const c = container(tail, torso, club);
    c.pivot.set(-body.placement.x, -body.placement.y);
    return c;
}

type Head = Looks['head'];

function makeHead(body: Body, head: Head) {
    const face = Sprite.from(faceShapes[0]);
    face.tint = head.color;
    const mouth = Sprite.from(mouthShapes[0]);
    mouth.tint = head.mouth.color;
    mouth.pivot.set(-13, 1).add(head.mouth.placement, -1);
    face.addChild(mouth);

    const crest = makeCrest(head.crest);
    crest.pivot.add(-4, 13);

    const eyes = makeEyes(head.eyes);

    const h = container(crest, face, eyes);
    h.pivot.add(body.placement, -1).add(head.placement, -1);

    return { crest, head: h };
}

type Crest = Head['crest'];

function makeCrest(crest: Crest) {
    const c = Sprite.from(crestShapes[0]);
    c.pivot.add(crest.placement, -1);
    c.tint = crest.color;
    return c;
}

type Eyes = Head['eyes'];
type Pupils = Eyes['pupils'];

function makeEye(eyes: Eyes, xscale: number) {
    const eye = Sprite.from(eyeShapes[0]);
    const pupil = Sprite.from(pupilShapes[0]);
    pupil.pivot.add(eyes.pupils.placement, -1);
    pupil.tint = eyes.pupils.color;
    eye.addChild(pupil);
    return eye;
}

function makeEyes(eyes: Eyes) {
    const left = makeEye(eyes, 1);
    const right = makeEye(eyes, -1);
    const e = container(left, right);
    e.pivot.add(eyes.placement, -1);
    return e;
}
