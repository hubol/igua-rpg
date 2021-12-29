import {Graphics, Sprite, Texture} from "pixi.js";
import {merge} from "../../../utils/merge";
import {IguaText} from "../../text";
import {rng} from "../../../utils/rng";
import { sleep } from "../../../cutscene/sleep";
import {subimageTextures} from "../../../utils/pixi/simpleSpritesheet";
import {ChooseYourLooksIcons} from "../../../textures";
import {Key} from "../../../utils/browser/key";
import {EscapeTickerAndExecute} from "../../../utils/asshatTicker";

const [headIcon, bodyIcon, feetIcon, doneIcon, backIcon, floppyIcon] = subimageTextures(ChooseYourLooksIcons, 6);

function getIcon(text: string) {
    switch (text.toLowerCase()) {
        case 'head':
            return headIcon;
        case 'body':
            return bodyIcon;
        case 'feet':
            return feetIcon;
        case 'done':
            return floppyIcon;
        case 'back':
            return backIcon;
    }
}

export function button(text: string, onPress: () => unknown, width = 96, height = 30) {
    const g = merge(new Graphics(), { selected: false }).withStep(() => {
        g.clear().beginFill(0x005870);
        if (g.selected)
            g.lineStyle(2, 0x00FF00, 1, 0);
        g.drawRect(0, 0, width, height);
        if (g.selected && Key.justWentDown('Space'))
            onPress();
    });
    const icon = getIcon(text);
    if (icon)
        g.addChild(Sprite.from(icon));
    const font = IguaText.Large(text).at(32, (height - 14) / 2);
    g.addChild(font);
    return g;
}
