import {oversizedClown} from "./oversizedClown";
import {PoppingRock} from "../textures";
import {Sprite} from "pixi.js";
import {smallPop} from "./smallPop";
import {player} from "./player";
import {PoppingRockPop} from "../sounds";
import {makePseudo} from "../utils/math/makePseudo";
import {distance, Vector} from "../utils/math/vector";

const p = makePseudo(69);

export function poppingRock(pseudo = p) {
    const s = Sprite.from(PoppingRock).withStep(() => {
        if (player.collides(s)) {
            alertAngels(s);
            PoppingRockPop.play();
            smallPop(8, s.parent).at(s);
            s.destroy();
        }
    });

    s.anchor.set(0.5, 1);
    s.scale.x = p.bool() ? 1 : -1;

    return s;
}

function alertAngels(v: Vector) {
    oversizedClown.instances.forEach(x => {
        if (distance(v, [32, 20].add(x)) < 128)
            x.aggressive = true;
    });
}
