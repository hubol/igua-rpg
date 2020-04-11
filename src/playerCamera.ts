import {session} from "./session";
import {game} from "./game";
import {lerpVector} from "./utils/math";

let target = { x: 0, y: 0 };

export function stepPlayerCamera()
{
    if (!session.control.cameraFollowPlayer)
        return;

    const margin = 80;

    const x0 = game.camera.x + margin;
    const y0 = game.camera.y + margin;
    const x1 = game.camera.x + game.width - margin;
    const y1 = game.camera.y + game.height - margin;

    if (game.player.x - x0 < 0)
        target.x = game.camera.x + game.player.x - x0;
    else if (game.player.x - x1 > 0)
        target.x = game.camera.x + game.player.x - x1;

    if (game.player.y - y0 < 0)
        target.y = game.camera.y + game.player.y - y0;
    else if (game.player.y - y1 > 0)
        target.y = game.camera.y + game.player.y - y1;

    target.x = Math.min(game.level.width - game.width, Math.max(target.x, 0));
    target.y = Math.min(game.level.height - game.height, Math.max(target.y, 0));

    lerpVector(game.camera, target, 0.33);
}