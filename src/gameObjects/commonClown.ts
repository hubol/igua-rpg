import {Container, Graphics, Sprite} from "pixi.js";
import {ClownSpikeBall, CommonClown} from "../textures";
import {scene} from "../igua/scene";
import {merge} from "../utils/merge";
import { lerp } from "../utils/math/number";
import {isOnGround} from "./walls";
import {player} from "./player";
import {isPlayerMoving} from "../igua/logic/isPlayerInteractingWith";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {ClownHurt, CommonClownLand} from "../sounds";

export const resolveCommonClown = resolveGameObject("CommonClown", (e) => commonClown().at(e));

export function commonClown() {
    const container = merge(new Container(), { hspeed: 0.75, vspeed: 0 });
    const sprite = Sprite.from(CommonClown);
    const spikeBall = Sprite.from(ClownSpikeBall);
    spikeBall.anchor.set(6/14, 3/14);
    const graphics = new Graphics();
    sprite.anchor.set(.5, 1);

    let unit = 0;
    let distanceTraveled = 0;
    let invulnerable = -1;
    let knockbackSpeed = 0;

    sprite.withStep(() => {
        const xPrevious = container.x;
        unit = lerp(unit, container.vspeed < 0 ? 1 : 0, 0.0875);
        container.vspeed += 0.25;

        const radians = Math.PI * unit * 2;
        const scale = 0.5 + unit * 2;
        const invertedScale = Math.max(0.95 - unit, 0);
        graphics.clear();
        graphics.lineStyle(1, 0x888888);

        const knockbackOffset = container.scale.x * knockbackSpeed * 2;
        for (let i = 0; i < 1; i += 0.05)
            graphics.lineTo(Math.sin(i * Math.PI * 2.25 * 2 + radians) * 6 * Math.min(1, i * 2) * invertedScale - Math.pow(i, 2) * scale - i * knockbackOffset, i * 10 * scale);
        // @ts-ignore
        spikeBall.x = graphics.currentPath.points[graphics.currentPath.points.length - 2];
        // @ts-ignore
        spikeBall.y = graphics.currentPath.points[graphics.currentPath.points.length - 1];

        container.x += knockbackSpeed;
        knockbackSpeed = lerp(knockbackSpeed, 0, 0.1);
        if (container.vspeed > -5 && container.vspeed < 5)
            container.x += container.hspeed;

        distanceTraveled += container.x - xPrevious;

        if (container.hspeed !== 0)
            container.scale.x = Math.sign(container.hspeed);
        spikeBall.scale.x = Math.sign(container.scale.x);

        const spring = 10 * scale + 4;
        const radius = Math.max(8, container.vspeed);
        const pushable = { x: container.x, y: container.y + spring - radius };
        if (container.vspeed > 0 && isOnGround(pushable, radius)) {
            if (isOnScreen(container))
                CommonClownLand.play();
            container.vspeed = -6;
            if ((distanceTraveled > 128 && container.hspeed > 0) || (distanceTraveled <= 0 && container.hspeed < 0))
                container.hspeed *= -1;
        }
        container.y += container.vspeed;

        if (player.collides(sprite) && isPlayerMoving()) {
            container.vspeed = Math.min(-Math.random(), container.vspeed);
            if (Math.abs(knockbackSpeed) < 0.5)
                knockbackSpeed = Math.max(2, Math.abs(player.hspeed) * 2) * Math.sign(player.scale.x);
            if (invulnerable <= 0) {
                ClownHurt.play();
                player.engine.knockback.x = (player.x - container.x) / 8;
                // player.vspeed *= -1;
                // player.vspeed += Math.sign(player.y - (container.y + sprite.y)) * 1.7;
                invulnerable = 30;
            }
        }

        if (invulnerable-- > 0) {
            container.visible = !container.visible;
            return;
        }

        container.visible = true;
        if (player.collides(spikeBall) && player.damage(5)) {
            player.engine.knockback.x = container.hspeed * 4;
        }
    })
    container.addChild(graphics, spikeBall, sprite);
    return scene.gameObjectStage.addChild(container);
}
