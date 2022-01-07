import {Looks} from "./looksModel";
import {IguanaPuppetArgs} from "../puppet/iguanaPuppet";
import {RenderTexture, Sprite, Texture} from "pixi.js";
import {
    clubShapes,
    footShapes,
    faceShapes,
    mouthShapes,
    clawsShapes,
    tailShapes,
    torsoShapes,
    crestShapes, eyeShapes, pupilShapes, hornShapes
} from "./shapes";
import {colord} from "colord";
import {toHexColorString} from "../../utils/toHexColorString";
import {container} from "../../utils/pixi/container";
import {game} from "../game";
import {iguanaEyelids, IguanaEyes} from "../puppet/eyes";
import {merge} from "../../utils/merge";

export function makeIguanaPuppetArgsFromLooks(looks: Looks): IguanaPuppetArgs {
    const backLeftFoot = makeFoot(looks.feet, "hind", true);
    const backRightFoot = makeFoot(looks.feet, "hind", false);
    const frontLeftFoot = makeFoot(looks.feet, "front", true);
    const frontRightFoot = makeFoot(looks.feet, "front", false);
    const body = makeBody(looks.body);
    const { head, crest, eyes } = makeHead(looks.body, looks.head);

    return {
        body,
        crest,
        eyes,
        head,
        backLeftFoot,
        backRightFoot,
        frontLeftFoot,
        frontRightFoot,
        fromLooks: true,
    };
}

function darken(color: number, amount = 0.225) {
    return colord(toHexColorString(color)).saturate(0.1).darken(amount).toPixi();
}

function makeFootTint(color: number, back: boolean) {
    if (!back)
        return color;
    return darken(color);
}

type Feet = Looks['feet'];

function makeFoot(feet: Feet, key: 'hind' | 'front', back: boolean) {
    const foot = feet[key];
    const f = Sprite.from(footShapes[foot.shape]);
    if (back)
        f.pivot.x -= feet.backOffset;
    const gap = (7 + feet.gap) / 2;
    f.pivot.x += key === 'front' ? -Math.ceil(gap) : Math.floor(gap);
    f.tint = makeFootTint(feet.color, back);
    const clawsShape = clawsShapes[foot.claws.shape];
    const claws = clawsShape ? Sprite.from(clawsShape) : undefined;
    if (claws) {
        claws.tint = makeFootTint(feet.clawColor, back);
        claws.pivot.x -= foot.claws.placement;
        f.addChild(claws);
    }
    if (foot.flipV) {
        f.pivot.y -= f.height;
        f.scale.y = -1;
        if (claws) {
            claws.scale.y = -1;
            claws.pivot.y -= f.height;
        }
    }
    return f;
}

type Body = Looks['body'];

function makeBody(body: Body) {
    const tail = Sprite.from(tailShapes[body.tail.shape]);
    tail.tint = body.tail.color;
    tail.pivot.set(5, 11).add(body.tail.placement, -1);
    const torso = Sprite.from(torsoShapes[body.torso.shape]);
    torso.tint = body.torso.color;
    torso.pivot.set(-1, 5);
    if (body.torso.flipV)
        flipV(torso);

    const c = container(tail, torso);

    const clubShape = clubShapes[body.tail.club.shape];
    if (clubShape) {
        const club = Sprite.from(clubShape);
        club.tint = body.tail.club.color;
        club.pivot.at(tail.pivot).add(-3, 8).add(body.tail.club.placement, -1);
        c.addChild(club);
    }

    c.pivot.set(-body.placement.x, -body.placement.y);
    return c;
}

type Head = Looks['head'];

function makeHead(body: Body, head: Head) {
    const face = Sprite.from(faceShapes[0]);
    face.tint = head.color;
    const mouth = Sprite.from(mouthShapes[head.mouth.shape]);
    mouth.tint = head.mouth.color;
    mouth.pivot.set(-13, 1).add(head.mouth.placement, -1);
    if (head.mouth.flipV)
        flipV(mouth);
    face.addChild(mouth);

    const crest = makeCrest(head.crest);

    const eyes = makeEyes(head);

    const h = container(crest, face, eyes);

    const hornShape = hornShapes[head.horn.shape];

    if (hornShape) {
        const horn = Sprite.from(hornShape);
        horn.tint = head.horn.color;
        horn.pivot.set(-12, 4).add(head.horn.placement, -1);
        h.addChild(horn);
    }

    h.pivot.add(body.placement, -1).add(head.placement, -1);

    return { crest, head: h, eyes };
}

type Crest = Head['crest'];

function makeCrest(crest: Crest) {
    const c = Sprite.from(crestShapes[crest.shape]);
    c.pivot.add(-4, 13).add(crest.placement, -1);
    if (crest.flipV)
        flipV(c);
    if (crest.flipH)
        flipH(c);
    c.tint = crest.color;
    return c;
}

type Eyes = Head['eyes'];

const eyesTextures: Record<string, Texture> = {};

function makeEyesTexture(eyes: Eyes, mask: boolean) {
    const key = JSON.stringify({ ...eyes, mask });

    if (eyesTextures[key])
        return eyesTextures[key];

    const leftShape = () => Sprite.from(eyeShapes[0]);
    const rightShape = () => {
        const sprite = leftShape();
        sprite.scale.x = -1;
        sprite.pivot.x += eyes.gap;
        return sprite;
    };
    const pupil = () => {
        const sprite = Sprite.from(pupilShapes[eyes.pupils.shape]);
        sprite.tint = eyes.pupils.color;
        sprite.visible = !mask;
        return sprite;
    };

    const leftPupil = pupil();
    leftPupil.pivot.add(eyes.pupils.placement, -1);
    leftPupil.mask = leftShape();
    const rightPupil = pupil();
    if (eyes.pupils.mirrored) {
        rightPupil.scale.x *= -1;
        rightPupil.pivot.x += eyes.gap;
        rightPupil.pivot.add(eyes.pupils.placement, -1);
    }
    else {
        const fromLeft = leftPupil.getBounds().x - leftPupil.mask.getBounds().x;
        rightPupil.pivot.x -= eyes.gap + leftPupil.width;
        rightPupil.pivot.add(-fromLeft, -eyes.pupils.placement.y);
    }
    rightPupil.mask = rightShape();

    const c = container(leftShape(), rightShape(), leftPupil.mask, rightPupil.mask, leftPupil, rightPupil);
    const b = c.getBounds();

    c.pivot.set(b.x, b.y);

    const texture = RenderTexture.create({ width: c.width, height: c.height });
    game.renderer.render(c, texture);

    return eyesTextures[key] = texture;
}

function makeEyes(head: Head) {
    const texture = makeEyesTexture(head.eyes, false);
    const maskTexture = makeEyesTexture(head.eyes, true);
    const { eyelidsGraphics, eyelidsLine, eyelidsControl } =
        iguanaEyelids(darken(head.color, 0.1), texture.width, texture.height, Math.floor(texture.height / 2));

    const mask = Sprite.from(maskTexture);
    const eyes = container(mask, Sprite.from(texture), eyelidsGraphics, eyelidsLine);
    eyes.mask = mask;

    eyes.pivot.add(-7, 12).add(head.eyes.placement, -1);

    return merge(eyes, eyelidsControl) as IguanaEyes;
}

function flipH(sprite: Sprite, flip: boolean = true) {
    return flipXY(sprite, 'x', flip);
}

function flipV(sprite: Sprite, flip: boolean = true) {
    return flipXY(sprite, 'y', flip);
}

function flipXY(sprite: Sprite, key: 'x' | 'y', flip: boolean = true) {
    if (flip) {
        const ogBounds = sprite.getBounds(false).vcpy();
        sprite.scale[key] *= -1;
        const bounds = sprite.getBounds(false).vcpy();
        sprite.pivot.add(bounds.add(ogBounds, -1), -1);
    }

    return sprite;
}
