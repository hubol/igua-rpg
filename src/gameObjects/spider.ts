import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {Cobweb, Spider} from "../textures";
import {container} from "../utils/pixi/container";
import {now} from "../utils/now";
import {rectangleDistance} from "../utils/math/rectangleDistance";
import {player} from "./player";
import {Vector, vnew} from "../utils/math/vector";
import {trimFrame} from "../utils/pixi/trimFrame";
import {SpiderDown, SpiderUp} from "../sounds";

const spiderTexture = trimFrame(Spider);

export function spider(target: DisplayObject, offset: Vector, { activate = 48, baseUnit = 0.5, downUnit = 0.01, upUnit = 0.03 } = {}) {
    const w = Sprite.from(Cobweb).at(offset.vcpy().add(target)).centerAnchor();
    let unit = 0.5;
    const g = new Graphics().withStep(() => {
        g.clear().lineStyle(1, 0xffffff).moveTo(w.x, w.y - 5).lineTo(s.x, s.y);
    }).at(1, 0);
    let behaviorIndex = 0;
    let targetGrabOffset = vnew();
    const s = Sprite.from(spiderTexture).at(w).withStep(() => {
        s.y = w.y + Math.round(unit * -offset.y);

        if (target.destroyed) {
            unit += Math.sin(now.s * Math.PI * 4) * 0.002;
            return;
        }

        if (behaviorIndex === 0) {
            unit = baseUnit + Math.sin(now.s * Math.PI * 4) * 0.025 * Math.abs(Math.sin(now.s * Math.PI * 1.3 - 4));
            if (rectangleDistance(player, target) < activate && Math.abs(player.hspeed) > 2) {
                SpiderDown.play();
                behaviorIndex = 1;
            }
        }
        if (behaviorIndex === 1 || target.destroyed) {
            unit += downUnit;
        }
        if (behaviorIndex < 2 && target.collides(s)) {
            SpiderUp.play();
            behaviorIndex = 2;
            targetGrabOffset.at(target).add(s, -1);
        }
        if (behaviorIndex === 2) {
            target.at(s).add(targetGrabOffset);
            unit -= upUnit;
            if (unit <= 0) {
                unit = 0;
                behaviorIndex = 3;
            }
        }
    });
    s.anchor.set(4/9, 2/4   );
    return container(w, g, s);
}