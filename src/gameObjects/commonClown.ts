import {Container, Graphics, Sprite} from "pixi.js";
import {ClownSpikeBall, CommonClown} from "../textures";
import {scene} from "../igua/scene";
import {merge} from "../utils/object/merge";
import { lerp } from "../utils/math/number";
import {getTouchedSolidNormal, isOnGround} from "./walls";
import {player} from "./player";
import {isPlayerMoving} from "../igua/logic/isPlayerInteractingWith";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {ClownHurt, CommonClownLand} from "../sounds";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {bouncePlayer} from "../igua/bouncePlayer";
import {playerIsWeakToPortalFluid, teleportToTheRoomOfDoors} from "./portalFluid";
import {track} from "../igua/track";
import {clownDrop, clownHealth, dieClown} from "./utils/clownUtils";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {hat} from "./hat";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {WeakToSpells} from "../pixins/weakToSpells";

const clownTxs = subimageTextures(CommonClown, 2);
export const resolveCommonClown = resolveGameObject("CommonClown", (e) => commonClown().at(e));

export const commonClown = track(commonClownImpl);

function commonClownImpl({ hspeed = 0.75, limitedRangeEnabled = true, dangerous = true, portal = false, bounceAgainstWall = false } = {}) {
    const container = merge(new Container(), { hspeed, vspeed: 0, portal, dangerous, bounceAgainstWall, limitedRangeEnabled });
    container.ext.isHatParent = true;
    const mask = new Graphics().beginFill(0x000000).drawRect(0, 0, 18, 15).hide().at(-9, -16);
    const hatSprite = hat(Sprite.from(clownTxs[0]), 0.8);
    const sprite = Sprite.from(clownTxs[1]);
    const spikeBall = Sprite.from(ClownSpikeBall);
    spikeBall.anchor.set(6/14, 3/14);
    const graphics = new Graphics();
    sprite.anchor.set(.5, 1).copyTo(hatSprite.anchor);

    let unit = 0;
    let distanceTraveled = 0;
    let invulnerable = -1;
    let knockbackSpeed = 0;

    const health = clownHealth(50);
    const drop = clownDrop(0.67, 0.4, 0.1);

    container.withPixin(WeakToSpells({ spellsHurtbox: [ mask ], clownHealth: health }));

    let appliedOpaqueTint = false;
    container.withStep(() => {
        if (container.portal && !appliedOpaqueTint) {
            container.opaqueTint = 0x20A090;
            appliedOpaqueTint = true;
        }
        else if (!container.portal && appliedOpaqueTint) {
            container.filters = [];
            appliedOpaqueTint = false;
        }

        const xPrevious = container.x;
        unit = lerp(unit, container.vspeed < 0 ? 1 : 0, 0.0875);
        container.vspeed += health.nearDeath ? 0.5 : 0.25;

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

        if (container.bounceAgainstWall) {
            const normal = getTouchedSolidNormal(getWorldCenter(mask), 8);
            if (normal && normal.y === 0) {
                container.hspeed = Math.abs(container.hspeed) * normal.x;
            }
        }

        container.x += knockbackSpeed;
        knockbackSpeed = lerp(knockbackSpeed, 0, 0.1);
        if (container.vspeed > -5 && container.vspeed < 5)
            container.x += container.hspeed * (health.nearDeath ? 2 : 1);

        distanceTraveled += container.x - xPrevious;

        if (container.hspeed !== 0)
            container.scale.x = Math.sign(container.hspeed);
        spikeBall.scale.x = Math.sign(container.scale.x);

        const spring = 10 * scale + 4;
        const radius = Math.max(8, container.vspeed);
        const pushable = { x: container.x, y: container.y + spring - radius };

        if (container.vspeed > 0 && isOnGround(pushable, radius)) {
            if (isOnScreen(container) && !scene.ext.simulated)
                CommonClownLand.play();
            container.vspeed = health.nearDeath ? -9 : -6;
            if (!container.limitedRangeEnabled)
                return;
            if ((distanceTraveled > 128 && container.hspeed > 0) || (distanceTraveled <= 0 && container.hspeed < 0))
                container.hspeed *= -1;
        }
        container.y += container.vspeed;
        if (container.vspeed < 0 && player.collides(mask))
            player.y += container.vspeed;

        if (player.collides(mask) && isPlayerMoving() && container.dangerous) {
            if (invulnerable <= 0 || (invulnerable <= 15 && player.vspeed > 1)) {
                player.engine.knockback.x = (player.x - container.x) / 8;
                if (Math.abs(player.engine.knockback.x) < 3) {
                    bouncePlayer(container, 2);
                    container.vspeed = -player.vspeed;
                }
                knockbackSpeed = -player.engine.knockback.x;
                if (health.damage())
                    return dieClown(container, drop(container.vsPlayerHitCount));
                ClownHurt.play();
                invulnerable = 30;
            }
        }

        if (invulnerable-- > 0) {
            container.visible = !container.visible;
            return;
        }

        container.visible = true;
        if (container.dangerous && player.collides(spikeBall) && container.damagePlayer(20))
            player.engine.knockback.x = container.hspeed * 4;

        if (container.portal && playerIsWeakToPortalFluid() && (player.collides(spikeBall) || player.collides(mask))) {
            teleportToTheRoomOfDoors();
        }
    })
    container.addChild(graphics, spikeBall, hatSprite, sprite, mask);
    return container;
}
