import {Container, Sprite} from "pixi.js";
import {
    CharacterHead,
    CharacterMouthV, CharacterPupils, CharacterWhites, NpcCurvedCrest, NpcRedFoot, NpcRedFootRear,
    NpcWeirdBody
} from "../textures";
import {iguanaPuppet} from "../igua/iguanaPuppet";
import {game} from "../igua/game";
import {distance} from "../utils/vector";
import {iguanaEyes} from "../igua/iguanaEyes";

export function npc(x, y)
{
    const puppet = npcPuppet();
    puppet.x = x;
    puppet.y = y;

    puppet.isDucking = true;
    puppet.duckUnit = 1;
    return puppet.withStep(() => {
        puppet.isDucking = !(game.player.scale.x < 0 && game.player.x >= puppet.x + 16 && distance(game.player, puppet) < 128);
    });
}

function npcPuppet()
{
    const body = Sprite.from(NpcWeirdBody);
    body.pivot.y += 4;
    body.tint = 0xFF8A7C;

    const frontLeftFoot = Sprite.from(NpcRedFoot);
    frontLeftFoot.tint = 0xC7D7D7;
    const frontRightFoot = Sprite.from(NpcRedFoot);

    const backLeftFoot = Sprite.from(NpcRedFootRear);
    backLeftFoot.tint = 0xC7D7D7;
    backLeftFoot.pivot.y = 1;
    const backRightFoot = Sprite.from(NpcRedFootRear);
    backRightFoot.pivot.y = 1;

    const crest = Sprite.from(NpcCurvedCrest);
    crest.pivot.set(-2, 2);
    crest.tint = 0x75CAFF;

    const head = new Container();
    const headSprite = Sprite.from(CharacterHead);
    headSprite.tint = 0x73C88C;
    const mouthSprite = Sprite.from(CharacterMouthV);
    mouthSprite.pivot.set(-10, -11);
    mouthSprite.tint = 0xA83F2F;
    head.addChild(headSprite, mouthSprite);
    head.cacheAsBitmap = true;

    const pupils = Sprite.from(CharacterPupils);
    pupils.tint = 0xA83F2F;
    pupils.pivot.set(-2, -3);

    const eyes = iguanaEyes({ eyelidColor: 0x5AA86E, pupils, eyeShape: Sprite.from(CharacterWhites) });

    return iguanaPuppet({
        backRightFoot,
        frontLeftFoot,
        backLeftFoot,
        body,
        crest,
        head,
        eyes,
        frontRightFoot
    });
}