import {Graphics, Matrix, RenderTexture, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {player} from "./player";
import {game} from "../igua/game";
import {SceneLocal} from "../igua/sceneLocal";
import {scene} from "../igua/scene";

const matrix = new Matrix();
const playerTexture = RenderTexture.create({ width: 256, height: 256 });

export function mirror(width, height, color = 0xC0D6E5, lineColor = 0xD5E6F2) {
    RenderPlayerWithOffset.value;

    function rect() {
        return new Graphics().beginFill(color).drawRect(0, 0, width, height);
    }
    const g = rect()
        .lineStyle(4, lineColor).moveTo(16, -3).lineTo(-3, 16)
        .lineStyle(2, lineColor).moveTo(32, -3).lineTo(-3, 32)
        .lineStyle(1, lineColor).moveTo(width + 3, height - 16).lineTo(width + 3 - 16, height);
    const s = Sprite.from(playerTexture)
        .withTicker(scene.endTicker)
        .withStep(() => s.at(-c.worldTransform.tx, -c.worldTransform.ty));
    s.alpha = 0.5;
    const c = container(g, s);
    c.mask = rect().show(c);

    return c;
}

const RenderPlayerWithOffset = new SceneLocal(renderPlayerWithOffset, 'RenderPlayerWithOffset');

function renderPlayerWithOffset() {
    return container()
        .withTicker(scene.endTicker)
        .withStep(() => {
            const p1 = scene.camera.vcpy();
            const p2 = player.vcpy();
            player.vround();
            scene.camera.vround();

            matrix.tx = -scene.camera.x + 4;
            matrix.ty = -scene.camera.y;

            game.renderer.render(player, playerTexture, true, matrix);
            scene.camera.at(p1);
            player.at(p2);
        })
        .show(scene.playerStage);
}
