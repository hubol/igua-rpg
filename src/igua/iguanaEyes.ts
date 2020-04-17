import {DisplayObject, Graphics, Container} from "pixi.js";

interface IguanaEyesArgs
{
    pupils: DisplayObject;
    eyeShape: Container;
    eyelidColor: number;
}

export type IguanaEyes = DisplayObject & { closedUnit: number };

export function iguanaEyes(args: IguanaEyesArgs)
{
    const eyes = new Container();

    eyes.mask = args.eyeShape;

    const whitesGraphics = new Graphics();
    whitesGraphics.beginFill((args.eyeShape as any).tint ?? 0xFFFFFF);
    whitesGraphics.drawRect(0, 0, 16, 16);
    whitesGraphics.endFill();

    const eyelidsGraphics = new Graphics();
    eyelidsGraphics.beginFill(args.eyelidColor);
    eyelidsGraphics.drawRect(0, 0, 16, 8);
    eyelidsGraphics.endFill();
    eyelidsGraphics.pivot.y = -8;

    const eyelidLine = new Graphics();
    eyelidLine.lineStyle(1, args.eyelidColor)
        .moveTo(0, 3)
        .lineTo(16, 3);
    eyelidLine.tint = 0xC0C0C0;

    eyes.addChild(args.eyeShape, whitesGraphics, args.pupils, eyelidsGraphics, eyelidLine);

    let closedUnit = 0;

    Object.defineProperty(eyes, "closedUnit", {
        set: function (value) {
            closedUnit = value;

            const frame = Math.min(3, Math.round(closedUnit * 3));

            args.pupils.y = frame === 2 ? -1 : 0;
            eyelidsGraphics.y = (frame / 3) * -8;
            eyelidsGraphics.visible = frame !== 0;
            eyelidLine.visible = frame === 3;
        },
        get(): number {
            return closedUnit;
        }
    });

    const iguanaEyes = eyes as unknown as IguanaEyes;
    iguanaEyes.closedUnit = 0;

    return iguanaEyes;
}