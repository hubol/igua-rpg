import {setSceneMeta} from "../igua/level/setSceneMeta";
import {scene} from "../igua/scene";
import {IguaRpgTitle} from "../textures";
import {Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/merge";
import {getDefaultLooks} from "../igua/looks/getDefaultLooks";
import {Looks} from "../igua/looks/looksModel";
import {iguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {makeIguanaPuppetArgsFromLooks} from "../igua/looks/makeIguanaPuppetArgsFromLooks";

export function TitleScreen() {
    scene.backgroundColor = 0x002C38;
    const t = title().at(0, 80).show();
    character().show().at(138, t.getBounds().y - 10);
}

function character() {
    const c = merge(container(), {
        set looks(looks: Looks) {
            c.removeAllChildren();
            c.addChild(iguanaPuppet(makeIguanaPuppetArgsFromLooks(looks)));
        }
    });

    c.looks = getDefaultLooks();

    return c;
}

function title() {
    const c = container();
    for (let i = 1; i < 5; i++) {
        const b = Sprite.from(IguaRpgTitle).at(128 + i, i).centerAnchor();
        c.addChild(b);
        b.opaqueTint = 0x001A22;
    }

    c.addChild(Sprite.from(IguaRpgTitle).at(128, 0).centerAnchor());

    return c;
}

setSceneMeta(TitleScreen, { isLevel: false })