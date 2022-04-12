import {npc} from "./npc";
import {merge} from "../utils/merge";
import {player} from "./player";

type Npc = ReturnType<typeof npc>;

export function followerNpc(npc: Npc)
{
    let once = false;

    const vspeeds: number[] = [];
    const followerNpc = merge(npc, { isFollowing: true });

    const scaleXHistory: number[] = [];

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
        npc.hspeed = dx;

        // TODO lame copypaste:
        // TODO Need finer control over order of steps attached to game objects
        npc.hspeed = Math.min(npc.engine.walkSpeed, Math.abs(npc.hspeed)) * Math.sign(npc.hspeed);

        vspeeds.push(player.vspeed);
        if (vspeeds.length >= 15)
        {
            const vspeed = vspeeds.shift() as number;
            if (vspeed < 0)
                npc.vspeed = vspeed;
        }
    }).withStep(() => {
        scaleXHistory.push(npc.scale.x);
        if (scaleXHistory.length > 3)
            scaleXHistory.shift();
        npc.scale.x = Math.sign(((scaleXHistory[0] ?? 0) + (scaleXHistory[1] ?? 0) + (scaleXHistory[2] ?? 0)) / scaleXHistory.length);
    });
}

const desired = {
    get position() {
        return { x: player.scale.x * -(Math.abs(player.width) + 4), y: 0 }.add(player);
    }
};
