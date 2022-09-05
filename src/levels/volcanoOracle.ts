import {scene} from "../igua/scene";
import {VolcanoOracleArgs} from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {jukebox} from "../igua/jukebox";
import {AnotherHouse, VolcanoSomething} from "../musics";
import {progress} from "../igua/data/progress";
import {player} from "../gameObjects/player";
import {container} from "../utils/pixi/container";
import {cutscene} from "../cutscene/cutscene";
import {sleep} from "../cutscene/sleep";
import {show} from "../cutscene/dialog";
import {AsshatTicker} from "../utils/asshatTicker";
import {clownWonderful} from "../gameObjects/clownWonderful";
import {BallonPop, Gate, OracleUnlockDoor} from "../sounds";
import {Vibratey} from "../igua/puppet/mods/vibratey";
import {wait} from "../cutscene/wait";
import {approachLinear} from "../utils/math/number";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {giftValuables} from "../cutscene/giftValuables";
import {ask} from "../cutscene/ask";
import {oracleAdviceVolcano} from "../igua/oracleAdvice";
import {decalsOf} from "../gameObjects/decal";
import {CrackSmall} from "../textures";

export function VolcanoOracle() {
    scene.backgroundColor = 0x60B0E0;
    scene.terrainColor = 0x6D1913;
    const level = applyOgmoLevel(VolcanoOracleArgs);

    decalsOf(CrackSmall).forEach(x => x.tinted(0x6D1913));

    jukebox.play(AnotherHouse).warm(VolcanoSomething);

    if (!progress.flags.volcano.rescuedOracle)
        enrichRescueOracle(level);
    else
        enrichSpeakingOracle(level);
}

function enrichRescueOracle(level: GameObjectsType<typeof VolcanoOracleArgs>) {
    level.Door.ext.showClosedMessage = false;
    player.x += 36;
    const hide = player.addChild(container().withStep(() => player.visible = false));
    cutscene.play(async () => {
        await sleep(200);
        hide.destroy();
        await sleep(500);
        await show(`Welcome to this town.`);
        const p = player.walkTo(level.Oracle.x + 48);
        await show(`I am the oracle of the volcano clan.`);
        await p;
        await show(`I see that your task has taken you quite far around the world.`);
        await show(`The invader presence here is quite heavy. Please be careful.`);

        const ticker = new AsshatTicker();
        scene.gameObjectStage.withStep(() => ticker.update());

        await sleep(300);
        Gate.play();
        await sleep(100);

        const stage = container().withTicker(ticker).show();
        const clown = clownWonderful().at([7, level.Door.height + 2].add(level.Door)).show(stage);
        for (let i = 0; i < 2; i++)
            ticker.update();
        ticker.doNextUpdate = false;

        level.Oracle.vspeed = -1;
        await sleep(30);
        player.scale.x = 1;
        await sleep(30);
        player.vspeed =-1;
        await sleep(70);
        level.Oracle.isDucking = true;
        level.Oracle.mods.add(Vibratey);
        await show(`Aah! Please help!`);
        BallonPop.play();
        level.Oracle.ext.opaqueAlpha = 1;
        let targetOracleAlpha = 0;
        const filter = container().withStep(() => {
            level.Oracle.ext.opaqueAlpha = approachLinear(level.Oracle.ext.opaqueAlpha, targetOracleAlpha, 0.1);
            level.Oracle.opaqueTint = 0xffffff;
        })
            .on('removed', () => level.Oracle.filters = [])
            .show(level.Oracle);

        level.Door.locked = true;
        ticker.doNextUpdate = true;

        scene.gameObjectStage.withAsync(async () => {
            await wait(() => clown.destroyed);
            await sleep(500);
            cutscene.play(async () => {
                level.Oracle.mods.remove(Vibratey);
                level.Oracle.isDucking = false;
                targetOracleAlpha = 1;
                await sleep(200);
                filter.destroy();
                const p = wait(() => player.engine.isOnGround).then(() => player.walkTo(level.Oracle.x + 48).then(() => player.scale.x = -1));
                await sleep(300);
                await show('Thank you for saving me.');
                await p;
                await show('Although the volcano clan was once the richest, this is all I can offer as thanks.');
                await giftValuables(50);
                await sleep(500);
                await show('If you need guidance on your mission, do not hesitate to ask me.');
                OracleUnlockDoor.play();
                progress.flags.volcano.rescuedOracle = true;
                enrichSpeakingOracle(level);
                level.Door.locked = false;
            })
        })
    })
}

function enrichSpeakingOracle(level: GameObjectsType<typeof VolcanoOracleArgs>) {
    let talkedAlready = false;
    level.Oracle.cutscene = async () => {
        if (!talkedAlready && progress.flags.volcano.rescuedOracle) {
            await show('Thank you for rescuing me.');
            talkedAlready = true;
        }

        if (await ask('Do you need some advice?'))
            await oracleAdviceVolcano();
        else
            await show('Come back anytime if you change your mind!');
    }
}