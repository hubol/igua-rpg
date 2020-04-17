import {AnimatedSprite, Container, Sprite} from "pixi.js";
import {
    CharacterCrest,
    CharacterEyes,
    CharacterFoot,
    CharacterHead,
    CharacterMouthV,
    NpcWeirdBody
} from "../textures";
import {iguanaPuppet} from "../igua/iguanaPuppet";
import {subimageTextures} from "../utils/simpleSpritesheet";
import {game} from "../igua/game";
import {distance} from "../utils/vector";

export function npc(x, y)
{
    const puppet = npcPuppet();
    puppet.x = x;
    puppet.y = y;

    puppet.isDucking = true;
    puppet.duckUnit = 1;
    return puppet.withStep(() => {
        puppet.isDucking = !(game.player.scale.x < 0 && game.player.x >= puppet.x + 16 && distance(game.player, puppet) < 64);
    });
}

function npcPuppet()
{
    const body = Sprite.from(NpcWeirdBody);
    body.pivot.y += 4;
    body.tint = 0xFF8A7C;

    const backLeftFoot = Sprite.from(CharacterFoot);
    backLeftFoot.tint = 0xC7D7D7;
    const frontLeftFoot = Sprite.from(CharacterFoot);
    frontLeftFoot.tint = 0xC7D7D7;

    const backRightFoot = Sprite.from(CharacterFoot);
    const frontRightFoot = Sprite.from(CharacterFoot);

    const crest = Sprite.from(CharacterCrest);
    crest.tint = 0x75CAFF;

    const head = new Container();
    const headSprite = Sprite.from(CharacterHead);
    headSprite.tint = 0x73C88C;
    const mouthSprite = Sprite.from(CharacterMouthV);
    mouthSprite.pivot.set(-10, -11);
    mouthSprite.tint = 0x9957AF;
    head.addChild(headSprite, mouthSprite);
    head.cacheAsBitmap = true;

    const eyes = new AnimatedSprite(eyesTextures, false);

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

const eyesTextures = subimageTextures(CharacterEyes, 4);