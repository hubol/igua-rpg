import {resolveNpc} from "./npc";
import {vnew} from "../utils/math/vector";
import {container} from "../utils/pixi/container";
import {Sprite} from "pixi.js";
import {KeyGreen, PrisonTiny} from "../textures";
import {progress} from "../igua/data/progress";
import {wait} from "../cutscene/wait";
import {confetti} from "./confetti";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {ClownExplode, CollectGeneric} from "../sounds";
import {sleep} from "../cutscene/sleep";
import {Vibratey} from "../igua/puppet/mods/vibratey";
import {ask} from "../cutscene/ask";
import {show} from "../cutscene/dialog";
import {inventory} from "../igua/inventory/inventory";
import {potions} from "../igua/inventory/potions";
import {player} from "./player";
import {expressBouncy} from "../cutscene/expressBouncy";
import {cutscene} from "../cutscene/cutscene";

export function prankster() {
    const { volcano } = progress.flags;

    const npc = resolveNpc({ ...vnew(), style: 18 } as any)
        .withAsync(async () => {
            await sleep(1);
            cagedKey().at([16, -36].add(npc)).show(npc.parent);
        });

    npc.withCutscene(async () => {
        if (volcano.satisfiedPrankster) {
            await show(`It was an honor to share my final prank with you.`);
            return;
        }
        else {
            if (!await ask(`I can see that you're eyeing my item. Do you want it?`)) {
                await show(`Oh. Okay!`);
                return;
            }
            await show(`Heh! Okay, you asked for it!`);
            await sleep(200);
            const poisonsToGiveCount = Math.max(inventory.freeSlotsCount, 1);

            for (let i = 0; i < poisonsToGiveCount; i++) {
                inventory.push('CommonPoison');
                CollectGeneric.play();
                await sleep(70);
            }

            await sleep(180 + 200);

            await show(`Received ${potions.CommonPoison.name}${poisonsToGiveCount === 1 ? '' : ` x${poisonsToGiveCount}`}.`);
            await sleep(200);

            await expressBouncy(player);
            await sleep(200);
            await expressBouncy(npc);

            await show(`That's not the item you were talking about? Interesting!`);
            await show(`You should have been more specific, especially since you are talking with the volcano clan's greatest prankster!`);

            await sleep(1000);

            npc.mods.remove(Vibratey);
            npc.isDucking = false;

            await sleep(500);

            await show(`Well, you're in luck. That was my last prank ever.`);
            await show(`Please accept this to commemorate this event.`);

            await sleep(500);

            volcano.satisfiedPrankster = true;
        }
    })

    npc.ext.vibrateMs = 200;
    npc.mods.add(Vibratey);
    npc.duckImmediately();

    return npc;
}

function cagedKey() {
    const { volcano } = progress.flags;

    const cage = Sprite.from(PrisonTiny);
    const key = Sprite.from(KeyGreen)
        .at(4, 3)
        .withStep(() => {
            key.ext.collectible = volcano.satisfiedPrankster && !cutscene.isPlaying;
            cage.visible = !key.ext.collectible;
        })
        .asCollectible(volcano.key, 'fromPrankster');

    return container(key, cage)
        .withAsync(async () => {
            await wait(() => !volcano.satisfiedPrankster);
            await wait(() => volcano.satisfiedPrankster);
            confetti().at(getWorldCenter(key)).ahead();
            ClownExplode.play();
        });
}