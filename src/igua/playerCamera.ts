import {game} from "./game";
import {distance, lerp} from "../utils/math/vector";
import {level} from "./level/level";
import {scene} from "./scene";

let target = { x: 0, y: 0 };

export function stepPlayerCamera()
{
    if (!scene.camera.followPlayer)
        return;

    const padding = 112;

    const x0 = scene.camera.x + padding;
    const y0 = scene.camera.y + padding;
    const x1 = scene.camera.x + game.width - padding;
    const y1 = scene.camera.y + game.height - padding;

    if (game.player.x - x0 < 0)
        target.x = scene.camera.x + game.player.x - x0;
    else if (game.player.x - x1 > 0)
        target.x = scene.camera.x + game.player.x - x1;

    if (game.player.y - y0 < 0)
        target.y = scene.camera.y + game.player.y - y0;
    else if (game.player.y - y1 > 0)
        target.y = scene.camera.y + game.player.y - y1;

    clampCameraTarget();
    lerp(scene.camera, target, 0.33);
    if (distance(scene.camera, target) < 1)
    {
        scene.camera.x = Math.round(target.x);
        scene.camera.y = Math.round(target.y);
    }
}

export function centerPlayerCamera()
{
    target.x = game.player.x - game.width / 2;
    target.y = game.player.y - game.height / 2;
    clampCameraTarget();

    scene.camera.x = target.x;
    scene.camera.y = target.y;
}

function clampCameraTarget()
{
    target.x = Math.min(level.width - game.width, Math.max(target.x, 0));
    target.y = Math.min(level.height - game.height, Math.max(target.y, 0));
}