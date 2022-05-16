// This file is generated. Do not touch.
import { resolveBlock } from "./gameObjects/walls";
import { resolveSlopeRight } from "./gameObjects/walls";
import { resolvePortalFluid } from "./gameObjects/portalFluid";
import { resolveSlopeLeft } from "./gameObjects/walls";
import { resolveNpc } from "./gameObjects/npc";
import { resolveDecalGameObject } from "./gameObjects/decal";
import { GlowingCircle } from "./textures";
import { Column } from "./textures";
import { resolveRegion } from "./gameObjects/region";
import { OverheadLamp } from "./textures";
import { Pipe } from "./textures";
import { ColorfulBricks } from "./textures";
import { RoseVase } from "./textures";
import { LightShelf } from "./textures";
import { FlyCage } from "./textures";
import { FlyCageBroken } from "./textures";
import { Cobweb } from "./textures";
import { Rainbow1 } from "./textures";
import { Rainbow2 } from "./textures";
import { SpikyBrushB } from "./textures";
import { SmallDecorativeRock } from "./textures";
import { SpikyBrushA } from "./textures";
import { GroundSpeckles } from "./textures";
import { resolveSpike } from "./gameObjects/spike";
import { resolveGate } from "./gameObjects/gate";
import { resolvePipeRightEnd } from "./gameObjects/walls";
import { resolvePipeHorizontal } from "./gameObjects/walls";
import { CracksA } from "./textures";
import { VineSmall } from "./textures";
import { PoppingRocksBox } from "./textures";
import { resolveJungleTree } from "./gameObjects/jungleTree";
import { resolvePool } from "./gameObjects/pool";
import { resolveTreeStump } from "./gameObjects/treeStump";
import { resolveValuableOrange } from "./gameObjects/valuable";
import { resolveValuableBlue } from "./gameObjects/valuable";
import { resolvePipeLeftEnd } from "./gameObjects/walls";
import { resolveDoor } from "./gameObjects/door";
import { resolveSign } from "./gameObjects/sign";
import { JunglePlank } from "./textures";
import { JungleTempleExterior } from "./textures";
import { JungleHouse1 } from "./textures";
import { KeyYellowShrunken } from "./textures";
import { JungleTent } from "./textures";
import { SignNeonInn } from "./textures";
import { SignNeonBar } from "./textures";
import { KeyYellow } from "./textures";
import { DinerTable } from "./textures";
import { JunglePlankDecoration } from "./textures";
import { BookCollection } from "./textures";
import { DontPoster } from "./textures";
import { resolveClownSneezy } from "./gameObjects/clownSneezy";
import { resolveCommonClown } from "./gameObjects/commonClown";
import { JungleBrushHeavy } from "./textures";
import { GlowingEdge } from "./textures";
import { CloudLong } from "./textures";
import { JungleTreeRoot } from "./textures";
import { PaSpeaker } from "./textures";
import { CocktailGlass } from "./textures";
import { Bottle1 } from "./textures";
import { resolveBigua } from "./gameObjects/bigua";
import { Obelisk } from "./textures";
import { resolveBoulder } from "./gameObjects/boulder";
import { KeyRed } from "./textures";
import { SignTavern } from "./textures";
import { SignInn } from "./textures";
import { CrudeHouse } from "./textures";
import { CrudeHouseC } from "./textures";
import { CrateWooden } from "./textures";
import { CrudeHouseB } from "./textures";
import { GreenCable } from "./textures";
import { Bottle2 } from "./textures";
import { WhiskeyGlass } from "./textures";
import { WoodenStool } from "./textures";
import { resolveFakeWall } from "./gameObjects/fakeWall";
import { Anchor } from "./textures";
import { resolvePipeLeft } from "./gameObjects/walls";
import { resolvePipeRight } from "./gameObjects/walls";
import { OrnateCarpet } from "./textures";
import { PotteryOrange } from "./textures";
import { PotteryOrangeDamaged } from "./textures";
import { Rope } from "./textures";
import { DesertTemple } from "./textures";
import { CandleSmallRed } from "./textures";

export const DesertCostumerArgs = {
    width: 448,
height: 256,
gameObjectsSupplier: () => {
  return {
    PotteryOrange: resolveDecalGameObject({
    x: 184,
y: 217,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: PotteryOrange
}),
PotteryOrangeDamaged: resolveDecalGameObject({
    x: 264,
y: 217,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: PotteryOrangeDamaged
}),
Cobweb: resolveDecalGameObject({
    x: 40,
y: 40,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Cobweb
}),
OrnateCarpet: resolveDecalGameObject({
    x: 224,
y: 229,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: OrnateCarpet
}),
SpikyBrushB: resolveDecalGameObject({
    x: 184,
y: 211,
originX: 0.5,
originY: 1,
scaleX: 0.5,
scaleY: 0.5,
rotation: 0,
layerName: "TerrainDecals",
texture: SpikyBrushB
}),
RoseVase: resolveDecalGameObject({
    x: 400,
y: 219,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: RoseVase
}),
BehindCostumerGlow: resolveDecalGameObject({
    x: 224,
y: 224,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
CracksA: resolveDecalGameObject({
    x: 154,
y: 146,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 224,
y: 56,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_2: resolveDecalGameObject({
    x: 400,
y: 104,
originX: 0,
originY: 0,
scaleX: -1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
LightShelf: resolveDecalGameObject({
    x: 304,
y: 188,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: LightShelf
}),
BookCollection: resolveDecalGameObject({
    x: 298,
y: 184,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: BookCollection
}),
LightShelf_1: resolveDecalGameObject({
    x: 128,
y: 188,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: LightShelf
}),
CandleSmallRed: resolveDecalGameObject({
    x: 136,
y: 184,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CandleSmallRed
}),
CandleSmallRed_1: resolveDecalGameObject({
    x: 120,
y: 184,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CandleSmallRed
}),
CloudLong: resolveDecalGameObject({
    x: 80,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 120,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 32,
y: 112,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 272,
y: 104,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 336,
y: 112,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_5: resolveDecalGameObject({
    x: 400,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":48,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_0","levelName":"DesertTown","checkpointName":"FromCostumer","name":"","depth":0}),
// @ts-ignore
Floor: resolveBlock({"type":"Block","x":0,"y":224,"width":496,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"Floor","depth":0}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":0,"width":32,"height":224,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
Player: {"type":"Player","x":96,"y":224,"flippedX":false,"flippedY":false,"uid":"55988047_4","faceRight":true,"name":"","depth":0},
// @ts-ignore
Window1: resolveRegion({"type":"Region","x":48,"y":88,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_38","name":"Window1","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":32,"y":0,"width":464,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_42","name":"","depth":0}),
// @ts-ignore
Costumer: resolveNpc({"type":"NpcIguana","x":226,"y":224,"flippedX":true,"flippedY":false,"uid":"26367058_43","name":"Costumer","style":7,"depth":0}),
// @ts-ignore
Window2: resolveRegion({"type":"Region","x":184,"y":88,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_44","name":"Window2","depth":0}),
// @ts-ignore
Window3: resolveRegion({"type":"Region","x":320,"y":104,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_45","name":"Window3","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":320,"y":32,"width":128,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_46","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":416,"y":48,"width":32,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268_47","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":288,"y":16,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_49","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":384,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_50","name":"","depth":0}),
// @ts-ignore
MirrorRegion: resolveRegion({"type":"Region","x":336,"y":164,"width":48,"height":56,"flippedX":false,"flippedY":false,"uid":"25971607_51","name":"MirrorRegion","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":112,"y":184,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_52","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":288,"y":184,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_53","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":48,"y":120,"width":80,"flippedX":false,"flippedY":false,"uid":"55841307_54","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_3: resolvePipeHorizontal({"type":"PipeHorizontal","x":184,"y":120,"width":80,"flippedX":false,"flippedY":false,"uid":"55841307_55","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_4: resolvePipeHorizontal({"type":"PipeHorizontal","x":320,"y":136,"width":80,"flippedX":false,"flippedY":false,"uid":"55841307_56","visible":false,"name":"","depth":0})
};
}
};

export const DesertFieldArgs = {
    width: 1552,
height: 472,
gameObjectsSupplier: () => {
  return {
    DesertTemple: resolveDecalGameObject({
    x: 440,
y: 328,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: DesertTemple
}),
SpikyBrushA: resolveDecalGameObject({
    x: 376,
y: 328,
originX: 0.5,
originY: 0.9,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushA_1: resolveDecalGameObject({
    x: 352,
y: 328,
originX: 0.5,
originY: 0.9,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB: resolveDecalGameObject({
    x: 360,
y: 320,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_1: resolveDecalGameObject({
    x: 512,
y: 244,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_2: resolveDecalGameObject({
    x: 145,
y: 360,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_3: resolveDecalGameObject({
    x: 1448,
y: 260,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_4: resolveDecalGameObject({
    x: 744,
y: 373,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_2: resolveDecalGameObject({
    x: 1096,
y: 408,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushA_3: resolveDecalGameObject({
    x: 1320,
y: 376,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
Column: resolveDecalGameObject({
    x: 1528,
y: 384,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1.1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_1: resolveDecalGameObject({
    x: 1480,
y: 384,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1.275,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
CloudLong: resolveDecalGameObject({
    x: 144,
y: 184,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 176,
y: 192,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 336,
y: 224,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 440,
y: 160,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 608,
y: 192,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_5: resolveDecalGameObject({
    x: 640,
y: 200,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_6: resolveDecalGameObject({
    x: 752,
y: 232,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_7: resolveDecalGameObject({
    x: 8,
y: 240,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_8: resolveDecalGameObject({
    x: 848,
y: 304,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_9: resolveDecalGameObject({
    x: 880,
y: 296,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_10: resolveDecalGameObject({
    x: 976,
y: 232,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_11: resolveDecalGameObject({
    x: 1152,
y: 312,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_12: resolveDecalGameObject({
    x: 1248,
y: 216,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_13: resolveDecalGameObject({
    x: 1272,
y: 224,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_14: resolveDecalGameObject({
    x: 1432,
y: 288,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_15: resolveDecalGameObject({
    x: 1544,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":368,"width":312,"height":104,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
TempleDoor: resolveDoor({"type":"Door","x":400,"y":296,"flippedX":false,"flippedY":false,"uid":"55913988_1","levelName":"DesertTemple","checkpointName":"","name":"TempleDoor","depth":0}),
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":472,"y":328,"flippedX":false,"flippedY":false,"uid":"86706091_2","title":"Temple","message":"This is the ancient desert temple.","name":"","depth":0}),
Player: {"type":"Player","x":1352,"y":384,"flippedX":false,"flippedY":false,"uid":"55988047_3","faceRight":true,"name":"","depth":0},
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":0,"y":336,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_4","levelName":"DesertTown","checkpointName":"FromField","name":"","depth":0}),
FromTown: {"type":"Checkpoint","x":72,"y":368,"flippedX":false,"flippedY":false,"uid":"55940370_5","name":"FromTown","faceRight":true,"depth":0},
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":232,"y":328,"width":80,"height":40,"flippedX":false,"flippedY":false,"uid":"55824435_6","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":312,"y":328,"width":288,"height":144,"flippedX":false,"flippedY":false,"uid":"55823268_7","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":600,"y":328,"width":112,"height":56,"flippedX":false,"flippedY":false,"uid":"55845599_8","name":"","depth":0}),
// @ts-ignore
Sign_1: resolveSign({"type":"Sign","x":168,"y":368,"flippedX":false,"flippedY":false,"uid":"86706091_9","title":"Sand","message":"This is the desert.","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":600,"y":384,"width":168,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268_10","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":768,"y":384,"width":96,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_11","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":768,"y":416,"width":432,"height":56,"flippedX":false,"flippedY":false,"uid":"55823268_12","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":1112,"y":384,"width":88,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_13","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":1200,"y":384,"width":352,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268_14","name":"","depth":0}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":1368,"y":256,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_15","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":1400,"y":256,"width":152,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_16","name":"","depth":0}),
// @ts-ignore
SlopeRight_3: resolveSlopeRight({"type":"SlopeRight","x":1400,"y":288,"width":152,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_17","name":"","depth":0}),
// @ts-ignore
Digua: resolveNpc({"type":"NpcIguana","x":1400,"y":256,"flippedX":true,"flippedY":false,"uid":"26367058_18","name":"Digua","style":4,"depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":344,"y":256,"width":200,"flippedX":false,"flippedY":false,"uid":"55841307_19","visible":false,"name":"","depth":0}),
// @ts-ignore
Gate_1: resolveGate({"type":"Gate","x":1520,"y":224,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_20","levelName":"DesertOutskirts","checkpointName":"FromDigua","name":"","depth":0}),
// @ts-ignore
Gate_2: resolveGate({"type":"Gate","x":1520,"y":352,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_21","levelName":"DesertOutskirts","checkpointName":"","name":"","depth":0}),
FromOutskirtsTop: {"type":"Checkpoint","x":1488,"y":256,"flippedX":false,"flippedY":false,"uid":"55940370_22","name":"FromOutskirtsTop","faceRight":false,"depth":0},
FromOutskirtsBottom: {"type":"Checkpoint","x":1488,"y":384,"flippedX":false,"flippedY":false,"uid":"55940370_23","name":"FromOutskirtsBottom","faceRight":false,"depth":0},
FromTemple: {"type":"Checkpoint","x":384,"y":328,"flippedX":false,"flippedY":false,"uid":"55940370_24","name":"FromTemple","faceRight":false,"depth":0},
// @ts-ignore
CommonClown: resolveCommonClown({"type":"CommonClown","x":696,"y":368,"flippedX":false,"flippedY":false,"uid":"68762216_25","name":"","depth":0}),
// @ts-ignore
CommonClown_1: resolveCommonClown({"type":"CommonClown","x":840,"y":400,"flippedX":false,"flippedY":false,"uid":"68762216_26","name":"","depth":0}),
// @ts-ignore
CommonClown_2: resolveCommonClown({"type":"CommonClown","x":1032,"y":408,"flippedX":false,"flippedY":false,"uid":"68762216_27","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":460,"y":162,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_28","visible":false,"name":"","depth":0}),
// @ts-ignore
ValuableOrange: resolveValuableOrange({"type":"ValuableOrange","x":472,"y":56,"flippedX":false,"flippedY":false,"uid":"56004563_29","name":"","depth":0}),
// @ts-ignore
ValuableOrange_1: resolveValuableOrange({"type":"ValuableOrange","x":496,"y":40,"flippedX":false,"flippedY":false,"uid":"56004563_30","name":"","depth":0}),
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":472,"y":24,"flippedX":false,"flippedY":false,"uid":"55991906_31","name":"","depth":0}),
Tumbleweed1: {"type":"Anchor","x":272,"y":288,"flippedX":false,"flippedY":false,"uid":"25979726_32","name":"Tumbleweed1","depth":0},
Tumbleweed2: {"type":"Anchor","x":920,"y":376,"flippedX":false,"flippedY":false,"uid":"25979726_33","name":"Tumbleweed2","depth":0}
};
}
};

export const DesertInnArgs = {
    width: 512,
height: 256,
gameObjectsSupplier: () => {
  return {
    WoodenStool: resolveDecalGameObject({
    x: 134,
y: 157,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: WoodenStool
}),
CracksA: resolveDecalGameObject({
    x: 56,
y: 64,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 232,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: -1.5707963267948966,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_2: resolveDecalGameObject({
    x: 480,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CrateWooden: resolveDecalGameObject({
    x: 456,
y: 136,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
CrateWooden_1: resolveDecalGameObject({
    x: 424,
y: 136,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
CrateWooden_2: resolveDecalGameObject({
    x: 440,
y: 112,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
GlowingCircle: resolveDecalGameObject({
    x: 376,
y: 0,
originX: 0.5,
originY: 0.5,
scaleX: 2.125,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
Rope: resolveDecalGameObject({
    x: 304,
y: 48,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 7,
rotation: 0,
layerName: "BackgroundDecals",
texture: Rope
}),
KeyRed: resolveDecalGameObject({
    x: 306,
y: 103,
originX: 0.286,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
Cobweb: resolveDecalGameObject({
    x: 384,
y: 0,
originX: 1,
originY: 0,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
LightShelf: resolveDecalGameObject({
    x: 96,
y: 88,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: LightShelf
}),
LightShelf_1: resolveDecalGameObject({
    x: 136,
y: 104,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: LightShelf
}),
LightShelf_2: resolveDecalGameObject({
    x: 408,
y: 120,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: LightShelf
}),
RoseVase: resolveDecalGameObject({
    x: 144,
y: 104,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: RoseVase
}),
RoseVase_1: resolveDecalGameObject({
    x: 88,
y: 88,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: RoseVase
}),
DontPoster: resolveDecalGameObject({
    x: 192,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: DontPoster
}),
PotteryOrange: resolveDecalGameObject({
    x: 344,
y: 160,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrange
}),
PotteryOrange_1: resolveDecalGameObject({
    x: 323,
y: 160,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrange
}),
CloudLong: resolveDecalGameObject({
    x: 392,
y: 80,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 432,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 352,
y: 104,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":128,"flippedX":false,"flippedY":false,"uid":"55913988_0","levelName":"DesertTown","checkpointName":"FromInn","name":"","depth":0}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":160,"width":512,"height":96,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":0,"width":16,"height":160,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":16,"y":0,"width":336,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
Player: {"type":"Player","x":80,"y":160,"flippedX":false,"flippedY":false,"uid":"55988047_4","faceRight":true,"name":"","depth":0},
// @ts-ignore
Innkeeper: resolveNpc({"type":"NpcIguana","x":160,"y":160,"flippedX":true,"flippedY":false,"uid":"26367058_5","name":"Innkeeper","style":3,"depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":16,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_7","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":224,"y":32,"width":48,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_8","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":120,"y":32,"width":104,"height":64,"flippedX":false,"flippedY":true,"uid":"55824435_9","name":"","depth":0}),
// @ts-ignore
RoomWall: resolveBlock({"type":"Block","x":232,"y":96,"width":32,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_10","name":"RoomWall","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":480,"y":32,"width":32,"height":128,"flippedX":false,"flippedY":false,"uid":"55823268_11","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":400,"y":32,"width":80,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_12","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":272,"y":32,"width":80,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_13","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":400,"y":0,"width":112,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_14","name":"","depth":0}),
SleepHere: {"type":"Anchor","x":384,"y":152,"flippedX":false,"flippedY":false,"uid":"25979726_15","name":"SleepHere","depth":0},
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":436,"y":112,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_16","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":424,"y":136,"width":56,"flippedX":false,"flippedY":false,"uid":"55841307_17","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":120,"y":104,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_18","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_3: resolvePipeHorizontal({"type":"PipeHorizontal","x":80,"y":88,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_19","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_4: resolvePipeHorizontal({"type":"PipeHorizontal","x":392,"y":120,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_20","visible":false,"name":"","depth":0}),
// @ts-ignore
Window: resolveRegion({"type":"Region","x":336,"y":72,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_22","name":"Window","depth":0}),
FromInnSave: {"type":"Checkpoint","x":376,"y":160,"flippedX":false,"flippedY":false,"uid":"55940370_23","name":"FromInnSave","faceRight":false,"depth":0}
};
}
};

export const DesertOracleArgs = {
    width: 256,
height: 648,
gameObjectsSupplier: () => {
  return {
    Cobweb: resolveDecalGameObject({
    x: 32,
y: 158,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Cobweb
}),
PotteryOrangeDamaged: resolveDecalGameObject({
    x: 64,
y: 482,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: PotteryOrangeDamaged
}),
PotteryOrange: resolveDecalGameObject({
    x: 32,
y: 617,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: PotteryOrange
}),
PotteryOrangeDamaged_1: resolveDecalGameObject({
    x: 104,
y: 618,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: PotteryOrangeDamaged
}),
PotteryOrange_1: resolveDecalGameObject({
    x: 126,
y: 612,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: PotteryOrange
}),
Cobweb_1: resolveDecalGameObject({
    x: 224,
y: 496,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Cobweb
}),
OrnateCarpet: resolveDecalGameObject({
    x: 68,
y: 616,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: OrnateCarpet
}),
RoseVase: resolveDecalGameObject({
    x: 80,
y: 618,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: RoseVase
}),
CracksA: resolveDecalGameObject({
    x: 88,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 32,
y: 384,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_2: resolveDecalGameObject({
    x: 240,
y: 560,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
GlowingCircle: resolveDecalGameObject({
    x: 188,
y: 0,
originX: 0.5,
originY: 0.5,
scaleX: 1.5,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
Cobweb_2: resolveDecalGameObject({
    x: 124,
y: 212,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 3.141592653589793,
layerName: "BackgroundDecals",
texture: Cobweb
}),
RoseVase_1: resolveDecalGameObject({
    x: 116,
y: 212,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: RoseVase
}),
CloudLong: resolveDecalGameObject({
    x: 56,
y: 144,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 88,
y: 152,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 24,
y: 184,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 160,
y: 192,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 192,
y: 184,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_5: resolveDecalGameObject({
    x: 168,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":0,"width":144,"height":112,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":616,"width":256,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":112,"width":24,"height":504,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":232,"y":80,"width":32,"height":584,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":200,"flippedX":false,"flippedY":false,"uid":"55913988_5","levelName":"DesertTown","checkpointName":"FromLeftHouse","name":"","depth":0}),
Player: {"type":"Player","x":80,"y":232,"flippedX":false,"flippedY":false,"uid":"55988047_6","faceRight":true,"name":"","depth":0},
// @ts-ignore
PipeLeft: resolvePipeLeft({"type":"PipeLeft","x":176,"y":144,"width":56,"height":40,"flippedX":false,"flippedY":false,"uid":"55866573_7","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":144,"y":144,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_8","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":144,"y":144,"flippedX":false,"flippedY":false,"uid":"63428932_9","name":"","depth":0}),
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":168,"y":144,"flippedX":false,"flippedY":false,"uid":"55991906_10","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":104,"y":584,"width":128,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_11","name":"","depth":0}),
// @ts-ignore
PipeLeft_1: resolvePipeLeft({"type":"PipeLeft","x":112,"y":544,"width":104,"height":56,"flippedX":false,"flippedY":false,"uid":"55866573_12","name":"","depth":0}),
// @ts-ignore
PipeRight: resolvePipeRight({"type":"PipeRight","x":112,"y":472,"width":120,"height":72,"flippedX":false,"flippedY":false,"uid":"55859676_13","name":"","depth":0}),
// @ts-ignore
PipeLeft_2: resolvePipeLeft({"type":"PipeLeft","x":112,"y":400,"width":120,"height":72,"flippedX":false,"flippedY":false,"uid":"55866573_15","name":"","depth":0}),
// @ts-ignore
PipeRight_1: resolvePipeRight({"type":"PipeRight","x":112,"y":336,"width":120,"height":64,"flippedX":false,"flippedY":false,"uid":"55859676_16","name":"","depth":0}),
// @ts-ignore
PipeLeft_3: resolvePipeLeft({"type":"PipeLeft","x":168,"y":288,"width":64,"height":48,"flippedX":false,"flippedY":false,"uid":"55866573_17","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":136,"y":288,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_19","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeLeftEnd_1: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":136,"y":288,"flippedX":false,"flippedY":false,"uid":"63428932_20","name":"","depth":0}),
// @ts-ignore
Oracle: resolveNpc({"type":"NpcIguana","x":48,"y":616,"flippedX":false,"flippedY":false,"uid":"26367058_21","name":"Oracle","style":0,"depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":24,"y":232,"width":96,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_22","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":80,"y":400,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_23","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeLeftEnd_2: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":80,"y":400,"flippedX":false,"flippedY":false,"uid":"63428932_24","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":24,"y":112,"width":64,"height":48,"flippedX":false,"flippedY":true,"uid":"55845599_25","name":"","depth":0}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":80,"y":480,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_26","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":48,"y":480,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_27","name":"","depth":0}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":200,"y":80,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_28","name":"","depth":0}),
// @ts-ignore
SlopeLeft_3: resolveSlopeLeft({"type":"SlopeLeft","x":144,"y":80,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_29","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":144,"y":0,"width":32,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268_30","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":200,"y":0,"width":56,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268_31","name":"","depth":0}),
// @ts-ignore
Window1: resolveRegion({"type":"Region","x":72,"y":160,"width":24,"height":24,"flippedX":false,"flippedY":false,"uid":"25971607_32","name":"Window1","depth":0}),
// @ts-ignore
Window2: resolveRegion({"type":"Region","x":100,"y":160,"width":24,"height":24,"flippedX":false,"flippedY":false,"uid":"25971607_35","name":"Window2","depth":0}),
// @ts-ignore
Window3: resolveRegion({"type":"Region","x":72,"y":188,"width":24,"height":24,"flippedX":false,"flippedY":false,"uid":"25971607_36","name":"Window3","depth":0}),
// @ts-ignore
Window4: resolveRegion({"type":"Region","x":100,"y":188,"width":24,"height":24,"flippedX":false,"flippedY":false,"uid":"25971607_37","name":"Window4","depth":0})
};
}
};

export const DesertOutskirtsArgs = {
    width: 752,
height: 416,
gameObjectsSupplier: () => {
  return {
    Column: resolveDecalGameObject({
    x: 24,
y: 296,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_1: resolveDecalGameObject({
    x: 72,
y: 296,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
SpikyBrushA: resolveDecalGameObject({
    x: 56,
y: 328,
originX: 0.5,
originY: 0.9,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB: resolveDecalGameObject({
    x: 304,
y: 288,
originX: 0.5,
originY: 0.7,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_1: resolveDecalGameObject({
    x: 112,
y: 192,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
TempleUnlockBlob: resolveDecalGameObject({
    x: 328,
y: 120,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Anchor
}),
BushRight: resolveDecalGameObject({
    x: 336,
y: 122,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
BushLeft: resolveDecalGameObject({
    x: 320,
y: 120,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_2: resolveDecalGameObject({
    x: 440,
y: 320,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushA_3: resolveDecalGameObject({
    x: 440,
y: 264,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: -2.631174083493359,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_1: resolveDecalGameObject({
    x: 520,
y: 320,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
VBushRight: resolveDecalGameObject({
    x: 193,
y: 320,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
VBushLeft: resolveDecalGameObject({
    x: 171,
y: 319,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushA_4: resolveDecalGameObject({
    x: 689.8792460234883,
y: 146.41175695405192,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_2: resolveDecalGameObject({
    x: 600.1087478070684,
y: 145.9212077834704,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
CloudLong: resolveDecalGameObject({
    x: 72,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 112,
y: 104,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 216,
y: 224,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 312,
y: 152,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 248,
y: 72,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_5: resolveDecalGameObject({
    x: 560,
y: 48,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_6: resolveDecalGameObject({
    x: 640,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":328,"width":368,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":200,"width":96,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"","depth":0}),
Player: {"type":"Player","x":72,"y":328,"flippedX":false,"flippedY":false,"uid":"55988047_2","faceRight":true,"name":"","depth":0},
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":96,"y":200,"width":64,"height":64,"flippedX":false,"flippedY":true,"uid":"55845599_3","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":144,"y":200,"width":40,"flippedX":false,"flippedY":false,"uid":"55841307_4","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeRightEnd: resolvePipeRightEnd({"type":"PipeRightEnd","x":184,"y":200,"flippedX":false,"flippedY":false,"uid":"63418353_5","name":"","depth":0}),
FromDigua: {"type":"Checkpoint","x":72,"y":200,"flippedX":false,"flippedY":false,"uid":"55940370_6","name":"FromDigua","faceRight":true,"depth":0},
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":0,"y":168,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_7","levelName":"DesertField","checkpointName":"FromOutskirtsTop","name":"","depth":0}),
// @ts-ignore
Gate_1: resolveGate({"type":"Gate","x":0,"y":296,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_8","levelName":"DesertField","checkpointName":"FromOutskirtsBottom","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":232,"y":296,"width":64,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_9","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":296,"y":296,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_10","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":288,"y":232,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_11","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeRightEnd_1: resolvePipeRightEnd({"type":"PipeRightEnd","x":320,"y":232,"flippedX":false,"flippedY":false,"uid":"63418353_12","name":"","depth":0}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":288,"y":232,"flippedX":false,"flippedY":false,"uid":"63428932_13","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":256,"y":128,"width":112,"flippedX":false,"flippedY":false,"uid":"55841307_19","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeLeftEnd_1: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":256,"y":128,"flippedX":false,"flippedY":false,"uid":"63428932_20","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":368,"y":0,"width":80,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268_21","name":"","depth":0}),
// @ts-ignore
Boulder: resolveBoulder({"type":"Boulder","x":376,"y":284,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"15952797_22","name":"","depth":0}),
// @ts-ignore
Boulder_1: resolveBoulder({"type":"Boulder","x":392,"y":254,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"15952797_23","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":368,"y":296,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_24","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":408,"y":240,"width":72,"height":40,"flippedX":false,"flippedY":true,"uid":"55824435_25","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":480,"y":240,"width":48,"height":40,"flippedX":false,"flippedY":false,"uid":"55823268_26","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":368,"y":328,"width":160,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268_27","name":"","depth":0}),
// @ts-ignore
Block_6: resolveBlock({"type":"Block","x":528,"y":240,"width":48,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268_28","name":"","depth":0}),
// @ts-ignore
ValuableOrange: resolveValuableOrange({"type":"ValuableOrange","x":456,"y":328,"flippedX":false,"flippedY":false,"uid":"56004563_34","name":"","depth":0}),
// @ts-ignore
ValuableOrange_1: resolveValuableOrange({"type":"ValuableOrange","x":480,"y":328,"flippedX":false,"flippedY":false,"uid":"56004563_35","name":"","depth":0}),
// @ts-ignore
ValuableOrange_2: resolveValuableOrange({"type":"ValuableOrange","x":504,"y":328,"flippedX":false,"flippedY":false,"uid":"56004563_36","name":"","depth":0}),
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":468,"y":318,"flippedX":false,"flippedY":false,"uid":"55991906_37","name":"","depth":0}),
// @ts-ignore
ValuableBlue_1: resolveValuableBlue({"type":"ValuableBlue","x":492,"y":318,"flippedX":false,"flippedY":false,"uid":"55991906_38","name":"","depth":0}),
// @ts-ignore
GrassyValuableBackground: resolveValuableOrange({"type":"ValuableOrange","x":184,"y":328,"flippedX":false,"flippedY":false,"uid":"56004563_39","name":"GrassyValuableBackground","depth":3}),
// @ts-ignore
BushValuableRegion: resolveRegion({"type":"Region","x":160,"y":312,"width":40,"height":16,"flippedX":false,"flippedY":false,"uid":"25971607_40","name":"BushValuableRegion","depth":0}),
// @ts-ignore
Block_7: resolveBlock({"type":"Block","x":368,"y":192,"width":208,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268_41","name":"","depth":0}),
// @ts-ignore
FakeWall: resolveFakeWall({"type":"FakeWall","x":368,"y":176,"width":152,"height":16,"flippedX":false,"flippedY":false,"uid":"02672398_42","name":"","depth":0}),
// @ts-ignore
Block_8: resolveBlock({"type":"Block","x":520,"y":176,"width":56,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_43","name":"","depth":0}),
// @ts-ignore
FakeWall_1: resolveFakeWall({"type":"FakeWall","x":448,"y":104,"width":24,"height":72,"flippedX":false,"flippedY":false,"uid":"02672398_45","name":"","depth":0}),
// @ts-ignore
FakeWall_2: resolveFakeWall({"type":"FakeWall","x":472,"y":104,"width":104,"height":16,"flippedX":false,"flippedY":false,"uid":"02672398_46","name":"","depth":0}),
// @ts-ignore
Block_9: resolveBlock({"type":"Block","x":472,"y":120,"width":104,"height":56,"flippedX":false,"flippedY":false,"uid":"55823268_47","name":"","depth":0}),
// @ts-ignore
Block_10: resolveBlock({"type":"Block","x":448,"y":0,"width":128,"height":104,"flippedX":false,"flippedY":false,"uid":"55823268_48","name":"","depth":0}),
// @ts-ignore
Block_11: resolveBlock({"type":"Block","x":576,"y":152,"width":144,"height":264,"flippedX":false,"flippedY":false,"uid":"55823268_49","name":"","depth":0}),
// @ts-ignore
Stump: resolveTreeStump({"type":"TreeStump","x":648,"y":152,"flippedX":false,"flippedY":false,"uid":"77429484_50","levelName":"GiantsTown","checkpointName":"Stump","name":"Stump","depth":0,"faceRight":false}),
// @ts-ignore
Block_12: resolveBlock({"type":"Block","x":720,"y":0,"width":32,"height":416,"flippedX":false,"flippedY":false,"uid":"55823268_51","name":"","depth":0}),
// @ts-ignore
ValuableBlue_2: resolveValuableBlue({"type":"ValuableBlue","x":632,"y":72,"flippedX":false,"flippedY":false,"uid":"55991906_52","name":"","depth":0}),
// @ts-ignore
ValuableOrange_3: resolveValuableOrange({"type":"ValuableOrange","x":664,"y":72,"flippedX":false,"flippedY":false,"uid":"56004563_53","name":"","depth":0})
};
}
};

export const DesertShopArgs = {
    width: 496,
height: 256,
gameObjectsSupplier: () => {
  return {
    WoodenStool: resolveDecalGameObject({
    x: 380,
y: 221,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: WoodenStool
}),
CocktailGlass: resolveDecalGameObject({
    x: 376,
y: 217,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: CocktailGlass
}),
DinerTable: resolveDecalGameObject({
    x: 224,
y: 224,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: DinerTable
}),
DinerTable_1: resolveDecalGameObject({
    x: 312,
y: 224,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: DinerTable
}),
DiguaGlass: resolveDecalGameObject({
    x: 216,
y: 216,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: CocktailGlass
}),
WhiskeyGlass: resolveDecalGameObject({
    x: 232,
y: 216,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: WhiskeyGlass
}),
CrateWooden: resolveDecalGameObject({
    x: 432,
y: 200,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
CrateWooden_1: resolveDecalGameObject({
    x: 440,
y: 176,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Cobweb: resolveDecalGameObject({
    x: 456,
y: 208,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
Cobweb_1: resolveDecalGameObject({
    x: 456,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 3.141592653589793,
layerName: "BackgroundDecals",
texture: Cobweb
}),
Bottle1: resolveDecalGameObject({
    x: 440,
y: 176,
originX: 0,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Bottle1
}),
Bottle1_1: resolveDecalGameObject({
    x: 456,
y: 224,
originX: 0,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Bottle1
}),
Bottle2: resolveDecalGameObject({
    x: 436,
y: 200,
originX: 0,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Bottle2
}),
Bottle2_1: resolveDecalGameObject({
    x: 340,
y: 216,
originX: 0,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 1.8849555921538759,
layerName: "BackgroundDecals",
texture: Bottle2
}),
CracksA: resolveDecalGameObject({
    x: 152,
y: 72,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 160,
y: 134,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0.7853981633974483,
layerName: "BackgroundDecals",
texture: CracksA
}),
Cobweb_2: resolveDecalGameObject({
    x: 248,
y: 49,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
Cobweb_3: resolveDecalGameObject({
    x: 230,
y: 38,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
DontPoster: resolveDecalGameObject({
    x: 400,
y: 184,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: DontPoster
}),
GreenCable: resolveDecalGameObject({
    x: 196,
y: 120,
originX: 0,
originY: 0,
scaleX: 20,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GreenCable
}),
PaSpeaker: resolveDecalGameObject({
    x: 200,
y: 127,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PaSpeaker
}),
PaSpeaker_1: resolveDecalGameObject({
    x: 336,
y: 127,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PaSpeaker
}),
CloudLong: resolveDecalGameObject({
    x: 48,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 88,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 120,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":48,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_0","levelName":"DesertTown","checkpointName":"FromShop","name":"","depth":0}),
// @ts-ignore
Floor: resolveBlock({"type":"Block","x":0,"y":224,"width":496,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"Floor","depth":0}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":0,"width":32,"height":224,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":32,"y":0,"width":432,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
Player: {"type":"Player","x":96,"y":224,"flippedX":false,"flippedY":false,"uid":"55988047_4","faceRight":true,"name":"","depth":0},
// @ts-ignore
Shopkeeper: resolveNpc({"type":"NpcIguana","x":408,"y":224,"flippedX":true,"flippedY":false,"uid":"26367058_5","name":"Shopkeeper","style":5,"depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":112,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_17","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":304,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_18","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":240,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_19","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":272,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_20","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":432,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_21","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":464,"y":0,"width":32,"height":224,"flippedX":false,"flippedY":false,"uid":"55823268_24","name":"","depth":0}),
ShopLamp: {"type":"Anchor","x":376,"y":160,"flippedX":false,"flippedY":false,"uid":"25979726_25","name":"ShopLamp","depth":0},
MiddleLamp: {"type":"Anchor","x":264,"y":144,"flippedX":false,"flippedY":false,"uid":"25979726_26","name":"MiddleLamp","depth":0},
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":440,"y":176,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_28","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":432,"y":200,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_29","visible":false,"name":"","depth":0}),
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":240,"y":56,"flippedX":false,"flippedY":false,"uid":"55991906_32","name":"","depth":0}),
// @ts-ignore
BarAttendee: resolveNpc({"type":"NpcIguana","x":264,"y":224,"flippedX":true,"flippedY":false,"uid":"26367058_33","name":"BarAttendee","style":6,"depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":32,"y":32,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_34","name":"","depth":0}),
// @ts-ignore
Digua: resolveNpc({"type":"NpcIguana","x":184,"y":224,"flippedX":false,"flippedY":false,"uid":"26367058_35","name":"Digua","style":4,"depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":296,"y":216,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_36","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_3: resolvePipeHorizontal({"type":"PipeHorizontal","x":208,"y":216,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_37","visible":false,"name":"","depth":0}),
// @ts-ignore
Window1: resolveRegion({"type":"Region","x":38,"y":70,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_38","name":"Window1","depth":0}),
// @ts-ignore
Window2: resolveRegion({"type":"Region","x":74,"y":70,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_39","name":"Window2","depth":0}),
// @ts-ignore
Window3: resolveRegion({"type":"Region","x":38,"y":106,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_40","name":"Window3","depth":0}),
// @ts-ignore
Window4: resolveRegion({"type":"Region","x":74,"y":106,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_41","name":"Window4","depth":0})
};
}
};

export const DesertTempleArgs = {
    width: 512,
height: 256,
gameObjectsSupplier: () => {
  return {
    Key1: resolveDecalGameObject({
    x: 208,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
Key2: resolveDecalGameObject({
    x: 288,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
Key3: resolveDecalGameObject({
    x: 368,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
Cobweb: resolveDecalGameObject({
    x: 32,
y: 160,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
Cobweb_1: resolveDecalGameObject({
    x: 480,
y: 160,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
CracksA: resolveDecalGameObject({
    x: 248,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 304,
y: 64,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
Column: resolveDecalGameObject({
    x: 152,
y: 224,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1.125,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_1: resolveDecalGameObject({
    x: 424,
y: 224,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1.125,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
GlowingCircle: resolveDecalGameObject({
    x: 288,
y: -12,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1.75,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":224,"width":512,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_1","levelName":"DesertField","checkpointName":"FromTemple","name":"","depth":0}),
// @ts-ignore
Door1: resolveDoor({"type":"Door","x":192,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_2","levelName":"UnrealFlight","checkpointName":"","name":"Door1","depth":0}),
// @ts-ignore
Door2: resolveDoor({"type":"Door","x":272,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_3","levelName":"UnrealMimic","checkpointName":"","name":"Door2","depth":0}),
// @ts-ignore
Door3: resolveDoor({"type":"Door","x":352,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_4","levelName":"UnrealSnowman","checkpointName":"","name":"Door3","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":296,"y":0,"width":40,"height":152,"flippedX":false,"flippedY":true,"uid":"55824435_5","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":240,"y":0,"width":40,"height":152,"flippedX":false,"flippedY":true,"uid":"55845599_6","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":336,"y":0,"width":176,"height":152,"flippedX":false,"flippedY":false,"uid":"55823268_7","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":0,"width":240,"height":152,"flippedX":false,"flippedY":false,"uid":"55823268_8","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":0,"y":152,"width":24,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268_9","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":488,"y":152,"width":24,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268_10","name":"","depth":0}),
Player: {"type":"Player","x":80,"y":224,"flippedX":false,"flippedY":false,"uid":"55988047_11","faceRight":true,"name":"","depth":0},
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":128,"y":224,"flippedX":false,"flippedY":false,"uid":"86706091_12","title":"Big Key","message":"","name":"","depth":0}),
// @ts-ignore
BigKey: resolveRegion({"type":"Region","x":263,"y":104,"width":50,"height":28,"flippedX":false,"flippedY":false,"uid":"25971607_13","name":"BigKey","depth":0})
};
}
};

export const DesertTownArgs = {
    width: 2040,
height: 568,
gameObjectsSupplier: () => {
  return {
    LeftHouse: resolveDecalGameObject({
    x: 816,
y: 344,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrudeHouseB
}),
RightHouse: resolveDecalGameObject({
    x: 1288,
y: 440,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrudeHouse
}),
SpikyBrushA: resolveDecalGameObject({
    x: 768,
y: 344,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushA_1: resolveDecalGameObject({
    x: 796,
y: 259,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB: resolveDecalGameObject({
    x: 1072,
y: 396,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_1: resolveDecalGameObject({
    x: 1044,
y: 394,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_2: resolveDecalGameObject({
    x: 1320,
y: 440,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_2: resolveDecalGameObject({
    x: 1336,
y: 440,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
Crate9: resolveDecalGameObject({
    x: 1708,
y: 384,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate8: resolveDecalGameObject({
    x: 1736,
y: 384,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate6: resolveDecalGameObject({
    x: 1766,
y: 384,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate4: resolveDecalGameObject({
    x: 1794,
y: 384,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate7: resolveDecalGameObject({
    x: 1722,
y: 360,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate3: resolveDecalGameObject({
    x: 1780,
y: 360,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate5: resolveDecalGameObject({
    x: 1751,
y: 360,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate2: resolveDecalGameObject({
    x: 1736,
y: 336,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate1: resolveDecalGameObject({
    x: 1766,
y: 336,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate0: resolveDecalGameObject({
    x: 1751,
y: 312,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
SpikyBrushA_3: resolveDecalGameObject({
    x: 1696,
y: 400,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_3: resolveDecalGameObject({
    x: 1824,
y: 400,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_4: resolveDecalGameObject({
    x: 1536,
y: 424,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: -0.17453292519943295,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
InnBuilding: resolveDecalGameObject({
    x: 616,
y: 376,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrudeHouseC
}),
BarBuilding: resolveDecalGameObject({
    x: 400,
y: 376,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrudeHouse
}),
SpikyBrushA_4: resolveDecalGameObject({
    x: 476,
y: 379,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_5: resolveDecalGameObject({
    x: 672,
y: 380,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_6: resolveDecalGameObject({
    x: 368,
y: 332,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SignInn: resolveDecalGameObject({
    x: 584,
y: 334,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SignInn
}),
SignTavern: resolveDecalGameObject({
    x: 440,
y: 336,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SignTavern
}),
DigKey: resolveDecalGameObject({
    x: 208,
y: 416,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
SpikyBrushA_5: resolveDecalGameObject({
    x: 48,
y: 368,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_7: resolveDecalGameObject({
    x: 56,
y: 296,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 1.5762825345220057,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
CrateStackKey: resolveDecalGameObject({
    x: 1280,
y: 79,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
CloudLong: resolveDecalGameObject({
    x: 648,
y: 272,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 752,
y: 224,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 940,
y: 262,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 904,
y: 256,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 1152,
y: 288,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_5: resolveDecalGameObject({
    x: 1412,
y: 311,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_6: resolveDecalGameObject({
    x: 1384,
y: 304,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_7: resolveDecalGameObject({
    x: 1596,
y: 319,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_8: resolveDecalGameObject({
    x: 1636,
y: 327,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_9: resolveDecalGameObject({
    x: 1508,
y: 247,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_10: resolveDecalGameObject({
    x: 1828,
y: 295,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_11: resolveDecalGameObject({
    x: 1860,
y: 303,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_12: resolveDecalGameObject({
    x: 352,
y: 280,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_13: resolveDecalGameObject({
    x: 380,
y: 286,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_14: resolveDecalGameObject({
    x: 512,
y: 248,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_15: resolveDecalGameObject({
    x: 216,
y: 224,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_16: resolveDecalGameObject({
    x: 144,
y: 272,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_17: resolveDecalGameObject({
    x: 112,
y: 280,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_18: resolveDecalGameObject({
    x: 2032,
y: 272,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_19: resolveDecalGameObject({
    x: 1336,
y: 208,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_20: resolveDecalGameObject({
    x: 1248,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_21: resolveDecalGameObject({
    x: 1440,
y: 160,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":376,"width":184,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":680,"y":344,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_1","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":752,"y":344,"width":128,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":880,"y":344,"width":72,"height":48,"flippedX":false,"flippedY":false,"uid":"55845599_3","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":952,"y":392,"width":136,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268_4","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":1088,"y":392,"width":96,"height":48,"flippedX":false,"flippedY":false,"uid":"55845599_5","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":1184,"y":440,"width":424,"height":136,"flippedX":false,"flippedY":false,"uid":"55823268_6","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":1088,"y":440,"width":96,"height":128,"flippedX":false,"flippedY":false,"uid":"55823268_7","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":752,"y":392,"width":200,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268_8","name":"","depth":0}),
// @ts-ignore
LeftHouseDoor: resolveDoor({"type":"Door","x":832,"y":312,"flippedX":false,"flippedY":false,"uid":"55913988_9","levelName":"DesertOracle","checkpointName":"","name":"LeftHouseDoor","depth":0}),
// @ts-ignore
RightHouseDoor: resolveDoor({"type":"Door","x":1256,"y":408,"flippedX":false,"flippedY":false,"uid":"55913988_10","levelName":"DesertCostumer","checkpointName":"","name":"RightHouseDoor","depth":0}),
Player: {"type":"Player","x":984,"y":392,"flippedX":false,"flippedY":false,"uid":"55988047_11","faceRight":false,"name":"","depth":0},
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":1056,"y":392,"flippedX":false,"flippedY":false,"uid":"86706091_12","title":"Town","message":"Welcome to the desert town.","name":"","depth":0}),
FromLeftHouse: {"type":"Checkpoint","x":876,"y":344,"flippedX":false,"flippedY":false,"uid":"55940370_13","name":"FromLeftHouse","faceRight":true,"depth":0},
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":1512,"y":408,"width":96,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_14","name":"","depth":0}),
// @ts-ignore
Block_6: resolveBlock({"type":"Block","x":1608,"y":408,"width":432,"height":160,"flippedX":false,"flippedY":false,"uid":"55823268_15","name":"","depth":0}),
// @ts-ignore
Stacker: resolveNpc({"type":"NpcIguana","x":1624,"y":408,"flippedX":false,"flippedY":false,"uid":"26367058_17","name":"Stacker","style":1,"depth":0}),
// @ts-ignore
PickupCratesRegion: resolveRegion({"type":"Region","x":1712,"y":392,"width":104,"height":16,"flippedX":false,"flippedY":false,"uid":"25971607_18","name":"PickupCratesRegion","depth":0}),
DropCrateAnchor: {"type":"Anchor","x":1384,"y":416,"flippedX":false,"flippedY":false,"uid":"25979726_20","name":"DropCrateAnchor","depth":0},
// @ts-ignore
DropCrateRegion: resolveRegion({"type":"Region","x":1376,"y":424,"width":40,"height":16,"flippedX":false,"flippedY":false,"uid":"25971607_21","name":"DropCrateRegion","depth":0}),
// @ts-ignore
InnDoor: resolveDoor({"type":"Door","x":568,"y":344,"flippedX":false,"flippedY":false,"uid":"55913988_23","levelName":"DesertInn","checkpointName":"","name":"InnDoor","depth":0}),
// @ts-ignore
BarDoor: resolveDoor({"type":"Door","x":424,"y":344,"flippedX":false,"flippedY":false,"uid":"55913988_26","levelName":"DesertShop","checkpointName":"","name":"BarDoor","depth":0}),
FromInn: {"type":"Checkpoint","x":552,"y":376,"flippedX":false,"flippedY":false,"uid":"55940370_27","name":"FromInn","faceRight":false,"depth":0},
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":2008,"y":376,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_28","levelName":"DesertField","checkpointName":"FromTown","name":"","depth":0}),
FromField: {"type":"Checkpoint","x":1960,"y":408,"flippedX":false,"flippedY":false,"uid":"55940370_29","name":"FromField","faceRight":false,"depth":0},
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":415,"y":296,"width":40,"flippedX":false,"flippedY":false,"uid":"55841307_30","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":359,"y":326,"width":56,"flippedX":false,"flippedY":false,"uid":"55841307_31","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":571,"y":323,"width":42,"flippedX":false,"flippedY":false,"uid":"55841307_32","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_3: resolvePipeHorizontal({"type":"PipeHorizontal","x":611,"y":289,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_33","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_4: resolvePipeHorizontal({"type":"PipeHorizontal","x":758,"y":321,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_34","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_5: resolvePipeHorizontal({"type":"PipeHorizontal","x":813,"y":292,"width":48,"flippedX":false,"flippedY":false,"uid":"55841307_35","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_6: resolvePipeHorizontal({"type":"PipeHorizontal","x":782,"y":258,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_36","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_7: resolvePipeHorizontal({"type":"PipeHorizontal","x":1246,"y":390,"width":56,"flippedX":false,"flippedY":false,"uid":"55841307_37","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_8: resolvePipeHorizontal({"type":"PipeHorizontal","x":1302,"y":360,"width":40,"flippedX":false,"flippedY":false,"uid":"55841307_38","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_9: resolvePipeHorizontal({"type":"PipeHorizontal","x":639,"y":349,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_39","visible":false,"name":"","depth":0}),
// @ts-ignore
Block_7: resolveBlock({"type":"Block","x":304,"y":376,"width":448,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268_40","name":"","depth":0}),
// @ts-ignore
Dig1: resolveBlock({"type":"Block","x":232,"y":376,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_41","name":"Dig1","depth":0}),
// @ts-ignore
Dig2: resolveBlock({"type":"Block","x":216,"y":376,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_42","name":"Dig2","depth":0}),
// @ts-ignore
Dig5: resolveBlock({"type":"Block","x":216,"y":392,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_43","name":"Dig5","depth":0}),
// @ts-ignore
Dig6: resolveBlock({"type":"Block","x":200,"y":392,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_44","name":"Dig6","depth":0}),
// @ts-ignore
Dig3: resolveBlock({"type":"Block","x":200,"y":376,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_45","name":"Dig3","depth":0}),
// @ts-ignore
Dig4: resolveBlock({"type":"Block","x":184,"y":376,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_46","name":"Dig4","depth":0}),
// @ts-ignore
Dig6_1: resolveBlock({"type":"Block","x":184,"y":392,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_47","name":"Dig6","depth":0}),
// @ts-ignore
Block_8: resolveBlock({"type":"Block","x":184,"y":424,"width":120,"height":144,"flippedX":false,"flippedY":false,"uid":"55823268_48","name":"","depth":0}),
// @ts-ignore
Block_9: resolveBlock({"type":"Block","x":248,"y":376,"width":56,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268_49","name":"","depth":0}),
// @ts-ignore
Block_10: resolveBlock({"type":"Block","x":232,"y":392,"width":16,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_50","name":"","depth":0}),
// @ts-ignore
StartDigging: resolveRegion({"type":"Region","x":168,"y":304,"width":64,"height":72,"flippedX":false,"flippedY":false,"uid":"25971607_51","name":"StartDigging","depth":0}),
// @ts-ignore
Boulder: resolveBoulder({"type":"Boulder","x":72,"y":364,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"15952797_52","name":"","depth":0}),
// @ts-ignore
Boulder_1: resolveBoulder({"type":"Boulder","x":48,"y":340,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"15952797_53","name":"","depth":0}),
// @ts-ignore
Block_11: resolveBlock({"type":"Block","x":0,"y":136,"width":48,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268_55","name":"","depth":0}),
FromShop: {"type":"Checkpoint","x":472,"y":376,"flippedX":false,"flippedY":false,"uid":"55940370_56","name":"FromShop","faceRight":true,"depth":0},
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":1348,"y":130,"flippedX":false,"flippedY":false,"uid":"55991906_57","name":"","depth":0}),
// @ts-ignore
Block_12: resolveBlock({"type":"Block","x":0,"y":0,"width":48,"height":136,"flippedX":false,"flippedY":false,"uid":"55823268_58","name":"","depth":0}),
Tumbleweed1: {"type":"Anchor","x":320,"y":344,"flippedX":false,"flippedY":false,"uid":"25979726_59","name":"Tumbleweed1","depth":0},
Tumbleweed2: {"type":"Anchor","x":1464,"y":408,"flippedX":false,"flippedY":false,"uid":"25979726_60","name":"Tumbleweed2","depth":0},
// @ts-ignore
Gate_1: resolveGate({"type":"Gate","x":-16,"y":344,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_61","levelName":"OversizedAngelArena","checkpointName":"FromDesert","name":"","depth":0}),
FromArena: {"type":"Checkpoint","x":56,"y":376,"flippedX":false,"flippedY":false,"uid":"55940370_62","name":"FromArena","faceRight":true,"depth":0},
FromCostumer: {"type":"Checkpoint","x":1240,"y":440,"flippedX":false,"flippedY":false,"uid":"55940370_63","name":"FromCostumer","faceRight":false,"depth":0},
FromGiants: {"type":"Checkpoint","x":992,"y":32,"flippedX":false,"flippedY":false,"uid":"55940370_64","name":"FromGiants","faceRight":true,"depth":0}
};
}
};

export const GiantsTownArgs = {
    width: 808,
height: 320,
gameObjectsSupplier: () => {
  return {
    Obelisk: resolveDecalGameObject({
    x: 600,
y: 234,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Obelisk
}),
Obelisk_1: resolveDecalGameObject({
    x: 136,
y: 234,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Obelisk
}),
CloudLong: resolveDecalGameObject({
    x: 608,
y: 160,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 336,
y: 72,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 304,
y: 80,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 64,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 131.04306806967375,
y: 213.73380685317548,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_5: resolveDecalGameObject({
    x: 702.0103046648869,
y: 41.85991227164678,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":616,"y":80,"width":48,"height":24,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Stump: resolveTreeStump({"type":"TreeStump","x":672,"y":80,"flippedX":false,"flippedY":false,"uid":"77429484_1","levelName":"DesertOutskirts","checkpointName":"Stump","name":"Stump","depth":0,"faceRight":false}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":600,"y":88,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":736,"y":88,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":680,"y":128,"width":40,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_4","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":664,"y":80,"width":72,"height":56,"flippedX":false,"flippedY":false,"uid":"55823268_5","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":608,"y":104,"width":72,"height":24,"flippedX":false,"flippedY":true,"uid":"55824435_6","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":632,"y":104,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_8","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":136,"y":232,"width":472,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_9","name":"","depth":0}),
// @ts-ignore
GreeterBigua: resolveBigua({"type":"Bigua","x":496,"y":232,"flippedX":false,"flippedY":false,"uid":"47268149_10","style":1,"name":"GreeterBigua","depth":0}),
// @ts-ignore
FarBigua: resolveBigua({"type":"Bigua","x":232,"y":232,"flippedX":true,"flippedY":false,"uid":"47268149_11","style":2,"name":"FarBigua","depth":0}),
Player: {"type":"Player","x":712,"y":80,"flippedX":false,"flippedY":false,"uid":"55988047_12","faceRight":false,"name":"","depth":0},
// @ts-ignore
Block_6: resolveBlock({"type":"Block","x":200,"y":240,"width":48,"height":24,"flippedX":false,"flippedY":false,"uid":"55823268_13","name":"","depth":0}),
// @ts-ignore
Block_7: resolveBlock({"type":"Block","x":328,"y":240,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_14","name":"","depth":0}),
// @ts-ignore
Block_8: resolveBlock({"type":"Block","x":408,"y":240,"width":32,"height":24,"flippedX":false,"flippedY":false,"uid":"55823268_15","name":"","depth":0}),
// @ts-ignore
Block_9: resolveBlock({"type":"Block","x":512,"y":240,"width":56,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_16","name":"","depth":0}),
// @ts-ignore
Block_10: resolveBlock({"type":"Block","x":536,"y":248,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_17","name":"","depth":0}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":376,"y":248,"width":32,"height":16,"flippedX":false,"flippedY":true,"uid":"55824435_24","name":"","depth":0}),
// @ts-ignore
SlopeRight_3: resolveSlopeRight({"type":"SlopeRight","x":480,"y":248,"width":32,"height":8,"flippedX":false,"flippedY":true,"uid":"55824435_25","name":"","depth":0}),
// @ts-ignore
SlopeRight_4: resolveSlopeRight({"type":"SlopeRight","x":520,"y":256,"width":16,"height":8,"flippedX":false,"flippedY":true,"uid":"55824435_26","name":"","depth":0}),
// @ts-ignore
SlopeRight_5: resolveSlopeRight({"type":"SlopeRight","x":296,"y":240,"width":32,"height":16,"flippedX":false,"flippedY":true,"uid":"55824435_27","name":"","depth":0}),
// @ts-ignore
SlopeRight_6: resolveSlopeRight({"type":"SlopeRight","x":168,"y":240,"width":32,"height":24,"flippedX":false,"flippedY":true,"uid":"55824435_28","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":248,"y":248,"width":48,"height":16,"flippedX":false,"flippedY":true,"uid":"55845599_29","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":344,"y":240,"width":24,"height":16,"flippedX":false,"flippedY":true,"uid":"55845599_30","name":"","depth":0}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":440,"y":240,"width":24,"height":24,"flippedX":false,"flippedY":true,"uid":"55845599_31","name":"","depth":0}),
// @ts-ignore
SlopeLeft_3: resolveSlopeLeft({"type":"SlopeLeft","x":552,"y":248,"width":16,"height":16,"flippedX":false,"flippedY":true,"uid":"55845599_32","name":"","depth":0}),
// @ts-ignore
SlopeLeft_4: resolveSlopeLeft({"type":"SlopeLeft","x":568,"y":240,"width":32,"height":16,"flippedX":false,"flippedY":true,"uid":"55845599_33","name":"","depth":0}),
// @ts-ignore
SlopeLeft_5: resolveSlopeLeft({"type":"SlopeLeft","x":608,"y":232,"width":32,"height":16,"flippedX":false,"flippedY":true,"uid":"55845599_34","name":"","depth":0}),
// @ts-ignore
SlopeRight_7: resolveSlopeRight({"type":"SlopeRight","x":96,"y":232,"width":40,"height":16,"flippedX":false,"flippedY":true,"uid":"55824435_35","name":"","depth":0}),
// @ts-ignore
SlopeRight_8: resolveSlopeRight({"type":"SlopeRight","x":568,"y":88,"width":32,"height":16,"flippedX":false,"flippedY":true,"uid":"55824435_36","name":"","depth":0}),
// @ts-ignore
SlopeRight_9: resolveSlopeRight({"type":"SlopeRight","x":592,"y":80,"width":24,"height":16,"flippedX":false,"flippedY":false,"uid":"55824435_37","name":"","depth":0}),
// @ts-ignore
SlopeLeft_6: resolveSlopeLeft({"type":"SlopeLeft","x":736,"y":80,"width":16,"height":8,"flippedX":false,"flippedY":false,"uid":"55845599_38","name":"","depth":0}),
// @ts-ignore
SlopeLeft_7: resolveSlopeLeft({"type":"SlopeLeft","x":752,"y":88,"width":32,"height":16,"flippedX":false,"flippedY":true,"uid":"55845599_39","name":"","depth":0}),
// @ts-ignore
SlopeLeft_8: resolveSlopeLeft({"type":"SlopeLeft","x":736,"y":96,"width":16,"height":24,"flippedX":false,"flippedY":true,"uid":"55845599_40","name":"","depth":0}),
// @ts-ignore
SlopeLeft_9: resolveSlopeLeft({"type":"SlopeLeft","x":720,"y":136,"width":16,"height":8,"flippedX":false,"flippedY":true,"uid":"55845599_41","name":"","depth":0}),
// @ts-ignore
SlopeRight_10: resolveSlopeRight({"type":"SlopeRight","x":664,"y":136,"width":16,"height":8,"flippedX":false,"flippedY":true,"uid":"55824435_42","name":"","depth":0}),
// @ts-ignore
DesertGate: resolveGate({"type":"Gate","x":656,"y":288,"width":128,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_43","levelName":"DesertTown","checkpointName":"FromGiants","name":"DesertGate","depth":0}),
// @ts-ignore
JungleGate: resolveGate({"type":"Gate","x":24,"y":288,"width":128,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_44","levelName":"JungleTown","checkpointName":"FromGiants","name":"JungleGate","depth":0}),
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":588,"y":88,"flippedX":false,"flippedY":false,"uid":"86706091_45","title":"Giants","message":"Welcome to the nimbus of the giants.","name":"","depth":0})
};
}
};

export const JungleBarArgs = {
    width: 256,
height: 256,
gameObjectsSupplier: () => {
  return {
    JunglePlank: resolveDecalGameObject({
    x: 16,
y: 72,
originX: 0,
originY: 0,
scaleX: 5,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_1: resolveDecalGameObject({
    x: 40,
y: 72,
originX: 0,
originY: 0,
scaleX: 5,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_2: resolveDecalGameObject({
    x: 56,
y: 128,
originX: 0,
originY: 0,
scaleX: 5,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_3: resolveDecalGameObject({
    x: 80,
y: 128,
originX: 0,
originY: 0,
scaleX: 5,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_4: resolveDecalGameObject({
    x: 16,
y: 184,
originX: 0,
originY: 0,
scaleX: 5,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_5: resolveDecalGameObject({
    x: 40,
y: 184,
originX: 0,
originY: 0,
scaleX: 5,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
DinerTable: resolveDecalGameObject({
    x: 152,
y: 73,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: DinerTable
}),
DinerTable_1: resolveDecalGameObject({
    x: 192,
y: 129,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: DinerTable
}),
DinerTable_2: resolveDecalGameObject({
    x: 96,
y: 129,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: DinerTable
}),
DinerTable_3: resolveDecalGameObject({
    x: 176,
y: 241,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: DinerTable
}),
Cobweb: resolveDecalGameObject({
    x: 233,
y: 148,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Cobweb
}),
SmallDecorativeRock: resolveDecalGameObject({
    x: 25,
y: 236,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
Bottle1: resolveDecalGameObject({
    x: 24,
y: 225,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Bottle1
}),
SmallDecorativeRock_1: resolveDecalGameObject({
    x: 28,
y: 237,
originX: 0.5,
originY: 0.5,
scaleX: -0.3,
scaleY: -0.5,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
CocktailGlass: resolveDecalGameObject({
    x: 104,
y: 118,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: CocktailGlass
}),
GroundSpeckles: resolveDecalGameObject({
    x: 208,
y: 112,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GroundSpeckles
}),
GroundSpeckles_1: resolveDecalGameObject({
    x: 153,
y: 101,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GroundSpeckles
}),
GroundSpeckles_2: resolveDecalGameObject({
    x: 104,
y: 112,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GroundSpeckles
}),
GroundSpeckles_3: resolveDecalGameObject({
    x: 49,
y: 101,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GroundSpeckles
}),
GroundSpeckles_4: resolveDecalGameObject({
    x: 49,
y: 213,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GroundSpeckles
}),
GroundSpeckles_5: resolveDecalGameObject({
    x: 104,
y: 224,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GroundSpeckles
}),
GroundSpeckles_6: resolveDecalGameObject({
    x: 161,
y: 213,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GroundSpeckles
}),
GroundSpeckles_7: resolveDecalGameObject({
    x: 208,
y: 226,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GroundSpeckles
}),
DontPoster: resolveDecalGameObject({
    x: 80,
y: 40,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: DontPoster
}),
DontPoster_1: resolveDecalGameObject({
    x: 80,
y: 208,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: DontPoster
}),
PaSpeaker: resolveDecalGameObject({
    x: 221,
y: 200,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PaSpeaker
}),
PaSpeaker_1: resolveDecalGameObject({
    x: 221,
y: 40,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PaSpeaker
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":0,"width":256,"height":24,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":24,"width":16,"height":216,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":240,"y":24,"width":16,"height":216,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":0,"y":240,"width":256,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":40,"flippedX":false,"flippedY":false,"uid":"55913988_4","levelName":"JungleTown","checkpointName":"FromBar","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":16,"y":72,"width":184,"flippedX":false,"flippedY":false,"uid":"55841307_5","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":56,"y":128,"width":184,"flippedX":false,"flippedY":false,"uid":"55841307_6","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":16,"y":184,"width":184,"flippedX":false,"flippedY":false,"uid":"55841307_7","visible":false,"name":"","depth":0}),
// @ts-ignore
Barkeeper: resolveNpc({"type":"NpcIguana","x":48,"y":240,"flippedX":false,"flippedY":false,"uid":"26367058_8","name":"Barkeeper","style":12,"depth":0}),
Player: {"type":"Player","x":88,"y":72,"flippedX":false,"flippedY":false,"uid":"55988047_9","faceRight":true,"name":"","depth":0},
// @ts-ignore
BigMirror: resolveRegion({"type":"Region","x":16,"y":141,"width":224,"height":43,"flippedX":false,"flippedY":false,"uid":"25971607_13","name":"BigMirror","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":224,"y":16,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_14","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":0,"y":16,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_15","name":"","depth":0}),
// @ts-ignore
Patron: resolveNpc({"type":"NpcIguana","x":128,"y":127,"flippedX":true,"flippedY":false,"uid":"26367058_16","name":"Patron","style":14,"depth":0})
};
}
};

export const JungleBossArenaArgs = {
    width: 768,
height: 256,
gameObjectsSupplier: () => {
  return {
    // @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":216,"width":768,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Stump: resolveTreeStump({"type":"TreeStump","x":688,"y":216,"flippedX":false,"flippedY":false,"uid":"77429484_1","levelName":"JungleTown","checkpointName":"HolyStump","name":"Stump","depth":0,"faceRight":false}),
Player: {"type":"Player","x":552,"y":216,"flippedX":false,"flippedY":false,"uid":"55988047_2","faceRight":false,"name":"","depth":0},
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":512,"y":0,"width":256,"height":136,"flippedX":false,"flippedY":false,"uid":"55823268_4","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":0,"width":256,"height":136,"flippedX":false,"flippedY":false,"uid":"55823268_5","name":"","depth":0}),
// @ts-ignore
RightBossWall: resolveBlock({"type":"Block","x":512,"y":136,"width":16,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268_6","name":"RightBossWall","depth":0}),
// @ts-ignore
LeftBossWall: resolveBlock({"type":"Block","x":240,"y":136,"width":16,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268_7","name":"LeftBossWall","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":736,"y":136,"width":32,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268_8","name":"","depth":0})
};
}
};

export const JungleDeepArgs = {
    width: 696,
height: 632,
gameObjectsSupplier: () => {
  return {
    KeyYellow: resolveDecalGameObject({
    x: 286,
y: 384,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "FrontDecals",
texture: KeyYellow
}),
GroundSpeckles: resolveDecalGameObject({
    x: 377,
y: 420,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
JungleTreeRoot: resolveDecalGameObject({
    x: 256,
y: 392,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JungleTreeRoot
}),
JungleTreeRoot_1: resolveDecalGameObject({
    x: 290,
y: 398,
originX: 0.5,
originY: 0.5,
scaleX: -0.7,
scaleY: 0.7,
rotation: 0.47251802957156447,
layerName: "TerrainDecals",
texture: JungleTreeRoot
}),
JungleTreeRoot_2: resolveDecalGameObject({
    x: 302,
y: 393,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 2,
rotation: -2.8821316932937546,
layerName: "TerrainDecals",
texture: JungleTreeRoot
}),
JungleTreeRoot_3: resolveDecalGameObject({
    x: 259,
y: 406,
originX: 0.5,
originY: 0.5,
scaleX: -0.7,
scaleY: 0.7,
rotation: 1.8231748641613885,
layerName: "TerrainDecals",
texture: JungleTreeRoot
}),
JungleTreeRoot_4: resolveDecalGameObject({
    x: 275,
y: 406,
originX: 0.5,
originY: 0.5,
scaleX: -0.7,
scaleY: -0.7,
rotation: 1.5205832193689774,
layerName: "TerrainDecals",
texture: JungleTreeRoot
}),
JunglePlank: resolveDecalGameObject({
    x: 552,
y: 480,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_1: resolveDecalGameObject({
    x: 0,
y: 528,
originX: 0,
originY: 0,
scaleX: 3.5,
scaleY: 1.25,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_2: resolveDecalGameObject({
    x: 464,
y: 416,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_3: resolveDecalGameObject({
    x: 0,
y: 544,
originX: 0,
originY: 0,
scaleX: 2,
scaleY: 1.25,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_4: resolveDecalGameObject({
    x: 0,
y: 560,
originX: 0,
originY: 0,
scaleX: 2.75,
scaleY: 1.25,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
GroundSpeckles_1: resolveDecalGameObject({
    x: 144.04919845434281,
y: 556.7072757230868,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_2: resolveDecalGameObject({
    x: 309.8328129090413,
y: 556.7072757230868,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_3: resolveDecalGameObject({
    x: 506.1093966186209,
y: 555.6557940246427,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
SmallDecorativeRock: resolveDecalGameObject({
    x: 430.90489497945504,
y: 541.0247251968416,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
JungleTreeRoot_5: resolveDecalGameObject({
    x: 308,
y: 390,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0.1657513292706501,
layerName: "BackgroundDecals",
texture: JungleTreeRoot
}),
SpikyBrushB: resolveDecalGameObject({
    x: 216,
y: 384,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
JungleBrushHeavy: resolveDecalGameObject({
    x: 88,
y: 496,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_1: resolveDecalGameObject({
    x: 88,
y: 416,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_2: resolveDecalGameObject({
    x: 168,
y: 496,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_3: resolveDecalGameObject({
    x: 176,
y: 432,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_4: resolveDecalGameObject({
    x: 264,
y: 504,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_5: resolveDecalGameObject({
    x: 464,
y: 496,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_6: resolveDecalGameObject({
    x: 560,
y: 504,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_7: resolveDecalGameObject({
    x: 536,
y: 440,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_8: resolveDecalGameObject({
    x: 616,
y: 456,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_9: resolveDecalGameObject({
    x: 688,
y: 520,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_10: resolveDecalGameObject({
    x: 680,
y: 424,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
JungleBrushHeavy_11: resolveDecalGameObject({
    x: -8,
y: 480,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
VineSmall: resolveDecalGameObject({
    x: 28,
y: 377,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
VineSmall_1: resolveDecalGameObject({
    x: 108,
y: 458,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
VineSmall_2: resolveDecalGameObject({
    x: 403,
y: 460,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
VineSmall_3: resolveDecalGameObject({
    x: 627,
y: 482,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
VineSmall_4: resolveDecalGameObject({
    x: 643,
y: 488,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
SpikyBrushB_1: resolveDecalGameObject({
    x: 417.2701569786264,
y: 541.6588990573454,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":200,"y":392,"width":208,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_58","name":"","depth":0}),
// @ts-ignore
JungleTree: resolveJungleTree({"type":"JungleTree","x":280,"y":392,"height":192,"flippedX":false,"flippedY":false,"uid":"25711099_59","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":-152,"y":544,"width":848,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268_60","name":"","depth":0}),
Player: {"type":"Player","x":80,"y":528,"flippedX":false,"flippedY":false,"uid":"55988047_61","faceRight":true,"name":"","depth":0},
// @ts-ignore
ClownSneezy: resolveClownSneezy({"type":"ClownSneezy","x":232,"y":512,"flippedX":false,"flippedY":false,"uid":"11949926_62","name":"","depth":0}),
// @ts-ignore
ClownSneezy_1: resolveClownSneezy({"type":"ClownSneezy","x":360,"y":472,"flippedX":false,"flippedY":false,"uid":"11949926_64","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":528,"width":112,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_65","name":"","depth":0}),
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":-16,"y":496,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_66","levelName":"JungleFromDesert","checkpointName":"FromDeep","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":552,"y":480,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_68","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":464,"y":416,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_70","visible":false,"name":"","depth":0}),
// @ts-ignore
ClownSneezy_2: resolveClownSneezy({"type":"ClownSneezy","x":472,"y":344,"flippedX":false,"flippedY":false,"uid":"11949926_71","name":"","depth":0})
};
}
};

export const JungleFromDesertArgs = {
    width: 1568,
height: 512,
gameObjectsSupplier: () => {
  return {
    CloudLong: resolveDecalGameObject({
    x: 392,
y: 338,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "FrontDecals",
texture: CloudLong
}),
VineSmall: resolveDecalGameObject({
    x: 472,
y: 432,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_1: resolveDecalGameObject({
    x: 520,
y: 448,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
SmallDecorativeRock: resolveDecalGameObject({
    x: 456,
y: 478,
originX: 0.5,
originY: 0.5,
scaleX: 0.8,
scaleY: 0.8,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
SmallDecorativeRock_1: resolveDecalGameObject({
    x: 472,
y: 486,
originX: 0.5,
originY: 0.5,
scaleX: -0.8,
scaleY: 0.8,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
GroundSpeckles: resolveDecalGameObject({
    x: 408,
y: 472,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_1: resolveDecalGameObject({
    x: 184,
y: 472,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_2: resolveDecalGameObject({
    x: 736,
y: 408,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_3: resolveDecalGameObject({
    x: 1064,
y: 408,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
SmallDecorativeRock_2: resolveDecalGameObject({
    x: 1176,
y: 410,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
VineSmall_2: resolveDecalGameObject({
    x: 1152,
y: 464,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_3: resolveDecalGameObject({
    x: 1168,
y: 460,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_4: resolveDecalGameObject({
    x: 1280,
y: 464,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_5: resolveDecalGameObject({
    x: 1296,
y: 460,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_6: resolveDecalGameObject({
    x: 1032,
y: 460,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_7: resolveDecalGameObject({
    x: 1016,
y: 464,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
GroundSpeckles_4: resolveDecalGameObject({
    x: 1392,
y: 408,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
JunglePlank: resolveDecalGameObject({
    x: 1480,
y: 408,
originX: 0,
originY: 0,
scaleX: 2.75,
scaleY: 1.25,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_1: resolveDecalGameObject({
    x: 1512,
y: 424,
originX: 0,
originY: 0,
scaleX: 2.75,
scaleY: 1.25,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
JunglePlank_2: resolveDecalGameObject({
    x: 1536,
y: 440,
originX: 0,
originY: 0,
scaleX: 2.75,
scaleY: 1.25,
rotation: 0,
layerName: "TerrainDecals",
texture: JunglePlank
}),
ToCave: resolveDecalGameObject({
    x: 600,
y: 512,
originX: 0.5,
originY: 0.5,
scaleX: 3,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
SpikyBrushB: resolveDecalGameObject({
    x: 678,
y: 400,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_1: resolveDecalGameObject({
    x: 384,
y: 464,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_2: resolveDecalGameObject({
    x: 195,
y: 464,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
JungleHouse1: resolveDecalGameObject({
    x: 1224,
y: 408,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleHouse1
}),
SpikyBrushA: resolveDecalGameObject({
    x: 1360,
y: 400,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
DeepGlow: resolveDecalGameObject({
    x: 1504,
y: 0,
originX: 0,
originY: 0,
scaleX: 2,
scaleY: 13,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingEdge
}),
JungleBrushHeavy: resolveDecalGameObject({
    x: 1560,
y: 392,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleBrushHeavy
}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":432,"y":472,"width":120,"height":40,"flippedX":false,"flippedY":false,"uid":"55845599_0","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":432,"y":408,"width":128,"height":40,"flippedX":false,"flippedY":true,"uid":"55824435_2","name":"","depth":0}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":560,"y":408,"width":1160,"height":40,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":560,"y":448,"width":96,"height":64,"flippedX":false,"flippedY":true,"uid":"55824435_4","name":"","depth":0}),
Player: {"type":"Player","x":480,"y":488,"flippedX":false,"flippedY":false,"uid":"55988047_6","faceRight":false,"name":"","depth":0},
// @ts-ignore
JungleTree: resolveJungleTree({"type":"JungleTree","x":704,"y":408,"height":168,"flippedX":false,"flippedY":false,"uid":"25711099_8","name":"","depth":0}),
// @ts-ignore
JungleTree_1: resolveJungleTree({"type":"JungleTree","x":352,"y":472,"height":200,"flippedX":false,"flippedY":false,"uid":"25711099_10","name":"","depth":0}),
// @ts-ignore
JungleTree_2: resolveJungleTree({"type":"JungleTree","x":208,"y":472,"height":80,"flippedX":false,"flippedY":false,"uid":"25711099_12","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":656,"y":448,"width":168,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_14","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":80,"y":440,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_15","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":440,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_16","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":48,"y":472,"width":384,"height":40,"flippedX":false,"flippedY":false,"uid":"55823268_17","name":"","depth":0}),
// @ts-ignore
JungleTree_3: resolveJungleTree({"type":"JungleTree","x":254,"y":496,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_18","name":"","depth":4}),
// @ts-ignore
JungleTree_4: resolveJungleTree({"type":"JungleTree","x":496,"y":512,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_19","name":"","depth":4}),
// @ts-ignore
JungleTree_5: resolveJungleTree({"type":"JungleTree","x":56,"y":480,"height":320,"flippedX":false,"flippedY":false,"uid":"25711099_20","name":"","depth":4}),
// @ts-ignore
CommonClown: resolveCommonClown({"type":"CommonClown","x":992,"y":384,"flippedX":false,"flippedY":false,"uid":"68762216_22","name":"","depth":0}),
// @ts-ignore
ToCaveBackground: resolveRegion({"type":"Region","x":432,"y":408,"width":224,"height":168,"flippedX":false,"flippedY":false,"uid":"25971607_23","name":"ToCaveBackground","depth":0}),
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":478,"y":408,"flippedX":false,"flippedY":false,"uid":"86706091_24","title":"Jungle","message":"Welcome to the jungle.","name":"","depth":0}),
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":552,"y":472,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_25","levelName":"OversizedAngelArena","checkpointName":"FromJungle","name":"","depth":0}),
// @ts-ignore
SpiderValuable: resolveValuableBlue({"type":"ValuableBlue","x":736,"y":408,"flippedX":false,"flippedY":false,"uid":"55991906_26","name":"SpiderValuable","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":0,"y":472,"width":48,"height":56,"flippedX":false,"flippedY":false,"uid":"55823268_27","name":"","depth":0}),
// @ts-ignore
JungleTree_6: resolveJungleTree({"type":"JungleTree","x":920,"y":520,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_28","name":"","depth":4}),
// @ts-ignore
Pool: resolvePool({"type":"Pool","x":824,"y":464,"width":712,"height":48,"flippedX":false,"flippedY":false,"uid":"38353047_29","name":"","depth":2}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":824,"y":448,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_31","name":"","depth":0}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":1224,"y":376,"flippedX":false,"flippedY":false,"uid":"55913988_32","levelName":"JungleSickIguana","checkpointName":"","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":1178,"y":352,"width":92,"flippedX":false,"flippedY":false,"uid":"55841307_33","visible":false,"name":"","depth":0}),
// @ts-ignore
JungleTree_7: resolveJungleTree({"type":"JungleTree","x":1249,"y":352,"height":64,"flippedX":false,"flippedY":false,"uid":"25711099_34","name":"","depth":0}),
FromHouse: {"type":"Checkpoint","x":1192,"y":408,"flippedX":false,"flippedY":false,"uid":"55940370_35","name":"FromHouse","faceRight":false,"depth":0},
// @ts-ignore
JungleTree_8: resolveJungleTree({"type":"JungleTree","x":1128,"y":512,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_38","name":"","depth":4}),
// @ts-ignore
JungleTree_9: resolveJungleTree({"type":"JungleTree","x":1360,"y":520,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_39","name":"","depth":4}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":1504,"y":448,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_43","name":"","depth":0}),
// @ts-ignore
Gate_1: resolveGate({"type":"Gate","x":0,"y":408,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_44","levelName":"JungleTown","checkpointName":"FromDesert","name":"","depth":0}),
FromTown: {"type":"Checkpoint","x":72,"y":440,"flippedX":false,"flippedY":false,"uid":"55940370_45","name":"FromTown","faceRight":true,"depth":0},
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":536,"y":160,"width":112,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268_46","name":"","depth":0}),
BiguaSpawn: {"type":"Anchor","x":600,"y":160,"flippedX":false,"flippedY":false,"uid":"25979726_47","name":"BiguaSpawn","depth":0},
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":504,"y":288,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_48","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":504,"y":288,"flippedX":false,"flippedY":false,"uid":"63428932_49","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":504,"y":216,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_50","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeLeftEnd_1: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":504,"y":216,"flippedX":false,"flippedY":false,"uid":"63428932_51","name":"","depth":0}),
// @ts-ignore
BehindPillar: resolveRegion({"type":"Region","x":536,"y":352,"width":112,"height":56,"flippedX":false,"flippedY":false,"uid":"25971607_52","name":"BehindPillar","depth":0}),
// @ts-ignore
ClownSneezy: resolveClownSneezy({"type":"ClownSneezy","x":856,"y":384,"flippedX":false,"flippedY":false,"uid":"11949926_53","name":"","depth":0}),
// @ts-ignore
ClownSneezy_1: resolveClownSneezy({"type":"ClownSneezy","x":224,"y":448,"flippedX":false,"flippedY":false,"uid":"11949926_54","name":"","depth":0}),
TestBigua: {"type":"Checkpoint","x":512,"y":288,"flippedX":false,"flippedY":false,"uid":"55940370_55","name":"TestBigua","faceRight":true,"depth":0},
// @ts-ignore
Block_6: resolveBlock({"type":"Block","x":1536,"y":448,"width":184,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_57","name":"","depth":0}),
// @ts-ignore
Gate_2: resolveGate({"type":"Gate","x":1536,"y":376,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_60","levelName":"JungleDeep","checkpointName":"","name":"","depth":0}),
FromDeep: {"type":"Checkpoint","x":1488,"y":408,"flippedX":false,"flippedY":false,"uid":"55940370_61","name":"FromDeep","faceRight":false,"depth":0}
};
}
};

export const JungleInnArgs = {
    width: 512,
height: 256,
gameObjectsSupplier: () => {
  return {
    GroundSpeckles: resolveDecalGameObject({
    x: 80,
y: 157,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_1: resolveDecalGameObject({
    x: 352,
y: 221,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
SmallDecorativeRock: resolveDecalGameObject({
    x: 165,
y: 146,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
SmallDecorativeRock_1: resolveDecalGameObject({
    x: 152,
y: 146,
originX: 0.5,
originY: 1,
scaleX: -0.8,
scaleY: 0.8,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
VineSmall: resolveDecalGameObject({
    x: 424,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_1: resolveDecalGameObject({
    x: 366,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
RoseVase: resolveDecalGameObject({
    x: 56,
y: 76,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: RoseVase
}),
GlowingCircle: resolveDecalGameObject({
    x: 80,
y: 32,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
GlowingCircle_1: resolveDecalGameObject({
    x: 232,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
GlowingCircle_2: resolveDecalGameObject({
    x: 392,
y: 72,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
GlowingCircle_3: resolveDecalGameObject({
    x: 512,
y: 200,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
DontPoster: resolveDecalGameObject({
    x: 112,
y: 104,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: DontPoster
}),
JunglePlank: resolveDecalGameObject({
    x: 48,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 0.75,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
BookCollection: resolveDecalGameObject({
    x: 40,
y: 78,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: BookCollection
}),
OverheadLamp: resolveDecalGameObject({
    x: 160,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: OverheadLamp
}),
Pipe: resolveDecalGameObject({
    x: 160,
y: 82,
originX: 1,
originY: 1,
scaleX: 1,
scaleY: 10,
rotation: 0,
layerName: "BackgroundDecals",
texture: Pipe
}),
JunglePlankDecoration: resolveDecalGameObject({
    x: 424,
y: 160,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
JunglePlankDecoration_1: resolveDecalGameObject({
    x: 376,
y: 160,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
JunglePlankDecoration_2: resolveDecalGameObject({
    x: 328,
y: 160,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
JunglePlankDecoration_3: resolveDecalGameObject({
    x: 280,
y: 160,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
JunglePlankDecoration_4: resolveDecalGameObject({
    x: 232,
y: 160,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
JunglePlankDecoration_5: resolveDecalGameObject({
    x: 461,
y: 112,
originX: 0,
originY: 0,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
JunglePlankDecoration_6: resolveDecalGameObject({
    x: 509,
y: 112,
originX: 0,
originY: 0,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
Cobweb: resolveDecalGameObject({
    x: 456,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
JunglePlankDecoration_7: resolveDecalGameObject({
    x: 368,
y: 64,
originX: 0,
originY: 0,
scaleX: -1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
JunglePlankDecoration_8: resolveDecalGameObject({
    x: 320,
y: 64,
originX: 0,
originY: 0,
scaleX: -1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlankDecoration
}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":112,"flippedX":false,"flippedY":false,"uid":"55913988_0","levelName":"JungleTown","checkpointName":"FromInn","name":"","depth":0}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":-8,"y":144,"width":256,"height":112,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":0,"width":16,"height":160,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":16,"y":0,"width":496,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
Player: {"type":"Player","x":80,"y":144,"flippedX":false,"flippedY":false,"uid":"55988047_4","faceRight":true,"name":"","depth":0},
// @ts-ignore
Innkeeper: resolveNpc({"type":"NpcIguana","x":160,"y":130,"flippedX":true,"flippedY":false,"uid":"26367058_5","name":"Innkeeper","style":11,"depth":0}),
SleepHere: {"type":"Anchor","x":400,"y":200,"flippedX":false,"flippedY":false,"uid":"25979726_15","name":"SleepHere","depth":0},
FromInnSave: {"type":"Checkpoint","x":392,"y":208,"flippedX":false,"flippedY":false,"uid":"55940370_23","name":"FromInnSave","faceRight":false,"depth":0},
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":248,"y":144,"width":96,"height":64,"flippedX":false,"flippedY":false,"uid":"55845599_24","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":248,"y":208,"width":264,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268_25","name":"","depth":0}),
// @ts-ignore
MovingWall: resolveBlock({"type":"Block","x":216,"y":28,"width":16,"height":120,"flippedX":false,"flippedY":false,"uid":"55823268_26","name":"MovingWall","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":8,"y":24,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_28","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":496,"y":16,"width":16,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268_29","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":472,"y":184,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_30","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":288,"y":32,"width":80,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_31","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":368,"y":32,"width":128,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_32","name":"","depth":0}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":472,"y":56,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_33","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":143,"y":137,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_34","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":32,"y":83,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_35","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":144,"y":88,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_36","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_3: resolvePipeHorizontal({"type":"PipeHorizontal","x":344,"y":160,"width":128,"flippedX":false,"flippedY":false,"uid":"55841307_37","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_4: resolvePipeHorizontal({"type":"PipeHorizontal","x":413,"y":112,"width":88,"flippedX":false,"flippedY":false,"uid":"55841307_38","visible":false,"name":"","depth":0}),
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":472,"y":112,"flippedX":false,"flippedY":false,"uid":"86706091_39","title":"Inn","message":"It's the sign the inn used before they switched to neon.","name":"","depth":0})
};
}
};

export const JungleSickIguanaArgs = {
    width: 256,
height: 256,
gameObjectsSupplier: () => {
  return {
    DinerTable: resolveDecalGameObject({
    x: 152,
y: 178,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: DinerTable
}),
GroundSpeckles: resolveDecalGameObject({
    x: 164,
y: 188,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
RoseVase: resolveDecalGameObject({
    x: 160,
y: 170,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: RoseVase
}),
RoseVase_1: resolveDecalGameObject({
    x: 144,
y: 170,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: RoseVase
}),
LightShelf: resolveDecalGameObject({
    x: 96,
y: 124,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: LightShelf
}),
RoseVase_2: resolveDecalGameObject({
    x: 88,
y: 120,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: RoseVase
}),
SecretVase: resolveDecalGameObject({
    x: 104,
y: 120,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: RoseVase
}),
VineSmall: resolveDecalGameObject({
    x: 58,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
VineSmall_1: resolveDecalGameObject({
    x: 74,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
VineSmall_2: resolveDecalGameObject({
    x: 42,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
VineSmall_3: resolveDecalGameObject({
    x: 216,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":176,"width":256,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":40,"y":144,"flippedX":false,"flippedY":false,"uid":"55913988_1","levelName":"JungleFromDesert","checkpointName":"FromHouse","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":0,"width":256,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":80,"width":32,"height":96,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":224,"y":80,"width":32,"height":96,"flippedX":false,"flippedY":false,"uid":"55823268_4","name":"","depth":0}),
// @ts-ignore
NpcIguana: resolveNpc({"type":"NpcIguana","x":192,"y":176,"flippedX":true,"flippedY":false,"uid":"26367058_5","name":"","style":8,"depth":0}),
Player: {"type":"Player","x":88,"y":176,"flippedX":false,"flippedY":false,"uid":"55988047_6","faceRight":true,"name":"","depth":0},
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":80,"y":120,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_7","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":136,"y":170,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_8","visible":false,"name":"","depth":0}),
// @ts-ignore
Window: resolveRegion({"type":"Region","x":136,"y":96,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_9","name":"Window","depth":0}),
// @ts-ignore
JungleTree: resolveJungleTree({"type":"JungleTree","x":192,"y":200,"height":168,"flippedX":false,"flippedY":false,"uid":"25711099_10","name":"","depth":4}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":136,"y":128,"width":72,"flippedX":false,"flippedY":false,"uid":"55841307_11","visible":false,"name":"","depth":0})
};
}
};

export const JungleTempleArgs = {
    width: 512,
height: 256,
gameObjectsSupplier: () => {
  return {
    GlowingCircle: resolveDecalGameObject({
    x: 52,
y: 0,
originX: 0.5,
originY: 0.5,
scaleX: 8,
scaleY: 2,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
Key1: resolveDecalGameObject({
    x: 208,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyYellow
}),
Key2: resolveDecalGameObject({
    x: 288,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyYellow
}),
Key3: resolveDecalGameObject({
    x: 368,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyYellow
}),
GlowingCircle_1: resolveDecalGameObject({
    x: 460,
y: 0,
originX: 0.5,
originY: 0.5,
scaleX: 8,
scaleY: 2,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":224,"width":512,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_1","levelName":"JungleTown","checkpointName":"FromTemple","name":"","depth":0}),
// @ts-ignore
Door1: resolveDoor({"type":"Door","x":192,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_2","levelName":"UnrealClownDodger","checkpointName":"","name":"Door1","depth":0}),
// @ts-ignore
Door2: resolveDoor({"type":"Door","x":272,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_3","levelName":"UnrealRoyalChamber","checkpointName":"","name":"Door2","depth":3}),
// @ts-ignore
Door3: resolveDoor({"type":"Door","x":352,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988_4","levelName":"UnrealBalls","checkpointName":"","name":"Door3","depth":3}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":488,"y":0,"width":24,"height":152,"flippedX":false,"flippedY":false,"uid":"55823268_7","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":152,"width":24,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268_9","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":488,"y":152,"width":24,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268_10","name":"","depth":0}),
Player: {"type":"Player","x":80,"y":224,"flippedX":false,"flippedY":false,"uid":"55988047_11","faceRight":true,"name":"","depth":0},
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":128,"y":224,"flippedX":false,"flippedY":false,"uid":"86706091_12","title":"Big Key","message":"","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":0,"y":0,"width":24,"height":152,"flippedX":false,"flippedY":false,"uid":"55823268_14","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":80,"y":0,"width":352,"height":152,"flippedX":false,"flippedY":false,"uid":"55823268_15","name":"","depth":0}),
// @ts-ignore
BigKey: resolveRegion({"type":"Region","x":263,"y":112,"width":50,"height":28,"flippedX":false,"flippedY":false,"uid":"25971607_17","name":"BigKey","depth":0}),
// @ts-ignore
MovingWall: resolveBlock({"type":"Block","x":328,"y":184,"width":80,"height":40,"flippedX":false,"flippedY":false,"uid":"55823268_18","name":"MovingWall","depth":0})
};
}
};

export const JungleTownArgs = {
    width: 1512,
height: 448,
gameObjectsSupplier: () => {
  return {
    VineSmall: resolveDecalGameObject({
    x: 752,
y: 392,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "FrontDecals",
texture: VineSmall
}),
VineSmall_1: resolveDecalGameObject({
    x: 552,
y: 244,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "FrontDecals",
texture: VineSmall
}),
VineSmall_2: resolveDecalGameObject({
    x: 568,
y: 252,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "FrontDecals",
texture: VineSmall
}),
SignNeonBar: resolveDecalGameObject({
    x: 1064,
y: 341,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: SignNeonBar
}),
SignNeonInn: resolveDecalGameObject({
    x: 901,
y: 334,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: SignNeonInn
}),
JungleTent: resolveDecalGameObject({
    x: 665,
y: 359,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: JungleTent
}),
GroundSpeckles: resolveDecalGameObject({
    x: 362,
y: 396,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_1: resolveDecalGameObject({
    x: 706,
y: 389,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_2: resolveDecalGameObject({
    x: 1055,
y: 397,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_3: resolveDecalGameObject({
    x: 1397,
y: 428,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
GroundSpeckles_4: resolveDecalGameObject({
    x: 573,
y: 216,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
Cobweb: resolveDecalGameObject({
    x: 537,
y: 187,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Cobweb
}),
KeyYellowShrunken: resolveDecalGameObject({
    x: 688,
y: 152,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: KeyYellowShrunken
}),
VineSmall_3: resolveDecalGameObject({
    x: 648,
y: 120,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_4: resolveDecalGameObject({
    x: 661,
y: 147,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_5: resolveDecalGameObject({
    x: 648,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
VineSmall_6: resolveDecalGameObject({
    x: 736,
y: 136,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
JungleHouse1: resolveDecalGameObject({
    x: 1088,
y: 384,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleHouse1
}),
JunglePlank: resolveDecalGameObject({
    x: 1072,
y: 294,
originX: 0,
originY: 0,
scaleX: 0.5,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
JunglePlank_1: resolveDecalGameObject({
    x: 1072,
y: 304,
originX: 0,
originY: 0,
scaleX: 0.5,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
JunglePlank_2: resolveDecalGameObject({
    x: 1072,
y: 315,
originX: 0,
originY: 0,
scaleX: 0.5,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
VineSmall_7: resolveDecalGameObject({
    x: 1088,
y: 307,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
JungleHouse1_1: resolveDecalGameObject({
    x: 896,
y: 344,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleHouse1
}),
JunglePlank_3: resolveDecalGameObject({
    x: 860,
y: 304,
originX: 0,
originY: 0,
scaleX: 2.25,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
JunglePlank_4: resolveDecalGameObject({
    x: 850,
y: 315,
originX: 0,
originY: 0,
scaleX: 2.875,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
SpikyBrushB: resolveDecalGameObject({
    x: 936,
y: 376,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
JungleTempleExterior: resolveDecalGameObject({
    x: 200,
y: 384,
originX: 0,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleTempleExterior
}),
WiggleVine: resolveDecalGameObject({
    x: 768,
y: 380,
originX: 0.5,
originY: 0,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: VineSmall
}),
JunglePlank_5: resolveDecalGameObject({
    x: 568,
y: 224,
originX: 0,
originY: 0,
scaleX: 5,
scaleY: 1,
rotation: 1.5707963267948966,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
JunglePlank_6: resolveDecalGameObject({
    x: 725,
y: 224,
originX: 0,
originY: 0,
scaleX: 5,
scaleY: 1,
rotation: 1.5707963267948966,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
JunglePlank_7: resolveDecalGameObject({
    x: 544,
y: 236,
originX: 0,
originY: 0,
scaleX: 6,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JunglePlank
}),
SmallDecorativeRock: resolveDecalGameObject({
    x: 572,
y: 385,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SmallDecorativeRock
}),
SmallDecorativeRock_1: resolveDecalGameObject({
    x: 727,
y: 377,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SmallDecorativeRock
}),
SpikyBrushB_1: resolveDecalGameObject({
    x: 697,
y: 92,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA: resolveDecalGameObject({
    x: 712,
y: 99,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
CracksA: resolveDecalGameObject({
    x: 708,
y: 157,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
SpikyBrushB_2: resolveDecalGameObject({
    x: 105.23981389473073,
y: 364.1638243084863,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_1: resolveDecalGameObject({
    x: 35.68192183867208,
y: 364.1638243084863,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":1248,"y":416,"width":264,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":1248,"y":384,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_1","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":1024,"y":384,"width":224,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
Player: {"type":"Player","x":1432,"y":416,"flippedX":false,"flippedY":false,"uid":"55988047_3","faceRight":false,"name":"","depth":0},
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":1480,"y":384,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_4","levelName":"JungleFromDesert","checkpointName":"FromTown","name":"","depth":0}),
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":1360,"y":416,"flippedX":false,"flippedY":false,"uid":"86706091_5","title":"Town","message":"This is the jungle town.","name":"","depth":0}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":1096,"y":352,"flippedX":false,"flippedY":false,"uid":"55913988_6","levelName":"JungleBar","checkpointName":"","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":1042,"y":328,"width":92,"flippedX":false,"flippedY":false,"uid":"55841307_7","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":1064,"y":294,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_8","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":960,"y":384,"width":64,"flippedX":false,"flippedY":false,"uid":"55841307_10","visible":true,"name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":832,"y":384,"width":128,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_11","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":888,"y":376,"width":64,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_12","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":832,"y":376,"width":56,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_13","name":"","depth":0}),
// @ts-ignore
Door_1: resolveDoor({"type":"Door","x":856,"y":344,"flippedX":false,"flippedY":false,"uid":"55913988_14","levelName":"JungleInn","checkpointName":"","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_3: resolvePipeHorizontal({"type":"PipeHorizontal","x":860,"y":304,"width":72,"flippedX":false,"flippedY":false,"uid":"55841307_15","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_4: resolvePipeHorizontal({"type":"PipeHorizontal","x":736,"y":376,"width":96,"flippedX":false,"flippedY":false,"uid":"55841307_16","visible":true,"name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":608,"y":376,"width":128,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268_17","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_5: resolvePipeHorizontal({"type":"PipeHorizontal","x":448,"y":384,"width":96,"flippedX":false,"flippedY":false,"uid":"55841307_18","visible":true,"name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":544,"y":376,"width":64,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_19","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":544,"y":384,"width":104,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_20","name":"","depth":0}),
// @ts-ignore
Block_6: resolveBlock({"type":"Block","x":160,"y":384,"width":288,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_21","name":"","depth":0}),
// @ts-ignore
Pool: resolvePool({"type":"Pool","x":448,"y":416,"width":576,"height":32,"flippedX":false,"flippedY":false,"uid":"38353047_22","name":"","depth":2}),
// @ts-ignore
Door_2: resolveDoor({"type":"Door","x":320,"y":352,"flippedX":false,"flippedY":false,"uid":"55913988_23","levelName":"JungleTemple","checkpointName":"","name":"","depth":0}),
FromBar: {"type":"Checkpoint","x":1152,"y":384,"flippedX":false,"flippedY":false,"uid":"55940370_24","name":"FromBar","faceRight":true,"depth":0},
FromInn: {"type":"Checkpoint","x":836,"y":376,"flippedX":false,"flippedY":false,"uid":"55940370_25","name":"FromInn","faceRight":false,"depth":0},
FromTemple: {"type":"Checkpoint","x":376,"y":384,"flippedX":false,"flippedY":false,"uid":"55940370_26","name":"FromTemple","faceRight":true,"depth":0},
// @ts-ignore
PipeHorizontal_6: resolvePipeHorizontal({"type":"PipeHorizontal","x":200,"y":237,"width":35,"flippedX":false,"flippedY":false,"uid":"55841307_27","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_7: resolvePipeHorizontal({"type":"PipeHorizontal","x":382,"y":237,"width":35,"flippedX":false,"flippedY":false,"uid":"55841307_28","visible":false,"name":"","depth":0}),
// @ts-ignore
PipeHorizontal_8: resolvePipeHorizontal({"type":"PipeHorizontal","x":235,"y":316,"width":147,"flippedX":false,"flippedY":false,"uid":"55841307_29","visible":false,"name":"","depth":0}),
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":399,"y":160,"flippedX":false,"flippedY":false,"uid":"55991906_31","name":"","depth":0}),
// @ts-ignore
JungleTree: resolveJungleTree({"type":"JungleTree","x":1376,"y":456,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_32","name":"","depth":4}),
// @ts-ignore
JungleTree_1: resolveJungleTree({"type":"JungleTree","x":1168,"y":504,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_33","name":"","depth":4}),
// @ts-ignore
JungleTree_2: resolveJungleTree({"type":"JungleTree","x":1008,"y":472,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_34","name":"","depth":4}),
// @ts-ignore
JungleTree_3: resolveJungleTree({"type":"JungleTree","x":776,"y":496,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_35","name":"","depth":4}),
// @ts-ignore
JungleTree_4: resolveJungleTree({"type":"JungleTree","x":568,"y":496,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_36","name":"","depth":4}),
// @ts-ignore
JungleTree_5: resolveJungleTree({"type":"JungleTree","x":256,"y":504,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_37","name":"","depth":4}),
// @ts-ignore
JungleTree_6: resolveJungleTree({"type":"JungleTree","x":432,"y":504,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_38","name":"","depth":4}),
TempleLever: {"type":"Anchor","x":218,"y":237,"flippedX":false,"flippedY":false,"uid":"25979726_39","name":"TempleLever","depth":0},
// @ts-ignore
JungleOracle: resolveNpc({"type":"NpcIguana","x":688,"y":376,"flippedX":true,"flippedY":false,"uid":"26367058_40","name":"JungleOracle","style":13,"depth":0}),
// @ts-ignore
JungleTree_7: resolveJungleTree({"type":"JungleTree","x":1200,"y":384,"height":144,"flippedX":false,"flippedY":false,"uid":"25711099_41","name":"","depth":0}),
// @ts-ignore
JungleTree_8: resolveJungleTree({"type":"JungleTree","x":1400,"y":416,"height":144,"flippedX":false,"flippedY":false,"uid":"25711099_42","name":"","depth":0}),
// @ts-ignore
Block_7: resolveBlock({"type":"Block","x":544,"y":164,"width":104,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_44","name":"","depth":0}),
// @ts-ignore
Block_8: resolveBlock({"type":"Block","x":648,"y":176,"width":88,"height":52,"flippedX":false,"flippedY":false,"uid":"55823268_48","name":"","depth":0}),
// @ts-ignore
JungleTree_9: resolveJungleTree({"type":"JungleTree","x":582,"y":164,"height":144,"flippedX":false,"flippedY":false,"uid":"25711099_54","name":"","depth":0}),
// @ts-ignore
PipeHorizontal_9: resolvePipeHorizontal({"type":"PipeHorizontal","x":464,"y":164,"width":80,"flippedX":false,"flippedY":false,"uid":"55841307_56","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":464,"y":164,"flippedX":false,"flippedY":false,"uid":"63428932_57","name":"","depth":0}),
// @ts-ignore
BehindPillar: resolveRegion({"type":"Region","x":648,"y":120,"width":88,"height":64,"flippedX":false,"flippedY":false,"uid":"25971607_58","name":"BehindPillar","depth":0}),
// @ts-ignore
Block_9: resolveBlock({"type":"Block","x":648,"y":104,"width":88,"height":24,"flippedX":false,"flippedY":false,"uid":"55823268_59","name":"","depth":0}),
// @ts-ignore
Block_10: resolveBlock({"type":"Block","x":648,"y":128,"width":24,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_60","name":"","depth":0}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":664,"y":152,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_61","name":"","depth":0}),
// @ts-ignore
SlopeLeft_3: resolveSlopeLeft({"type":"SlopeLeft","x":664,"y":120,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_62","name":"","depth":0}),
// @ts-ignore
ValuableBlue_1: resolveValuableBlue({"type":"ValuableBlue","x":200,"y":40,"flippedX":false,"flippedY":false,"uid":"55991906_69","name":"","depth":0}),
// @ts-ignore
ValuableBlue_2: resolveValuableBlue({"type":"ValuableBlue","x":224,"y":40,"flippedX":false,"flippedY":false,"uid":"55991906_70","name":"","depth":0}),
// @ts-ignore
ValuableBlue_3: resolveValuableBlue({"type":"ValuableBlue","x":248,"y":40,"flippedX":false,"flippedY":false,"uid":"55991906_71","name":"","depth":0}),
// @ts-ignore
ValuableOrange: resolveValuableOrange({"type":"ValuableOrange","x":272,"y":40,"flippedX":false,"flippedY":false,"uid":"56004563_72","name":"","depth":0}),
// @ts-ignore
ValuableOrange_1: resolveValuableOrange({"type":"ValuableOrange","x":296,"y":40,"flippedX":false,"flippedY":false,"uid":"56004563_73","name":"","depth":0}),
// @ts-ignore
ValuableOrange_2: resolveValuableOrange({"type":"ValuableOrange","x":320,"y":40,"flippedX":false,"flippedY":false,"uid":"56004563_74","name":"","depth":0}),
// @ts-ignore
Block_11: resolveBlock({"type":"Block","x":0,"y":368,"width":160,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_75","name":"","depth":0}),
// @ts-ignore
HolyStump: resolveTreeStump({"type":"TreeStump","x":80,"y":368,"flippedX":false,"flippedY":false,"uid":"77429484_76","levelName":"JungleBossArena","checkpointName":"Stump","name":"HolyStump","depth":0,"faceRight":false}),
// @ts-ignore
Pool_1: resolvePool({"type":"Pool","x":0,"y":408,"width":160,"height":40,"flippedX":false,"flippedY":false,"uid":"38353047_77","name":"","depth":3}),
// @ts-ignore
SlopeLeft_4: resolveSlopeLeft({"type":"SlopeLeft","x":160,"y":368,"width":64,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_78","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":136,"y":392,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_81","name":"","depth":0}),
// @ts-ignore
JungleTree_10: resolveJungleTree({"type":"JungleTree","x":136,"y":370,"height":104,"flippedX":false,"flippedY":false,"uid":"25711099_84","name":"","depth":0}),
// @ts-ignore
JungleTree_11: resolveJungleTree({"type":"JungleTree","x":32,"y":488,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_85","name":"","depth":4}),
// @ts-ignore
SlopeLeft_5: resolveSlopeLeft({"type":"SlopeLeft","x":8,"y":392,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_87","name":"","depth":0}),
// @ts-ignore
Block_12: resolveBlock({"type":"Block","x":0,"y":400,"width":16,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268_88","name":"","depth":0}),
SpiritSpawn: {"type":"Anchor","x":1116,"y":328,"flippedX":false,"flippedY":false,"uid":"25979726_89","name":"SpiritSpawn","depth":0},
FromGiants: {"type":"Checkpoint","x":992,"y":24,"flippedX":false,"flippedY":false,"uid":"55940370_90","name":"FromGiants","faceRight":false,"depth":0}
};
}
};

export const OversizedClownArenaArgs = {
    width: 848,
height: 256,
gameObjectsSupplier: () => {
  return {
    PoppingRocksBox: resolveDecalGameObject({
    x: 704,
y: 226,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: PoppingRocksBox
}),
Cobweb: resolveDecalGameObject({
    x: 436,
y: 20,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: Cobweb
}),
VineSmall: resolveDecalGameObject({
    x: 34,
y: 60,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "TerrainDecals",
texture: VineSmall
}),
DesertGlow: resolveDecalGameObject({
    x: 848,
y: 200,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 3,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
JungleGlow: resolveDecalGameObject({
    x: 0,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 3,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
Cobweb_1: resolveDecalGameObject({
    x: 88,
y: 216,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
CracksA: resolveDecalGameObject({
    x: 376,
y: 40,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 624,
y: 200,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_2: resolveDecalGameObject({
    x: 184,
y: 200,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_3: resolveDecalGameObject({
    x: 104,
y: 32,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":80,"y":224,"width":768,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
Player: {"type":"Player","x":776,"y":224,"flippedX":false,"flippedY":false,"uid":"55988047_1","faceRight":false,"name":"","depth":0},
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":416,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_2","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":384,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_3","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":248,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_4","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":216,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_5","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":80,"y":152,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307_6","visible":true,"name":"","depth":0}),
// @ts-ignore
PipeRightEnd: resolvePipeRightEnd({"type":"PipeRightEnd","x":112,"y":152,"flippedX":false,"flippedY":false,"uid":"63418353_7","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":712,"y":112,"width":136,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_9","name":"","depth":0}),
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":824,"y":192,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_11","levelName":"DesertTown","checkpointName":"FromArena","name":"","depth":0}),
// @ts-ignore
RightBossWall: resolveBlock({"type":"Block","x":672,"y":152,"width":16,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268_12","name":"RightBossWall","depth":0}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":592,"y":112,"width":120,"height":64,"flippedX":false,"flippedY":true,"uid":"55824435_13","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":592,"y":0,"width":256,"height":112,"flippedX":false,"flippedY":false,"uid":"55823268_14","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":0,"y":112,"width":80,"height":144,"flippedX":false,"flippedY":false,"uid":"55823268_15","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":0,"y":32,"width":48,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_18","name":"","depth":0}),
// @ts-ignore
LeftBossWall: resolveBlock({"type":"Block","x":64,"y":32,"width":16,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268_21","name":"LeftBossWall","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":0,"y":0,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_22","name":"","depth":0}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":48,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_23","name":"","depth":0}),
// @ts-ignore
Gate_1: resolveGate({"type":"Gate","x":0,"y":80,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197_25","levelName":"JungleFromDesert","checkpointName":"FromCave","name":"","depth":0}),
FromJungle: {"type":"Checkpoint","x":64,"y":112,"flippedX":false,"flippedY":false,"uid":"55940370_26","name":"FromJungle","faceRight":true,"depth":0},
DefeatedBoss: {"type":"Checkpoint","x":344,"y":224,"flippedX":false,"flippedY":false,"uid":"55940370_27","name":"DefeatedBoss","faceRight":true,"depth":0}
};
}
};

export const UnrealBallsArgs = {
    width: 256,
height: 256,
gameObjectsSupplier: () => {
  return {
    // @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":208,"width":256,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":0,"width":256,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":32,"width":32,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":224,"y":32,"width":32,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
Player: {"type":"Player","x":120,"y":208,"flippedX":false,"flippedY":false,"uid":"55988047_4","faceRight":true,"name":"","depth":0},
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":192,"y":176,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_5","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":32,"y":48,"width":48,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268_6","name":"","depth":0}),
// @ts-ignore
Spike: resolveSpike({"type":"Spike","x":211,"y":104,"flippedX":false,"flippedY":false,"uid":"35514037_8","name":"","depth":0}),
// @ts-ignore
Spike_1: resolveSpike({"type":"Spike","x":32,"y":96,"flippedX":false,"flippedY":false,"uid":"35514037_9","name":"","depth":0}),
// @ts-ignore
Spike_2: resolveSpike({"type":"Spike","x":32,"y":194,"flippedX":false,"flippedY":false,"uid":"35514037_11","name":"","depth":0}),
// @ts-ignore
Spike_3: resolveSpike({"type":"Spike","x":88,"y":136,"flippedX":false,"flippedY":false,"uid":"35514037_12","name":"","depth":0}),
// @ts-ignore
Spike_4: resolveSpike({"type":"Spike","x":160,"y":194,"flippedX":false,"flippedY":false,"uid":"35514037_13","name":"","depth":0})
};
}
};

export const UnrealClownDodgerArgs = {
    width: 912,
height: 256,
gameObjectsSupplier: () => {
  return {
    GroundSpeckles: resolveDecalGameObject({
    x: 795,
y: 236,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: GroundSpeckles
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":80,"y":224,"width":912,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
Player: {"type":"Player","x":32,"y":104,"flippedX":false,"flippedY":false,"uid":"55988047_1","faceRight":false,"name":"","depth":0},
// @ts-ignore
PortalFluid: resolvePortalFluid({"type":"PortalFluid","x":0,"y":224,"width":80,"height":80,"flippedX":false,"flippedY":false,"uid":"24775263_15","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":104,"width":80,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_16","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":0,"y":120,"width":40,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_17","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":40,"y":120,"width":40,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_18","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":312,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_19","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":344,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_20","name":"","depth":0}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":576,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_21","name":"","depth":0}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":608,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_22","name":"","depth":0})
};
}
};

export const UnrealFlightArgs = {
    width: 728,
height: 448,
gameObjectsSupplier: () => {
  return {
    SpikyBrushA: resolveDecalGameObject({
    x: 40,
y: 394,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: SpikyBrushA
}),
SmallDecorativeRock: resolveDecalGameObject({
    x: 62,
y: 394,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "TerrainDecals",
texture: SmallDecorativeRock
}),
SmallDecorativeRock_1: resolveDecalGameObject({
    x: 24,
y: 393,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SmallDecorativeRock
}),
SpikyBrushB: resolveDecalGameObject({
    x: 144,
y: 378,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
Rainbow2: resolveDecalGameObject({
    x: 9,
y: 422,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Rainbow2
}),
Rainbow1: resolveDecalGameObject({
    x: 19,
y: 494,
originX: 0,
originY: 0,
scaleX: -1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Rainbow1
}),
Rainbow1_1: resolveDecalGameObject({
    x: 143,
y: 370,
originX: 0,
originY: 0,
scaleX: -1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Rainbow1
}),
Rainbow2_1: resolveDecalGameObject({
    x: 133,
y: 298,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Rainbow2
}),
Rainbow2_2: resolveDecalGameObject({
    x: 71,
y: 360,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Rainbow2
}),
Rainbow1_2: resolveDecalGameObject({
    x: 81,
y: 432,
originX: 0,
originY: 0,
scaleX: -1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Rainbow1
}),
ColorfulBricks: resolveDecalGameObject({
    x: 0,
y: 32,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_1: resolveDecalGameObject({
    x: 32,
y: 32,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_2: resolveDecalGameObject({
    x: 32,
y: 50,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_3: resolveDecalGameObject({
    x: 80,
y: 50,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_4: resolveDecalGameObject({
    x: 80,
y: 32,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_5: resolveDecalGameObject({
    x: 48,
y: 32,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_6: resolveDecalGameObject({
    x: -32,
y: 32,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_7: resolveDecalGameObject({
    x: -32,
y: 50,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_8: resolveDecalGameObject({
    x: 112,
y: 32,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_9: resolveDecalGameObject({
    x: 144,
y: 32,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_10: resolveDecalGameObject({
    x: 144,
y: 50,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_11: resolveDecalGameObject({
    x: 96,
y: 50,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_12: resolveDecalGameObject({
    x: 96,
y: 32,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_13: resolveDecalGameObject({
    x: 16,
y: 116,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_14: resolveDecalGameObject({
    x: 0,
y: 98,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_15: resolveDecalGameObject({
    x: -32,
y: 68,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_16: resolveDecalGameObject({
    x: 48,
y: 68,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_17: resolveDecalGameObject({
    x: 32,
y: 86,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_18: resolveDecalGameObject({
    x: 32,
y: 68,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
ColorfulBricks_19: resolveDecalGameObject({
    x: 0,
y: 68,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
Cobweb: resolveDecalGameObject({
    x: 24,
y: 40,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
Cobweb_1: resolveDecalGameObject({
    x: 160,
y: 40,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
ColorfulBricks_20: resolveDecalGameObject({
    x: 32,
y: 140,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
FlyCage: resolveDecalGameObject({
    x: 104,
y: 104,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: FlyCage
}),
FlyCageBroken: resolveDecalGameObject({
    x: 152,
y: 104,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: FlyCageBroken
}),
FlyCage_1: resolveDecalGameObject({
    x: 128,
y: 104,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: FlyCage
}),
LightShelf: resolveDecalGameObject({
    x: 40,
y: 68,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: LightShelf
}),
RoseVase: resolveDecalGameObject({
    x: 33,
y: 69,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: RoseVase
}),
ColorfulBricks_21: resolveDecalGameObject({
    x: 0,
y: 158,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: ColorfulBricks
}),
Pipe: resolveDecalGameObject({
    x: 96,
y: 24,
originX: 1,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Pipe
}),
OverheadLamp: resolveDecalGameObject({
    x: 96,
y: 46,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: OverheadLamp
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":392,"width":152,"height":56,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":152,"y":264,"width":32,"height":184,"flippedX":false,"flippedY":false,"uid":"55823268_1","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":152,"y":120,"width":32,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
Player: {"type":"Player","x":104,"y":392,"flippedX":false,"flippedY":false,"uid":"55988047_3","faceRight":true,"name":"","depth":0},
// @ts-ignore
PortalFluid: resolvePortalFluid({"type":"PortalFluid","x":184,"y":136,"width":224,"height":32,"flippedX":false,"flippedY":false,"uid":"24775263_4","name":"","depth":0}),
// @ts-ignore
PortalFluid_1: resolvePortalFluid({"type":"PortalFluid","x":184,"y":280,"width":160,"height":168,"flippedX":false,"flippedY":false,"uid":"24775263_5","name":"","depth":0}),
// @ts-ignore
PortalFluid_2: resolvePortalFluid({"type":"PortalFluid","x":408,"y":136,"width":232,"height":208,"flippedX":false,"flippedY":false,"uid":"24775263_6","name":"","depth":0}),
// @ts-ignore
PortalFluid_3: resolvePortalFluid({"type":"PortalFluid","x":344,"y":416,"width":384,"height":32,"flippedX":false,"flippedY":false,"uid":"24775263_7","name":"","depth":0}),
// @ts-ignore
PortalFluid_4: resolvePortalFluid({"type":"PortalFluid","x":440,"y":328,"width":200,"height":24,"flippedX":false,"flippedY":false,"uid":"24775263_9","name":"","depth":0}),
// @ts-ignore
BigKeyPiece: resolveRegion({"type":"Region","x":643,"y":144,"width":50,"height":8,"flippedX":false,"flippedY":false,"uid":"25971607_11","name":"BigKeyPiece","depth":0}),
// @ts-ignore
CameraUnlockRegion: resolveRegion({"type":"Region","x":16,"y":104,"width":40,"height":32,"flippedX":false,"flippedY":false,"uid":"25971607_12","name":"CameraUnlockRegion","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":72,"y":104,"width":112,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_13","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":0,"y":0,"width":92,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_17","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":92,"y":0,"width":92,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_18","name":"","depth":0}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":168,"y":32,"width":16,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268_19","name":"","depth":0}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":0,"y":32,"width":16,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268_20","name":"","depth":0}),
FireflySpawn: {"type":"Anchor","x":152,"y":72,"flippedX":false,"flippedY":false,"uid":"25979726_21","name":"FireflySpawn","depth":0},
// @ts-ignore
PortalFluid_5: resolvePortalFluid({"type":"PortalFluid","x":184,"y":32,"width":456,"height":104,"flippedX":false,"flippedY":false,"uid":"24775263_23","name":"","depth":0}),
// @ts-ignore
PortalFluid_6: resolvePortalFluid({"type":"PortalFluid","x":464,"y":0,"width":176,"height":32,"flippedX":false,"flippedY":false,"uid":"24775263_24","name":"","depth":0}),
// @ts-ignore
PortalFluid_7: resolvePortalFluid({"type":"PortalFluid","x":696,"y":0,"width":32,"height":416,"flippedX":false,"flippedY":false,"uid":"24775263_25","name":"","depth":0})
};
}
};

export const UnrealMimicArgs = {
    width: 256,
height: 256,
gameObjectsSupplier: () => {
  return {
    // @ts-ignore
PlayerFloorBlock: resolveBlock({"type":"Block","x":48,"y":120,"width":160,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_8","name":"PlayerFloorBlock","depth":0}),
// @ts-ignore
PortalFluid: resolvePortalFluid({"type":"PortalFluid","x":0,"y":56,"width":48,"height":144,"flippedX":false,"flippedY":false,"uid":"24775263_10","name":"","depth":0}),
// @ts-ignore
PortalFluid_1: resolvePortalFluid({"type":"PortalFluid","x":208,"y":56,"width":48,"height":144,"flippedX":false,"flippedY":false,"uid":"24775263_11","name":"","depth":0}),
Player: {"type":"Player","x":128,"y":120,"flippedX":false,"flippedY":false,"uid":"55988047_12","faceRight":true,"name":"","depth":0},
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":48,"y":200,"width":80,"height":56,"flippedX":false,"flippedY":true,"uid":"55824435_13","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":128,"y":200,"width":80,"height":56,"flippedX":false,"flippedY":true,"uid":"55845599_14","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":128,"y":0,"width":80,"height":56,"flippedX":false,"flippedY":false,"uid":"55845599_15","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":48,"y":0,"width":80,"height":56,"flippedX":false,"flippedY":false,"uid":"55824435_16","name":"","depth":0}),
// @ts-ignore
Mimic: resolveNpc({"type":"NpcIguana","x":128,"y":200,"flippedX":false,"flippedY":false,"uid":"26367058_17","name":"Mimic","style":0,"depth":0}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":208,"y":0,"width":80,"height":56,"flippedX":false,"flippedY":false,"uid":"55824435_19","name":"","depth":0}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":-32,"y":0,"width":80,"height":56,"flippedX":false,"flippedY":false,"uid":"55845599_20","name":"","depth":0}),
// @ts-ignore
SlopeRight_3: resolveSlopeRight({"type":"SlopeRight","x":208,"y":200,"width":80,"height":56,"flippedX":false,"flippedY":true,"uid":"55824435_21","name":"","depth":0}),
// @ts-ignore
SlopeLeft_3: resolveSlopeLeft({"type":"SlopeLeft","x":-32,"y":200,"width":80,"height":56,"flippedX":false,"flippedY":true,"uid":"55845599_22","name":"","depth":0}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":120,"y":40,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_23","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":120,"y":200,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268_24","name":"","depth":0}),
// @ts-ignore
BigKeyPiece: resolveRegion({"type":"Region","x":56,"y":152,"width":50,"height":8,"flippedX":false,"flippedY":false,"uid":"25971607_25","name":"BigKeyPiece","depth":0})
};
}
};

export const UnrealRoyalChamberArgs = {
    width: 1248,
height: 256,
gameObjectsSupplier: () => {
  return {
    Column: resolveDecalGameObject({
    x: 704,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2.05,
rotation: 0,
layerName: "FrontDecals",
texture: Column
}),
Column_1: resolveDecalGameObject({
    x: 832,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2.05,
rotation: 0,
layerName: "FrontDecals",
texture: Column
}),
Column_2: resolveDecalGameObject({
    x: 464,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2.05,
rotation: 0,
layerName: "FrontDecals",
texture: Column
}),
Column_3: resolveDecalGameObject({
    x: 336,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2.05,
rotation: 0,
layerName: "FrontDecals",
texture: Column
}),
Column_4: resolveDecalGameObject({
    x: 240,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2.05,
rotation: 0,
layerName: "FrontDecals",
texture: Column
}),
Column_5: resolveDecalGameObject({
    x: 672,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_6: resolveDecalGameObject({
    x: 864,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_7: resolveDecalGameObject({
    x: 568,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_8: resolveDecalGameObject({
    x: 376,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_9: resolveDecalGameObject({
    x: 104,
y: 96,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 2,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
GlowingCircle: resolveDecalGameObject({
    x: 560,
y: 32,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_1: resolveDecalGameObject({
    x: 656,
y: 208,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_2: resolveDecalGameObject({
    x: 776,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_3: resolveDecalGameObject({
    x: 952,
y: 232,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_4: resolveDecalGameObject({
    x: 1024,
y: 8,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_5: resolveDecalGameObject({
    x: 1136,
y: 136,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_6: resolveDecalGameObject({
    x: 1264,
y: 208,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_7: resolveDecalGameObject({
    x: 440,
y: 184,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_8: resolveDecalGameObject({
    x: 312,
y: 112,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_9: resolveDecalGameObject({
    x: 200,
y: -16,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_10: resolveDecalGameObject({
    x: 128,
y: 208,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_11: resolveDecalGameObject({
    x: 0,
y: 72,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
GlowingCircle_12: resolveDecalGameObject({
    x: -216,
y: 8,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: GlowingCircle
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":224,"y":224,"width":1024,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_0","name":"","depth":0}),
Player: {"type":"Player","x":32,"y":224,"flippedX":false,"flippedY":false,"uid":"55988047_1","faceRight":true,"name":"","depth":0},
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":648,"y":64,"width":248,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_2","name":"","depth":0}),
// @ts-ignore
SecretWorshipper1: resolveNpc({"type":"NpcIguana","x":672,"y":64,"flippedX":false,"flippedY":false,"uid":"26367058_3","name":"SecretWorshipper1","style":9,"depth":0}),
// @ts-ignore
SecretWorshipper2: resolveNpc({"type":"NpcIguana","x":736,"y":64,"flippedX":false,"flippedY":false,"uid":"26367058_4","name":"SecretWorshipper2","style":10,"depth":0}),
// @ts-ignore
SecretWorshipper3: resolveNpc({"type":"NpcIguana","x":800,"y":64,"flippedX":false,"flippedY":false,"uid":"26367058_5","name":"SecretWorshipper3","style":8,"depth":0}),
// @ts-ignore
Worshipper: resolveNpc({"type":"NpcIguana","x":864,"y":64,"flippedX":false,"flippedY":false,"uid":"26367058_6","name":"Worshipper","style":2,"depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":896,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_7","name":"","depth":0}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":928,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435_8","name":"","depth":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":896,"y":64,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_10","name":"","depth":0}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":928,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_11","name":"","depth":0}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":960,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599_12","name":"","depth":0}),
// @ts-ignore
SlopeLeft_3: resolveSlopeLeft({"type":"SlopeLeft","x":584,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_13","name":"","depth":0}),
// @ts-ignore
SlopeLeft_4: resolveSlopeLeft({"type":"SlopeLeft","x":616,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599_14","name":"","depth":0}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":616,"y":64,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_15","name":"","depth":0}),
// @ts-ignore
SlopeRight_3: resolveSlopeRight({"type":"SlopeRight","x":584,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_16","name":"","depth":0}),
// @ts-ignore
SlopeRight_4: resolveSlopeRight({"type":"SlopeRight","x":552,"y":0,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_17","name":"","depth":0}),
// @ts-ignore
SlopeRight_5: resolveSlopeRight({"type":"SlopeRight","x":1184,"y":128,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_19","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":1216,"y":128,"width":32,"height":96,"flippedX":false,"flippedY":false,"uid":"55823268_20","name":"","depth":0}),
DuckSpawn: {"type":"Anchor","x":1208,"y":128,"flippedX":false,"flippedY":false,"uid":"25979726_22","name":"DuckSpawn","depth":0},
KeySpawn: {"type":"Anchor","x":1104,"y":152,"flippedX":false,"flippedY":false,"uid":"25979726_24","name":"KeySpawn","depth":0},
// @ts-ignore
PortalFluid: resolvePortalFluid({"type":"PortalFluid","x":144,"y":224,"width":80,"height":56,"flippedX":false,"flippedY":false,"uid":"24775263_25","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":0,"y":224,"width":144,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_26","name":"","depth":0})
};
}
};

export const UnrealSnowmanArgs = {
    width: 512,
height: 256,
gameObjectsSupplier: () => {
  return {
    Player: {"type":"Player","x":88,"y":136,"flippedX":false,"flippedY":false,"uid":"55988047_12","faceRight":true,"name":"","depth":0},
// @ts-ignore
Block: resolveBlock({"type":"Block","x":256,"y":224,"width":256,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268_26","name":"","depth":0}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":512,"y":0,"width":32,"height":224,"flippedX":false,"flippedY":false,"uid":"55823268_27","name":"","depth":0}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":136,"width":256,"height":120,"flippedX":false,"flippedY":false,"uid":"55823268_28","name":"","depth":0}),
// @ts-ignore
PuzzleWall: resolveBlock({"type":"Block","x":224,"y":0,"width":32,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268_30","name":"PuzzleWall","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":128,"y":72,"width":96,"height":64,"flippedX":false,"flippedY":false,"uid":"55824435_32","name":"","depth":0}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":224,"y":72,"width":32,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268_33","name":"","depth":0}),
TorchA: {"type":"Anchor","x":16,"y":136,"flippedX":false,"flippedY":false,"uid":"25979726_34","name":"TorchA","depth":0},
Torch1: {"type":"Anchor","x":280,"y":224,"flippedX":false,"flippedY":false,"uid":"25979726_35","name":"Torch1","depth":0},
Torch2: {"type":"Anchor","x":488,"y":224,"flippedX":false,"flippedY":false,"uid":"25979726_36","name":"Torch2","depth":0},
SnowmanSpawn: {"type":"Anchor","x":384,"y":224,"flippedX":false,"flippedY":false,"uid":"25979726_38","name":"SnowmanSpawn","depth":0}
};
}
};