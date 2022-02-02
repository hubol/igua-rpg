import {setSceneMeta} from "../igua/level/setSceneMeta";
import {scene, sceneStack} from "../igua/scene";
import {looksUiRoot} from "../igua/looks/components/looksUiRoot";
import {getDefaultLooks} from "../igua/looks/getDefaultLooks";
import {Looks} from "../igua/looks/looksModel";
import {defaults} from "../utils/defaults";
import {progress} from "../igua/data/progress";
import {level} from "../igua/level/level";
import {recreatePlayerInPlace} from "../gameObjects/player";
import {jukebox} from "../igua/jukebox";
import {Country} from "../musics";

function defaultArgs() {
    return ({
        defaultLooks: getDefaultLooks(),
        save: (looks: Looks) => console.log(looks)
    })
}

type Args = ReturnType<typeof defaultArgs>;

function ChooseYourLooks(args: Partial<Args> = {}) {
    const { defaultLooks, save } = defaults(defaultArgs(), args) as Args;
    scene.backgroundColor = 0x002C38;
    scene.gameObjectStage.addChild(looksUiRoot(defaultLooks, save));
}

export function ChooseYourLooksBeginning() {
    jukebox.warm(Country);
    ChooseYourLooks({ save: x => {
            progress.looks = x;
            progress.levelName = 'DesertTown';
            level.goto(progress.levelName);
        } })
}

export function ChooseYourLooksFromMirror() {
    ChooseYourLooks({ save: x => {
            progress.looks = x;
            sceneStack.pop();
            recreatePlayerInPlace();
        },
        defaultLooks: JSON.parse(JSON.stringify(progress.looks))
    });
}

export function ChooseYourLooksDev() {
    ChooseYourLooks({ save: console.log })
}

[ChooseYourLooks, ChooseYourLooksBeginning, ChooseYourLooksDev, ChooseYourLooksFromMirror].forEach(x => setSceneMeta(x, { isLevel: false }));
