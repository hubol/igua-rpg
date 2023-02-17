import {NgPlayerAttackBuffParticle} from "../textures";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {animatedSprite} from "../igua/animatedSprite";
import {derivedStats} from "../igua/gameplay/derivedStats";
import {getWorldBounds} from "../igua/gameplay/getCenter";
import {player} from "./player";
import {rng} from "../utils/math/rng";
import {scene} from "../igua/scene";

let i = 0;

export function showPlayerAttackBuffParticleStep() {
    i = (i + 1) % 2;
    if (i !== 0 || derivedStats.attackPower <= derivedStats.rawAttackPower || (!player.visible && player.invulnerableFrameCount <= 0) || scene.ticks < 2)
        return;
    particle().ahead();
}

const txs = subimageTextures(NgPlayerAttackBuffParticle, 3);

function particle() {
    const f = rng();
    let life = 20;
    let vspeed = rng() * -0.1;
    let hspeed = rng.polar * 0.05;
    let x = 0;
    let y = 1;
    const s = animatedSprite(txs, 1 / 5, true)
        .withStep(() => {
            if (life-- <= 0 || derivedStats.attackPower <= derivedStats.rawAttackPower)
                return s.destroy();
            const b = getWorldBounds(player.head.children[1]);
            s.x = b.x + f * b.width + x;
            s.y = b.y + y;
            x += hspeed;
            y += vspeed;
        })
        .centerAnchor();

    return s;
}