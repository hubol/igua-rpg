import {computePlayerCameraTarget} from "../igua/playerCamera";
import {scene} from "../igua/scene";
import {container} from "../utils/pixi/container";
import {approachLinear} from "../utils/math/number";

export function cameraLock(
    { minX, maxX, minY, maxY }: { minX?: number, maxX?: number, minY?: number, maxY?: number },
    unlock: () => boolean) {

    let lock = minX ?? maxX ?? minY ?? maxY!;
    const release = (minX || minY) ? 0 : (maxX ? scene.width : scene.height);
    const xy = (minX || maxX) ? 'x' : 'y';
    const fn = (minX || minY) ? Math.max : ((a, b) => Math.min(a, b + 256) - 256) as typeof Math.min;

    scene.camera.followPlayer = false;

    const state = { locked: true };

    container().withStep(() => {
        const t = computePlayerCameraTarget();
        scene.camera.at(t);

        scene.camera[xy] = fn(lock, scene.camera[xy]);

        if (!state.locked)
            lock = approachLinear(lock, release, 3);

        if (unlock())
            state.locked = false;
    })
    .show();

    return state;
}