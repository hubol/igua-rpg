import {setSceneMeta} from "../igua/level/setSceneMeta";
import {npc} from "../gameObjects/npc";
import {IguaText} from "../igua/text";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {getWorldBounds, getWorldPos} from "../igua/gameplay/getCenter";
import {scene, sceneStack} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import { CreditsArgs } from "../levelArgs";
import {DisplayObject, Graphics, Sprite} from "pixi.js";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {CreditsAdvanceArrow, IguaRpgTitle} from "../textures";
import {alphaMaskFilter} from "../utils/pixi/alphaMaskFilter";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {Dithered} from "../pixins/dithered";
import {jukebox} from "../igua/jukebox";
import {CreditsMusic} from "../musics";
import {IguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {playerPuppet} from "../gameObjects/player";
import {Sleepy} from "../igua/puppet/mods/sleepy";
import {getCompletionText} from "../igua/data/getCompletion";
import {waitForInput} from "../cutscene/waitForInput";
import {wait} from "../cutscene/wait";
import {now} from "../utils/now";

export function Credits() {
    scene.backgroundColor = 0x002C38;
    scene.camera.x = 256;
    const level = applyOgmoLevel(CreditsArgs);
    scene.terrainStage.hide();
    scene.gameObjectStage.withAsync(async () => {
        await showCredits(level);
        scene.gameObjectStage.ext.finishedCredits = true;
    });
}

export async function showCreditsSequence() {
    // Walls will persist to the Credits if you use sceneStack.push...
    sceneStack.replace(Credits);
    await wait(() => scene.gameObjectStage.ext.finishedCredits);
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
    await jukebox.playAsync(CreditsMusic);
    jukebox.currentSong!.loop(false);

    const l = makeLogo().at(scene.camera.x + 20, 20).ahead();
    await l.fadeIn();

    await sleep(250);

    const { Row0, Row1, Row2 } = level;

    const hubol = credit(26, 'Hubol', 'Audiovisual', 'Design', 'Program', 'Scenario').from(0, Row1);
    await hubol.walkTo(256 + 128);

    await sleep(1000);

    const oddwarg = credit(25, 'Oddwarg', 'Inspiration').from(0, Row2);
    await oddwarg.walkTo(256 + 47);

    await sleep(250);

    const sylvie = credit(24, 'Sylvie', 'Playtest').from(1, Row2);
    await sylvie.walkTo(256 + 128);

    const izzy = credit(27, 'Izzy', 'Playtest').from(1, Row2);
    await izzy.walkTo(512 - 47);

    await sleep(4000);
    hubol.isDucking = true;
    await sleep(2000);
    hubol.ext.zColor = 0x005870;
    hubol.mods.add(Sleepy);
    await sleep(2000);

    for (const puppet of [ izzy, oddwarg, sylvie ])
        await leave(puppet);

    const you = credit(-1, `${getCompletionText()} Clear`, `Thank You`).from(1, Row2);
    await you.walkTo(256 + 128);

    await sleep(2000);
    await leave(you);

    await sleep(2000);

    const d = scene.gameObjectStage.withPixin(Dithered());
    await lerp(d, 'dither').to(0).over(500);
    scene.gameObjectStage.removeAllChildren();

    d.dither = 1;

    await sleep(1000);
    await showEndingMessages();
    await showFadeOut();
}

async function showEndingMessages() {
    const messages = [
        `Until recently, I had a delusion that I would someday become a person worthy of a Wikipedia article. I truly believed that with my many talents and output, success and attention were inevitable. But I got old and realized that these things were not coming to me. It still stings.`,
        `I love IguaRPG. It is silly, but it has a soul. It breaks my heart that it probably won't have much of an impact on the world. Worse, I can imagine that the wrong audience would say things about it that would really hurt me. But I do hope that its naive charm will leave a long-lasting impression on a few of its players. In fact, I hope it will inspire people to create their own games, much like Oddwarg Animal RPG did for me back in the mid-2000s.`,
        `At times, I feel powerless in my life. I find I am often dealing with things I do not understand or agree with. Creation has given me agency and an escape for the past 15 years. If you haven't tried it, you should.

Thank you.`,
    ];

    for (const message of messages) {
        const e = endingMessage(message).show();
        await waitForInput('Confirm');
        e.destroy();
        await sleep(150);
    }
}

async function showFadeOut() {
    jukebox.fadeOut(0, 1000);
    const g = new Graphics().beginFill(scene.backgroundColor).drawRect(0, 0, 1000, 1000).ahead();
    for (let i = 0.25; i <= 1; i += 0.25) {
        g.alpha = i;
        await sleep(200);
    }
}

function endingMessage(text: string) {
    const t = IguaText.Large(text, { maxWidth: 236 });
    t.at(scene.camera.x + (256 - t.width) / 2, 79 + (177 - t.height) / 2).vround();

    const arrowY = t.y + t.height + 8;
    const state = { alpha: 0 };

    const arrow = Sprite.from(CreditsAdvanceArrow).hide()
        .at(scene.camera.x + 113, arrowY)
        .withStep(() => {
            arrow.alpha = Math.round(state.alpha * 4) / 4;
            arrow.pivot.y = Math.sin(now.s * Math.PI);
        })
        .withAsync(async () => {
            await sleep(10_000);
            arrow.visible = true;
            await lerp(state, 'alpha').to(1).over(1000);
        });

    return container(t, arrow);
}

async function leave(puppet: IguanaPuppet) {
    const diff = puppet.x - (scene.camera.x + 128);
    if (Math.abs(diff) > 16) {
        puppet.scale.x = Math.sign(diff);
    }

    await sleep(250);
    puppet.walkTo(scene.camera.x + 128 + puppet.scale.x * 320);
    await sleep(250);
}

function makeIguanaPuppet(styleId: number): IguanaPuppet {
    if (styleId === -1) {
        const p = playerPuppet()
            .withStep(() => p.engine.step());
        return p;
    }

    return npc(0, 0, styleId);
}

function credit(styleId: number, name: string, ...roles: string[]) {
    const p = makeIguanaPuppet(styleId);
    const n = merge(p, { from }).show();
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
        .show();

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