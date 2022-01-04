import {Graphics, Sprite} from "pixi.js";
import {merge} from "../../../utils/merge";
import {IguaText} from "../../text";
import {subimageTextures} from "../../../utils/pixi/simpleSpritesheet";
import {Key} from "../../../utils/browser/key";
import {UiChooseYourLooksIcons} from "../../../textures";

const [
    headIcon,
    bodyIcon,
    feetIcon,
    checkIcon,
    backIcon,
    floppyIcon,
    crestIcon,
    eyesIcon,
    mouthIcon,
    hornIcon,
    pupilsIcon,
    torsoIcon,
    tailIcon,
    clubIcon,
    frontIcon,
    hindIcon,
    nailsIcon] = subimageTextures(UiChooseYourLooksIcons, 17);

const icons = {
    'head': headIcon,
    'body': bodyIcon,
    'feet': feetIcon,
    'done': floppyIcon,
    'back': backIcon,
    'crest': crestIcon,
    'eyes': eyesIcon,
    'mouth': mouthIcon,
    'horn': hornIcon,
    'pupils': pupilsIcon,
    'torso': torsoIcon,
    'tail': tailIcon,
    'club': clubIcon,
    'front': frontIcon,
    'hind': hindIcon,
    'nails': nailsIcon,
    'ok': checkIcon,
}

function getIcon(text: string) {
    return icons[text.toLowerCase()];
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
