import {Graphics, Sprite} from "pixi.js";
import {JungleTreeStumpDestructive} from "../textures";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {resolvePipeHorizontal} from "./walls";
import {waitHold} from "../cutscene/waitHold";
import {player} from "./player";
import {cutscene} from "../cutscene/cutscene";
import {merge} from "../utils/object/merge";
import { scene } from "../igua/scene";
import {confetti} from "./confetti";
import {getWorldBounds} from "../igua/gameplay/getCenter";

export const resolveTreeStumpDestructive = resolveGameObject('TreeStumpDestructive', e => treeStumpDestructiveImpl().at(e));

function treeStumpDestructiveImpl() {
    const s = merge(Sprite.from(JungleTreeStumpDestructive), { playerIsOn: false})
        .withAsync(async () => {
            resolvePipeHorizontal({ x: s.x - 17, y: s.y - 14, width: 32, visible: false } as any)
        });

    const destruction = new Graphics().beginFill(0xff0000).drawRect(-scene.width, -4, scene.width * 2, 20).show(s).hide();

    const mask = new Graphics().beginFill(0xffffff).drawRect(-17, -24, 32, 10).show(s).hide()
        .withStep(() => {
            s.playerIsOn = player.y < s.y - 8 && mask.collides(player);
        })
        .withAsync(async () => {
            await waitHold(() => !cutscene.isPlaying && player.isDucking && s.playerIsOn, 10);
            scene.pipeStage.children.filter(x => x.collides(destruction)).forEach(destroyPipe as any);
            s.destroy();
        })

    s.anchor.set(60 / 128, 16 / 64);
    return s;
}

function destroyPipe(pipe: Sprite | Graphics) {
    const b = getWorldBounds(pipe);
    for (let i = 0; i < Math.abs(pipe.width); i += 16) {
        confetti(3, 12).at(b).ahead().add(i, pipe.height / 2);
    }
    pipe.destroy();
}
