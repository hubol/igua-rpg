import {SceneLocal} from "../igua/sceneLocal";
import {DisplayObject, Matrix, RenderTexture, Sprite} from "pixi.js";
import {player} from "./player";
import {game} from "../igua/game";
import {scene} from "../igua/scene";
import {container} from "../utils/pixi/container";
import {CapitalLightRay} from "../textures";
import {alphaObscureFilter} from "../utils/pixi/alphaMaskFilter";
import {vnew} from "../utils/math/vector";

const matrix = new Matrix();
const playerTexture = RenderTexture.create({ width: 256, height: 256 });
const shadowTexture = RenderTexture.create({ width: 256, height: 256 });

export function lightRayCrude() {
    const s = Sprite.from(CapitalLightRay);

    const c = container(s).filter(makeShadowCastFilter());
    c.alpha = 0.3;
    return c;
}

export function makeShadowCastFilter() {
    RenderPlayerAndShadow.value;
    const shadow = Sprite.from(shadowTexture);
    return alphaObscureFilter(shadow);
}

export const ShadowCastDirection = new SceneLocal(() => vnew().at(1, 1), 'ShadowCastDirection');
export const ShadowCastAdditionalCasters = new SceneLocal(() => [] as DisplayObject[], 'ShadowCastAdditionalCasters');

const RenderPlayerAndShadow = new SceneLocal(renderPlayerAndShadow, 'RenderPlayerAndShadow');

function renderPlayerAndShadow() {
    const shadow = container();
    for (let i = 1; i < 256; i++)
        shadow.addChild(Sprite.from(playerTexture).at(ShadowCastDirection.value.x * i, ShadowCastDirection.value.y * i));

    return container()
        .withTicker(scene.endTicker)
        .withStep(() => {
            const p1 = scene.camera.vcpy();
            const p2 = player.vcpy();
            player.vround();
            scene.camera.vround();

            matrix.tx = -scene.camera.x;
            matrix.ty = -scene.camera.y;

            game.renderer.render(player, playerTexture, true, matrix);
            for (const d of ShadowCastAdditionalCasters.value)
                game.renderer.render(d, playerTexture, false, matrix);

            scene.camera.at(p1);
            player.at(p2);

            game.renderer.render(shadow, shadowTexture, true);
        })
        .show(scene.playerStage);
}
