import {bigua} from "./bigua";
import {rectangleDistance} from "../utils/math/rectangleDistance";
import {player} from "./player";
import {show} from "../cutscene/dialog";
import {progress} from "../igua/data/progress";
import {scene} from "../igua/scene";
import {lerp} from "../cutscene/lerp";
import {KeyYellow, KeyYellowShrunken} from "../textures";
import {Graphics, Sprite} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";
import {ClownExplode} from "../sounds";
import {confetti} from "./confetti";
import {rng} from "../utils/rng";
import {jukebox} from "../igua/jukebox";
import {cutscene} from "../cutscene/cutscene";

export function biguaInJungle() {
    const { jungle } = progress.flags;
    const b = bigua()
        .withCutscene(async () => {
            if (player.x > b.x || player.x < b.x -58)
                return;

            scene.camera.followPlayer = false;
            const moveCamera = lerp(scene.camera, 'y').to(b.y - 180).over(750);

            if (!jungle.bigua.met) {
                await show('Hello. I am Bigua. I came from the sky fortress when the invaders arrived.');
                await show('I have a special ability that allows me to increase the size of certain items.');
            }

            if (jungle.bigua.repairedKey) {
                await show(`I'm glad I got to help your mission.`);
                await show('If you find something else you need bigger, bring it to me.');
            }
            else if (jungle.key.shrunkenKey) {
                await show('Gave shrunken temple key.');
                jungle.bigua.repairedKey = true;
                const r = repairingKey().at(v());
                b.isDucking = true;
                b.isClosingEyes = true;
                b.blinkControl = false;
                jukebox.currentSong?.fade(1, 0, 500);
                await wait(() => r.destroyed);
                await sleep(250);
                b.isClosingEyes = false;
                await sleep(250);
                b.blinkControl = true;
                await show('Presto! Your key is bigger now.');
                b.isDucking = false;
                await wait(() => b.duckUnit <= 0);
                jukebox.currentSong?.fade(0, 1, 500);
                await sleep(500);
                await show(`I'm glad I got to help your mission.`);
            }
            else
                await show('If you find something you need bigger, bring it to me.');
            jungle.bigua.met = true;

            await moveCamera;
            scene.camera.followPlayer = true;
        })
        .withStep(() => {
            if (cutscene.isPlaying)
                return;
            if (b.isDucking)
                b.isDucking = rectangleDistance(b, player) > 32;
            else
                b.isDucking = rectangleDistance(b, player) > 48;
        });

    const v = () => [-96, -64].add(b);

    if (jungle.bigua.repairedKey) {
        const k = repairedKey().withStep(() => k.at(v()));
    }

    return b;
}

function repairingKey() {
    const g = new Graphics().beginFill(0x9957AF).drawCircle(0, 0, 16).show();
    g.alpha = 0;
    let vibrate = false;
    const s1 = Sprite.from(KeyYellowShrunken).centerAnchor().withAsync(async () => {
        await Promise.all([
            lerp(s1, 'alpha').to(1).over(250),
            lerp(g, 'alpha').to(1).over(250),
        ]);
        await sleep(250);
        vibrate = true;
        await sleep(750 - 125);
        await lerp(s1.scale, 'x').to(1.4).over(125);
        ClownExplode.play();
        confetti().at(s1).show();
        repairedKey().at(s1);
        s1.destroy();
        g.destroy();
    })
        .withStep(() => {
            s1.scale.y = s1.scale.x;
            g.at(s1);
            if (vibrate)
                g.pivot.set(rng.int(2) - 1, rng.int(2) - 1);
        })
    s1.alpha = 0;

    return s1.show();
}

function repairedKey() {
    return Sprite.from(KeyYellow).asCollectible(progress.flags.jungle.key, 'fromBiguaRepair').centerAnchor().show();
}