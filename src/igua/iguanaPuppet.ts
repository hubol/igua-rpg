import {Container, DisplayObject} from "pixi.js";
import {approachLinear, lerp} from "../utils/math";
import {IguanaEyes} from "./iguanaEyes";

interface IguanaPuppetArgs
{
    body: DisplayObject;
    backLeftFoot: DisplayObject;
    backRightFoot: DisplayObject;
    frontLeftFoot: DisplayObject;
    frontRightFoot: DisplayObject;
    head: DisplayObject;
    eyes: IguanaEyes | DisplayObject;
    crest: DisplayObject;
}

export type IguanaPuppet = Container & { isDucking: boolean, duckUnit: number, hspeed: number, vspeed: number };

export function iguanaPuppet(args: IguanaPuppetArgs): IguanaPuppet
{
    args.body.pivot.y -= 5;

    args.backLeftFoot.pivot.x += -6;
    args.backLeftFoot.pivot.y += -21;

    args.frontLeftFoot.pivot.x += -15;
    args.frontLeftFoot.pivot.y += -21;

    args.backRightFoot.pivot.x += -3;
    args.backRightFoot.pivot.y += -21;

    args.frontRightFoot.pivot.x += -12;
    args.frontRightFoot.pivot.y += -21;

    args.crest.pivot.x += 3;
    args.crest.pivot.y += 5;

    args.eyes.pivot.x += -7;
    args.eyes.pivot.y += -3;

    const head = new Container();
    head.pivot.set(-15, -5);

    head.addChild(args.crest, args.head, args.eyes);

    const body = new Container();
    body.addChild(args.body, head);

    const player = new Container() as IguanaPuppet;
    player.addChild(args.backLeftFoot, args.frontLeftFoot, body, args.backRightFoot, args.frontRightFoot);
    player.pivot.set(11, 17);

    player.isDucking = false;
    player.duckUnit = 0;
    player.hspeed = 0;
    player.vspeed = 0;

    const canBlink = "closedUnit" in args.eyes;

    if (canBlink)
    {
        let isClosingEyes = false;
        let closedEyesUnit = 0;
        let ticksUntilBlink = 60;

        player.withStep(() => {
            if (ticksUntilBlink-- <= 0) {
                ticksUntilBlink = 120 + Math.random() * 120;
                isClosingEyes = true;
            }

            closedEyesUnit = approachLinear(closedEyesUnit, isClosingEyes ? 1.3 : 0, 0.3);
            if (closedEyesUnit > 1.2)
                isClosingEyes = false;
            (args.eyes as IguanaEyes).closedUnit = closedEyesUnit;
        });
    }

    let trip = 0;

    const puppetStep = () => {
        const barelyWalking = Math.abs(player.hspeed) < 0.1;

        trip += player.hspeed;

        if (player.vspeed !== 0 && barelyWalking)
            trip += 0.5;

        body.position.set(0, 0);
        args.backLeftFoot.position.set(0, 0);
        args.backRightFoot.position.set(0, 0);
        args.frontLeftFoot.position.set(0, 0);
        args.frontRightFoot.position.set(0, 0);

        if (!barelyWalking || player.vspeed !== 0) {
            const t =trip * 0.1;
            body.position.y = Math.round(Math.sin(t + 2));
            args.backLeftFoot.position.y = Math.round(Math.abs(Math.sin(t + 1)) * -2);
            args.backRightFoot.position.y = Math.round(Math.abs(Math.sin(t)) * -2);
            args.frontLeftFoot.position.y = Math.round(Math.abs(Math.cos(t + 1)) * -2);
            args.frontRightFoot.position.y = Math.round(Math.abs(Math.cos(t)) * -2);
        }

        player.duckUnit = lerp(player.duckUnit, player.isDucking ? 1 : 0, 0.2);
        const roundedDuckUnit = Math.round(player.duckUnit * 3) / 3;

        if (roundedDuckUnit > 0.05) {
            body.position.y = Math.round(roundedDuckUnit * 4);
            args.backLeftFoot.position.x -= Math.round(roundedDuckUnit);
            args.backRightFoot.position.x -= Math.round(Math.pow(roundedDuckUnit, 2));
            args.frontLeftFoot.position.x += Math.round(Math.pow(roundedDuckUnit, 2));
            args.frontRightFoot.position.x += Math.round(roundedDuckUnit);
        }

        args.crest.x = Math.round(roundedDuckUnit * 2);
        args.crest.y = Math.round(roundedDuckUnit * -1);
        head.y = Math.round(roundedDuckUnit * 2);

        if (player.hspeed < 0)
            player.scale.x = -1;
        else if (player.hspeed > 0)
            player.scale.x = 1;
    };

    player.withStep(puppetStep);

    return player;
}