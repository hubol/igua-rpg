import {Dither, SplashDrummer, SplashWebsite} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {scene} from "../igua/scene";
import {container} from "../utils/pixi/container";
import {Hbox} from "../gameObjects/hbox";
import {Sprite} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {lerp} from "../cutscene/lerp";
import {setSceneMeta} from "../igua/level/setSceneMeta";
import {animatedSprite} from "../igua/animatedSprite";
import {resolveBlock} from "../gameObjects/walls";
import {getDefaultLooks} from "../igua/looks/getDefaultLooks";
import {iguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {makeIguanaPuppetArgsFromLooks} from "../igua/looks/makeIguanaPuppetArgsFromLooks";
import {OutlineFilter} from "pixi-filters";
import {wait} from "../cutscene/wait";
import {CharacterLandOnGround, ImpossiblePuzzleNotch, SharpNotice} from "../sounds";
import {Dithered} from "../pixins/dithered";

const drummerTxs = subimageTextures(SplashDrummer,  { width: 32 });

enum Color {
    Red = 0xB04030,
    Orange = 0xD88018,
    Yellow = 0xFFC800,
    White = 0xFFFFFF,
}

export function SplashScreen() {
    scene.backgroundColor = Color.Red;
    scene.terrainStage.visible = false;

    scene.width = 256;
    scene.height = 256;

    resolveBlock({ x: 0, y: 240, width: 256, height: 32 });

    const websiteMask = new Hbox(0, 0, 140, 1, true);
    websiteMask.scale.y = 0;

    const websiteMask2 = new Hbox(0, 0, 140, 1, true);
    websiteMask2.scale.y = 0;

    const websiteFront = Sprite.from(SplashWebsite);
    const websiteBack = Sprite.from(SplashWebsite).withPixin(Dithered({ dither: 0.6 }));
    const website = container(websiteBack, websiteFront, websiteMask, websiteMask2).at(4, 4).show();

    websiteFront.mask = websiteMask;
    websiteBack.mask = websiteMask2;

    const iguana = mkIguana().at(186, 200).show();
    iguana.canBlink = false;
    iguana.visible = false;
    iguana.isDucking = true;

    scene.gameObjectStage.withAsync(async () => {
        // const heights = [43, 86, 129, 152];
        // for (const height of heights) {
        //     await sleep(200);
        //     await lerp(websiteMask.scale, 'y').to(height).over(333);
        // }

        await sleep(250);

        const drummer = mkDrummer().at(192, -32).show();

        const heightTracker = container().withStep(() => {
            websiteMask.scale.y = drummer.y - website.y;
            websiteMask2.scale.y = (drummer.y + 6) - website.y;
        }).show();

        await wait(() => drummer.isOnGround);
        CharacterLandOnGround.play();

        await sleep(250);
        for (let i = 0; i < 7; i++) {
            ImpossiblePuzzleNotch.play();
            drummer.visible = !drummer.visible;
            iguana.visible = !drummer.visible;
            await sleep(100);
        }

        iguana.canBlink = true;
        iguana.isDucking = false;

        await wait(() => iguana.duckUnit <= 0.1);
        await sleep(100);
        const agape = lerp(iguana, 'agapeUnit').to(1).over(100)
            .then(() => sleep(200))
            .then(() => lerp(iguana, 'agapeUnit').to(0).over(100));

        SharpNotice.play();
        iguana.vspeed = -2;
        await agape;
    });
}

function mkIguana() {
    const looks = getDefaultLooks();
    looks.head.color = Color.Yellow;
    looks.head.crest.color = Color.Red;
    looks.head.eyes.pupils.color = Color.Red;
    looks.head.mouth.color = Color.Red;
    looks.body.color = Color.Red;
    looks.body.tail.color = Color.Red;
    looks.feet.color = Color.Yellow;
    looks.feet.clawColor = Color.Red;
    const puppet = iguanaPuppet(makeIguanaPuppetArgsFromLooks(looks))
        .withStep(() => puppet.engine.step())
        .filter(new OutlineFilter(1, Color.Yellow));

    puppet.engine.playSounds = false;

    const box = new Hbox(-40, -40, 80, 80, true).show(puppet);
    box.alpha = 0;

    return puppet;
}

function mkDrummer() {
    let pedometer = 0;

    const sprite = animatedSprite(drummerTxs, 0)
        .withGravityAndWallResist([0, -8], 6, 0.1)
        .withStep(() => {
            if (sprite.speed.x === 0 || !sprite.isOnGround)
                pedometer = 0;
            else
                pedometer += Math.abs(sprite.speed.x);

            if (sprite.speed.x !== 0)
                sprite.scale.x = Math.sign(sprite.speed.x);
            if (!sprite.isOnGround)
                sprite.imageIndex = sprite.speed.y > 0 ? 3 : 2;
            else
                sprite.imageIndex = sprite.speed.x === 0 || (pedometer % 8) >= 4 ? 0 : 1;
        });

    sprite.anchor.set(0.5, 1);

    return sprite;
}

setSceneMeta(SplashScreen, { isLevel: false });