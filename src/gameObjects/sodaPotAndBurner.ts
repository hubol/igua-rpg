import {container} from "../utils/pixi/container";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {EndingSodaBubble, EndingSodaPotAndBurner} from "../textures";
import {animatedSprite} from "../igua/animatedSprite";
import {Container, DisplayObject, Graphics, Sprite} from "pixi.js";
import {lerp} from "../cutscene/lerp";
import {rng} from "../utils/math/rng";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {merge} from "../utils/object/merge";
import {wait} from "../cutscene/wait";
import {approachLinear} from "../utils/math/number";
import {sleep} from "../cutscene/sleep";
import {scene} from "../igua/scene";

export function sodaPotAndBurner() {
    const pot = sodaPotAndBurnerPuppet()
        .withAsync(async () => {
            while (true) {
                const turnOnWhenDegreesCelsius = 70 + rng.int(20);

                await wait(() => pot.degreesCelsius <= turnOnWhenDegreesCelsius);
                pot.burnerOn = true;

                const turnOffWhenDegreesCelsius = 105 + rng.int(15);

                await wait(() => pot.degreesCelsius >= turnOffWhenDegreesCelsius);
                pot.burnerOn = false;
            }
        });

    return pot;
}

const bubbleSrcTxs = subimageTextures(EndingSodaBubble, { width: 12 });
const bubbleTxs = bubbleSrcTxs.slice(0, 3);
const popTxs = bubbleSrcTxs.slice(3);

const potSrcTxs = subimageTextures(EndingSodaPotAndBurner, { width: 52 });
const burnerTxs = potSrcTxs.slice(0, 3);
const potBackTx = potSrcTxs[3];
const potSodaTx = potSrcTxs[4];
const potFrontTx = potSrcTxs[5];
const potBubbleMaskTx = potSrcTxs[6];

function sodaPotAndBurnerPuppet() {
    const c = merge(container(), { burnerOn: false, degreesCelsius: 90 });
    const burner = animatedSprite(burnerTxs, 0);
    const back = Sprite.from(potBackTx);

    const soda = container();

    const sodaSprite = Sprite.from(potSodaTx);
    const bubbleContainerMask = Sprite.from(potBubbleMaskTx);
    const popContainerMask = Sprite.from(potSodaTx);

    const bubbleContainer = container();
    bubbleContainer.sortableChildren = true;
    const popContainer = container();

    bubbleContainer.mask = bubbleContainerMask;
    popContainer.filter(alphaMaskFilter(popContainerMask));

    soda.addChild(bubbleContainerMask, popContainerMask, sodaSprite, popContainer, bubbleContainer);

    const front = Sprite.from(potFrontTx);

    c.addChild(burner, back, soda, front);

    const boilResistanceMax = 6_000;
    let boilResistance = boilResistanceMax;

    c.withStep(() => {
        boilResistance -= Math.pow(c.degreesCelsius / 10, 3);
        if (boilResistance <= 0) {
            boilBubble(bubbleContainer, popContainer);
            boilResistance = boilResistanceMax;
        }

        burner.imageIndex = approachLinear(burner.imageIndex, c.burnerOn ? 2 : 0, 0.034);

        if (c.burnerOn)
            c.degreesCelsius += 0.034;
        else {
            c.degreesCelsius *= 0.999;
            c.degreesCelsius -= 0.0033;
        }

        soda.y = (Math.sin(scene.s * Math.PI) + 1) / -2;
    });

    return c;
}

function boilBubble(bubbleContainer: Container, popContainer: Container) {

    const x = 5 + rng.int(32);
    const y = 3 + rng.int(12);

    bubbleContainer.withAsync(async () => {
        const s1 = animatedSprite(bubbleTxs, 0).at(x, y).show(bubbleContainer);
        s1.zIndex = y;
        await lerp(s1, 'imageIndex').to(2).over(130 + rng.int(150));
        await sleep(60);
        const s2 = animatedSprite(popTxs, 0).at(s1).show(popContainer);
        s1.destroy();
        await lerp(s2, 'imageIndex').to(1).over(80 + rng.int(80));
        await sleep(60);
        s2.destroy();
    });
}