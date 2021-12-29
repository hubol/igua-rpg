import {setSceneMeta} from "../igua/level/setSceneMeta";
import {scene} from "../igua/scene";
import {game} from "../igua/game";
import {looksUiRoot} from "../igua/looks/components/looksUiRoot";
import {getDefaultLooks} from "../igua/looks/getDefaultLooks";

export function ChooseYourLooks() {
    scene.backgroundColor = 0x002C38;
    game.hudStage.addChild(looksUiRoot(getDefaultLooks()));
}

setSceneMeta(ChooseYourLooks, { isLevel: false });
