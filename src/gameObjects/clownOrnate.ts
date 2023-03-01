import {sleep} from "../cutscene/sleep";
import {wait} from "../cutscene/wait";
import {clownOrnatePuppet, EyeShape, MouthShape, PupilShape} from "./clownOrnatePuppet";
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
import {ornateProjectile} from "./clownOrnateProjectiles";
import {FreeSpace} from "../pixins/freeSpace";
import {vnew} from "../utils/math/vector";
import {reducedRepetitionRng} from "../utils/math/reducedRepetitionRng";

const Consts = {
    bodyDefense: 0.75,
    recoveryFrames: 15,
    defaultGravity: 0.3,

    damage: {
        slamWave: 70,
        slamGround: 90,
        slamHugeWave: 90,
        hairEmpBlast: 100,
        slamFist: 70,
        bowledSpikeBall: 100,
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
    let framesSinceHeadClawDamage = 100000;
    const health = clownHealth(2400);
    const { auto, puppet } = clownOrnatePuppet();

    const p = merge(puppet, { hostile: false })
        .withPixin(WeakToSpells({ clownHealth: health, spellsHurtbox: [ puppet.body.hurtbox, puppet.head.hurtbox ] }))
        .withPixin(Invulnerable())
        .withPixin(AttackRunner)
        .withPixin(FreeSpace({ offsets: [[0, -8]] }))
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

    const shockHeadArea = attack({ _aggressive: false, punish: false })
        .withAsyncOnce(async (self) => {
            self._aggressive = self.punish || health.unit < 0.67;

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

            await sleep(self._aggressive ? (self.punish ? 150 : 333) : 500);
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

    const runTowardsAndFistSlam = attack({ _aggressive: false })
        .withAsyncOnce(async (self) => {
            let _tdx = 0;

            self.withStep(() => p.speed.x = approachLinear(p.speed.x, _tdx, 0.5));

            self._aggressive = health.unit < 0.67;

            const dir = Math.sign(player.x - p.x) || 1;
            auto.head.face = 'hspeed';
            auto.body.face = 'hspeed';

            const fist = dir > 0 ? p.body.fistL : p.body.fistR;
            const startAngle = fist === p.body.fistL ? 180 : 0;
            const raisedAngle = fist === p.body.fistL ? 135 : 45;
            const windUpAngle = fist === p.body.fistL ? 150 : 30;
            const slammedAngle = fist === p.body.fistL ? -20 : 200;

            fist.offsetAngle = startAngle;
            const raiseFist = fist.move(64, raisedAngle, 200);
            const spike = ornateProjectile.spikeBall(Consts.damage.slamFist, fist).show(projectilesAhead);
            spike.framesUntilDangerous = 1000000;
            spike.knockback.x = dir * 2.5;

            _tdx = dir * 3;

            if (dir > 0)
                p.head.face.eyel.shape = EyeShape.Cross;
            else
                p.head.face.eyer.shape = EyeShape.Cross;

            const freeSpaceFn = dir > 0 ? p.freeSpaceOnRight : p.freeSpaceOnLeft;
            await Promise.all([
                wait(() => (Math.abs(player.x - p.x) < 64 && Math.abs(player.y - p.y) < 100 ) || freeSpaceFn() < 90),
                sleep(250),]);

            auto.head.face = 'off';
            auto.body.face = 'off';

            _tdx = 0;

            await raiseFist;

            p.head.face.eyel.shape = EyeShape.Default;
            p.head.face.eyer.shape = EyeShape.Default;

            p.head.face.mouth.imageIndex = MouthShape.OpenSmall;

            lerp(p.body.neck, 'extendingUnit').to(0).over(250);
            lerp(p.body, 'crouchingUnit').to(1).over(150);
            await fist.move(64, windUpAngle, 150);

            spike.framesUntilDangerous = 0;
            await fist.move(46, slammedAngle, 250);
            lerp(p.body.neck, 'extendingUnit').to(1).over(250);
            lerp(p.body, 'crouchingUnit').to(0).over(150);
            p.speed.y = -3;
            _tdx = -dir * 2;
            p.head.face.mouth.imageIndex = MouthShape.SmileSmall;
            await sleep(250);
            spike.destroy();
            _tdx = 0;

            fist.autoRetract = true;
            await sleep(400);
            p.head.face.mouth.imageIndex = MouthShape.Smile;
            await wait(() => !fist.autoRetract && p.isOnGround);
            p.speed.x = 0;
        });

    const bowlPoisonSpikeBall = attack()
        .withAsyncOnce(async (self) => {
            let _aggressive = health.unit < 0.67;

            const dir = Math.sign(player.x - p.x) || 1;

            const fist = dir > 0 ? p.body.fistL : p.body.fistR;
            const leg = dir > 0 ? p.body.shoeL : p.body.shoeR;

            const startAngle = fist === p.body.fistL ? 0 : -180;
            const raisedAngle = fist === p.body.fistL ? -200 : 20;
            const windUpAngle = fist === p.body.fistL ? -210 : 30;
            const releaseAngle = fist === p.body.fistL ? 10 : -190;

            auto.head.face = 'hspeed';
            auto.body.face = 'hspeed';
            p.speed.x = dir * 2;

            let _release = false;

            async function moveFistAcrossSouth(toOffset: number, toAngle: number, ms: number) {
                const offsets = lerp(fist, 'offset').to(18).over(ms / 2)
                    .then(() => lerp(fist, 'offset').to(toOffset).over(ms / 2));
                await lerp(fist, 'offsetAngle').to(toAngle).over(ms);
                await offsets;
            }

            self.withAsync(async () => {
                await wait(() => fist.offset > 24);
                const temporaryBall = ornateProjectile.spikeBall(0, fist).show(projectilesAhead);
                temporaryBall.framesUntilDangerous = 100000;
                await wait(() => _release);
                const bowled = ornateProjectile.bowledSpikeBall(Consts.damage.bowledSpikeBall).at(temporaryBall).show(temporaryBall.parent);
                bowled.speed.x = dir * 6;
                bowled.speed.y = -2;
                temporaryBall.destroy();
            });

            let _doCrouch = true;
            container().withStep(() => {
                p.body.crouchingUnit = approachLinear(p.body.crouchingUnit, _doCrouch ? 1 : 0, 0.1);
                p.body.neck.extendingUnit = approachLinear(p.body.neck.extendingUnit, _doCrouch ? 0 : 1, 0.05);
            }).show(self);

            fist.offsetAngle = startAngle;
            const fistReady = fist.move(32, startAngle, _aggressive ? 180 : 250)
                .then(() => moveFistAcrossSouth(44, raisedAngle, _aggressive ? 250 : 350));

            await sleep(_aggressive ? 100 : 250);
            await Promise.race([
                wait(() => Math.abs(p.x - player.x) < 90),
                fistReady.then(() => sleep(200)),
            ]);

            auto.head.face = 'off';
            auto.body.face = 'off';

            p.speed.x = 0;
            _doCrouch = false;

            lerp(leg.offset, 'y').to(-6).over(120);
            await fistReady;

            await sleep(_aggressive ? 100 : 150);
            p.head.face.mouth.imageIndex = MouthShape.OpenSmall;
            await fist.move(44, windUpAngle, _aggressive ? 60 : 80);
            p.head.face.mouth.imageIndex = MouthShape.Open;
            await moveFistAcrossSouth(44, releaseAngle, _aggressive ? 100 : 140);
            p.head.face.mouth.imageIndex = MouthShape.OpenWide;
            _release = true;

            auto.neck.lean = 'hspeed';

            lerp(leg.offset, 'y').to(0).over(80);
            p.speed.x = -dir;
            p.speed.y = -1.3;
            p.gravity = 0.1;

            self.withStep(() => p.speed.x = approachLinear(p.speed.x, 0, 0.075));

            await sleep(_aggressive ? 160 : 200);
            p.head.face.mouth.imageIndex = MouthShape.SmileSmall;
            fist.autoRetract = true;
            await sleep(_aggressive ? 300 : 500);
            await wait(() => !fist.autoRetract);

            auto.neck.lean = 'zero';
        })

    async function run(d: DisplayObject) {
        await p.run(d);
        auto.head.face = 'off';
        auto.body.face = 'off';
        p.head.face.eyel.shape = EyeShape.Default;
        p.head.face.eyer.shape = EyeShape.Default;
        p.head.face.eyel.pupilShape = PupilShape.Default;
        p.head.face.eyer.pupilShape = PupilShape.Default;
        p.head.face.mouth.imageIndex = MouthShape.Smile;
        p.gravity = Consts.defaultGravity;
    }

    async function doAs() {
        await wait(() => p.isOnGround);
        await Promise.race([
            waitHold(() => isOnScreen(p), 30),
            health.tookDamage(),
        ]);
        p.hostile = true;

        const groundMoves = reducedRepetitionRng(2, 2);

        while (true) {
            await run(multiSlam());
            if (Math.abs(player.x - p.x) < 130 && (health.unit > 0.5 || framesSinceHeadClawDamage < 40))
                await run(shockHeadArea());
            if (p.freeSpaceTowardsPlayer() > 100 && groundMoves.next() === 0) {
                await run(runTowardsAndFistSlam());
                if (p.freeSpaceTowardsPlayer() > 120 && health.unit < 0.5 && rng() < 0.67)
                    await run(runTowardsAndFistSlam());
            }
            else {
                await run(bowlPoisonSpikeBall());
                if (framesSinceHeadClawDamage < 40 && rng() < 0.9 && Math.abs(player.x - p.x) < 130)
                    await run(shockHeadArea({ punish: true }));
                else if (p.freeSpaceTowardsPlayer() > 120 && health.unit < 0.5 && rng() < 0.67)
                    await run(bowlPoisonSpikeBall());
            }
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

        framesSinceHeadClawDamage += 1;

        if (!takeClawDamage(p.head.hurtbox, 0))
            takeClawDamage(p.body.hurtbox, Consts.bodyDefense);
        else
            framesSinceHeadClawDamage = 0;

        if (health.isDead)
            doDeath();
    });
    p.withStep(carryPlayerStep);

    return p;
}

const v = vnew();