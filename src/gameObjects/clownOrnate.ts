import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";
import {clownOrnatePuppet} from "./clownOrnatePuppet";

export function clownOrnate() {
    const { auto, puppet: p } = clownOrnatePuppet();

    auto.head.facePlayer = true;
    auto.eyes.lookAt = "player";
    auto.cheeks.alert = true;
    auto.body.facePlayer = true;

    p.withAsync(async () => {
        while (true) {
            await lerp(p.body.neck, 'extendingUnit').to(0).over(250);
            await sleep(1000);
            await lerp(p.body.neck, 'extendingUnit').to(1).over(250);
            await sleep(1000);
        }
    })
        .withAsync(async () => {
            await sleep(500);
            while (true) {
                p.speed.y = -5;
                p.speed.x = 2;
                await wait(() => p.isOnGround && p.speed.y >= 0);
                p.speed.x = 0;
                await sleep(1000);
                await p.body.walkTo(440);
                await sleep(2000);
                await p.body.walkTo(64);
                await sleep(2000);
            }
        })
        .withAsync(async () => {
            while (true) {
                p.body.fistR.offsetAngle = -15;
                for (let i = 0; i < 4; i++) {
                    await p.body.fistR.move(48, 50, 250);
                    await p.body.fistR.move(48, -15, 100);
                }
                p.body.fistR.autoRetract = true;
                await wait(() => !p.body.fistR.autoRetract);
            }
        })
        // .withAsync(async () => {
        //     await sleep(500);
        //     while (true) {
        //         await lerp(p.body, 'crouchingUnit').to(1).over(250);
        //         await sleep(2000);
        //         await lerp(p.body, 'crouchingUnit').to(0).over(250);
        //         await sleep(2000);
        //     }
        // })
        .withAsync(async () => {
            await sleep(750);
            while (true) {
                auto.eyes.lookAt = 'deadpan';
                auto.neck.wiggle = true;
                p.head.face.eyel.twitchOn = true;
                p.head.face.eyer.twitchOn = true;
                await sleep(1500);
                auto.eyes.lookAt = 'player';
                auto.neck.wiggle = false;
                p.head.face.eyel.twitchOn = false;
                p.head.face.eyer.twitchOn = false;
                await sleep(1500);
            }
        })

    return p;
}