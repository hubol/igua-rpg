import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";
import {clownOrnatePuppet} from "./clownOrnatePuppet";
import {clownHealth} from "./utils/clownUtils";
import {WeakToSpells} from "../pixins/weakToSpells";
import {Invulnerable} from "../pixins/invulnerable";
import {player} from "./player";
import {DisplayObject} from "pixi.js";
import {bouncePlayerOffDisplayObject} from "../igua/bouncePlayer";
import {ClownExplode, ClownHurt} from "../sounds";
import {trove180, ValuableTroveConfig} from "./valuableTrove";
import {confetti} from "./confetti";
import {getWorldCenter} from "../igua/gameplay/getCenter";

const Consts = {
    bodyDefense: 0.5,
    recoveryFrames: 15,
}

export function clownOrnate() {
    const health = clownHealth(2000);
    const { auto, puppet } = clownOrnatePuppet();

    const p = puppet
        .withPixin(WeakToSpells({ clownHealth: health, spellsHurtbox: [ puppet.body.hurtbox, puppet.head.hurtbox ] }))
        .withPixin(Invulnerable());

    function takeClawDamage(hurtbox: DisplayObject, defense: number) {
        if (player.collides(hurtbox)) {
            if (!health.damage(Math.round(player.doClawAttack() * (1 - defense))))
                ClownHurt.play(); // TODO different SFX for defended part
            p.invulnerable = Consts.recoveryFrames;
            bouncePlayerOffDisplayObject(hurtbox);
            p.x -= player.engine.knockback.x;
            return true;
        }
        return false;
    }

    function doDeath() {
        ClownExplode.play();
        ValuableTroveConfig.value.dropAll15 = p.vsPlayerHitCount === 0;
        trove180().at(p.x, 144).show();
        confetti(32, 64).at(getWorldCenter(p.head.hurtbox)).ahead();
        p.destroy();
    }

    p.withStep(() => {
        if (p.invulnerable > 0)
            return;

        if (!takeClawDamage(p.head.hurtbox, 0))
            takeClawDamage(p.body.hurtbox, Consts.bodyDefense);

        if (health.isDead)
            doDeath();
    })

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