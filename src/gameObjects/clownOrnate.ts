import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";
import {clownOrnatePuppet} from "./clownOrnatePuppet";
import {clownHealth} from "./utils/clownUtils";
import {WeakToSpells} from "../pixins/weakToSpells";
import {Invulnerable} from "../pixins/invulnerable";
import {player} from "./player";
import {DisplayObject} from "pixi.js";
import {bouncePlayerOffDisplayObject} from "../igua/bouncePlayer";
import {ClownExplode, ClownHurt, ClownHurtDefended} from "../sounds";
import {trove180, ValuableTroveConfig} from "./valuableTrove";
import {confetti} from "./confetti";
import {getWorldCenter} from "../igua/gameplay/getCenter";
import {attack} from "./attacks";
import {AttackRunner} from "../pixins/attackRunner";
import {wave, WaveArgs} from "./wave";
import {container} from "../utils/pixi/container";
import {approachLinear} from "../utils/math/number";
import {rng} from "../utils/math/rng";

const Consts = {
    bodyDefense: 0.75,
    recoveryFrames: 15,
    defaultGravity: 0.3,

    damage: {
        slamWave: 70,
    },

    waves: {
        get slam() {
            return <WaveArgs>{ dx: 1, life: 30, count: 6, damage: Consts.damage.slamWave, ms: 33, w1: 10, w2: 10, h1: 32, h2: 64 };
        },
    }
}

export function clownOrnate() {
    const health = clownHealth(2000);
    const { auto, puppet } = clownOrnatePuppet();

    const p = puppet
        .withPixin(WeakToSpells({ clownHealth: health, spellsHurtbox: [ puppet.body.hurtbox, puppet.head.hurtbox ] }))
        .withPixin(Invulnerable())
        .withPixin(AttackRunner)
        .on('added', () => projectiles.show());

    p.gravity = Consts.defaultGravity;

    const projectiles = container().damageSource(p);

    function createSlamWaves() {
        wave(Consts.waves.slam).at(p).show(projectiles).add(24, 0);
        wave({ ...Consts.waves.slam, dx: Consts.waves.slam.dx * -1 }).at(p).show(projectiles).add(-24, 0);
    }

    const multiSlam = attack()
        .withAsyncOnce(async () => {
            for (let i = 0; i < 3; i++) {
                p.gravity = 0;
                p.speed.y = -2;
                await wait(() => p.y < 100);
                p.speed.y = 0;
                // TODO tell
                await sleep(125 + rng.int(250));
                p.speed.y = 0.5;
                p.gravity = 0.3;
                await wait(() => p.isOnGround);
                createSlamWaves();
                await sleep(125);
            }
            p.gravity = Consts.defaultGravity;
        })
        .withStep(() => {
            if (p.speed.y <= 0 && !p.isOnGround)
                p.x = approachLinear(p.x, player.x, 1);
        });

    async function doAs() {
        while (true) {
            await p.run(multiSlam());
        }
    }

    p.withAsync(doAs);

    function takeClawDamage(hurtbox: DisplayObject, defense: number) {
        if (player.collides(hurtbox)) {
            const defended = defense > 0;
            if (!health.damage(Math.round(player.doClawAttack() * (1 - defense))))
                (defended ? ClownHurtDefended : ClownHurt).play();
            p.invulnerable = Consts.recoveryFrames;
            bouncePlayerOffDisplayObject(hurtbox, defended ? 4 : 3);
            if (!defended)
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
    });

    return p;
}