import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {OversizedClownArenaArgs} from "../levelArgs";
import {scene} from "../igua/scene";
import {oversizedClown} from "../gameObjects/oversizedClown";
import {wait} from "../cutscene/wait";
import {jukebox} from "../igua/jukebox";
import {Hemaboss1} from "../musics";

export function OversizedAngelArena() {
    const level = applyOgmoLevel(OversizedClownArenaArgs);
    jukebox.stop().warm(Hemaboss1);
    scene.backgroundColor = 0x2F4B5E;
    scene.terrainColor = 0x0F2061;

    const clown = oversizedClown().at(256, 128).show();
    scene.gameObjectStage.withAsync(async () => {
        await wait(() => clown.aggressive);
        jukebox.play(Hemaboss1);
        await wait(() => clown.destroyed);
        jukebox.currentSong?.fade(1, 0, 1000);
    })
}
