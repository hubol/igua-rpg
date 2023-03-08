import {scene} from "../igua/scene";
import {FinalTempleOuterArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {ProgressBigKey} from "../igua/data/getCompletion";
import {BLEND_MODES, DisplayObject, Graphics, Sprite, Texture} from "pixi.js";
import {bigKeyMeter} from "../gameObjects/bigKey";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {progress} from "../igua/data/progress";
import {desertBigKeyTextures} from "./desertTemple";
import {jungleBigKeyTextures} from "./jungleTemple";
import {volcanoBigKeyTextures} from "./volcanoTemple";
import {capitalBigKeyTextures} from "./capitalTemple";
import {makeShadowCastFilter, ShadowCastAdditionalCasters, ShadowCastDirection} from "../gameObjects/lightRayCrude";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {Vector} from "../utils/math/vector";
import {capitalBricksWall} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {sparkly} from "../gameObjects/sparkleSmall";
import {Rectangle} from "../utils/math/rectangle";
import {terrainGradient} from "../gameObjects/outerGradient";
import {game} from "../igua/game";
import {oversizedDoor} from "../gameObjects/oversizedDoor";
import {decalsOf} from "../gameObjects/decal";
import {FinalPanicLight, FinalPanicLightGlow, FinalPanicLightLit, OpenDoor} from "../textures";
import {merge} from "../utils/object/merge";
import {approachLinear} from "../utils/math/number";
import {container} from "../utils/pixi/container";
import {show, showAll} from "../cutscene/dialog";
import {wait} from "../cutscene/wait";
import {player} from "../gameObjects/player";
import {sleep} from "../cutscene/sleep";
import {BigKeyCollected} from "../sounds";
import {sparkles} from "../gameObjects/sparkle";
import {jukebox} from "../igua/jukebox";
import {EmoWizard, FinalTempleMusic, TheOfficialEmoWizardSong} from "../musics";
import {npc} from "../gameObjects/npc";
import {cutscene} from "../cutscene/cutscene";
import {IguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {flipV} from "../utils/pixi/flip";
import {waitForInput} from "../cutscene/waitForInput";
import {castPlayerSpell} from "../gameObjects/playerSpell";
import {persistence} from "../igua/data/persistence";

export function FinalTempleOuter() {
    scene.backgroundColor = 0x536087;
    scene.terrainColor = 0x182840;
    const level = applyOgmoLevel(FinalTempleOuterArgs);

    jukebox.play(FinalTempleMusic).warm(EmoWizard, TheOfficialEmoWizardSong);

    [level.Sparkles1, level.Sparkles2].map(sparkly);

    capitalBricksWall(scene.width, scene.height, makePseudo(169.452)).behind(0).opaqueTint = 0x405080;

    enrichOutside(level);
    showLightRays(level);
    enrichDoor(level);

    enrichAmbush(level);

    game.hudStage.ticker.update();
}

function enrichAmbush(level: GameObjectsType<typeof FinalTempleOuterArgs>) {
    const ambush = progress.flags.final.playerMetEmoWizard
        && !progress.flags.final.oraclesLearnedTruth;
    if (!ambush)
        return;

    if (player.x > 150)
        player.x += 32;

    const targetX = 187;

    async function leave(puppet: IguanaPuppet) {
        await puppet.walkTo(level.Door.x);
        puppet.destroy();
    }

    async function ambushScene() {
        sleep(500).then(() => player.scale.x = -1);
        const [ npc0, npc1, npc2, npc3, ] = await enterOracles(level);
        await showAll(`Great, you opened the final temple.`,
            `Quickly, show us the weapon!`);
        await waitForInput('CastSpell');
        castPlayerSpell();
        npc3.engine.walkSpeed = 1;
        for (const npc of [npc1, npc3, npc2, npc0]) {
            await sleep(66);
            frown(npc, npc !== npc2);
        }
        jukebox.fadeOut(0, 100);
        await sleep(4000);
        await leave(npc3);
        await sleep(500);
        await leave(npc2);
        await sleep(250);
        await leave(npc1);
        await sleep(2000);
        await showAll(`I refuse to believe this.`,
            `I'm sure you did something wrong.`);
        await sleep(250);
        npc0.scale.x = -1;
        await sleep(250);
        await leave(npc0);
        progress.flags.final.oraclesLearnedTruth = true;
        progress.flags.capital.turnedFireplaceOn = false;
        await persistence.save();
    }

    scene.gameObjectStage.withAsync(async () => {
        if (player.x > targetX) {
            await Promise.race([
                wait(() => player.x <= targetX),
                sleep(1000),
            ]);
        }
        else
            await wait(() => player.x >= targetX);
        player.hspeed *= 0.2;
        player.x = Math.max(player.x, targetX - 7);
        cutscene.play(ambushScene);
    })
}

function enrichPanicLights() {
    const detail = 6;

    const decals = decalsOf(FinalPanicLight);
    const lights = decals.map(x => {
        const light = merge(x, { lit: false });
        const lit = Sprite.from(FinalPanicLightLit).show(light);
        lit.alpha = 0;
        lit.pivot.at(light.pivot);
        lit.anchor.at(light.anchor);
        const glow = Sprite.from(FinalPanicLightGlow).at(light).ahead();
        glow.pivot.set(12, 6);
        glow.angle = light.angle;
        glow.alpha = 0;
        glow.blendMode = BLEND_MODES.ADD;

        let _lalpha = 0;
        let _galpha = 0;

        light.withStep(() => {
            _lalpha = approachLinear(_lalpha, light.lit ? 1 : 0, light.lit ? 0.3 : 0.02);
            _galpha = approachLinear(_galpha, light.lit ? 1 : 0, light.lit ? 0.15 : 0.075);

            lit.alpha = Math.round(_lalpha * detail) / detail;
            glow.alpha = Math.round(_galpha * detail) / detail;
        });

        return light;
    });

    let index = 0;
    const c = merge(container(), { animate: false })
        .withStep(() => {
            for (const light of lights)
                light.lit = false;

            if (!c.animate)
                return;

            index += 0.1;
            lights[Math.floor(index) % lights.length].lit = true;
        })
        .show();

    return c;
}

function frown(puppet: IguanaPuppet, flip = true) {
    const mouths = <Sprite[]>puppet.find(x => x.ext._isMouth);
    if (flip) {
        mouths.forEach(x => {
            flipV(x);
            x.y -= 1;
        });
    }
}

const oracleStyleIds = [ 0, 10, 13, 2 ].reverse();

async function enterOracles(level: GameObjectsType<typeof FinalTempleOuterArgs>) {
    const startx = -20;
    const dxs = [ 6, 53, 32, 80 ].reverse();
    const c = container().show();
    c.sortableChildren = true;
    const npcs = oracleStyleIds.map(id => npc(level.Door.x + 30 + startx - 4, level.Door.y + 32, id).hide().show(c));
    c.withStep(() => {
        for (const child of c.children)
            child.zIndex = child.y - Math.round(child.x * 0.1);
    });
    ShadowCastAdditionalCasters.value.push(c);

    async function show(i: number) {
        const npc = npcs[i];
        const dx = dxs[i];
        npc.visible = true;
        await sleep(125);
        npc.walkTo(npc.x + dx - startx);
    }

    await show(0);
    await sleep(1000);
    await show(1);
    await show(2);
    await show(3);

    return [npcs[0], npcs[1], npcs[2], npcs[3]] as const;
}

function enrichDoor(level: GameObjectsType<typeof FinalTempleOuterArgs>) {
    const { desert, jungle, volcano, capital } = progress.flags;

    const desertKey = showBigKeyMeter(desert.bigKey, desertBigKeyTextures, level.BigKey1);
    const jungleKey = showBigKeyMeter(jungle.bigKey, jungleBigKeyTextures, level.BigKey2);
    const volcanoKey = showBigKeyMeter(volcano.bigKey, volcanoBigKeyTextures, level.BigKey3);
    const capitalKey = showBigKeyMeter(capital.bigKey, capitalBigKeyTextures, level.BigKey4);

    const lights = enrichPanicLights();

    const d = oversizedDoor().at([-16, -32].add(level.FinalDoor)).show();

    if (progress.flags.final.doorOpened) {
        d.destroy();
        return;
    }

    level.FinalDoor.ext.showClosedMessage = false;
    level.FinalDoor.locked = true;
    level.FinalDoor.withStep(() => level.FinalDoor.texture = OpenDoor);

    if (!allBigKeyPiecesCollected()) {
        d.withCutscene(async () => {
            await show(`It doesn't budge.`);
        });
        return;
    }

    d.withAsync(async () => {
        await wait(() => d.collides(player));

        for (const key of [desertKey, jungleKey, volcanoKey, capitalKey]) {
            BigKeyCollected.play();
            const p = getWorldCenter(key);
            sparkles(p.x, p.y, 10, 32, 100);
            await sleep(500);
        }

        lights.animate = true;
        await sleep(2000);

        d.active = true;
        await wait(() => d.complete);
        lights.animate = false;
        level.FinalDoor.locked = false;
        progress.flags.final.doorOpened = true;
    });
}

function draw(g: Graphics, r: Rectangle) {
    g.drawRect(r.x, r.y, r.width, r.height);
}

const terrainColors = [0x182840, 0x1D2E48, 0x233755, 0x2A4161];

function enrichOutside(level: GameObjectsType<typeof FinalTempleOuterArgs>) {
    const g = new Graphics().beginFill(0x242635).drawRect(0, 0, level.OutsideRegion.width, level.OutsideRegion.height).behind();
    const edges = [level.Outside1, level.Outside2, level.Outside3, level.Outside4, level.Outside5];
    edges.forEach(x => draw(g, x));
    for (let x = 0; x < scene.width; x += 16) {
        g.drawRect(x + 4, level.OutsideRegion.y + level.OutsideRegion.height, 8, 3);
    }

    terrainGradient(edges, terrainColors);
}

const lightRayColors = [0xe0b0b0, 0xc0a0a0];

function simpleLightRay(g: Graphics, v: Vector) {
    const r1 = 15;
    const r2 = 30;
    const o1 = 1.067;
    const o2 = 1.15;
    const y1 = 33;

    for (let i = 0; i < lightRayColors.length; i++) {
        const oo1 = Math.pow(o1, i + 1);
        const oo2 = Math.pow(o2, i + 1);
        const dy = (lightRayColors.length - i - 1) * -2;

        g
            .beginFill(lightRayColors[i])
            .moveTo(v.x + r1 * oo1, 0)
            .lineTo(v.x + r2 * oo2, 194 + dy + y1)
            .lineTo(v.x, 194 + dy + 2 + y1)
            .lineTo(v.x - r2 * oo2, 194 + dy + y1)
            .lineTo(v.x - r1 * oo1, 0)
            .closePath()
    }

    return g
        .beginFill(0xffffff)
        .moveTo(v.x + r1, 0)
        .lineTo(v.x + r2, 191 + y1)
        .lineTo(v.x, 192 + y1)
        .lineTo(v.x - r2, 191 + y1)
        .lineTo(v.x - r1, 0)
        .closePath();
}

function showLightRays(level: GameObjectsType<typeof FinalTempleOuterArgs>) {
    const g = new Graphics();

    for (const v of [ level.LightRay1, level.LightRay2 ])
        simpleLightRay(g, v);

    // g.alpha = 0.3;
    g.tint = 0x5D6166;
    g.alpha = 0.3;

    ShadowCastDirection.value.x = 0;

    g.ahead();
    g.filter(makeShadowCastFilter()).ahead();
    g.filters[0].blendMode = BLEND_MODES.ADD;
}

function allBigKeyPiecesCollected() {
    return allPiecesCollected(progress.flags.desert.bigKey)
        && allPiecesCollected(progress.flags.jungle.bigKey)
        && allPiecesCollected(progress.flags.volcano.bigKey)
        && allPiecesCollected(progress.flags.capital.bigKey);
}

function allPiecesCollected(bigKey: ProgressBigKey) {
    return bigKey.piece1 && bigKey.piece2 && bigKey.piece3;
}

const compass = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1]
];

function showBigKeyMeter(bigKey: ProgressBigKey, txs: Texture[], at: DisplayObject) {
    const main = makeBigKeyMeter(bigKey, txs);
    const bg = compass.map(x => {
       const key = makeBigKeyMeter(bigKey, txs).at(x);
       key.opaqueTint = scene.backgroundColor;
       return key;
    });
    return container(...bg, main).at(getWorldCenter(at)).behind();
}

function makeBigKeyMeter(bigKey: ProgressBigKey, txs: Texture[]) {
    const m = bigKeyMeter(
        [txs[0], bigKey.piece1],
        [txs[1], bigKey.piece2],
        [txs[2], bigKey.piece3],)
    m.pivot.set(m.width / 2, m.height / 2);
    return m;
}