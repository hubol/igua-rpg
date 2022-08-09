import {scene} from "../igua/scene";
import {UnrealDrawingArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {trace} from "../gameObjects/trace";

export function UnrealDrawing() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(UnrealDrawingArgs);

    trace(level.Path).show();
}