import {burst12pxTextures} from "./smallPop";
import {Container, Point, Sprite} from "pixi.js";
import {normalize, Vector} from "../utils/math/vector";
import {ElectricBolt} from "../textures";
import {player} from "./player";
import {scene} from "../igua/scene";
import {now} from "../utils/now";
import {ChargeElectricBolt, FireElectricBolt} from "../sounds";

export function electricBolt(boltParent: Container, damage: number, speed = 1 / 30) {
    ChargeElectricBolt.play();
    let unit = 0;
    const s = Sprite.from(burst12pxTextures[3]).withStep(() => {
        const i = Math.max(0, Math.min(burst12pxTextures.length - 1, Math.round((1 - unit) * burst12pxTextures.length)));
        s.texture = burst12pxTextures[i];
        unit += speed;
        if (unit >= 1) {
            const bounds = s.getBounds();
            electricBoltHostile(bounds.add(6, 6).add(scene.camera), boltParent, damage);
            s.destroy();
        }
    });
    s.tint = 0xEAC25D;
    s.anchor.set(0.5);
    return s;
}

function electricBoltHostile(v: Vector, parent: Container, damage: number) {
    FireElectricBolt.play();
    const s = Sprite.from(ElectricBolt).at(v);
    s.hitbox = [0.3, 0.3, 0.7, 0.7];
    const speed = normalize(player.vcpy().add(v, -1)).scale(6);
    let life = 60 * 4;
    s.withStep(() => {
        s.angle = Math.floor(((now.s * 2) % 1) * 4) * 90;
        if (s.collides(player))
            player.damage(damage);
        if (life-- <= 0)
            return s.destroy();
        s.add(speed);
    });
    s.anchor.set(0.5);
    parent.addChild(s);
}
