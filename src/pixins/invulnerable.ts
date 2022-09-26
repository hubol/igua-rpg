import {Pixin} from "../utils/pixi/pixin";

export const Invulnerable = Pixin({ invulnerable: 0 })
    .applies((src) => {
        src.withStep(() => {
            src.visible = src.invulnerable > 0 ? !src.visible : true;
            src.invulnerable--;
        });
    });