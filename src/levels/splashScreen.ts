import {SplashDrummer, SplashWebsite} from "../textures";
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
import {wait} from "../cutscene/wait";
import {
    BallBounce,
    CheckerLooksGood
} from "../sounds";
import {Dithered} from "../pixins/dithered";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {jukebox} from "../igua/jukebox";
import { TitleScreen } from "../musics";
import {level} from "../igua/level/level";
import {waitHold} from "../cutscene/waitHold";

const drummerTxs = subimageTextures(SplashDrummer,  { width: 32 });

enum Color {
    Red = 0xB04030,
    Yellow = 0xFFC800,
}

export function SplashScreen() {
    scene.backgroundColor = Color.Red;
    scene.terrainStage.visible = false;
    jukebox.warm(TitleScreen);

    scene.width = 512;
    scene.height = 256;

    resolveBlock({ x: 0, y: 240 - 8, width: 256, height: 32 });

    const websiteMask = new Hbox(0, 0, 140, 1, true);
    websiteMask.scale.y = 0;

    const websiteMask2 = new Hbox(0, 0, 140, 1, true);
    websiteMask2.scale.y = 0;

    const websiteFull = Sprite.from(SplashWebsite).tinted(Color.Yellow);
    const websiteHalf = Sprite.from(SplashWebsite).tinted(Color.Yellow).withPixin(Dithered({ dither: 0.6 }));
    const website = container(websiteFull, websiteHalf, websiteMask, websiteMask2).at(58, 24).show();

    websiteFull.mask = websiteMask;
    websiteHalf.mask = websiteMask2;

    let iguana = mkIguana().at(186 - 64, 200).show();
    iguana.canBlink = false;
    iguana.visible = false;

    scene.gameObjectStage.withAsync(async () => {
        await sleep(100);

        const drummer = mkDrummer().at(192 - 64, -32).show();

        const heightTracker = container().withStep(() => {
            websiteMask.scale.y = (drummer.y - 32 ) - website.y;
            websiteMask2.scale.y = (drummer.y - 26) - website.y;
        }).show();

        await wait(() => drummer.isOnGround);

        await sleep(250);
        for (let i = 0; i < 7; i++) {
            BallBounce.play();
            drummer.visible = !drummer.visible;
            iguana.visible = !drummer.visible;
            await sleep(100);
        }

        iguana.canBlink = true;

        await sleep(400);

        const v = iguana.vcpy();
        iguana.destroy();
        iguana = mkIguana(false).show().at(v);

        const agape = lerp(iguana, 'agapeUnit').to(1).over(100)
            .then(() => sleep(200))
            .then(() => lerp(iguana, 'agapeUnit').to(0).over(100));

        CheckerLooksGood.play();
        iguana.vspeed = -2.5;
        scene.backgroundColor = 0x002C38;
        websiteFull.tinted(0xCCAE0A);
        websiteHalf.tinted(0xCCAE0A);
        await agape;
        await wait(() => iguana.engine.isOnGround);
        iguana.hspeed = iguana.engine.walkSpeed;

        const websiteExit = container().withStep(() => {
            website.x -= iguana.hspeed;
        }).show();

        await waitHold(() => !isOnScreen(iguana) && !isOnScreen(website), 10);
        scene.gameObjectStage.withStep(() => level.goto('TitleScreen'));
    });
}

function mkIguana(specialColors = true) {
    const looks = getDefaultLooks();
    if (specialColors) {
        looks.head.color = Color.Yellow;
        looks.head.crest.color = Color.Yellow;
        looks.head.eyes.pupils.color = Color.Red;
        looks.head.mouth.color = Color.Red;
        looks.body.color = Color.Yellow;
        looks.body.tail.color = Color.Yellow;
        looks.feet.color = Color.Yellow;
        looks.feet.clawColor = Color.Red;
    }

    const puppet = iguanaPuppet(makeIguanaPuppetArgsFromLooks(looks))
        .withStep(() => puppet.engine.step())

    puppet.engine.playSounds = false;

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
