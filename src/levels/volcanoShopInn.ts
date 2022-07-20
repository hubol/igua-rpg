import {scene} from "../igua/scene";
import { VolcanoShopInnArgs } from "../levelArgs";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {cracks} from "../gameObjects/cracks";
import {jukebox} from "../igua/jukebox";
import {VolcanoCaveMusic, VolcanoSomething} from "../musics";
import {mirror} from "../gameObjects/mirror";
import {heatWaves} from "../gameObjects/heatWaves";
import {shop} from "../igua/inventory/shop";
import {show} from "../cutscene/dialog";
import {privacyCurtain} from "../gameObjects/privacyCurtain";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {GameObjectsType} from "../igua/level/applyOgmoLevelArgs";
import {chargeToRestAtInn} from "../igua/logic/restAtInn";
import {player} from "../gameObjects/player";
import {progress} from "../igua/data/progress";

export function VolcanoShopInn() {
    scene.backgroundColor = 0xA8B1E0;
    scene.terrainColor = 0;
    const level = applyOgmoLevel(VolcanoShopInnArgs);

    jukebox.play(VolcanoSomething).warm(VolcanoCaveMusic);

    {
        const window = mirror(level.Window1.width, level.Window1.height, 0x9F4F5D, 0xC38792).at(level.Window1).behind();
        const windowWaves = heatWaves(scene.width + 256, 80, -0.33).at(-128, 300 - 30 - level.Window1.y - 40);
        windowWaves.scale.y = 0.5;
        windowWaves.mask = window.children[0] as any;
        window.addChildAt(windowWaves, 2);
    }

    const indoorsHeatWaveIndex = scene.backgroundGameObjectStage.getChildIndex(level.VolcanoBrickWall) + 1;
    scene.backgroundGameObjectStage.addChildAt(heatWaves(scene.width + 256, 80, 0).at(-128, 280), indoorsHeatWaveIndex);

    scene.backgroundGameObjectStage.addChildAt(cracks(3245.1269, 0x755E9B), 1);

    level.Shopkeeper.cutscene = async () => {
        const purchases = await shop();
        if (purchases.length > 0)
            await show("Thanks for stopping by!");
        else
            await show("Come back later!");
    };

    enrichInnkeeper(level);
}

function enrichInnkeeper(level: GameObjectsType<typeof VolcanoShopInnArgs>) {
    const innCurtain = privacyCurtain().at(192 - 19, 129).ahead();
    level.Innkeeper.cutscene = async () => {
        let rested = false;
        await chargeToRestAtInn(async () => {
            rested = true;
            await player.walkTo(innCurtain.x + 31);
            await sleep(125);
            player.scale.x = -1;
            await sleep(125);
            await lerp(innCurtain, 'opened').to(1).over(500);
            progress.checkpointName = "FromInnSave";
        });
        if (rested)
            await lerp(innCurtain, 'opened').to(0).over(500);
    };
}
