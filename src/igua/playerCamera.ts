import {game} from "./game";
import {distance, lerp} from "../utils/math/vector";
import {scene} from "./scene";
import {player} from "../gameObjects/player";

const target = { x: 0, y: 0 };

export function stepPlayerCamera()
{
    if (!scene.camera.followPlayer || !player)
        return;

    computePlayerCameraTarget();

    lerp(scene.camera, target, Math.min(player.engine.walkSpeed * 0.132, 0.9));
    if (distance(scene.camera, target) < 1)
    {
        scene.camera.x = Math.round(target.x);
        scene.camera.y = Math.round(target.y);
    }
}

export function computePlayerCameraTarget() {
    const padding = 112;

    const x0 = scene.camera.x + padding;
    const y0 = scene.camera.y + padding;
    const x1 = scene.camera.x + game.width - padding;
    const y1 = scene.camera.y + game.height - padding;

    if (player.x - x0 < 0)
        target.x = scene.camera.x + player.x - x0;
    else if (player.x - x1 > 0)
        target.x = scene.camera.x + player.x - x1;

    if (player.y - y0 < 0)
        target.y = scene.camera.y + player.y - y0;
    else if (player.y - y1 > 0)
        target.y = scene.camera.y + player.y - y1;

    clampCameraTarget();
    return target;
}

export function centerPlayerCamera()
{
    if (!player)
        return;

    target.x = player.x - game.width / 2;
    target.y = player.y - game.height / 2;
    clampCameraTarget();

    scene.camera.x = target.x;
    scene.camera.y = target.y;
}

function clampCameraTarget()
{
    target.x = Math.min(scene.width - game.width, Math.max(target.x, 0));
    target.y = Math.min(scene.height - game.height, Math.max(target.y, 0));
}
