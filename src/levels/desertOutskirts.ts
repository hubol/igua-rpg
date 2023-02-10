import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {DesertOutskirtsArgs} from "../levelArgs";
import {scene, sceneStack} from "../igua/scene";
import {progress} from "../igua/data/progress";
import {DesertField} from "./desertField";
import {flash} from "../gameObjects/flash";
import {lever} from "../gameObjects/lever";
import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {DesertTempleLever} from "../textures";
import {cutscene} from "../cutscene/cutscene";
import {ActivateLever, TempleDoorOpen, TransitionSlide} from "../sounds";
import {ShockwaveFilter} from "pixi-filters";
import {game} from "../igua/game";
import {jukebox} from "../igua/jukebox";
import {DesertTown, GiantsNimbusMusic} from "../musics";
import {show, showAll} from "../cutscene/dialog";
import {lerp} from "../cutscene/lerp";
import {sleep} from "../cutscene/sleep";
import {move} from "../cutscene/move";
import {DisplayObject} from "pixi.js";
import {cameraLock} from "../gameObjects/cameraLock";
import {player} from "../gameObjects/player";
import {DestroyAfterGreatness, DestroyBeforeGreatness} from "../pixins/destroyByGreatness";

function getDesertOutskirtsLevel()
{
    return applyOgmoLevel(DesertOutskirtsArgs);
}

type DesertOutskirtsLevel = ReturnType<typeof getDesertOutskirtsLevel>;

export function DesertOutskirts()
{
    scene.backgroundColor = 0xF0F0B0;
    scene.terrainColor = 0xE0D060;

    jukebox.play(DesertTown).warm(GiantsNimbusMusic);
    const level = getDesertOutskirtsLevel();

    enrichUnlockTemple(level);
    enrichGrassyValuable(level);
    enrichRefugee(level);

    if (player.x < 576)
        cameraLock({ maxX: 576 },
            () => player.x >= 576 - 32 && player.y < level.Stump.y);
}

function enrichRefugee(level: DesertOutskirtsLevel) {
    [level.Trove1, level.Trove2, level.Trove3, level.Trove4, level.Trove5, level.Boulder1, level.Boulder2]
        .forEach(x => x?.withPixin(DestroyAfterGreatness));

    level.HiddenOracle
        .withPixin(DestroyBeforeGreatness)
        .withCutscene(async () => {
            await showAll(`I feel very foolish.`,
                `It was a mistake to put so much trust into the high oracle.`,
                `I'm sorry if you felt I was disappointed by your work.`,
                `I think I was mostly just shocked that what we had believed in turned out to be wrong.`,
                `But in the end, it doesn't really matter who was wrong or right.`);
            level.HiddenOracle.isDucking = false;
            await sleep(1000);
            await showAll(`In truth, we all could benefit from some change.`,
                `We oracles should probably stop being concerned with being correct.`,
                `And maybe you should start asking more questions.`,
                `You can't just go around believing everyone all the time.`,
                `What if the wizard was a fake after all? What then?`);
            await sleep(1000);
            await showAll(`How blasphemous of us... to disgrace the blessing of the last living protector...`)
        });

    level.HiddenOracle.isDucking = true;
    level.HiddenOracle.duckUnit = 1;
}

function enrichGrassyValuable(level: DesertOutskirtsLevel) {
    const bushes = enrichBushes(!level.GrassyValuableBackground, level.VBushLeft, level.VBushRight);

    if (!level.GrassyValuableBackground)
        return;

    level.GrassyValuableBackground.collectible = false;
    let interacted = false;
    level.BushValuableRegion.withInteraction(async () => {
        if (interacted)
            return;
        interacted = true;
        const b = bushes.move();
        await sleep(100);
        await move(level.GrassyValuableBackground!).by([0, -1]).over(650);
        await b;
        level.GrassyValuableBackground!.collectible = true;
    })
}

function enrichBushes(now: boolean, left: DisplayObject, right: DisplayObject) {
    const leftDst = left.x - 8;
    const rightDst = right.x + 8;
    if (now) {
        right.x = rightDst;
        left.x = leftDst;
    }
    return {
        move() {
            return Promise.all([
                lerp(right, "x").to(rightDst).over(300),
                lerp(left, "x").to(leftDst).over(360),
            ]);
        }
    }
}

function enrichUnlockTemple(level: DesertOutskirtsLevel)
{
    const offAngle = -45;
    const onAngle = -offAngle;

    const leverTextures = subimageTextures(DesertTempleLever, 2);
    const leverObject = lever(leverTextures[0], leverTextures[1], progress.flags.desert.unlockedTemple? onAngle : offAngle)
        .at({ x: 0, y: 8 }.add(level.TempleUnlockBlob));
    scene.backgroundGameObjectStage.addChildAt(leverObject, 0);

    const bushes = enrichBushes(progress.flags.desert.unlockedTemple, level.BushLeft, level.BushRight);

    level.TempleUnlockBlob.visible = false;
    leverObject.withInteraction(() => {
        if (progress.flags.desert.unlockedTemple)
        {
            cutscene.play(async () => {
               await show("You already activated the lever. It opened the door to the desert temple.");
            });
            return;
        }

        cutscene.play(async () => {
            await bushes.move();
            await sleep(300);
            ActivateLever.play();
            await lerp(leverObject, "angle").to(onAngle).over(200);

            const flashObject = flash(0xF0F0B0, 0);
            TransitionSlide.volume(0.7);
            TransitionSlide.play();
            await lerp(flashObject, "alpha").to(1).over(500);

            const field = sceneStack.push(DesertField);
            scene.camera.x = 1296;
            const goalX = Math.round(field.TempleDoor.x - 128 + 15);
            const goalY = Math.round(field.TempleDoor.y - 128);
            scene.camera.y = goalY + 32;

            await lerp(flashObject, "alpha").to(0).over(500);
            flashObject.destroy();

            await move(scene.camera).to(goalX, goalY).over(4_000);
            await sleep(500);

            const shockwaveFilter = new ShockwaveFilter([128, 136]);
            game.sceneStage.filters = [shockwaveFilter];
            field.TempleDoor.locked = false;
            TempleDoorOpen.play();
            await lerp(shockwaveFilter, "time").to(1).over(1000);
            await sleep(500);
            game.sceneStage.filters = [];
            sceneStack.pop();
            progress.flags.desert.unlockedTemple = true;
        })
    });
}
