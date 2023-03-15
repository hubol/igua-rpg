import {bigua} from "./bigua";
import {rectangleDistance} from "../utils/math/rectangleDistance";
import {player} from "./player";
import {show, showAll} from "../cutscene/dialog";
import {progress} from "../igua/data/progress";
import {scene} from "../igua/scene";
import {lerp} from "../cutscene/lerp";
import {KeyYellow, KeyYellowShrunken} from "../textures";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";
import {BiguaEating, BiguaGiveItem, BiguaMagic, BiguaSniff, ClownExplode, ClownSniffle} from "../sounds";
import {confetti} from "./confetti";
import {rng} from "../utils/math/rng";
import {jukebox} from "../igua/jukebox";
import {cutscene} from "../cutscene/cutscene";
import {moveCameraToPlayerTarget} from "../igua/camera";
import {shrunkenSaladTextures} from "./shrunkenSalad";
import {ask} from "../cutscene/ask";
import {giftValuables} from "../cutscene/giftValuables";

export function biguaInJungle() {
    const { jungle } = progress.flags;

    async function grow(grower: DisplayObject, onGrownBeforeStanding: () => Promise<unknown>) {
        b.tail.twitch = true;
        const r = grower.show().at(v());
        b.isDucking = true;
        b.isClosingEyes = true;
        b.blinkControl = false;
        jukebox.currentSong?.fade(1, 0, 500);
        await wait(() => r.destroyed);
        b.tail.twitch = false;
        await sleep(250);
        b.isClosingEyes = false;
        await sleep(250);
        b.blinkControl = true;
        await onGrownBeforeStanding();
        b.isDucking = false;
        await wait(() => b.duckUnit <= 0);
        jukebox.currentSong?.fade(0, 1, 500);
        await sleep(500);
    }

    const b = bigua()
        .withCutscene(async () => {
            const dx = b.x + 58 * b.scale.x;
            const minx = Math.min(dx, b.x);
            const maxx = Math.max(dx, b.x);
            if (player.x > maxx || player.x < minx)
                return;

            scene.camera.followPlayer = false;
            const moveCamera = lerp(scene.camera, 'y').to(Math.min(b.y - 180, scene.height - 256)).over(750);

            if (!jungle.bigua.met) {
                await show('Hello. I am Bigua. I came from the sky fortress when the invaders arrived.');
                await show('I have a special ability that allows me to increase the size of certain items.');
            }

            if (jungle.bigua.salad.held) {
                BiguaSniff.play();
                await sleep(500);
                await show(`You have a meal from my homeland!`);
                if (await ask(`Will you give it to me?`)) {
                    const [grower, grown] = growSalad();
                    BiguaGiveItem.play();
                    await show('Gave shrunken meal.');
                    await grow(grower, async () => {});
                    const m = new Graphics().beginFill(0).drawRect(0, 0, grown.width, grown.height);
                    grown.mask = m.show(grown).at(-grown.width / 2, -grown.height / 2);
                    for (let i = 0.8; i > -1; i -= 0.2) {
                        await sleep(250);
                        BiguaEating.play();
                        m.scale.x = i;
                        if (m.width < 1) {
                            grown.destroy();
                            break;
                        }
                    }

                    await sleep(250);

                    if (jungle.bigua.salad.fed === 0) {
                        await show(`In the giants' town, we prepared a lot of food for times like this.`);
                        await show(`Because of our abilities, we could prepare tiny nutritious food and increase its size later.`);
                        await sleep(500);
                    }

                    await show('That was delicious. Thank you for the meal!');
                    await giftValuables(Math.min(25, 10 + jungle.bigua.salad.fed * 5));
                    jungle.bigua.salad.held = false;
                    jungle.bigua.salad.fed++;
                }
                else {
                    await show(`Oh. Let me know if you change your mind!`);
                }
            }
            else if (jungle.bigua.repairedKey) {
                if (progress.flags.global.somethingGreatHappened) {
                    await showAll(`I'm glad I got to contribute to your mission, even in a small way.`,
                        `You did great on your task. The world thanks you.`,
                        `Now that things are settled here, maybe I can return to the nimbus of the giants soon.`);
                }
                else {
                    await show(`I'm glad I got to help your mission.`);
                    await show('If you find something else you need bigger, bring it to me.');
                }
            }
            else if (jungle.key.shrunkenKey) {
                BiguaGiveItem.play();
                jungle.bigua.repairedKey = true;
                await show('Gave shrunken temple key.');
                await grow(repairingKey(), async () => await show('Presto! Your key is bigger now.'));
                await show(`I'm glad I got to help your mission.`);
            }
            else
                await show('If you find something you need bigger, bring it to me.');
            jungle.bigua.met = true;

            await moveCamera;
            scene.gameObjectStage.withAsync(async () => {
                await moveCameraToPlayerTarget(2);
                scene.camera.followPlayer = true;
            });
        })
        .withStep(() => {
            if (cutscene.isPlaying)
                return;
            if (b.isDucking)
                b.isDucking = rectangleDistance(b, player) > 32;
            else
                b.isDucking = rectangleDistance(b, player) > 48;
        });

    const v = () => [96 * b.scale.x, -64].add(b);

    if (jungle.bigua.repairedKey) {
        const k = repairedKey().withStep(() => k.at(v())).show();
    }

    return b;
}

function repairingKey() {
    return growing(Sprite.from(KeyYellowShrunken).centerAnchor(), 1.4, repairedKey());
}

function growSalad() {
    const grown = Sprite.from(shrunkenSaladTextures[1]).centerAnchor();
    const grower = growing(Sprite.from(shrunkenSaladTextures[0]).centerAnchor(), 1.4, grown);
    return [grower, grown];
}

function growing<A extends DisplayObject, B extends DisplayObject>(d1: A, s: number, d2: B) {
    const g = new Graphics().beginFill(0x9957AF).drawCircle(0, 0, 16).show();
    g.alpha = 0;
    let vibrate = false;
    const s1 = d1.withAsync(async () => {
        const id = BiguaMagic.play();
        await Promise.all([
            lerp(s1 as any, 'alpha').to(1).over(250),
            lerp(g, 'alpha').to(1).over(250),
        ]);
        await sleep(250);
        vibrate = true;
        await sleep(750 - 125);
        await lerp(s1.scale, 'x').to(s).over(125);
        BiguaMagic.stop(id);
        ClownExplode.play();
        confetti().at(s1).ahead();
        d2.show().at(s1);
        s1.destroy();
        g.destroy();
    })
        .withStep(() => {
            s1.scale.y = s1.scale.x;
            g.at(s1);
            if (vibrate)
                g.pivot.set(rng.int(2) - 1, rng.int(2) - 1);
        })
    s1.alpha = 0;

    return s1;
}

function repairedKey() {
    return Sprite.from(KeyYellow).asCollectible(progress.flags.jungle.key, 'fromBiguaRepair').centerAnchor();
}