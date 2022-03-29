import {filters, Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {BiguaCrests, BiguaEye, BiguaFace, BiguaFeet, BiguaPupils, BiguaTorso} from "../textures";
import {mapRgb} from "../utils/pixi/mapRgb";
import {merge} from "../utils/merge";
import {JungleOracleLooks} from "./npcLooks";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {sleep} from "pissant";
import {rng} from "../utils/rng";
import {pcolord} from "../utils/toHexColorString";

const crests = subimageTextures(BiguaCrests, { width: 48 });
const pupils = subimageTextures(BiguaPupils, { width: 20 });

export function bigua(looks = JungleOracleLooks) {
    const c = merge(container(), { isDucking: false, duckUnit: 0, blinkControl: true, isClosingEyes: false, baseClosedEyesUnit: 0 });

    let closedEyesUnit = 0;

    const fs = looks.feet.color;
    const fc = looks.feet.clawColor;
    const [fb, ff] = fourFeet(fs, fc);

    const b = body().at(6, -24);

    c.addChild(fb, b, ff);

    function body() {
        const body = container();
        const t = Sprite.from(BiguaTorso).tinted(looks.body.color);
        const h = head().at(24, -28);
        c.ext.head = h;
        body.addChild(t, h);
        h.ext.down = t.getBounds().y - (h.getBounds().y + h.getBounds().height);
        return body;
    }

    function head() {
        const f = Sprite.from(BiguaFace);
        f.filters = [mapRgb(new filters.ColorMatrixFilter(), looks.head.color, looks.head.mouth.color)];

        const crest = Sprite.from(crests[looks.head.crest.shape] ?? crests[0]).centerAnchor().tinted(looks.head.crest.color).at(32, -20);

        const e1 = eye().at(24, 5);
        const e2 = eye().at([e1.width * 2 + looks.head.eyes.gap].add(e1));
        e2.scale.x = -1;

        return container(crest, f, e1, e2);
    }

    function eye() {
        const e = Sprite.from(BiguaEye);
        const p = Sprite.from(pupils[looks.head.eyes.pupils.shape] ?? pupils[0]);
        p.tint = looks.head.eyes.pupils.color;
        const lidColor = pcolord(looks.head.color).saturate(0.1).darken(0.1).toPixi();
        const l = new Graphics()
            .withStep(() => {
                l.clear()
                .beginFill(lidColor)
                .drawRect(0, 0, e.width, Math.round(e.height * closedEyesUnit));
            })
        const m = Sprite.from(BiguaEye);
        const c = container(e, p, l, m);
        c.mask = m;
        return c;
    }

    c.withStep(() => {
       c.duckUnit = Math.max(0, Math.min(1, c.duckUnit + (c.isDucking ? 0.05 : -0.05)));
       closedEyesUnit = Math.max(c.baseClosedEyesUnit, Math.min(1, closedEyesUnit + (c.isClosingEyes ? 0.125 : -0.1)));
       c.ext.head.pivot.y = Math.round(c.duckUnit * (c.ext.head.ext.down + 4));
       b.pivot.y = Math.round(c.duckUnit * -10);
    })
        .withAsync(async () => {
            await sleep(500 + rng.int(3500));
            while (true) {
                if (c.blinkControl)
                    c.isClosingEyes = true;
                await sleep(180);
                if (c.blinkControl)
                    c.isClosingEyes = false;
                await sleep(500 + rng.int(5000));
            }
        });

    c.pivot.set(32, 20);

    return c;
}

function fourFeet(skin = 0, claws = 0) {
    const fb = feet(skin, claws).at(13, -1);
    const dark = new filters.ColorMatrixFilter();
    dark.saturate(1.2);
    dark.brightness(0.7, false);
    fb.filters.push(dark);
    const ff = feet(skin, claws)
    return [fb, ff];
}

function feet(skin = 0, claws = 0) {
    const s = Sprite.from(BiguaFeet);
    s.filters = [mapRgb(new filters.ColorMatrixFilter(), skin, claws)];
    return s;
}
