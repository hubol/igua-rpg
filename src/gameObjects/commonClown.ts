import {Container, Graphics, Sprite} from "pixi.js";
import {CommonClown} from "../textures";
import {scene} from "../igua/scene";
import {merge} from "../utils/merge";
import { lerp } from "../utils/math/number";
import {isOnGround} from "./walls";
import {player} from "./player";
import {isPlayerMoving} from "../igua/logic/isPlayerInteractingWith";

export function commonClown() {
    const container = merge(new Container(), { hspeed: 0.75, vspeed: 0 });
    const sprite = Sprite.from(CommonClown);
    const graphics = new Graphics();
    sprite.anchor.set(.5, 1);

    let unit = 0;
    let distanceTraveled = 0;
    let invulnerable = -1;
    let attackedSpeed = 0;

    sprite.withStep(() => {
        const xPrevious = container.x;
        unit = lerp(unit, container.vspeed < 0 ? 1 : 0, 0.0875);
        container.vspeed += 0.25;

        const radians = Math.PI * unit * 2;
        const scale = 0.5 + unit * 2;
        const invertedScale = Math.max(0.95 - unit, 0);
        graphics.clear();
        graphics.lineStyle(1, 0x888888);
        for (let i = 0; i < 1; i += 0.05)
            graphics.lineTo(Math.sin(i * Math.PI * 2.25 * 2 + radians) * 6 * Math.min(1, i * 2) * invertedScale - Math.pow(i, 2) * scale, i * 10 * scale);
        container.x += attackedSpeed;
        attackedSpeed = lerp(attackedSpeed, 0, 0.1);
        if (container.vspeed > -5 && container.vspeed < 5)
            container.x += container.hspeed;

        distanceTraveled += container.x - xPrevious;

        if (container.hspeed !== 0)
            container.scale.x = Math.sign(container.hspeed);

        const spring = 10 * scale;
        const radius = Math.max(8, container.vspeed);
        const pushable = { x: container.x, y: container.y + spring - radius };
        if (container.vspeed > 0 && isOnGround(pushable, radius)) {
            container.vspeed = -6;
            if ((distanceTraveled > 128 && container.hspeed > 0) || (distanceTraveled <= 0 && container.hspeed < 0))
                container.hspeed *= -1;
        }
        container.y += container.vspeed;

        if (player.collides(sprite) && isPlayerMoving()) {
            container.vspeed = Math.min(0, container.vspeed);
            attackedSpeed = Math.max(4, Math.abs(player.hspeed) * 2) * Math.sign(player.scale.x);
            if (invulnerable <= 0)
                invulnerable = 30;
        }

        if (invulnerable-- > 0) {
            container.visible = !container.visible;
            return;
        }

        container.visible = true;
    })
    container.addChild(graphics, sprite);
    return scene.gameObjectStage.addChild(container);
}
