import {iguanaPuppet, IguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {Container, DisplayObject, Sprite} from "pixi.js";
import {
    CharacterHead,
    CharacterMouthV,
    CharacterPupils, CharacterWhites,
    NpcBlueFoot,
    NpcBlueFootRear,
    NpcCurvedCrest, NpcCurvedCrest2,
    NpcGreenPolkaBody, NpcPupilsAngry,
    NpcRedFoot,
    NpcRedFootRear,
    NpcWeirdBody,
    NpcStrangeBody,
    NpcPinkFoot,
    NpcPinkFootRear,
    NpcPupilsCartoonish,
    NpcShortTailBody,
    NpcYellowFoot,
    NpcYellowFootRear,
    NpcPupilsWeird,
    NpcLongTailBody, CharacterCrest, NpcBlueFoot2, NpcBlueFootRear2, NpcHornedCrest
} from "../textures";
import {IguanaEyes, iguanaEyes} from "../igua/puppet/eyes";
import {add, Vector} from "../utils/math/vector";
import {invisibleObject} from "./utils/invisibleObject";

const npcStyles: Array<ReturnType<typeof getNpcStyle>> = [];

npcStyles[0] = npcStyle(args => {
    args.body = Sprite.from(NpcWeirdBody);
    args.body.pivot.y += 4;
    args.body.tint = 0xFF8A7C;

    args.frontRightFoot = Sprite.from(NpcRedFoot);

    args.backRightFoot = Sprite.from(NpcRedFootRear);
    args.backRightFoot.pivot.y = 1;

    args.crest = Sprite.from(NpcCurvedCrest);
    args.crest.pivot.set(-2, 2);
    args.crest.tint = 0x75CAFF;

    args.headSprite.tint = 0x73C88C;
    args.mouthSprite.tint = 0xA83F2F;

    args.pupils.tint = 0xA83F2F;
    args.eyelidColor = 0x5AA86E;
});

npcStyles[1] = npcStyle(args => {
    args.body = Sprite.from(NpcGreenPolkaBody);
    args.body.tint = 0xD8D44E;
    args.body.pivot.y += 3;

    args.frontRightFoot = Sprite.from(NpcBlueFoot);
    args.frontRightFoot.pivot.y = 2;

    args.backRightFoot = Sprite.from(NpcBlueFootRear);
    args.backRightFoot.pivot.y = 2;

    args.crest = Sprite.from(NpcCurvedCrest2);
    args.crest.pivot.set(-2, 2);
    args.crest.tint = 0x198A96;

    args.headSprite.tint = 0xFF8E7F;
    args.mouthSprite.tint = 0x2A87A9;

    args.pupils = Sprite.from(NpcPupilsAngry);
    args.pupils.pivot.y -= 1;
    args.pupils.tint = 0x2A87A9;
    args.eyelidColor = 0xA9272C;
});

npcStyles[2] = npcStyle(args => {
    args.body = Sprite.from(NpcStrangeBody);

    args.frontRightFoot = Sprite.from(NpcPinkFoot);

    args.backRightFoot = Sprite.from(NpcPinkFootRear);
    args.backRightFoot.pivot.y = 1;

    args.crest = Sprite.from(NpcCurvedCrest2);
    args.crest.scale.x *= -1;
    args.crest.pivot.set(8, 4);
    args.crest.tint = 0x6060A0;

    args.headSprite.tint = 0xF0E050;
    args.mouthSprite.tint = 0xE04040;

    args.pupils = Sprite.from(NpcPupilsCartoonish);
    args.pupils.pivot.y -= 1;
    args.pupils.tint = 0xE04040;
    args.eyelidColor = 0xF0E050;
});

npcStyles[3] = npcStyle(args => {
    args.body = Sprite.from(NpcShortTailBody);
    args.body.pivot.y -= 1;
    args.body.tint = 0x80D080;

    args.frontRightFoot = Sprite.from(NpcYellowFoot);

    args.backRightFoot = Sprite.from(NpcYellowFootRear);
    args.backRightFoot.pivot.y = 1;

    args.crest = Sprite.from(NpcCurvedCrest);
    args.crest.scale.y *= -1;
    args.crest.pivot.set(-3, -4);
    args.crest.tint = 0x4080F0;

    args.headOffset.y += 2;

    args.headSprite.tint = 0xF0D080;
    args.mouthSprite.tint = 0x4080F0;

    args.pupils = Sprite.from(NpcPupilsWeird);
    args.pupils.pivot.y -= 1;
    args.pupils.tint = 0x4080F0;
    args.eyelidColor = 0xC0B070;
});

npcStyles[4] = npcStyle(args => {
    args.body = Sprite.from(NpcLongTailBody);
    args.body.pivot.x += 13;
    args.body.pivot.y += 3;
    args.body.tint = 0xA0A0E0;

    args.frontRightFoot = Sprite.from(NpcBlueFoot2);

    args.backRightFoot = Sprite.from(NpcBlueFootRear2);
    args.backRightFoot.pivot.y = 1;

    args.crest = Sprite.from(NpcHornedCrest);
    args.crest.pivot.set(-6, 6);
    args.crest.tint = 0xD05070;

    args.headOffset.y += 2;

    args.headSprite.tint = 0x90D0E0;
    args.mouthSprite.tint = 0xD05070;

    args.pupils = Sprite.from(NpcPupilsCartoonish);
    // args.pupils.pivot.y += 1;
    args.pupils.tint = 0xD05070;
    args.eyelidColor = 0x60B0D0;
});

function npcStyle(configure: (args: ConfigureNpcStyleArgs) => void)
{
    return () => {

        const pupils = Sprite.from(CharacterPupils);
        pupils.pivot.set(-2, -3);

        const mouthSprite = Sprite.from(CharacterMouthV);
        mouthSprite.pivot.set(-10, -11);

        const args = {headSprite: Sprite.from(CharacterHead), mouthSprite, pupils, eyeShape: Sprite.from(CharacterWhites), headOffset: { x: 0, y: 0 } } as unknown as ConfigureNpcStyleArgs;
        configure(args);

        if (!args.frontLeftFoot)
        {
            args.frontLeftFoot = Sprite.from(args.frontRightFoot.texture);
            args.frontLeftFoot.tint = 0xC7D7D7;
            args.frontLeftFoot.pivot.copyFrom(args.frontRightFoot.pivot);
        }

        if (!args.backLeftFoot)
        {
            args.backLeftFoot = Sprite.from(args.backRightFoot.texture);
            args.backLeftFoot.tint = 0xC7D7D7;
            args.backLeftFoot.pivot.copyFrom(args.backRightFoot.pivot);
        }

        if (!args.head)
        {
            const container = new Container();
            args.head = container;
            container.addChild(args.headSprite, args.mouthSprite);
        }

        add(args.head.pivot, args.headOffset);

        if (!args.eyes)
            args.eyes = iguanaEyes(args as any);

        add(args.eyes.pivot, args.headOffset);

        return iguanaPuppet(args as any);
    }
}

interface ConfigureNpcStyleArgs
{
    body: Sprite;
    backLeftFoot?: Sprite;
    backRightFoot: Sprite;
    frontLeftFoot?: Sprite;
    frontRightFoot: Sprite;
    head?: DisplayObject;
    headSprite: Sprite;
    mouthSprite: Sprite;
    crest: Sprite;
    eyes?: IguanaEyes;
    pupils: Sprite;
    eyeShape: Container;
    eyelidColor?: number;
    headOffset: Vector;
}

export function getNpcStyle(index: number): () => IguanaPuppet
{
    if (index >= 0 && index < npcStyles.length)
        return npcStyles[index];

    console.error("npc style index", index, "is out of bounds", [0, npcStyles.length])
    return npcStyles[0];
}