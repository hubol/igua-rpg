import {Sprite} from "pixi.js";
import {ClownSpikeBall} from "../textures";
import {player} from "./player";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {track} from "../igua/track";

export const resolveSpike = resolveGameObject('Spike', e => spike().at(e));

export const spike = track(spikeImpl);

function spikeImpl(damage = 25) {
    const s = Sprite.from(ClownSpikeBall).withStep(() => {
        if (s.collides(player))
            player.damage(damage);
    });
    return s;
}