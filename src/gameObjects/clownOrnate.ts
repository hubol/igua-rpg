import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";
import {clownOrnatePuppet, EyeShape, MouthShape} from "./clownOrnatePuppet";
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
import {AoeHitboxes} from "./utils/aoeHitboxes";
import {lerp} from "../cutscene/lerp";
import {merge} from "../utils/object/merge";
import {waitHold} from "../cutscene/waitHold";
import {isOnScreen} from "../igua/logic/isOnScreen";
import {empBlast} from "./empBlast";

const Consts = {
    bodyDefense: 0.75,
    recoveryFrames: 15,
    defaultGravity: 0.3,

    damage: {
        slamWave: 70,
        slamGround: 90,
        slamHugeWave: 90,
        hairEmpBlast: 100,
    },

    waves: {
        get slam() {
            return <WaveArgs>{ dx: 1, life: 30, count: 6, damage: Consts.damage.slamWave, ms: 33, w1: 10, w2: 10, h1: 32, h2: 64 };
        },
        get hugeSlam() {
            return <WaveArgs>{ dx: 1, life: 22, count: 8, damage: Consts.damage.slamHugeWave, ms: 17, w1: 12, w2: 12, h1: 96, h2: 128 };
        },
    }
}

export function clownOrnate() {
    const health = clownHealth(2400);
    const { auto, puppet } = clownOrnatePuppet();

    const p = merge(puppet, { hostile: false })
        .withPixin(WeakToSpells({ clownHealth: health, spellsHurtbox: [ puppet.body.hurtbox, puppet.head.hurtbox ] }))
        .withPixin(Invulnerable())
        .withPixin(AttackRunner)
        .on('added', () => {
            projectilesBehind.show(p.parent, p.index);
            projectilesAhead.show();
        });

    p.gravity = Consts.defaultGravity;

    const projectilesAhead = container().damageSource(p);
    const projectilesBehind = container().damageSource(p);
    const aoe = new AoeHitboxes(projectilesAhead);
    // aoe.visible = true;

    function createSlamWaves(key: keyof typeof Consts['waves']) {
        aoe.new(36, 9, 10, Consts.damage.slamGround).at([-18, -9].add(p));
        wave(Consts.waves[key]).at(p).show(projectilesAhead).add(24, 2);
        wave({ ...Consts.waves[key], dx: Consts.waves[key].dx * -1 }).at(p).show(projectilesAhead).add(-24, 2);
    }

    const multiSlam = attack({ _canFollowPlayer: true, _tdx: 0, _aggressive: false })
        .withAsyncOnce(async (self) => {
            self._aggressive = health.unit < 0.67;
            auto.head.face = 'player';
            auto.body.face = 'player';
            for (let i = 3; i > 0; i--) {
                const isFinal = i === 1;

                p.gravity = 0;
                p.speed.y = self._aggressive ? -3 : -2;
                self._canFollowPlayer = true;
                const startY = p.y;
                auto.neck.wiggle = true;

                if (isFinal) {
                    p.body.fistL.offsetAngle = 180 + 45;
                    p.body.fistR.offsetAngle = -45;
                    p.body.fistL.move(50, 180 - 45, 500);
                    p.body.fistR.move(50, 45, 500);
                }

                await Promise.race([
                    wait(() => p.y < startY - 92),
                    sleep(3000)]);
                p.speed.y = 0;
                // TODO tell
                await sleep(25 + rng.int(250));
                auto.neck.wiggle = false;
                self._canFollowPlayer = false;
                p.head.face.eyel.shape = EyeShape.Cross;
                p.head.face.eyer.shape = EyeShape.Cross;
                await sleep(isFinal ? 200 : 160);
                p.head.face.mouth.imageIndex = MouthShape.OpenFrown;
                p.speed.y = isFinal ? 1.5 : 0.5;
                p.gravity = isFinal ? 0.9 : 0.75;
                await wait(() => p.isOnGround);
                p.speed.x = 0;
                p.head.face.mouth.imageIndex = MouthShape.SmileSmall;
                createSlamWaves(isFinal ? 'hugeSlam' : 'slam');

                if (isFinal) {
                    await lerp(p.body, 'crouchingUnit').to(1).over(50);
                }

                await sleep(125);
                p.head.face.mouth.imageIndex = MouthShape.Smile;
                p.head.face.eyel.shape = EyeShape.Default;
                p.head.face.eyer.shape = EyeShape.Default;

                if (isFinal) {
                    p.body.fistL.autoRetract = true;
                    p.body.fistR.autoRetract = true;
                    await sleep(250);
                    await lerp(p.body, 'crouchingUnit').to(0).over(300);

                    await wait(() => !p.body.fistL.autoRetract && !p.body.fistL.autoRetract);
                }
            }
        })
        .withStep((self) => {
            if (p.speed.y > 2 && p.body.fistL.offset > 40) {
                p.body.fistL.offset = approachLinear(p.body.fistL.offset, 40, 0.3);
                p.body.fistR.offset = approachLinear(p.body.fistR.offset, 40, 0.3);

                p.body.fistL.offsetAngle = approachLinear(p.body.fistL.offsetAngle, 180 + 11, 5);
                p.body.fistR.offsetAngle = approachLinear(p.body.fistR.offsetAngle, -11, 5);
            }
            const canMoveWhileMidair = self._canFollowPlayer && !p.isOnGround;
            if (!canMoveWhileMidair)
                return self._tdx = 0;
            let tx = player.x;
            const center = getWorldCenter(p.head.hurtbox);
            if (player.y < center.y)
                tx = player.x + 82 * Math.sign(center.x - player.x + 0.01);
            const maxSpeed = self._aggressive ? 3 : 1.33;
            const next = approachLinear(p.x, tx, maxSpeed);
            self._tdx = next - p.x;
        })
        .withStep((self) => {
            p.speed.x = approachLinear(p.speed.x, self._tdx, 0.1);
        })
        .withCleanup(() => {
            p.speed.x = 0;
        });

    const shockHeadArea = attack({ _aggressive: false })
        .withAsyncOnce(async (self) => {
            self._aggressive = health.unit < 0.67;

            auto.head.face = 'middle';
            auto.body.face = 'middle';

            // TODO sfx
            auto.cheeks.alert = true;
            p.head.hair.sparks.active = true;
            p.head.face.eyel.twitchOn = true;
            p.head.face.eyer.twitchOn = true;

            let _pedometerAccel = 0.4;
            let _pedometer = 0;
            p.body.autoPedometer = false;
            const excitedFeet = container()
                .withStep(() => {
                    _pedometer += Math.min(5, _pedometerAccel);
                    _pedometerAccel += 0.2;
                    p.body.pedometer = Math.round(_pedometer);
                })
                .on('removed', () => {
                    p.body.pedometer = 0;
                    p.body.autoPedometer = true;
                })
                .show(self);

            await sleep(self._aggressive ? 333 : 500);
            auto.eyes.lookAt = 'deadpan';
            const blast = empBlast(self._aggressive ? 72 : 64, 1, Consts.damage.hairEmpBlast, 1000, self._aggressive ? 500 : 750, self._aggressive ? 30 : 45)
                .at([0, -48].add(getWorldCenter(p.head.hurtbox)))
                .show(projectilesBehind);
            await wait(() => blast.wentHostile);
            excitedFeet.destroy();
            auto.cheeks.alert = false;
            auto.eyes.lookAt = 'player';
            p.head.hair.sparks.active = false;
            p.head.face.mouth.imageIndex = MouthShape.OpenFrown;
            lerp(p.body.neck, 'extendingUnit').to(0).over(100);
            await lerp(p.body, 'crouchingUnit').to(1).over(50);
            await sleep(150);
            p.head.face.eyel.twitchOn = false;
            p.head.face.eyer.twitchOn = false;
            p.head.face.mouth.imageIndex = MouthShape.Smile;
            lerp(p.body.neck, 'extendingUnit').to(1).over(100);
            await lerp(p.body, 'crouchingUnit').to(0).over(100);
        });

    async function run(d: DisplayObject) {
        await p.run(d);
        auto.head.face = 'off';
        auto.body.face = 'off';
        p.gravity = Consts.defaultGravity;
    }

    async function doAs() {
        await wait(() => p.isOnGround);
        await Promise.race([
            waitHold(() => isOnScreen(p), 30),
            health.tookDamage(),
        ]);
        p.hostile = true;
        while (true) {
            await run(multiSlam());
            await run(shockHeadArea());
        }
    }

    p.withAsync(doAs);

    function carryPlayerStep() {
        if (p.speed.y < 0 && p.head.hurtbox.collides(player))
            player.y += p.speed.y;
    }

    function takeClawDamage(hurtbox: DisplayObject, defense: number) {
        if (player.collides(aoe.hitboxes) || (player.hspeed === 0 && player.vspeed === 0))
            return false;
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
        projectilesBehind.destroy();
        projectilesAhead.destroy();
    }

    p.withStep(() => {
        if (p.invulnerable > 0)
            return;

        if (!takeClawDamage(p.head.hurtbox, 0))
            takeClawDamage(p.body.hurtbox, Consts.bodyDefense);
        if (health.isDead)
            doDeath();
    });
    p.withStep(carryPlayerStep);

    return p;
}