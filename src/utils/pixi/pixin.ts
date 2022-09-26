import {DisplayObject} from "pixi.js";
import {defaults as applyDefaults} from "../object/defaults";
import {merge} from "../object/merge";

export function Pixin<TValues extends {} = {}>(defaults = {} as TValues) {
    return {
        applies<TSrc extends DisplayObject>(apply: (src: TSrc & TValues) => void) {
            return function(overrides = {} as Partial<TValues>) {
                const args = applyDefaults(defaults, overrides);
                return <PixinType<TSrc, TValues>>((src: TSrc) => apply(merge(src, args)));
            }
        }
    }
}

export type PixinType<TSrc extends DisplayObject, TValues> = (src: TSrc) => void