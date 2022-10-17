import {scene} from "../igua/scene";
import {CapitalShopArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {mirror} from "../gameObjects/mirror";
import {roundWindow} from "../gameObjects/roundWindow";
import {decalsOf} from "../gameObjects/decal";
import {CapitalArc, GroundSpeckles} from "../textures";
import {shop} from "../igua/inventory/shop";
import {show, showAll} from "../cutscene/dialog";
import {ask} from "../cutscene/ask";
import {progress} from "../igua/data/progress";
import {sleep} from "../cutscene/sleep";
import {CheckerLooksGood} from "../sounds";
import {player} from "../gameObjects/player";

export function CapitalShop() {
    scene.backgroundColor = 0x90A8D8;
    scene.terrainColor = 0xC84010;
    const level = applyOgmoLevel(CapitalShopArgs);

    const { Window } = level;
    mirror(Window.width, Window.height).at(Window).behind();
    roundWindow(Window.width, Window.height, 2).at(Window).tinted(scene.backgroundColor).behind();

    level.Sign.title = 'Self-\nserve';
    level.Sign.cutscene = async () => {
        await showAll(
            'Welcome to the self-service shop at the capital.',
            'We believe in access to high-quality potions for all.',
            'If you require assistance, please seek the nearest attendant.');
        await shop();
        await show("Thank you for your patronage!");
    }

    const { capital } = progress.flags;

    async function toggleStorage() {
        await sleep(350);
        level.Shopkeeper.scale.x = 1;
        await sleep(350);
        capital.openedStorage = !capital.openedStorage;
        CheckerLooksGood.play();
        await sleep(350);
        level.Shopkeeper.scale.x = -1;
    }

    level.Shopkeeper.cutscene = async () => {
        scene.gameObjectStage.withAsync(async () => {
            await player.walkTo(level.Shopkeeper.x - 50);
            player.scale.x = 1;
        });
        if (await ask(`Hello. Do you want to shop here?`))
            return await show('Please use the self-service sign to shop.');
        if (capital.openedStorage) {
            if (await ask('Would you like me to close the storehouse?')) {
                await toggleStorage();
                return await showAll(
                    `Okay. I've closed the storehouse.`,
                    'Please talk to me if you would like me to reopen it.');
            }
        }
        else if (!capital.key.fromStorage) {
            await showAll(
                'I see that your task requires you to find all of the keys.',
                'I believe I saw one in the storehouse.');
        }
        if (!capital.openedStorage) {
            if (await ask('Would you like me to open the storehouse?')) {
                await toggleStorage();
                return await showAll(
                    `Okay. I've opened the storehouse.`,
                    'Please talk to me when you are done so I can close it.');
            }
        }
        return await show('Okay. Please use the self-service sign to shop.');
    }

    decalsOf(CapitalArc).forEach(x => x.tinted(scene.terrainColor));
    decalsOf(GroundSpeckles).forEach(x => x.tinted(0xF0B020));
}