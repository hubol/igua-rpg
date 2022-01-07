import {DisplayObject, Graphics, Container} from "pixi.js";
import {merge} from "../../utils/merge";
import {container} from "../../utils/pixi/container";

interface IguanaEyesArgs
{
    pupils: DisplayObject;
    eyeShape: Container;
    eyelidColor: number;
}

export type IguanaEyes = DisplayObject & { closedUnit: number };

export function iguanaEyes(args: IguanaEyesArgs)
{
    const whitesGraphics = new Graphics();
    whitesGraphics.beginFill((args.eyeShape as any).tint ?? 0xFFFFFF);
    whitesGraphics.drawRect(0, 0, 16, 16);
    whitesGraphics.endFill();

    const { eyelidsGraphics, eyelidsLine, eyelidsControl } = iguanaEyelids(args.eyelidColor, 16, 8, 3);

    const eyes = container(args.eyeShape, whitesGraphics, args.pupils, eyelidsGraphics, eyelidsLine);
    eyes.mask = args.eyeShape;

    return merge(eyes, eyelidsControl) as IguanaEyes;
}

export function iguanaEyelids(color: number, width: number, height: number, lineY: number) {
    const eyelidsGraphics = new Graphics();
    eyelidsGraphics.beginFill(color);
    eyelidsGraphics.drawRect(0, 0, width, height);
    eyelidsGraphics.endFill();

    const eyelidsLine = new Graphics();
    eyelidsLine.lineStyle(1, color)
        .moveTo(0, lineY)
        .lineTo(width, lineY);
    eyelidsLine.tint = 0xC0C0C0;

    let closedUnit = 0;

    const eyelidsControl = {
        set closedUnit(value) {
            closedUnit = value;

            const frame = Math.min(3, Math.round(closedUnit * 3));

            eyelidsGraphics.pivot.y = (1 - (frame / 3)) * -height;
            eyelidsGraphics.visible = frame !== 0;
            eyelidsLine.visible = frame === 3;
        },
        get closedUnit() {
            return closedUnit;
        }
    }

    eyelidsControl.closedUnit = 0;

    return { eyelidsGraphics, eyelidsLine, eyelidsControl };
}
