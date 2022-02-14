// This file is generated. Do not touch.
import { resolveBlock } from "./gameObjects/walls";
import { resolveSlopeRight } from "./gameObjects/walls";
import { resolveRegion } from "./gameObjects/region";
import { resolveSlopeLeft } from "./gameObjects/walls";
import { resolveNpc } from "./gameObjects/npc";
import { resolvePortalFluid } from "./gameObjects/portalFluid";
import { resolveDecalGameObject } from "./gameObjects/decal";
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
import { resolveGate } from "./gameObjects/gate";
import { resolvePipeRightEnd } from "./gameObjects/walls";
import { resolvePipeHorizontal } from "./gameObjects/walls";
import { CracksA } from "./textures";
import { GlowingCircle } from "./textures";
import { VineSmall } from "./textures";
import { PoppingRocksBox } from "./textures";
import { resolveJungleTree } from "./gameObjects/jungleTree";
import { resolveDoor } from "./gameObjects/door";
import { GroundSpeckles } from "./textures";
import { DinerTable } from "./textures";
import { resolvePool } from "./gameObjects/pool";
import { resolveValuableBlue } from "./gameObjects/valuable";
import { resolveSign } from "./gameObjects/sign";
import { resolveCommonClown } from "./gameObjects/commonClown";
import { JungleHouse1 } from "./textures";
import { resolveBoulder } from "./gameObjects/boulder";
import { CloudLong } from "./textures";
import { KeyRed } from "./textures";
import { SignTavern } from "./textures";
import { SignInn } from "./textures";
import { CrudeHouse } from "./textures";
import { CrudeHouseC } from "./textures";
import { CrateWooden } from "./textures";
import { CrudeHouseB } from "./textures";
import { Column } from "./textures";
import { PaSpeaker } from "./textures";
import { GreenCable } from "./textures";
import { DontPoster } from "./textures";
import { Bottle2 } from "./textures";
import { Bottle1 } from "./textures";
import { WhiskeyGlass } from "./textures";
import { CocktailGlass } from "./textures";
import { WoodenStool } from "./textures";
import { resolveValuableOrange } from "./gameObjects/valuable";
import { resolvePipeLeftEnd } from "./gameObjects/walls";
import { Anchor } from "./textures";
import { resolvePipeLeft } from "./gameObjects/walls";
import { resolvePipeRight } from "./gameObjects/walls";
import { OrnateCarpet } from "./textures";
import { PotteryOrange } from "./textures";
import { PotteryOrangeDamaged } from "./textures";
import { Rope } from "./textures";
import { DesertTemple } from "./textures";
import { CandleSmallRed } from "./textures";
import { BookCollection } from "./textures";

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
    width: 576,
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
Block_3: resolveBlock({"type":"Block","x":368,"y":0,"width":208,"height":240,"flippedX":false,"flippedY":false,"uid":"55823268_21","name":"","depth":0}),
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
BushValuableRegion: resolveRegion({"type":"Region","x":160,"y":312,"width":40,"height":16,"flippedX":false,"flippedY":false,"uid":"25971607_40","name":"BushValuableRegion","depth":0})
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
FromCostumer: {"type":"Checkpoint","x":1240,"y":440,"flippedX":false,"flippedY":false,"uid":"55940370_63","name":"FromCostumer","faceRight":false,"depth":0}
};
}
};

export const JungleFromDesertArgs = {
    width: 1536,
height: 512,
gameObjectsSupplier: () => {
  return {
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
    x: 1192,
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
    x: 1240,
y: 408,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: JungleHouse1
}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":432,"y":472,"width":120,"height":40,"flippedX":false,"flippedY":false,"uid":"55845599_0","name":"","depth":0}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":432,"y":408,"width":128,"height":40,"flippedX":false,"flippedY":true,"uid":"55824435_2","name":"","depth":0}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":560,"y":408,"width":976,"height":40,"flippedX":false,"flippedY":false,"uid":"55823268_3","name":"","depth":0}),
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
CommonClown: resolveCommonClown({"type":"CommonClown","x":872,"y":376,"flippedX":false,"flippedY":false,"uid":"68762216_21","name":"","depth":0}),
// @ts-ignore
CommonClown_1: resolveCommonClown({"type":"CommonClown","x":992,"y":384,"flippedX":false,"flippedY":false,"uid":"68762216_22","name":"","depth":0}),
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
Door: resolveDoor({"type":"Door","x":1240,"y":376,"flippedX":false,"flippedY":false,"uid":"55913988_32","levelName":"JungleSickIguana","checkpointName":"","name":"","depth":0}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":1194,"y":352,"width":92,"flippedX":false,"flippedY":false,"uid":"55841307_33","visible":false,"name":"","depth":0}),
// @ts-ignore
JungleTree_7: resolveJungleTree({"type":"JungleTree","x":1265,"y":352,"height":64,"flippedX":false,"flippedY":false,"uid":"25711099_34","name":"","depth":0}),
FromHouse: {"type":"Checkpoint","x":1208,"y":408,"flippedX":false,"flippedY":false,"uid":"55940370_35","name":"FromHouse","faceRight":false,"depth":0},
// @ts-ignore
JungleTree_8: resolveJungleTree({"type":"JungleTree","x":1128,"y":512,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_38","name":"","depth":4}),
// @ts-ignore
JungleTree_9: resolveJungleTree({"type":"JungleTree","x":1360,"y":520,"height":368,"flippedX":false,"flippedY":false,"uid":"25711099_39","name":"","depth":4}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":1504,"y":448,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435_43","name":"","depth":0})
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
FromJungle: {"type":"Checkpoint","x":64,"y":112,"flippedX":false,"flippedY":false,"uid":"55940370_26","name":"FromJungle","faceRight":true,"depth":0}
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