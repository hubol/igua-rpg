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
import {pageRoot} from "../igua/ui/pageRoot";
import {button as uiButton} from "../igua/ui/button";
import {IguaText} from "../igua/text";
import {persistence} from "../igua/data/persistence";

export function TitleScreen() {
    scene.backgroundColor = 0x002C38;
    const t = title().at(0, 80).show();
    const c = character().show().at(138, t.getBounds().y - 10);

    const root = pageRoot().show().at(32, 128);
    root.goto([
        button('Continue', () => persistence.load(false)).center(),
        button('Load Game', () => {}).center().at(0, 30),
        button('New Game', () => {}).center().at(0, 60),
    ],
        { selectionIndex: 0 })
}

function button(text: string, fn: () => unknown) {
    const font = IguaText.Large(text).at(6, 6);

    function center() {
        // @ts-ignore
        font.anchor.x = 0.5;
        font.x = 40;
        return button;
    }

    const button = uiButton(fn, 80, 25);
    button.addChild(font);
    return merge(button, { center });
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