import {SceneLocal} from "../igua/sceneLocal";
import {Graphics, Matrix, RenderTexture, Sprite} from "pixi.js";
import {player} from "./player";
import {game} from "../igua/game";
import { scene } from "../igua/scene";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {container} from "../utils/pixi/container";
import {drawPool} from "./pool";
import {now} from "../utils/now";
import {progress} from "../igua/data/progress";
import {approachLinear, lerp} from "../utils/math/number";
import {damageStatusConsts} from "../igua/gameplay/damageStatusConsts";

export const PlayerBurningEffect = new SceneLocal(playerBurningEffect, 'PlayerBurningEffect');

const matrix = new Matrix();
const texture = RenderTexture.create({ width: 256, height: 256 });

const f = (x: number) => Math.sin(now.s * 2 + x) * 2;

function playerBurningEffect() {
    const burnf = () => progress.status.burn / damageStatusConsts.burnStatusResistance;

    const targety = () => {
        if (burnf() <= 0)
            return 20;
        if (burnf() >= 0.9)
            return -24;
        return Math.round(lerp(10, -15, burnf()));
    }

    const targetalpha = () => Math.max(0.67, burnf() * 2);

    const g = new Graphics()
        .withStep(() => {
            g.clear().beginFill(0xDD4335);
            drawPool(g, 64, 48, f);
            g.alpha = approachLinear(g.alpha, targetalpha(), 0.1);
            g.y = approachLinear(g.y, targety(), 2);
        })
    g.y = targety();
    g.alpha = targetalpha();
    playerMaskedOverlay().addChild(g);

    return 1;
}

function playerMaskedOverlay() {
    const sprite = Sprite.from(texture);
    const inner = container();

    const c = container(inner)
        .withTicker(scene.endTicker)
        .withStep(() => {
            const p1 = scene.camera.vcpy();
            const p2 = player.vcpy();
            player.vround();
            scene.camera.vround();

            matrix.tx = -scene.camera.x;
            matrix.ty = -scene.camera.y;

            game.renderer.render(player, texture, true, matrix);
            scene.camera.at(p1);
            player.at(p2);

            c.pivot.at(scene.camera).scale(-1);
            const b = player.vcpy().add(scene.camera, -1);

            inner.at(b.x - 30, b.y);

            c.index = player.index + 1;
        })
        .filter(alphaMaskFilter(sprite))
        .show(scene.playerStage);

    return inner;
}
