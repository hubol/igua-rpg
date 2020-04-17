import {Container, Sprite} from "pixi.js";
import {CharacterHead} from "../textures";
import {approachLinear, lerp} from "../utils/math";
import {DisplayObject} from "pixi.js";
import {subimageTextures} from "../utils/simpleSpritesheet";

interface IguanaPuppetArgs
{
    body: DisplayObject;
    backLeftFoot: DisplayObject;
    backRightFoot: DisplayObject;
    frontLeftFoot: DisplayObject;
    frontRightFoot: DisplayObject;
    crest: DisplayObject;
    doesntBlink?: true;
}

export type IguanaPuppet = Container & { isDucking: boolean, hspeed: number, vspeed: number };

const headTextures = subimageTextures(CharacterHead, 4);

export function iguanaPuppet(args: IguanaPuppetArgs): IguanaPuppet
{
    const head = new Container();
    head.pivot.set(-15, -5);

    const headSprite = Sprite.from(headTextures[0]) as any;
    headSprite.isClosingEyes = false;
    headSprite.closedEyesUnit = 0;
    headSprite.ticksUntilBlink = 60;

    head.addChild(args.crest, headSprite);

    const body = new Container();
    body.addChild(args.body, head);

    const player = new Container() as IguanaPuppet;
    player.addChild(args.backLeftFoot, args.frontLeftFoot, body, args.backRightFoot, args.frontRightFoot);
    player.pivot.set(11, 17);

    player.isDucking = false;
    player.hspeed = 0;
    player.vspeed = 0;

    if (!args.doesntBlink)
        player.withStep(() => {
            if (headSprite.ticksUntilBlink-- <= 0) {
                headSprite.ticksUntilBlink = 120 + Math.random() * 120;
                headSprite.isClosingEyes = true;
            }

            headSprite.closedEyesUnit = approachLinear(headSprite.closedEyesUnit, headSprite.isClosingEyes ? 1.3 : 0, 0.3);
            if (headSprite.closedEyesUnit > 1.2)
                headSprite.isClosingEyes = false;
            headSprite.texture = headTextures[Math.min(headTextures.length - 1, Math.round(headSprite.closedEyesUnit * (headTextures.length - 1)))];
        });

    let trip = 0;
    let duckUnit = 0;

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

        duckUnit = lerp(duckUnit, player.isDucking ? 1 : 0, 0.2);
        const roundedDuckUnit = Math.round(duckUnit * 3) / 3;

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