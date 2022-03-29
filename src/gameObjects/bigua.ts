import {filters, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {BiguaCrests, BiguaFace, BiguaFeet, BiguaTorso} from "../textures";
import {mapRgb} from "../utils/pixi/mapRgb";
import {merge} from "../utils/merge";
import {vnew} from "../utils/math/vector";
import {JungleOracleLooks} from "./npcLooks";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";

const crests = subimageTextures(BiguaCrests, { width: 48 });

export function bigua(looks = JungleOracleLooks) {
    const c = merge(container(), { isDucking: false, duckUnit: 0, pupilsOffset: vnew() });

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

        const crest = Sprite.from(crests[0]).centerAnchor().tinted(looks.head.crest.color).at(32, -20);

        const c = container(crest, f);

        return c;
    }

    c.withStep(() => {
       c.duckUnit = Math.max(0, Math.min(1, c.duckUnit + (c.isDucking ? 0.05 : -0.05)));
       c.ext.head.pivot.y = Math.round(c.duckUnit * (c.ext.head.ext.down + 4));
       b.pivot.y = Math.round(c.duckUnit * -10);
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
