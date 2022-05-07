import {Sprite} from "pixi.js";
import {merge} from "../../../utils/object/merge";
import {IguaText} from "../../text";
import {subimageTextures} from "../../../utils/pixi/simpleSpritesheet";
import {UiChooseYourLooksIcons} from "../../../textures";
import { button as uiButton } from "../../ui/button";

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
    nailsIcon,
    lightBulbIcon] = subimageTextures(UiChooseYourLooksIcons, { width: 30 });

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
    'claws': nailsIcon,
    'ok': checkIcon,
    'inspiration': lightBulbIcon,
}

function getIcon(text: string) {
    return icons[text.toLowerCase()];
}

export function button(text: string, onPress: () => unknown, width = 96, height = 30) {
    function center() {
        // @ts-ignore
        font.anchor.x = 0.5;
        font.x = width / 2;
        return g;
    }

    const g = merge(uiButton(onPress, width, height), { center });

    const icon = getIcon(text);
    if (icon)
        g.addChild(Sprite.from(icon));
    const font = IguaText.Large(text).at(32, (height - 14) / 2);
    g.addChild(font);

    return g;
}
