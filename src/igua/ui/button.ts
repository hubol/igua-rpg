import {Graphics} from "pixi.js";
import {merge} from "../../utils/merge";
import {Key} from "../../utils/browser/key";

export function button(onPress: () => unknown, width = 96, height = 30) {
    let jigglesOnPress = false;

    function jiggle() {
        jigglesOnPress = true;
        return g;
    }

    let factor = 0;

    const g = merge(new Graphics(), { selected: false, jiggle, onPress }).withStep(() => {
        g.clear().beginFill(0x005870);
        if (g.selected)
            g.lineStyle(2, 0x00FF00, 1, 0);
        g.drawRect(0, 0, width, height);

        if (factor > 0) {
            g.pivot.x = (factor % 2 === 0 ? 1 : -1) * Math.ceil(factor / 6);
            factor--;
        }
        else
            g.pivot.x = 0;

        if (g.selected && Key.justWentDown('Space')) {
            g.onPress();
            if (jigglesOnPress)
                factor = 8;
        }
    });

    return g;
}
