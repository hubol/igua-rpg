import {game} from "./game";
import {distance, lerp} from "../utils/math/vector";

let target = { x: 0, y: 0 };

export function stepPlayerCamera()
{
    if (!game.camera.followPlayer)
        return;

    const padding = 112;

    const x0 = game.camera.x + padding;
    const y0 = game.camera.y + padding;
    const x1 = game.camera.x + game.width - padding;
    const y1 = game.camera.y + game.height - padding;

    if (game.player.x - x0 < 0)
        target.x = game.camera.x + game.player.x - x0;
    else if (game.player.x - x1 > 0)
        target.x = game.camera.x + game.player.x - x1;

    if (game.player.y - y0 < 0)
        target.y = game.camera.y + game.player.y - y0;
    else if (game.player.y - y1 > 0)
        target.y = game.camera.y + game.player.y - y1;

    clampCameraTarget();
    lerp(game.camera, target, 0.33);
    if (distance(game.camera, target) < 1)
    {
        game.camera.x = Math.round(target.x);
        game.camera.y = Math.round(target.y);
    }
}

export function centerPlayerCamera()
{
    target.x = game.player.x - game.width / 2;
    target.y = game.player.y - game.height / 2;
    clampCameraTarget();

    game.camera.x = target.x;
    game.camera.y = target.y;
}

function clampCameraTarget()
{
    target.x = Math.min(game.level.width - game.width, Math.max(target.x, 0));
    target.y = Math.min(game.level.height - game.height, Math.max(target.y, 0));
}