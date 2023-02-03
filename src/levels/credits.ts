import {setSceneMeta} from "../igua/level/setSceneMeta";
import {npc} from "../gameObjects/npc";
import {IguaText} from "../igua/text";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {getWorldBounds, getWorldPos} from "../igua/gameplay/getCenter";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { CreditsArgs } from "../levelArgs";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {IguaRpgTitle} from "../textures";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {Dithered} from "../pixins/dithered";

export function Credits() {
    scene.backgroundColor = 0x002C38;
    scene.camera.x = 256;
    const level = applyOgmoLevel(CreditsArgs);
    scene.terrainStage.hide();
    scene.gameObjectStage.withAsync(() => showCredits(level));
}

function makeLogo() {
    const c = merge(container(), { fadeIn, fadeOut }).withPixin(Dithered({ dither: 0 }));

    const state = {
        purpleUnit: 0,
        yellowUnit: 0,
    };

    new Graphics().beginFill(0x005870).drawRect(0, 0, 300, 300).show(c);

    const purple = new Graphics()
        .withStep(() => {
            const radius = state.purpleUnit * 60;
            purple.clear().beginFill(0x9957AF).drawCircle(52, 30, radius);
        })
        .show(c);
    purple.mask = new Graphics().beginFill().drawRect(0, 0, 105, 60).show(c);

    const yellow = new Graphics().beginFill(0xCCAE0A).drawRect(109, 0, 107, 60)
        .withStep(() => {
            const off = 1 - state.yellowUnit;
            yellow.at(107 * off, 60 * off);
        })
        .show(c);
    yellow.mask = new Graphics().beginFill().drawRect(109, 0, 107, 60).show(c);

    c.filter(alphaMaskFilter(Sprite.from(IguaRpgTitle).show(c)));

    async function fadeIn() {
        await lerp(c, 'dither').to(1).over(1000);
        await lerp(state, 'purpleUnit').to(1).over(1000);
        await lerp(state, 'yellowUnit').to(1).over(1000);
    }

    async function fadeOut() {

    }

    return c;
}

async function showCredits(level: GameObjectsType<typeof CreditsArgs>) {
    const l = makeLogo().at(scene.camera.x + 20, 20).show();
    await l.fadeIn();

    await sleep(250);

    const { Row0, Row1, Row2 } = level;

    const hubol = credit(26, 'Hubol', 'Audiovisual', 'Design', 'Program', 'Scenario').from(0, Row1);
    await hubol.walkTo(256 + 128);

    await sleep(1000);

    const oddwarg = credit(25, 'Oddwarg', 'Inspiration').from(0, Row2);
    await oddwarg.walkTo(256 + 64);

    await sleep(250);

    const sylvie = credit(24, 'Sylvie', 'Playtest').from(1, Row2);
    await sylvie.walkTo(256 + 192);
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