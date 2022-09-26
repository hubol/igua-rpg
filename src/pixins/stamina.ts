import {Pixin} from "../utils/pixi/pixin";
import {Force} from "../utils/types/force";
import {approachLinear} from "../utils/math/number";

export const Stamina = Pixin({ staminaMax: 100, staminaRefractoryFrames: 30, staminaRecovery: 1, stamina: 0 })
    .applies((src) => {
        src.stamina = src.staminaMax;

        let prevStamina = Force<number>();
        let refractory = 0;

        src.withStep(() => {
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
    });