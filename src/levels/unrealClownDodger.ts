import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {JungleFromDesertArgs, UnrealClownDodgerArgs} from "../levelArgs";
import {container} from "../utils/pixi/container";
import {commonClown} from "../gameObjects/commonClown";
import {range} from "../utils/range";
import {BevelFilter} from "pixi-filters";

export function UnrealClownDodger() {
    scene.backgroundColor = 0x97D8D8;
    scene.terrainColor = 0x79962E;
    const level = applyOgmoLevel(UnrealClownDodgerArgs);

    const c = container();
    c.filters = [new BevelFilter({ thickness: 1, rotation: 45, lightColor: 0x28C9B3, shadowColor: 0x0E7F70, lightAlpha: 1, shadowAlpha: 1 })];
    range(7).forEach(x => {
        const clown = c.addChild(commonClown({ hspeed: -.75, limitedRangeEnabled: false, portal: true, dangerous: false }).
            at(96 + x * 96, 200))
            .withStep(() => {
                if (clown.y >= 256)
                    clown.destroy();
            });
    })
    scene.gameObjectStage.addChild(c);
}