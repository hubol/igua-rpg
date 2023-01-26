import {Pixin} from "../utils/pixi/pixin";
import {SceneLocal} from "../igua/sceneLocal";
import {DisplayObject, Sprite} from "pixi.js";
import {ClownHealth} from "../gameObjects/utils/clownUtils";
import {merge} from "../utils/object/merge";
import {OutlineFilter} from "pixi-filters";
import {PlayerSpellColor} from "../gameObjects/playerSpell";
import {progress} from "../igua/data/progress";
import {scene} from "../igua/scene";
import {wait} from "../cutscene/wait";
import {container} from "../utils/pixi/container";
import {getWorldBounds, getWorldCenter} from "../igua/gameplay/getCenter";
import {sparkle} from "../gameObjects/sparkleSmall";
import {rng} from "../utils/math/rng";
import {sleep} from "../cutscene/sleep";
import {Vector, vnew} from "../utils/math/vector";
import {approachLinear} from "../utils/math/number";
import {findStage} from "../igua/findStage";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {FinalEnemySoul} from "../textures";
import {animatedSprite} from "../igua/animatedSprite";
import { DefeatPermanent } from "../sounds";
import {PermanentDefeatTracker} from "../gameObjects/permanentDefeatTracker";

const filter = new OutlineFilter(1, PlayerSpellColor.Dark);

export const WeakToSpellsInstances = new SceneLocal(() => <WeakToSpellsInstance[]>[], 'WeakToSpellsInstances');

type WeakToSpellsArgs = { spellsHurtbox: DisplayObject[], clownHealth: ClownHealth };
export type WeakToSpellsInstance = DisplayObject & WeakToSpellsArgs & { showSpellEffectTimeFrames: number };

export const WeakToSpells = Pixin<WeakToSpellsArgs>()
    .applies(_src => {
        _src.on('removed', () => WeakToSpellsInstances.value.removeFirst(_src));

        const src = merge(_src, { showSpellEffectTimeFrames: 0 });
        WeakToSpellsInstances.value.push(src);

        if (progress.flags.final.enemiesCanBePermanentlyDefeated) {
            const id = `${progress.levelName}_${WeakToSpellsInstances.value.length}`;
            if (progress.flags.objects.permanentlyDefeatedEnemies.has(id))
                src.withStep(() => src.destroy());
            else {
                scene.gameObjectStage.withAsync(async () => {
                    await wait(() => src.clownHealth.hasTakenEnoughSpellDamageToBePermanentlyDefeated);
                    readyToBePermanentlyDefeated(src);
                    await wait(() => src.clownHealth.isDead);
                    PermanentDefeatTracker.value.showFrames = 120;
                    progress.flags.objects.permanentlyDefeatedEnemies.add(id);
                });
            }
        }

        let previous = 0;
        return src.withStep(() => {
            const current = src.showSpellEffectTimeFrames;

            if (current > 0) {
                if (previous <= 0 || !src.filters || src.filters.indexOf(filter) === -1) {
                    if (!src.filters)
                        src.filters = [];
                    src.filters.push(filter);
                }
                else {
                    const index = src.filters.indexOf(filter);
                    if (index !== src.filters.length - 1) {
                        src.filters[index] = src.filters[src.filters.length - 1];
                        src.filters[src.filters.length - 1] = filter;
                    }
                }
            }
            else {
                if (src.filters)
                    src.filters.removeFirst(filter);
            }

            previous = current;
            if (src.showSpellEffectTimeFrames > 0)
                src.showSpellEffectTimeFrames -= 1;
        });
    });

const sparkleColors = [PlayerSpellColor.Light, PlayerSpellColor.Dark];
let sparkleColorIndex = 0;

function getSparkleColor() {
    return sparkleColors[(sparkleColorIndex++) % 2];
}

const soulTxs = subimageTextures(FinalEnemySoul, 4);

function readyToBePermanentlyDefeated(instance: WeakToSpellsInstance) {
    let center = vnew();
    const centerSource = instance.spellsHurtbox.length === 1 ? instance.spellsHurtbox[0] : instance;

    const c = container()
        .withAsync(async () => {
            while (true) {
                if (!instance.destroyed)
                    center.at(getWorldCenter(centerSource));

                for (const box of instance.spellsHurtbox) {
                    if (instance.destroyed) {
                        soulRelease(center).show(c.parent);
                        c.destroy();
                        return;
                    }
                    const r = getWorldBounds(box);
                    sparkle(1 / 4, 11).at(r.x + rng.int(r.width), r.y + rng.int(r.height)).tinted(getSparkleColor()).show(c);
                    await sleep(50 + rng.int(50));
                }
            }
        });

    c.show(findStage(instance));
}

function soulRelease(v: Vector) {
    DefeatPermanent.play();

    let speed = 4;
    let amplitude = 0.5;
    let counter = 0;

    const c1 = container();
    const c2 = container();

    const c = container(c1, c2)
        .withStep(() => {
            if (v.y <= -16) {
                if (c1.children.length === 0 && c2.children.length === 0)
                    c.destroy();
                return;
            }

            for (let i = 0; i < 4; i += 1) {
                v.y -= (speed - Math.max(amplitude - 5, 0) * 0.1) * 0.25;
                const s = animatedSprite(soulTxs, i === 3 ? 1 / 6 : 1 / 3, true)
                    .liveFor(i === 3 ? 25 : 13)
                    .centerAnchor()
                    .at(v.x + Math.sin(v.y / 10) * amplitude, v.y)
                    .show(c1);
                if (rng.bool)
                    s.scale.x = -1;
            }

            if (++counter === 2) {
                const s = c1.children[rng.int(c1.children.length)];
                sparkle(1 / 4, 11).at(s.x + rng.polar * 5, s.y + rng.polar * 5).tinted(PlayerSpellColor.Light).show(c2);
                counter = 0;
            }

            speed = approachLinear(speed, 6, 0.05);
            amplitude = approachLinear(amplitude, 7, 0.1);
        })
        .withStep(() => {
            for (let i = 0; i < c1.children.length; i++) {
                const s = c1.children[i] as Sprite;
                s.tint = i === c1.children.length - 1 ? PlayerSpellColor.Light : PlayerSpellColor.Dark;
                if (i !== c1.children.length - 1)
                    (s as any).imageIndex = Math.max((s as any).imageIndex, 1);
            }
        });

    return c;
}