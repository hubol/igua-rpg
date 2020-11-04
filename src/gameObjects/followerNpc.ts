import {npc} from "./npc";
import {add} from "../utils/math/vector";
import {merge} from "../utils/merge";
import {player} from "./player";

type Npc = ReturnType<typeof npc>;

export function followerNpc(npc: Npc)
{
    let once = false;

    const followerNpc = merge(npc, { isFollowing: true });

    return followerNpc.withStep(() => {
        if (!followerNpc.isFollowing)
            return;

        if (!once || npc.hspeed === 0)
            npc.scale.x = player.scale.x;

        npc.isDucking = npc.hspeed === 0 && player.duckUnit >= 0.75;

        if (!once)
        {
            npc.at(desired.position);
            once = true;
        }

        const dx = desired.position.x - npc.x;
        npc.hspeed = Math.abs(dx) < 1 ? dx : dx * .9;

        // TODO lame copypaste:
        // TODO Need finer control over order of steps attached to game objects
        npc.hspeed = Math.min(npc.engine.walkSpeed, Math.abs(npc.hspeed)) * Math.sign(npc.hspeed);

        if (player.vspeed !== 0)
            npc.vspeed = player.vspeed;
    });
}

const desired = {
    get position() {
        return add({ x: player.scale.x * -34, y: 0 }, player);
    }
};