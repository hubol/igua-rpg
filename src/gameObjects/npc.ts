import {game} from "../igua/game";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {Cutscene} from "../cutscene/cutscene";
import {merge} from "../utils/merge";
import {isPlayerInteractingWith} from "../igua/isPlayerInteractingWith";
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

    return puppet.withStep(() => {
        if (puppet.cutscene && isPlayerInteractingWith(puppet))
            game.cutscenePlayer.playCutscene(puppet.cutscene);
        if (!puppet.canWalkWhileCutsceneIsPlaying && puppet.isCutscenePlaying)
            puppet.hspeed = 0;
        if (puppet.canWalkWhileCutsceneIsPlaying || !puppet.isCutscenePlaying)
            puppet.engine.step();
    });
}