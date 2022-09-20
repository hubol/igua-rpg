import {game} from "./game";
import {scene} from "./scene";
import {player} from "../gameObjects/player";
import {Vector, vnew} from "../utils/math/vector";
import {SceneLocal} from "./sceneLocal";

const target = { x: 0, y: 0 };

export function stepPlayerCamera()
{
    if (!scene.camera.followPlayer || !player)
        return;

    if (scene.camera.mode === 'ahead')
        computeAheadPlayerCameraTarget();
    else
        computePlayerCameraTarget();

    scene.camera.at(target);
}

export function computePlayerCameraTarget(subject: Vector = player) {
    const padding = 112;

    const x0 = scene.camera.x + padding;
    const y0 = scene.camera.y + padding;
    const x1 = scene.camera.x + game.width - padding;
    const y1 = scene.camera.y + game.height - padding;

    if (subject.x - x0 < 0)
        target.x = scene.camera.x + subject.x - x0;
    else if (subject.x - x1 > 0)
        target.x = scene.camera.x + subject.x - x1;

    if (subject.y - y0 < 0)
        target.y = scene.camera.y + subject.y - y0;
    else if (subject.y - y1 > 0)
        target.y = scene.camera.y + subject.y - y1;

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

const AheadState = new SceneLocal(() => ({ cx: 0 }))

const v = vnew();
const MaxOff = 64;
function computeAheadPlayerCameraTarget() {
    if (!scene.ticker.doNextUpdate)
        return;

    AheadState.value.cx += player.hspeed;
    if (Math.abs(AheadState.value.cx) > MaxOff)
        AheadState.value.cx = MaxOff * Math.sign(AheadState.value.cx);
    computePlayerCameraTarget(v.at(player).add(AheadState.value.cx, 0));
}