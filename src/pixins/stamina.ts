import {Pixin} from "../utils/pixi/pixin";
import {Force} from "../utils/types/force";
import {approachLinear} from "../utils/math/number";
import {merge} from "../utils/object/merge";

export const Stamina = Pixin({ staminaMax: 100, staminaRefractoryFrames: 30, staminaRecovery: 1 })
    .applies((_src) => {

        let prevStamina = Force<number>();
        let refractory = 0;

        const src = merge(_src, { stamina: _src.staminaMax }).withStep(() => {
            if (prevStamina !== undefined) {
                src.stamina = Math.max(0, src.stamina);
                if (src.stamina < prevStamina)
                    refractory = src.staminaRefractoryFrames;
                else if (refractory > 0)
                    refractory--;
                else
                    src.stamina = approachLinear(src.stamina, src.staminaMax, src.staminaRecovery);
            }
            prevStamina = src.stamina;
        });

        return src;
    });