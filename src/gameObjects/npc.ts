import {Container, Sprite, DisplayObject} from "pixi.js";
import {
    CharacterHead,
    CharacterMouthV,
    CharacterPupils,
    CharacterWhites, NpcBlueFoot, NpcBlueFootRear,
    NpcCurvedCrest,
    NpcCurvedCrest2,
    NpcGreenPolkaBody, NpcPupilsAngry,
    NpcRedFoot,
    NpcRedFootRear,
    NpcWeirdBody
} from "../textures";
import {IguanaPuppet, iguanaPuppet} from "../igua/iguanaPuppet";
import {game} from "../igua/game";
import {IguanaEyes, iguanaEyes} from "../igua/iguanaEyes";
import {resolveGameObject} from "../../tools/gen-levelargs/resolveGameObject";
import {Cutscene} from "../cutscene/cutscene";
import {merge} from "../utils/merge";
import {isPlayerInteractingWith} from "../igua/isPlayerInteractingWith";
import {makeIguanaEngine} from "../igua/puppet/makeIguanaEngine";
import {rejection} from "../utils/rejection";
import {NpcMod} from "./npcMods";

export const resolveNpc = resolveGameObject("NpcIguana", e => {
    const n = game.gameObjectStage.addChild(npc(e.x, e.y - 8, (e as any).style));
    if (e.flippedX)
        n.scale.x *= -1;
    return n;
});

function makeNpcMods(npc: Npc)
{
    const currentMods = {} as any;

    return {
        has(mod: NpcMod)
        {
            return !!currentMods[mod as any];
        },
        add(mod: NpcMod)
        {
            if (this.has(mod))
                this.remove(mod);

            const displayObject = mod(npc);
            currentMods[mod as any] = displayObject;
            npc.addChild(displayObject);
        },
        remove(mod: NpcMod)
        {
            if (!this.has(mod))
                return;
            currentMods[mod as any]?.destroy();
            currentMods[mod as any] = null;
        },
        toggle(mod: NpcMod)
        {
            if (this.has(mod))
                this.remove(mod);
            else
                this.add(mod);
        }
    }
}

function makeCutscenePuppet(style: number)
{
    const puppet = npcStyles[style]();
    return merge(puppet, {
        cutscene: undefined as Cutscene | undefined,
        get isCutscenePlaying() {
            return this.cutscene && this.cutscene === game.cutscenePlayer.currentCutscene;
        },
        canWalkWhileCutsceneIsPlaying: false,
        engine: makeIguanaEngine(puppet),
        duckImmediately()
        {
            puppet.isDucking = true;
            puppet.duckUnit = 1;
        },
        closeEyesImmediately()
        {
            puppet.isClosingEyes = true;
            puppet.closedEyesUnit = 1;
        }
    });
}

export type Npc = ReturnType<typeof makeCutscenePuppet>;

export function npc(x, y, style: number = 0)
{
    const cutscenePuppet = makeCutscenePuppet(style);
    const puppet = merge(cutscenePuppet, { mods: makeNpcMods(cutscenePuppet) });
    puppet.x = x;
    puppet.y = y;

    return merge(puppet, makeDriver(puppet)).withStep(() => {
        if (puppet.cutscene && isPlayerInteractingWith(puppet))
            game.cutscenePlayer.playCutscene(puppet.cutscene);
        puppet.engine.step();
    });
}

function makeDriver(puppet: ReturnType<typeof makeCutscenePuppet>)
{
    interface WalkPromise
    {
        x: number,
        resolve(),
        reject()
    }

    const next: WalkPromise[] = [];
    let current: WalkPromise | null;

    puppet.withStep(() => {
        if (!puppet.canWalkWhileCutsceneIsPlaying && puppet.isCutscenePlaying)
        {
            puppet.hspeed = 0;
            return;
        }

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
                    puppet.hspeed = -Math.sign(difference) * puppet.engine.walkSpeed;
                    break;
                }
            }

            if (next.length === 0)
                break;

            current = next.shift() as WalkPromise;
        }
    })
        .on("removed", () => {
            current?.reject();
            next.forEach(x => x.reject());
        });

    return {
        walkTo(x: number)
        {
            return new Promise<void>((resolve, reject) =>
                next.push({ x, resolve, reject: () => reject(rejection("walkTo Promise rejected due to iguana puppet DisplayObject removal")) }))
        }
    };
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

function npcStyle(configure: (args: ConfigureNpcStyleArgs) => void)
{
    return () => {

        const pupils = Sprite.from(CharacterPupils);
        pupils.pivot.set(-2, -3);

        const mouthSprite = Sprite.from(CharacterMouthV);
        mouthSprite.pivot.set(-10, -11);

        const args = {headSprite: Sprite.from(CharacterHead), mouthSprite, pupils, eyeShape: Sprite.from(CharacterWhites)} as unknown as ConfigureNpcStyleArgs;
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

        if (!args.eyes)
            args.eyes = iguanaEyes(args as any);

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
}