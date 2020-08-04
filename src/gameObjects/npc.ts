import {Container, Sprite} from "pixi.js";
import {
    CharacterHead,
    CharacterMouthV, CharacterPupils, CharacterWhites, NpcCurvedCrest, NpcRedFoot, NpcRedFootRear,
    NpcWeirdBody
} from "../textures";
import {IguanaPuppet, iguanaPuppet} from "../igua/iguanaPuppet";
import {game} from "../igua/game";
import {distance} from "../utils/vector";
import {IguanaEyes, iguanaEyes} from "../igua/iguanaEyes";

export function npc(x, y)
{
    const puppet = npcStyles[0]();
    puppet.x = x;
    puppet.y = y;

    puppet.isDucking = true;
    puppet.duckUnit = 1;
    return puppet.withStep(() => {
        puppet.isDucking = !(game.player.scale.x < 0 && game.player.x >= puppet.x + 16 && distance(game.player, puppet) < 128);
    });
}

let npcStyles: Array<() => IguanaPuppet> = [];

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

    const headSprite = Sprite.from(CharacterHead);
    headSprite.tint = 0x73C88C;
    const mouthSprite = Sprite.from(CharacterMouthV);
    mouthSprite.pivot.set(-10, -11);
    mouthSprite.tint = 0xA83F2F;
    args.head.addChild(headSprite, mouthSprite);

    const pupils = Sprite.from(CharacterPupils);
    pupils.tint = 0xA83F2F;
    pupils.pivot.set(-2, -3);

    args.eyes = iguanaEyes({ eyelidColor: 0x5AA86E, pupils, eyeShape: Sprite.from(CharacterWhites) });
});

function npcStyle(configure: (args: ConfigureNpcStyleArgs) => void)
{
    return () => {
        const args = { head: new Container() } as ConfigureNpcStyleArgs;
        configure(args);

        if (!args.frontLeftFoot)
        {
            args.frontLeftFoot = Sprite.from(args.frontRightFoot.texture);
            args.frontLeftFoot.tint = 0xC7D7D7;
        }

        if (!args.backLeftFoot)
        {
            args.backLeftFoot = Sprite.from(args.backRightFoot.texture);
            args.backLeftFoot.tint = 0xC7D7D7;
            args.backLeftFoot.pivot.copyFrom(args.backRightFoot.pivot);
        }

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
    head: Container;
    eyes: IguanaEyes;
    crest: Sprite;
}