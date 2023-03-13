import {setSceneMeta} from "../igua/level/setSceneMeta";
import {scene} from "../igua/scene";
import {TitleScreenGameObjects} from "./titleScreen";
import * as looksObjectSrc from "../gameObjects/npcLooks";
import {sleep} from "../cutscene/sleep";
import {DropShadowFilter} from "pixi-filters";

const looksObject = { ...looksObjectSrc };

// @ts-ignore
delete looksObject['BiguaJungleLooks'];
// @ts-ignore
delete looksObject['BiguaKlarnaLooks'];
// @ts-ignore
delete looksObject['BiguaPrimaryColorLooks'];

export async function SpecialTitleScreen() {
    scene.backgroundColor = 0x082080;
    const t = TitleScreenGameObjects.title(false).at(0, 80 + 55).show();
    const c1 = TitleScreenGameObjects.character().show().at(138, t.getBounds().y - 10);
    const c2 = TitleScreenGameObjects.character(true).show().at(61, t.getBounds().y + 2);
    const c3 = TitleScreenGameObjects.character().show().at(220, t.getBounds().y - 10);
    c3.scale.x = -1;

    const characters = [c1, c2, c3];

    scene.gameObjectStage.filters = [
        new DropShadowFilter({ blur: 0, alpha: 1, pixelSize: 0, distance: 1, color: 0x001A22 }),
        new DropShadowFilter({ blur: 0, alpha: 1, pixelSize: 0, distance: 1, color: 0x001A22 }),
        new DropShadowFilter({ blur: 0, alpha: 1, pixelSize: 0, distance: 1, color: 0x001A22 }),
        new DropShadowFilter({ blur: 0, alpha: 1, pixelSize: 0, distance: 1, color: 0x001A22 }),];

    const looks = shuffle(Object.values(looksObject));

    let index = 0;
    let lookIndex = 0;

    function applyLooks() {
        const character = characters[(index++) % characters.length];
        const look = looks[(lookIndex++) % looks.length];
        character.showLooks(look);
    }

    for (const _ of characters)
        applyLooks();

    scene.gameObjectStage.withAsync(async () => {
        while (true) {
            applyLooks();
            await sleep(100);
        }
    })
}

// https://stackoverflow.com/a/2450976
function shuffle<T>(array: T[]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

setSceneMeta(SpecialTitleScreen, { isLevel: false })