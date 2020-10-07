import {Container, DisplayObject} from "pixi.js";
import {IguanaPuppet} from "./iguanaPuppet";

export type IguanaPuppetMod = (puppet: IguanaPuppet) => DisplayObject;

export function makeIguanaMods(npc: Container)
{
    const currentMods = {} as any;

    return {
        has(mod: IguanaPuppetMod) {
            return !!currentMods[mod as any];
        },
        add(mod: IguanaPuppetMod) {
            if (this.has(mod))
                this.remove(mod);

            const displayObject = mod(npc as any);
            currentMods[mod as any] = displayObject;
            npc.addChild(displayObject);
        },
        remove(mod: IguanaPuppetMod) {
            if (!this.has(mod))
                return;
            currentMods[mod as any]?.destroy();
            currentMods[mod as any] = null;
        },
        toggle(mod: IguanaPuppetMod) {
            if (this.has(mod))
                this.remove(mod);
            else
                this.add(mod);
        }
    }
}