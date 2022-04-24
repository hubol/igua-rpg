import {Graphics, Sprite} from "pixi.js";
import {JungleTreeStump} from "../textures";
import {resolveGameObject} from "../igua/level/resolveGameObject";
import {resolvePipeHorizontal} from "./walls";
import {track} from "../igua/track";
import {waitHold} from "../cutscene/waitHold";
import {player} from "./player";
import {whiten} from "../utils/pixi/whiten";
import {lerp} from "../cutscene/lerp";
import {cutscene} from "../cutscene/cutscene";
import {sleep} from "pissant";
import {getPlayerCenterWorld} from "../igua/gameplay/getCenter";
import {container} from "../utils/pixi/container";
import {wait} from "../cutscene/wait";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {merge} from "../utils/merge";
import {progress} from "../igua/data/progress";
import {level} from "../igua/level/level";

export const resolveTreeStump = resolveGameObject('TreeStump', e => treeStump(e as any).at(e));

export const treeStump = track(treeStumpImpl);

function treeStumpImpl(e: { name: string, levelName: string, checkpointName: string, faceRight: boolean }) {
    const s = merge(Sprite.from(JungleTreeStump), e)
        .withAsync(async () => {
            resolvePipeHorizontal({ x: s.x - 17, y: s.y - 14, width: 32, visible: false } as any)
        });

    const mask = new Graphics().beginFill(0xffffff).drawRect(-17, -24, 32, 10).show(s).hide()
        .withAsync(async () => {
            await waitHold(() => player.isDucking && player.y < s.y - 8 && mask.collides(player), 10);
            cutscene.play(async () => {
                await descendPlayer();
                progress.checkpointName = s.checkpointName;
                level.goto(s.levelName);
            })
        })

    s.anchor.set(60 / 128, 16 / 64);
    return s;
}

async function descendPlayer() {
    const f = whiten(player);
    const c = container().show();
    c.withStep(() => {
        player.isDucking = true;
    });
    await lerp(f, 'factor').to(1).over(250);
    c.withStep(() => {
        player.visible = false;
    })
    const g = new Graphics().beginFill(0xffffff).drawCircle(0, 0, Math.abs(player.width) / 2 + 2).at(getPlayerCenterWorld()).show();
    let dy = 0;
    g.withStep(() => {
        g.scale.y = g.scale.x;
        g.y += dy;
    });

    for (let i = 0; i < 3; i++) {
        await sleep(70)
        g.visible = false;
        await sleep(50);
        g.visible = true;
        g.scale.x -= 0.1;
        dy += 0.5;
    }

    dy += 0.5;
    await lerp(g.scale, 'x').to(0.2).over(250);
    g.withStep(() => dy += 0.1);
    await wait(() => !isOnScreen(g))
    await sleep(250);
}