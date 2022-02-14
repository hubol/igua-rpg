import {scene} from "./scene";

export function camera(followPlayer: boolean)
{
    let _x = 0;
    let _y = 0;
    return {
        get x() {
            return _x;
        },
        get y() {
            return _y;
        },
        set x(value) {
            _x = value;
            scene.cameraStage.x = -Math.round(value);
            scene.parallax1Stage.x = Math.round(-value * 0.9);
        },
        set y(value) {
            _y = value;
            scene.cameraStage.y = -Math.round(value);
            scene.parallax1Stage.y = Math.round(-value * 0.9);
        },
        width: 256,
        height: 256,
        followPlayer
    };
}