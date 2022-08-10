import {scene} from "../igua/scene";
import {UnrealDrawingArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {trace} from "../gameObjects/trace";
import {jukebox} from "../igua/jukebox";
import {UnrealDrawingMusic} from "../musics";

export function UnrealDrawing() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x40A020;
    const level = applyOgmoLevel(UnrealDrawingArgs);

    jukebox.play(UnrealDrawingMusic);

    trace(level.Path).show();
}