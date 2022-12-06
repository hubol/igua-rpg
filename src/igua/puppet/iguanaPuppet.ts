import {Container, DisplayObject} from "pixi.js";
import {approachLinear, lerp} from "../../utils/math/number";
import {IguanaEyes} from "./eyes";
import {IguanaBlink} from "../../sounds";
import {game} from "../game";
import {merge} from "../../utils/object/merge";
import {makeIguanaPuppetEngine} from "./engine";
import {makeIguanaMods} from "./mods";
import {rng} from "../../utils/math/rng";

export interface IguanaPuppetArgs
{
    body: DisplayObject;
    backLeftFoot: DisplayObject;
    backRightFoot: DisplayObject;
    frontLeftFoot: DisplayObject;
    frontRightFoot: DisplayObject;
    head: DisplayObject;
    eyes: IguanaEyes | DisplayObject;
    crest: DisplayObject;
    moveCrestWhenDucking?: boolean;
    fromLooks?: boolean;
}

IguanaBlink.volume(0.06);

export type IguanaPuppet = ReturnType<typeof iguanaPuppet>;
export type IguanaPuppetNoEngine = ReturnType<typeof iguanaPuppetNoEngine>;

export function iguanaPuppet(args: IguanaPuppetArgs)
{
    const puppetNoEngine = iguanaPuppetNoEngine(args);
    const engine = makeIguanaPuppetEngine(puppetNoEngine);
    return merge(puppetNoEngine, { engine, mods: makeIguanaMods(puppetNoEngine), walkTo: engine.walkTo });
}

export function iguanaHead(args: IguanaPuppetArgs, attachToBody = false) {
    if (args.fromLooks) {
        if (!attachToBody)
            args.head.pivot.set(0, 0);

        args.head.pivot.add(0, -15);
        return args.head;
    }

    args.crest.pivot.x += 3;
    args.crest.pivot.y += 5;

    args.eyes.pivot.x += -7;
    args.eyes.pivot.y += -3;

    const head = new Container();

    head.addChild(args.crest, args.head, args.eyes);
    return head;
}

export function iguanaPuppetNoEngine(args: IguanaPuppetArgs)
{
    const head = iguanaHead(args, true);

    if (!args.fromLooks) {
        args.body.pivot.y -= 5;

        args.backLeftFoot.pivot.x += -6;
        args.backLeftFoot.pivot.y += -21;

        args.frontLeftFoot.pivot.x += -15;
        args.frontLeftFoot.pivot.y += -21;

        args.backRightFoot.pivot.x += -3;
        args.backRightFoot.pivot.y += -21;

        args.frontRightFoot.pivot.x += -12;
        args.frontRightFoot.pivot.y += -21;

        head.pivot.set(-15, -5);
    }
    else
        head.pivot.add(-5, 22);

    const body = new Container();
    body.addChild(args.body, head);

    const player = merge(new Container(), {
        head,
        isDucking: false,
        duckUnit: 0,
        hspeed: 0,
        vspeed: 0,
        canBlink: true,
        isClosingEyes: false,
        closedEyesUnit: 0,
        feet: [ args.backLeftFoot, args.backRightFoot, args.frontLeftFoot, args.frontRightFoot ],
        duckImmediately()
        {
            player.isDucking = true;
            player.duckUnit = 1;
        },
        closeEyesImmediately()
        {
            player.isClosingEyes = true;
            player.closedEyesUnit = 1;
        }
    });
    player.addChild(args.backLeftFoot, args.frontLeftFoot, body, args.backRightFoot, args.frontRightFoot);
    if (!args.fromLooks)
        player.pivot.set(11, 17);
    else
        player.pivot.set(1, -10);

    const canBlink = "closedUnit" in args.eyes;

    if (canBlink)
    {
        let ticksUntilBlink = 30 + rng() * 210;

        player.withStep(() => {
            if (player.canBlink)
            {
                if (ticksUntilBlink-- <= 0) {
                    ticksUntilBlink = 120 + rng() * 120;
                    player.isClosingEyes = true;
                }

                if (player.closedEyesUnit > 1.2 && player.isClosingEyes)
                {
                    player.isClosingEyes = false;

                    const bounds = player.getBounds();
                    if (bounds.x >= 0 && bounds.x <= game.width && bounds.y >= 0 && bounds.y <= game.height)
                        IguanaBlink.play();
                }
            }
            player.closedEyesUnit = approachLinear(player.closedEyesUnit, player.isClosingEyes ? 1.3 : 0, 0.3);

            (args.eyes as IguanaEyes).closedUnit = player.closedEyesUnit;
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
            if (player.vspeed === 0)
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

        // if (args.moveCrestWhenDucking === undefined || args.moveCrestWhenDucking)
        // {
        //     args.crest.x = Math.round(roundedDuckUnit * 2);
        //     args.crest.y = Math.round(roundedDuckUnit * -1);
        // }

        head.y = Math.round(roundedDuckUnit * 2);

        if (player.hspeed < 0)
            player.scale.x = -Math.abs(player.scale.x);
        else if (player.hspeed > 0)
            player.scale.x = Math.abs(player.scale.x);
    };

    player.withStep(puppetStep);

    return player;
}
