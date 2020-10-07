import {IguanaPuppetNoEngine} from "./iguanaPuppet";
import {game} from "../game";
import {push} from "../../gameObjects/walls";
import {
    CharacterHitCeiling,
    CharacterLandOnGround,
    CharacterStep,
    CharacterStep2,
    CharacterStep3,
    CharacterStep4
} from "../../sounds";
import {isOnScreen} from "../isOnScreen";
import {rejection} from "../../utils/rejection";

CharacterStep.volume(.4);
CharacterStep2.volume(.4);
CharacterStep3.volume(.4);
CharacterStep4.volume(.4);

export function makeIguanaPuppetEngine(puppet: IguanaPuppetNoEngine)
{
    interface WalkPromise
    {
        x: number,
        resolve(),
        reject()
    }

    const next: WalkPromise[] = [];
    let current: WalkPromise | null;

    puppet.on("removed", () => {
        current?.reject();
        next.forEach(x => x.reject());
    });

    let pedometer = 0;

    return {
        isOnGround: false,
        coyote: 0,
        on: true,
        walkSpeed: 2.5,
        walkTo(x: number)
        {
            return new Promise<void>((resolve, reject) =>
                next.push({ x, resolve, reject: () => reject(rejection("walkTo Promise rejected due to iguana puppet DisplayObject removal")) }))
        },
        step()
        {
            if (!this.on)
                return;

            while (true)
            {
                if (current)
                {
                    const difference = puppet.x - current.x;
                    const distance = Math.abs(difference);
                    if (distance === 0 || (distance < 5 && Math.sign(difference) === Math.sign(puppet.hspeed)))
                    {
                        puppet.hspeed = 0;
                        current.resolve();
                        current = null;
                    }
                    else
                    {
                        puppet.hspeed = -Math.sign(difference) * this.walkSpeed;
                        break;
                    }
                }

                if (next.length === 0)
                    break;

                current = next.shift() as WalkPromise;
            }

            if (puppet.isDucking)
                puppet.hspeed *= 0.9;

            puppet.hspeed = Math.min(this.walkSpeed, Math.abs(puppet.hspeed)) * Math.sign(puppet.hspeed);

            const barelyWalking = Math.abs(puppet.hspeed) < 0.1;
            if (barelyWalking)
            {
                puppet.hspeed = 0;
                pedometer = 0;
            }

            if (!this.isOnGround)
                puppet.vspeed += 0.15;

            let hsp = puppet.hspeed;
            let vsp = puppet.vspeed;

            const radius = 8;
            const maxMotion = Math.sqrt(radius);

            const vspeedBeforePush = puppet.vspeed;

            const canPlaySounds = isOnScreen(puppet);

            while (Math.abs(hsp) > 0 || Math.abs(vsp) > 0)
            {
                puppet.x += Math.min(maxMotion, Math.abs(hsp)) * Math.sign(hsp);
                puppet.y += Math.min(maxMotion, Math.abs(vsp)) * Math.sign(vsp);

                if (puppet.x < 20)
                {
                    puppet.x = 20;
                    hsp = 0;
                    puppet.hspeed = 0;
                }
                else if (puppet.x > game.level.width - 20)
                {
                    puppet.x = game.level.width - 20;
                    hsp = 0;
                    puppet.hspeed = 0;
                }

                if (puppet.y < 0)
                {
                    puppet.y = 0;
                    vsp = Math.abs(vsp);
                    puppet.vspeed = Math.abs(puppet.vspeed);
                }
                else if (puppet.y > game.level.height)
                {
                    puppet.y = game.level.height;
                    vsp = -Math.abs(vsp);
                    puppet.vspeed = -Math.abs(puppet.vspeed);
                }

                hsp = Math.abs(hsp) < maxMotion ? 0 : ((Math.abs(hsp) - maxMotion) * Math.sign(hsp));
                vsp = Math.abs(vsp) < maxMotion ? 0 : ((Math.abs(vsp) - maxMotion) * Math.sign(vsp));

                const result = push(puppet, radius);
                this.isOnGround = !!result.isOnGround;

                if (result.hitCeiling && puppet.vspeed < 0)
                {
                    if (canPlaySounds)
                    {
                        CharacterHitCeiling.volume(0.33 + Math.min(0.67, vspeedBeforePush * -0.06));
                        CharacterHitCeiling.play();
                    }

                    puppet.vspeed = 0;
                }
                if (result.hitGround)
                {
                    if (this.coyote < 5 && canPlaySounds)
                    {
                        CharacterLandOnGround.volume(0.33 + Math.min(0.67, vspeedBeforePush * 0.06));
                        CharacterLandOnGround.play();
                    }
                    puppet.vspeed = 0;
                    this.isOnGround = true;
                }

                if (result.hitWall)
                {
                    puppet.hspeed = 0;
                    hsp = 0;
                }

                if (this.isOnGround)
                    this.coyote = 25;
            }

            if (this.isOnGround)
                this.coyote = 25;
            else
                this.coyote--;

            if (!canPlaySounds)
                return;

            const lastPedometer = pedometer;

            if (this.isOnGround || this.coyote > 15)
                pedometer += Math.abs(puppet.hspeed);

            if (pedometer > 24 && lastPedometer <= 24)
                CharacterStep.play();
            else if (pedometer > 44 && lastPedometer <= 44)
                CharacterStep2.play();
            else if (pedometer > 62 && lastPedometer <= 62)
                CharacterStep3.play();
            else if (pedometer > 82 && lastPedometer <= 82)
            {
                CharacterStep4.play();
                pedometer = 0;
            }
        }
    }
}