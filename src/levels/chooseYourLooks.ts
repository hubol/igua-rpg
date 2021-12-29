import {setSceneMeta} from "../igua/level/setSceneMeta";
import {bindLooks} from "../igua/looks/bindLooks";
import {getLooksInputModel} from "../igua/looks/looksModel";
import {scene} from "../igua/scene";
import {game} from "../igua/game";
import {looksUiRoot} from "../igua/looks/components/looksUiRoot";

export function ChooseYourLooks() {
    scene.backgroundColor = 0x002C38;
    bindLooks(getLooksInputModel(), {} as any);
    game.hudStage.addChild(looksUiRoot());
}

setSceneMeta(ChooseYourLooks, { isLevel: false });
