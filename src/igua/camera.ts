import {scene} from "./scene";
import {Container} from "pixi.js";
import {computePlayerCameraTarget} from "./playerCamera";
import {moveTowards, vnew} from "../utils/math/vector";
import {wait} from "../cutscene/wait";
import {player} from "../gameObjects/player";

export function camera(followPlayer: boolean)
{
    return {
        get x() {
            return -scene.cameraStage.x;
        },
        get y() {
            return -scene.cameraStage.y;
        },
        set x(value) {
            scene.cameraStage.x = -value;
            scene.parallax1Stage.x = -value * 0.9;
        },
        set y(value) {
            scene.cameraStage.y = -value;
            scene.parallax1Stage.y = -value * 0.9;
        },
        width: 256,
        height: 256,
        followPlayer
    };
}

export function moveCameraToPlayerTarget(speed: number) {
    const pspeed = vnew();
    const c = new Container().withStep(() => {
        const t = computePlayerCameraTarget();

        pspeed.at(player.hspeed, player.vspeed);
        moveTowards(scene.camera, t, speed + pspeed.vlength);
        if (scene.camera.x === t.x && scene.camera.y === t.y)
            c.destroy();
    }).show();

    return wait(() => c.destroyed);
}