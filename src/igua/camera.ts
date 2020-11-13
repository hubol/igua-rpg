import {scene} from "./scene";

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
            scene.parallax1Stage.x = Math.round(-value * 0.9);
        },
        set y(value) {
            scene.cameraStage.y = -value;
            scene.parallax1Stage.y = Math.round(-value * 0.9);
        },
        width: 256,
        height: 256,
        followPlayer
    };
}