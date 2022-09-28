import {DisplayObject} from "pixi.js";
import {defaults as applyDefaults} from "../object/defaults";
import {merge} from "../object/merge";

export function Pixin<TValues extends {} = {}>(defaults = {} as TValues) {
    return {
        applies<TSrc extends DisplayObject, TDst extends TSrc>(apply: (src: TSrc & TValues) => TDst) {
            return applies<TSrc, TValues, TDst>(defaults, apply);
        },
        restricted<TSrc extends DisplayObject>() {
            return {
                applies<TDst extends TSrc>(apply: (src: TSrc & TValues) => TDst) {
                    return applies<TSrc, TValues, TDst>(defaults, apply);
                }
            }
        }
    }
}

function applies<TSrc extends DisplayObject, TValues extends {}, TDst extends TSrc>(defaults: TValues, apply: (src: TSrc & TValues) => TDst) {
    type Features = Omit<TDst, keyof TSrc>;

    return function(overrides = {} as Partial<TValues>) {
        const args = applyDefaults(defaults, overrides);
        return <PixinType<TSrc, Features>>((src: TSrc) => apply(merge(src, args)));
    }
}

export type PixinType<TMinimum extends DisplayObject, TFeatures> = (src: TMinimum) => TFeatures