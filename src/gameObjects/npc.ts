import {game} from "../igua/game";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {Cutscene} from "../cutscene/cutscene";
import {merge} from "../utils/merge";
import {isPlayerInteractingWith} from "../igua/isPlayerInteractingWith";
import {rejection} from "../utils/rejection";
import {getNpcStyle} from "./npcStyles";

export const resolveNpc = resolveGameObject("NpcIguana", e => {
    const n = game.gameObjectStage.addChild(npc(e.x, e.y - 8, (e as any).style));
    if (e.flippedX)
        n.scale.x *= -1;
    return n;
});

function makeCutscenePuppet(style: number)
{
    const puppet = getNpcStyle(style)();
    return merge(puppet, {
        cutscene: undefined as Cutscene | undefined,
        get isCutscenePlaying() {
            return this.cutscene && this.cutscene === game.cutscenePlayer.currentCutscene;
        },
        canWalkWhileCutsceneIsPlaying: false
    });
}

export function npc(x, y, style: number = 0)
{
    const puppet = makeCutscenePuppet(style);
    puppet.x = x;
    puppet.y = y;

    return merge(puppet, makeDriver(puppet)).withStep(() => {
        if (puppet.cutscene && isPlayerInteractingWith(puppet))
            game.cutscenePlayer.playCutscene(puppet.cutscene);
        puppet.engine.step();
    });
}

function makeDriver(puppet: ReturnType<typeof makeCutscenePuppet>)
{
    interface WalkPromise
    {
        x: number,
        resolve(),
        reject()
    }

    const next: WalkPromise[] = [];
    let current: WalkPromise | null;

    puppet.withStep(() => {
        if (!puppet.canWalkWhileCutsceneIsPlaying && puppet.isCutscenePlaying)
        {
            puppet.hspeed = 0;
            return;
        }

        while (true)
        {
            if (current)
            {
                const difference = puppet.x - current.x;
                const distance = Math.abs(difference);
                if (distance === 0 || (distance < 5 && Math.sign(difference) === Math.sign(puppet.hspeed)))
                {
                    puppet.hspeed = 0;
                    current.resolve();
                    current = null;
                }
                else
                {
                    puppet.hspeed = -Math.sign(difference) * puppet.engine.walkSpeed;
                    break;
                }
            }

            if (next.length === 0)
                break;

            current = next.shift() as WalkPromise;
        }
    })
        .on("removed", () => {
            current?.reject();
            next.forEach(x => x.reject());
        });

    return {
        walkTo(x: number)
        {
            return new Promise<void>((resolve, reject) =>
                next.push({ x, resolve, reject: () => reject(rejection("walkTo Promise rejected due to iguana puppet DisplayObject removal")) }))
        }
    };
}