import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {VolcanoTownArgs} from "../levelArgs";
import {jukebox} from "../igua/jukebox";
import {
    AboveVolcano,
    AmbientLava,
    AnotherHouse,
    SomberVolcano,
    Temple,
    VolcanoCaveMusic,
    VolcanoSomething
} from "../musics";
import {cracks} from "../gameObjects/cracks";
import {heatWaves} from "../gameObjects/heatWaves";
import {mirror} from "../gameObjects/mirror";
import {decalsOf} from "../gameObjects/decal";
import {CrackSmall, GroundSpeckles} from "../textures";
import {show, showAll} from "../cutscene/dialog";
import {progress} from "../igua/data/progress";
import {DestroyBeforeGreatness} from "../pixins/destroyByGreatness";
import {giftValuables, playValuableCollectSounds} from "../cutscene/giftValuables";
import {sleep} from "../cutscene/sleep";
import {player} from "../gameObjects/player";

export function VolcanoTown() {
    scene.backgroundColor = 0x78917D;
    scene.terrainColor = 0x912235;
    const level = applyOgmoLevel(VolcanoTownArgs);
    jukebox.play(VolcanoSomething).warm(VolcanoCaveMusic, AnotherHouse, SomberVolcano, Temple, AboveVolcano, AmbientLava);

    mirror(level.PubWindow.width, level.PubWindow.height, 0x9F4F5D, 0xC38792).at(level.PubWindow).behind();

    cracks(3245.1269, 0x481018).show(scene.parallax1Stage);
    heatWaves(scene.width + 256, 80).at(-128, 300 - 30).show(scene.parallax1Stage);
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0x6D1913));
    decalsOf(CrackSmall).forEach(x => x.tinted(0x6D1913));
    const frontWaves = heatWaves(scene.width + 256, 80, -0.5).at(-128, scene.height).ahead();
    frontWaves.angle = 16;
    frontWaves.scale.x = 2;
    frontWaves.scale.y = 1.4;

    level.Iguard.cutscene = async () => {
        if (progress.flags.global.somethingGreatHappened) {
            await showAll(`You got rid of the invaders!`,
                'But as the knight of the volcano clan, my work is never done.');
            return;
        }
        await showAll('I am Iguard, the knight of the volcano clan.',
            `It's my job to keep the invaders out of the town.`);
        if (!progress.flags.volcano.defeatedVileAngel) {
            await show(`There is a particularly vile invader contained in the western lava pit.`);
            if (!progress.flags.volcano.bigKey.reward)
                await show(`The lava will give you problems for now, since you don't have the calloused feet of the volcano clan.`);
        }
    };

    if (progress.flags.final.doorOpened) {
        level.OracleDoor.locked = true;
    }

    let checkedAlteredSign = false;

    if (progress.flags.global.somethingGreatHappened) {
        level.OracleDoor.locked = true;
        level.OracleDoor.ext.showClosedMessage = false;

        level.VolcanoTownSign.title = 'Brown';
        level.VolcanoTownSign.cutscene = async () => {
            await show(`This is the volcano brown.`);
            if (promptedToCheckSign)
                checkedAlteredSign = true;
        };
    }

    let talkedToPranksterOnce = false;
    let promptedToCheckSign = false;

    level.Prankster
        .withPixin(DestroyBeforeGreatness)
        .withCutscene(async () => {
            if (talkedToPranksterOnce) {
                if (checkedAlteredSign) {
                    return await showAll(`Pretty good, huh?`,
`It used to say "Town"!`);
                }

                promptedToCheckSign = true;
                return await showAll(`By the way, did you see what I did to the sign?`,
`I thought that was pretty good.`);
            }

            talkedToPranksterOnce = true;

            await showAll(`Hey! It's me! The great prankster of the volcano clan.`,
                `Since you fixed the world, I've been back in business.`,
                `Check it out!`);

            const stolen = progress.valuables;

            if (stolen < 2) {
                await sleep(500);

                player.effect('poison');
                player.vspeed = -2;

                await sleep(1000);
                await show(`Pretty good right?!`);
                return;
            }

            await playValuableCollectSounds(stolen);

            progress.valuables = 0;
            await show(`Lost ${stolen} valuables!`);

            await sleep(500);

            await showAll(`What? Not a fan?`,
                `...`,
                `Fine.`);

            await giftValuables(stolen - 1);
        });
}