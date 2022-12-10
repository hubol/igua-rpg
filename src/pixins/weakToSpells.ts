import {Pixin} from "../utils/pixi/pixin";
import {SceneLocal} from "../igua/sceneLocal";
import {DisplayObject} from "pixi.js";
import {ClownHealth} from "../gameObjects/utils/clownUtils";

export const WeakToSpellsInstances = new SceneLocal(() => <WeakToSpellsInstance[]>[], 'WeakToSpellsInstances');

type WeakToSpellsArgs = { spellsHurtbox: DisplayObject[], clownHealth: ClownHealth };
export type WeakToSpellsInstance = DisplayObject & WeakToSpellsArgs;

export const WeakToSpells = Pixin<WeakToSpellsArgs>()
    .applies(_src => {
        WeakToSpellsInstances.value.push(_src);
        _src.on('removed', () => WeakToSpellsInstances.value.removeFirst(_src));

        return _src;
    });