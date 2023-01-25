import {Pixin} from "../utils/pixi/pixin";
import {SceneLocal} from "../igua/sceneLocal";
import {DisplayObject} from "pixi.js";
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
import {vnew} from "../utils/math/vector";
import {approachLinear} from "../utils/math/number";
import {findStage} from "../igua/findStage";

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

const sparkleColors = [0x70C050, 0x208050];
let sparkleColorIndex = 0;

function getSparkleColor() {
    return sparkleColors[(sparkleColorIndex++) % 2];
}

function readyToBePermanentlyDefeated(instance: WeakToSpellsInstance) {
    let center = vnew();
    let speed = 1;

    const c = container()
        .withAsync(async () => {
            while (true) {
                for (const box of instance.spellsHurtbox) {
                    if (instance.destroyed)
                        return c
                            .withAsync(async () => {
                                while (true) {
                                    sparkle(1 / 8, 23)
                                        .at(center.x + Math.sin(scene.s * Math.PI * 4) * 9 + rng.polar * speed, center.y + Math.cos(scene.s * Math.PI * 5 + 2) * 9 + rng.polar * speed)
                                        .tinted(getSparkleColor())
                                        .show(c);
                                    await sleep(20 + rng.int(30));
                                }
                            })
                            .withStep(() => {
                                center.y -= speed;
                                speed = approachLinear(speed, 6, 0.1);
                                if (center.y <= -16)
                                    c.destroy();
                            });
                    center.at(getWorldCenter(instance));
                    const r = getWorldBounds(box);
                    sparkle(1 / 4, 11).at(r.x + rng.int(r.width), r.y + rng.int(r.height)).tinted(getSparkleColor()).show(c);
                    await sleep(50 + rng.int(50));
                }
            }
        });

    c.show(findStage(instance));
}