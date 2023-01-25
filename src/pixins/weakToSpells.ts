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

const filter = new OutlineFilter(1, PlayerSpellColor.Dark);

export const WeakToSpellsInstances = new SceneLocal(() => <WeakToSpellsInstance[]>[], 'WeakToSpellsInstances');

type WeakToSpellsArgs = { spellsHurtbox: DisplayObject[], clownHealth: ClownHealth };
export type WeakToSpellsInstance = DisplayObject & WeakToSpellsArgs & { showSpellEffectTimeFrames: number };

export const WeakToSpells = Pixin<WeakToSpellsArgs>()
    .applies(_src => {
        _src.on('removed', () => WeakToSpellsInstances.value.removeFirst(_src));

        if (progress.flags.final.enemiesCanBePermanentlyDefeated) {
            const id = `${progress.levelName}_${WeakToSpellsInstances.value.length}`;
            if (progress.flags.objects.permanentlyDefeatedEnemies.has(id))
                _src.withStep(() => _src.destroy());
            else {
                scene.gameObjectStage.withAsync(async () => {
                    await wait(() => _src.clownHealth.isDead && _src.clownHealth.hasTakenEnoughSpellDamageToBePermanentlyDefeated);
                    progress.flags.objects.permanentlyDefeatedEnemies.add(id);
                });
            }
        }

        const src = merge(_src, { showSpellEffectTimeFrames: 0 });
        WeakToSpellsInstances.value.push(src);

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