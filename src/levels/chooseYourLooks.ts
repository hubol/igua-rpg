import {setSceneMeta} from "../igua/level/setSceneMeta";
import {scene} from "../igua/scene";
import {game} from "../igua/game";
import {looksUiRoot} from "../igua/looks/components/looksUiRoot";
import {getDefaultLooks} from "../igua/looks/getDefaultLooks";
import {Looks} from "../igua/looks/looksModel";
import {defaults} from "../utils/defaults";
import {progress} from "../igua/data/progress";
import {level} from "../igua/level/level";

function defaultArgs() {
    return ({
        defaultLooks: getDefaultLooks(),
        save: (looks: Looks) => console.log(looks)
    })
}

type Args = ReturnType<typeof defaultArgs>;

export function ChooseYourLooks(args: Partial<Args> = {}) {
    const { defaultLooks, save } = defaults(defaultArgs(), args) as Args;
    scene.backgroundColor = 0x002C38;
    scene.gameObjectStage.addChild(looksUiRoot(defaultLooks, save));
}

export function ChooseYourLooksBeginning() {
    ChooseYourLooks({ save: x => {
            progress.looks = x;
            progress.levelName = 'DesertTown';
            level.goto(progress.levelName);
        } })
}

[ChooseYourLooks, ChooseYourLooksBeginning].forEach(x => setSceneMeta(x, { isLevel: false }));
