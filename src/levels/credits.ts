import {setSceneMeta} from "../igua/level/setSceneMeta";
import {npc} from "../gameObjects/npc";
import {IguaText} from "../igua/text";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {getWorldBounds, getWorldPos} from "../igua/gameplay/getCenter";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { CreditsArgs } from "../levelArgs";
import {DisplayObject, Graphics} from "pixi.js";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";

export function Credits() {
    scene.camera.x = 256;
    const level = applyOgmoLevel(CreditsArgs);
    scene.gameObjectStage.withAsync(() => showCredits(level));
}

async function showCredits(level: GameObjectsType<typeof CreditsArgs>) {
    const { Row0, Row1, Row2 } = level;

    const hubol = credit(26, 'Hubol', 'Audiovisual', 'Design', 'Program', 'Scenario').from(0, Row0);
    await hubol.walkTo(256 + 128);

    const oddwarg = credit(25, 'Oddwarg', 'Inspiration').from(1, Row1);
    await oddwarg.walkTo(256 + 128);

    const sylvie = credit(24, 'Sylvie', 'Playtest').from(0, Row2);
    await sylvie.walkTo(256 + 128);
}

function credit(styleId: number, name: string, ...roles: string[]) {
    const n = merge(npc(0, 0, styleId), { from }).show();
    n.engine.walkSpeed = 2;

    const role = IguaText.Large(roles.join(', ',).toUpperCase());
    // @ts-ignore
    role.anchor.set(0.5, 0);

    const g = new Graphics()
        .lineStyle(1, 0xffffff)
        .moveTo(Math.floor(-role.width / 2), 0)
        .lineTo(Math.floor(role.width / 2), 0)
        .at(0, 12);

    const person = IguaText.Large(name).at(0, 12);
    // @ts-ignore
    person.anchor.set(0.5, 0);

    const text = container(role, g, person)
        .withStep(() => {
            if (n.destroyed)
                return text.destroy();
            const p = getWorldPos(n);
            text.at(Math.round(p.x), Math.round(p.y));
        })
        .ahead();

    function from(side: 0 | 1, y: number | DisplayObject) {
        if (y instanceof DisplayObject)
            y = getWorldBounds(y).y;

        const b = getWorldBounds(n);
        const p = getWorldPos(n);
        const tr = Math.ceil(Math.max(role.width, person.width) / 2);

        const left = 256 - Math.max((p.x - b.x), tr);
        const right = 512 + Math.max(tr, (b.x + b.width)) - p.x;

        return n.at(side === 0 ? left : right, y);
    }

    return n;
}

setSceneMeta(Credits, { isLevel: false })