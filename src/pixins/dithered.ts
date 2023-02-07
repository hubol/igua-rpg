import {Pixin} from "../utils/pixi/pixin";
import {SceneLocal} from "../igua/sceneLocal";
import {scene} from "../igua/scene";
import {dither} from "../gameObjects/dither";
import {range} from "../utils/range";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";

export const Dithered = Pixin({ dither: 1 })
    .applies((src) => {
        const f = alphaMaskFilter(getMaskSprite(src.dither));
        const myScene = scene;
        return src
            .withStep(() => {
                if (myScene !== scene)
                    return;
                f.maskSprite = getMaskSprite(src.dither);
            })
            .filter(f);
    })

function localDither(f: number) {
    const d = dither();
    d.unit = f;
    d.renderable = false;
    d.show(scene.stage);
    return d;
}

function getMaskSprite(f: number) {
    f = Math.max(0, Math.min(1, f));
    return Dithers.value[Math.floor(f * (Dithers.value.length - 1))];
}

const Dithers = new SceneLocal(() => range(6).map(x => localDither(x / 5)),
    'Dithers')