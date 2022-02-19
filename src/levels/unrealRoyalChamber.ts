import {scene} from "../igua/scene";
import {UnrealRoyalChamberArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {player} from "../gameObjects/player";
import {jukebox} from "../igua/jukebox";
import {RoyalChamberMusic} from "../musics";

export function UnrealRoyalChamber() {
    scene.backgroundColor = 0x7B598E;
    scene.terrainColor = 0xD3A832;
    const level = applyOgmoLevel(UnrealRoyalChamberArgs);
    jukebox.play(RoyalChamberMusic);

    const secretWorshippers = [level.SecretWorshipper1, level.SecretWorshipper2, level.SecretWorshipper3];
    secretWorshippers.forEach(x => x.opaqueTint = 0x4A2D5E);
    const worshippers = [...secretWorshippers, level.Worshipper];
    worshippers.forEach(x => x.withStep(() => {
        x.isDucking = player.x >= x.x;
    }));
}