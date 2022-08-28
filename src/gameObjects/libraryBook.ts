import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {LibraryBook, ParticleInformation} from "../textures";
import {Container, Sprite} from "pixi.js";
import {player} from "./player";
import {show} from "../cutscene/dialog";
import {ask} from "../cutscene/ask";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {progress} from "../igua/data/progress";
import {rng} from "../utils/math/rng";
import {distance} from "../utils/math/vector";
import {now} from "../utils/now";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {track} from "../igua/track";
import {wait} from "../cutscene/wait";
import {smallPop} from "./smallPop";
import {colord} from "colord";
import {BookInformationHalt, PageFlip} from "../sounds";

const bookTxs = subimageTextures(LibraryBook, 12);
const informationTxs = subimageTextures(ParticleInformation, 2);

function getPlayerHead() {
    return (player.children[2] as any).children[1] as Container;
}

export function libraryBook() {
    const state = {
        image: 0,
        brain: 0
    };

    let lastImage = -1;
    let lastImageSound = 0;

    const s = Sprite.from(bookTxs[0])
        .withStep(() => {
            s.texture = bookTxs[Math.floor(state.image) % bookTxs.length];
            const brain = Math.min(state.brain, 1);
            getPlayerHead().scale.set(1 + brain);
            getPlayerHead().position.set(brain * -8, brain * 9);

            const thisImage = Math.floor(state.image);
            if (thisImage > lastImage && thisImage > 0 && thisImage % 6 === 0)
                information().at([0, -8].add(s)).ahead(1).on('removed', () => state.brain += 0.052);
            lastImage = thisImage;
        })
        .withStep(() => {
            const thisImage = state.image;
            if (Math.abs(thisImage - lastImageSound) >= 6) {
                (PageFlip.rate(1 + rng() * 0.2) as any).play();
                lastImageSound = thisImage;
            }
        })
        .withCutscene(async () => {
            const sign = player.scale.x;
            const walkTo = Promise.race([player.walkTo(s.x + 40 * sign).then(() => player.scale.x = -sign), sleep(5000)]);
            await show(`It is an old book.`);
            if (!await ask('Read the book?')) {
                await walkTo;
                return;
            }
            await walkTo;
            await lerp(state, 'image').to(6 * 20).over(3_000);
            await sleep(1_000);
            await wait(() => information.instances.length <= 0);
            await lerp(state, 'image').to(0).over(1_000);
            await sleep(250);
            await lerp(state, 'brain').to(0).over(200);
            await sleep(500);
            progress.levels.intelligence += 1;
            await show(`You feel a lot smarter.`);
        });

    s.anchor.set(9 / 20, 1);

    return s;
}

let color = 0;

function informationImpl() {
    let phase = 0;
    let speed = 1;
    let collided = 0;
    let nowOffset = rng() * Math.PI * 2;
    const offset = rng.unitVector.scale(8);

    const s = Sprite.from(informationTxs[0])
        .withAsync(async () => {
            await sleep(100 + rng.int(400))
            s.texture = informationTxs[1];
        })
        .withAsync(async () => {
            await sleep(300 + rng.int(100));
            phase += 1;
            await sleep(300 + rng.int(100));
            phase += 1;
        })
        .withStep(() => {
            if (phase === 0) {
                s.x += rng.polar * 2;
                s.y -= 2;
            }
            else if (phase === 1) {
                s.y += Math.sin(now.s * 2 * Math.PI + nowOffset) * 0.6;
            }
            else if (phase === 2) {
                const target = getWorldCenter(getPlayerHead()).add(offset);
                s.moveTowards(target, speed);
                speed = Math.min(10, speed + 0.33);
                if (player.collides(s) || distance(s, target) < 2) {
                    collided++;
                    if (collided > 2) {
                        const pop = smallPop(8, s.parent).at(s);
                        pop.tint = colord({ h: color * 60, s: 50, v: 100 }).toPixi()
                        color++;
                        (BookInformationHalt.rate(0.5 + rng() * 1.5) as any).play();
                        s.destroy();
                    }
                }
            }
        })

    s.anchor.set(4 / 10, 4 / 10);

    return s;
}

const information = track(informationImpl);