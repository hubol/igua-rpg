import {DisplayObject} from "pixi.js";
import {defaults as applyDefaults} from "../object/defaults";
import {merge} from "../object/merge";

export function Pixin<TValues extends {} = {}>(defaults = {} as TValues) {
    return {
        applies<TSrc extends DisplayObject, TDst extends TSrc>(apply: (src: TSrc & TValues) => TDst) {
            return function(overrides = {} as Partial<TValues>) {
                const args = applyDefaults(defaults, overrides);
                return <PixinType<TSrc, Omit<TDst, keyof TSrc>>>((src: TSrc) => apply(merge(src, args)));
            }
        }
    }
}

export type PixinType<TMinimum extends DisplayObject, TFeatures> = (src: TMinimum) => TFeatures