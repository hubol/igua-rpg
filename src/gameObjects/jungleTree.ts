import {makePseudo, Pseudo} from "../utils/math/makePseudo";
import {JungleTreeBranch, JungleTreeFoliage, JungleTreeTrunk} from "../textures";
import {Container, DisplayObject, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {trimFrame} from "../utils/pixi/trimFrame";
import {Vector} from "../utils/math/vector";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {doNowOrOnAdded} from "../utils/extensions/pixiExtensions";
import {scene} from "../igua/scene";
import {filters} from "pixi.js";

const branchTextures = subimageTextures(JungleTreeBranch, 3).map(trimFrame);
const foliageTextures = subimageTextures(JungleTreeFoliage, 4).map(trimFrame);

export const resolveJungleTree = resolveGameObject('JungleTree', e => jungleTree(e, e.height));

export function jungleTree(vec: Vector, height: number) {
    const xx = vec.x + (scene.ext.jungleTree?.x ?? 0);
    const yy = vec.y + (scene.ext.jungleTree?.y ?? 0);
    const p = makePseudo(height + Math.sin(xx * 1.33) * 4.3 + xx * 5.17 + yy * 8.43);

    const trunk = Sprite.from(JungleTreeTrunk);
    trunk.height = height;
    if (p.bool())
        trunk.scale.x *= -1;
    trunk.anchor.set(0.5, 1);
    const c = container(trunk);
    const t = top(height, p);
    add(c, p, t);
    t.y -= trunk.height;
    const count = Math.max(p.bool() ? 1 : 0, Math.round(height / 55 - 1 + p.int() % 2));
    let y = 8 + p.int() % 20;
    if (height > 100)
        y += (y * 1.5 + p.unit()) + 20;
    let amount = 0;
    while (y < height * 0.8 && amount < count) {
        const b = branch(p).at(0, -y);
        if (p.bool())
            b.scale.x *= -1;
        add(c, p, b);
        amount++;
        y += 30 + p.int() % 20;
    }
    doNowOrOnAdded(c, () => {
        if (c.parent === scene.parallax1Stage) {
                const filter = new filters.ColorMatrixFilter();
                filter.brightness(1.2, false);
                filter.saturate(-0.2, true);
                c.filters = [ filter ];
            }
    })

    return c.at(vec);
}

function add(c: Container, p: Pseudo, child: DisplayObject) {
    c.x = Math.round(c.x);
    c.y = Math.round(c.y);
    child.x = Math.round(child.x);
    child.y = Math.round(child.y);
    if (p.bool())
        c.addChildAt(child, 0);
    else
        c.addChild(child);
    return child;
}

const [_, ...branchFoliageTextures] = foliageTextures;

function branch(p: Pseudo) {
    const c = container();
    const branch = p.choose(...branchTextures);
    const b = Sprite.from(branch);
    b.anchor.set(0, 1 / 24);
    const f = Sprite.from(p.choose(...branchFoliageTextures)).centerAnchor();
    if (p.bool())
        f.scale.x = -1;
    f.x += b.width * 0.1 + Math.round(f.width * (0.45 + p.unit() * 0.1));
    const yy = f.height / 10;
    f.y += Math.round(-yy + p.unit() * yy * 2);
    c.addChild(b);
    add(c, p, f);
    return c;
}

function top(height: number, p: Pseudo) {
    const index = height > 100 ? 0 : (p.bool() ? 1 : 2);
    const f = Sprite.from(foliageTextures[index]).centerAnchor();
    if (p.bool())
        f.scale.x *= -1;
    const xx = f.width / 10;
    f.x += Math.round(-xx + p.unit() * xx * 2);
    const yy = f.height / 8;
    f.y += Math.round(-yy + p.unit() * yy * 2) - f.height * 0.1;
    return f;
}