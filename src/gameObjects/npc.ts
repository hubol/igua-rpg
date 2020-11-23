import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {cutscene, Cutscene} from "../cutscene/cutscene";
import {merge} from "../utils/merge";
import {isPlayerInteractingWith} from "../igua/logic/isPlayerInteractingWith";
import {getNpcStyle} from "./npcStyles";
import {scene} from "../igua/scene";

export const resolveNpc = resolveGameObject("NpcIguana", e => {
    const n = scene.gameObjectStage.addChild(npc(e.x, e.y, e.style));
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
            return this.cutscene && this.cutscene === cutscene.current;
        },
        canWalkWhileCutsceneIsPlaying: false
    });
}

export function npc(x, y, style: number = 0)
{
    const puppet = makeCutscenePuppet(style);
    puppet.x = x;
    puppet.y = y;

    return puppet.withStep(() => {
        if (puppet.cutscene && isPlayerInteractingWith(puppet))
            cutscene.play(puppet.cutscene);
        if (!puppet.canWalkWhileCutsceneIsPlaying && puppet.isCutscenePlaying)
            puppet.hspeed = 0;
        if (puppet.canWalkWhileCutsceneIsPlaying || !puppet.isCutscenePlaying)
            puppet.engine.step();
    });
}