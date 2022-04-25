import {game} from "./game";
import {scene} from "./scene";
import {player} from "../gameObjects/player";

const target = { x: 0, y: 0 };

export function stepPlayerCamera()
{
    if (!scene.camera.followPlayer || !player)
        return;

    computePlayerCameraTarget();
    scene.camera.at(target);
}

export function computePlayerCameraTarget() {
    const padding = 112;

    const x0 = scene.camera.x + padding;
    const y0 = scene.camera.y + padding;
    const x1 = scene.camera.x + game.width - padding;
    const y1 = scene.camera.y + game.height - padding;
    
    const px = Math.round(player.x);
    const py = Math.round(player.y);

    if (px - x0 < 0)
        target.x = scene.camera.x + Math.round(px) - x0;
    else if (px - x1 > 0)
        target.x = scene.camera.x + Math.round(px) - x1;

    if (py - y0 < 0)
        target.y = scene.camera.y + Math.round(py) - y0;
    else if (py - y1 > 0)
        target.y = scene.camera.y + Math.round(py) - y1;

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
    target.vround();
}
