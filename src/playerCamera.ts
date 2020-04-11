import {session} from "./session";
import {app} from "./app";
import {lerpVector} from "./utils/math";

let target = { x: 0, y: 0 };

export function stepPlayerCamera()
{
    if (!session.control.cameraFollowPlayer)
        return;

    const margin = 80;

    const x0 = app.camera.x + margin;
    const y0 = app.camera.y + margin;
    const x1 = app.camera.x + app.width - margin;
    const y1 = app.camera.y + app.height - margin;

    if (app.player.x - x0 < 0)
        target.x = app.camera.x + app.player.x - x0;
    else if (app.player.x - x1 > 0)
        target.x = app.camera.x + app.player.x - x1;

    if (app.player.y - y0 < 0)
        target.y = app.camera.y + app.player.y - y0;
    else if (app.player.y - y1 > 0)
        target.y = app.camera.y + app.player.y - y1;

    target.x = Math.min(session.level.width - app.width, Math.max(target.x, 0));
    target.y = Math.min(session.level.height - app.height, Math.max(target.y, 0));

    lerpVector(app.camera, target, 0.33);
}