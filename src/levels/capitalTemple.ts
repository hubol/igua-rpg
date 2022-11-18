import {subimageTextures} from "../utils/pixi/simpleSpritesheet";
import {BigKey4, CapitalArc, CapitalDitherEdge, CapitalLightRay, KeyBlue} from "../textures";
import {RegionKeys} from "../igua/gameplay/regionKeys";
import {scene} from "../igua/scene";
import {applyOgmoLevel} from "../igua/level/applyOgmoLevel";
import {CapitalTempleArgs} from "../levelArgs";
import {portalFluidConfig} from "../gameObjects/portalFluid";
import {progress} from "../igua/data/progress";
import {makeTempleLevelUtil} from "../igua/gameplay/templeLevelUtil";
import {CapitalMusicPlease, UnrealBlindMusic} from "../musics";
import {decalsOf} from "../gameObjects/decal";
import {Graphics, TilingSprite} from "pixi.js";
import {makeCapitalWindow} from "./capitalShop";
import {capitalBricksWall} from "../gameObjects/capitalBricks";
import {makePseudo} from "../utils/math/makePseudo";
import {lightRayCrude} from "../gameObjects/lightRayCrude";

export function CapitalTemple() {
    scene.backgroundColor = 0xE87880;
    scene.terrainColor = 0x103840;
    const level = applyOgmoLevel(CapitalTempleArgs);
    portalFluidConfig.gotoLevelName = 'CapitalTemple';

    const { bigKey } = progress.flags.capital;

    [level.Key1, level.Key2, level.Key3].forEach(x => x.texture = KeyBlue);

    const util = makeTempleLevelUtil(
        [capitalKeys.key1, bigKey.piece1, [level.Key1, level.Door1]],
        [capitalKeys.key2, bigKey.piece2, [level.Key2, level.Door2]],
        [capitalKeys.key3, bigKey.piece3, [level.Key3, level.Door3]]);

    util.playMusic().warm(CapitalMusicPlease, UnrealBlindMusic);

    util.makeBigKeyMeter(capitalBigKeyTextures).at(level.BigKey).behind();
    level.Sign.cutscene = util.signCutscene;
    level.GlowingCircle.tinted(0xFFE451).alpha = 0.625;

    decalsOf(CapitalArc).forEach(x => x.tinted(scene.terrainColor));
    // util.tryGiveReward(bigKey, 'reward', level.BigKey, 'Blessing of Flame');

    const wall = capitalBricksWall(scene.width, scene.height, makePseudo(31111.69)).behind(0);
    wall.opaqueTint = 0xD86080;
    const dither = new TilingSprite(CapitalDitherEdge).at(0, level.Door.y + level.Door.height - 12).behind();
    dither.width = scene.width;

    [level.Window1, level.Window2].forEach(x => {
        makeCapitalWindow(x, 0xE87880);
        lightRayCrude().at(x).ahead();
    });

    new Graphics()
        .beginFill(0x779988)
        .drawRect(0, 87 - 2, scene.width, 2)
        .drawRect(0, 97, scene.width, 5)
        .drawRect(0, 114, scene.width, 23)
        .at(0, -38)
        .behind(0);
}

export const capitalBigKeyTextures = subimageTextures(BigKey4, 3);
export const capitalKeys = new RegionKeys(
    KeyBlue,
    p => p.flags.capital.key.fromClown,
    p => p.flags.capital.key.fromTiming,
    p => p.flags.capital.key.fromStorage,
    p => p.flags.capital.bigKey.reward);