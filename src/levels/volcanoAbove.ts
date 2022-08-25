import {scene} from "../igua/scene";
import {VolcanoAboveArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {AboveVolcano, VolcanoSomething} from "../musics";
import {heatWaves} from "../gameObjects/heatWaves";
import {prankster} from "../gameObjects/prankster";
import {cutscene} from "../cutscene/cutscene";
import {player} from "../gameObjects/player";
import {distance} from "../utils/math/vector";
import {Container} from "pixi.js";
import {wait} from "../cutscene/wait";

export function VolcanoAbove() {
    scene.backgroundColor = 0x98C0E0;
    scene.terrainColor = 0x5C0A18;
    const level = applyOgmoLevel(VolcanoAboveArgs);
    jukebox.play(AboveVolcano).warm(VolcanoSomething);
    heatWaves(scene.width + 256, 80, 1, 0x912235).at(-128, 330 - 30).show(scene.parallax1Stage);

    if (distance(player, level.Player) < 80) {
        level.ToTownGate.active = false;
        player.vspeed = -3;
        const walk = new Container().withStep(() => player.hspeed = 2.3).show();
        cutscene.play(async () => {
            await wait(() => player.x >= level.PlayerStopEntry.x);
            walk.destroy();
            level.ToTownGate.active = true;
        })
    }

    prankster().at([0, -3].add(level.Prankster));
}